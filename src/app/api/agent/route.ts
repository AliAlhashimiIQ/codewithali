import Anthropic from "@anthropic-ai/sdk";

// Public demo endpoint: a receptionist for a fictional clinic. Everything here is
// bounded on purpose, because anyone on the internet can call it.
const MODEL = process.env.AGENT_DEMO_MODEL || "claude-opus-5-5";
const MAX_USER_TURNS = 8;
const MAX_MESSAGE_LENGTH = 300;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

const SYSTEM = `أنت موظف الاستقبال الآلي في "عيادة الرافدين لطب الأسنان"، عيادة وهمية تُستخدم كعرض تجريبي على موقع CodeWithAli. الزائر صاحب عمل يجرّب شلون يشتغل مساعد استقبال ذكي، فخلّي التجربة تشبه محادثة حقيقية مع عيادة.

معلومات العيادة المعتمدة (هذي كل ما تعرفه):
- الموقع: بغداد، المنصور، شارع ١٤ رمضان.
- الدوام: من السبت إلى الخميس، ١٠ صباحاً إلى ٨ مساءً. الجمعة عطلة.
- الخدمات والأسعار بالدينار العراقي: كشف واستشارة ١٠٬٠٠٠، تنظيف وتلميع ٣٠٬٠٠٠، حشوة تجميلية ٤٠٬٠٠٠، سحب عصب ١٢٠٬٠٠٠، تبييض ١٥٠٬٠٠٠، تقويم يبدأ من ١٬٥٠٠٬٠٠٠ بعد الكشف.
- الأطباء: د. سارة (تجميل وتبييض)، د. أحمد (عصب وجراحة)، د. نور (تقويم).
- الدفع: نقداً أو زين كاش. ماكو تأمين صحي.
- المواعيد: تاخذ من الزبون الخدمة واليوم والوقت المفضّل، وتوضّح أن الموظف يراجع الجدول ويأكد الموعد. أنت ما تأكد موعد بنفسك.

طريقة الرد:
- احچي بالعامية العراقية، بلطف واختصار: جملتين أو ثلاث، بدون قوائم وبدون تنسيق.
- جاوب من المعلومات المعتمدة فقط. إذا السؤال عن شي ما مذكور، گول إنك تحوّله للموظف، وما تخمّن.
- ما تعطي تشخيص أو نصيحة طبية. للحالات المؤلمة أو الطارئة انصح بالاتصال بالعيادة أو مراجعة طبيب.
- هذا عرض تجريبي، فما تطلب اسم كامل أو رقم هاتف أو أي بيانات شخصية. إذا الزبون يريد يحجز، اجمع الخدمة والوقت المفضّل وگول إنه بالنظام الحقيقي ينتقل الطلب للموظف.
- إذا السؤال خارج شغل العيادة، اعتذر بجملة وحدة وارجع للموضوع.
- إذا الزائر سأل عن بناء مساعد مثلك لشغله أو عن CodeWithAli، گول إن علي يبني مساعد مخصص لشغله وإنه يگدر يراسله من النموذج أسفل الصفحة.`;

type Turn = { role: "user" | "assistant"; content: string };

// Best effort only: memory is per server instance. Set a spend limit on the API
// key as the real ceiling.
const recent = new Map<string, number[]>();
function allow(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS_PER_WINDOW) {
    recent.set(ip, hits);
    return false;
  }
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return true;
}

function parse(body: unknown): Turn[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > MAX_USER_TURNS * 2 - 1) return null;
  const turns: Turn[] = [];
  for (const [index, item] of messages.entries()) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    // Turns must alternate, starting and ending with the visitor.
    const expected = index % 2 === 0 ? "user" : "assistant";
    if (role !== expected) return null;
    if (typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > (expected === "user" ? MAX_MESSAGE_LENGTH : 2000))
      return null;
    turns.push({ role: expected, content: text });
  }
  return turns.length % 2 === 1 ? turns : null;
}

const json = (error: string, status: number) =>
  Response.json({ error }, { status });

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return json("unavailable", 503);
  // Browsers send Origin on POST; reject other sites embedding the demo.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host"))
    return json("forbidden", 403);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) return json("rate_limited", 429);

  let turns: Turn[] | null = null;
  try {
    turns = parse(await request.json());
  } catch {
    /* handled below */
  }
  if (!turns) return json("invalid", 400);

  const client = new Anthropic();
  // Haiku has no server-side refusal fallback; other current models do.
  const fallback = MODEL.startsWith("claude-haiku")
    ? {}
    : {
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default" as const,
      };
  const stream = client.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: 4000,
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: turns,
      ...fallback,
    },
    { signal: request.signal },
  );

  async function* replyText() {
    let wrote = false;
    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        wrote = true;
        yield event.delta.text;
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal" && !wrote)
      yield "أعتذر، ما أگدر أساعد بهذا الطلب. تگدر تسألني عن خدمات العيادة ومواعيدها.";
  }

  // Wait for the first chunk so upstream failures become a proper status code.
  const replies = replyText();
  let first: IteratorResult<string>;
  try {
    first = await replies.next();
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json("busy", 429);
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Agent demo: the API key was rejected.");
      return json("unavailable", 503);
    }
    if (error instanceof Anthropic.APIError)
      console.error(`Agent demo: API error ${error.status}`);
    return json("upstream", 502);
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
        for await (const text of replies)
          controller.enqueue(encoder.encode(text));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      stream.abort();
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
