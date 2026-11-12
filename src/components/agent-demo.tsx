"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUp, Check, RotateCcw, Sparkles } from "lucide-react";
import "./agent-demo.css";

type Turn = { role: "user" | "assistant"; content: string };

// Mirrors the server's limits so the visitor sees them before hitting them.
const MAX_USER_TURNS = 8;
const MAX_LENGTH = 300;
const GREETING =
  "هلا بيك بعيادة الرافدين لطب الأسنان. شلون أگدر أساعدك؟";
const SUGGESTIONS = [
  "شكد سعر تبييض الأسنان؟",
  "أريد موعد تنظيف يوم الخميس",
  "تفتحون يوم الجمعة؟",
  "سنّي يوجعني، شنو أسوي؟",
];
const ERRORS: Record<string, string> = {
  rate_limited: "وصلت حد التجربة حالياً. جرّب بعد شوية.",
  busy: "المساعد مشغول هسه. جرّب بعد لحظات.",
};
const GENERIC_ERROR = "ما وصل الرد. جرّب مرة ثانية.";

// A real assistant answering as the receptionist of a fictional clinic.
export default function AgentDemo({
  onChooseService,
}: {
  onChooseService: () => void;
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);

  const asked = turns.filter((turn) => turn.role === "user").length;
  const finished = asked >= MAX_USER_TURNS && !waiting;
  const last = turns.at(-1);
  // Dots show until the first words of the reply arrive.
  const thinking = waiting && last?.role === "user";

  useEffect(() => {
    const element = log.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [turns, thinking, error]);
  useEffect(() => () => request.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_LENGTH);
    if (!content || waiting || asked >= MAX_USER_TURNS) return;
    // A failed turn is retried rather than left dangling in the history.
    const history = last?.role === "user" ? turns.slice(0, -1) : turns;
    const next: Turn[] = [...history, { role: "user", content }];
    setTurns(next);
    setDraft("");
    setError("");
    setWaiting(true);
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const code = await response
          .json()
          .then((data: { error?: string }) => data.error)
          .catch(() => undefined);
        throw new Error(ERRORS[code ?? ""] ?? GENERIC_ERROR);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setTurns([...next, { role: "assistant", content: reply }]);
      }
      if (!reply.trim()) throw new Error(GENERIC_ERROR);
    } catch (caught) {
      if (controller.signal.aborted) return;
      // Drop a half-received reply so the retry starts from the question.
      setTurns(next);
      setError(
        caught instanceof Error && Object.values(ERRORS).includes(caught.message)
          ? caught.message
          : GENERIC_ERROR,
      );
    } finally {
      if (request.current === controller) {
        setWaiting(false);
        request.current = null;
      }
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  function restart() {
    request.current?.abort();
    request.current = null;
    setTurns([]);
    setDraft("");
    setError("");
    setWaiting(false);
    input.current?.focus();
  }

  return (
    <section
      id="agent"
      className="agent-section section wrap"
      aria-labelledby="agent-title"
    >
      <div className="agent-intro" data-reveal>
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" /> تجربة حيّة · ذكاء اصطناعي
          فعلي
        </p>
        <h2 id="agent-title">
          اسأل المساعد.
          <br />
          <span>وشوف شلون يرد.</span>
        </h2>
        <p>
          هذا مساعد استقبال حقيقي لعيادة وهمية. اسأله مثل ما يسأل زبونك، وجرّب
          حتى سؤال خارج معلوماته.
        </p>
        <ul className="agent-points">
          <li>
            <Check size={15} aria-hidden="true" />
            <span>يجاوب من معلومات العيادة المعتمدة فقط.</span>
          </li>
          <li>
            <Check size={15} aria-hidden="true" />
            <span>يحوّل للموظف اللي ما يعرفه، وما يخمّن.</span>
          </li>
          <li>
            <Check size={15} aria-hidden="true" />
            <span>يجمع طلب الموعد، والتأكيد يبقى للموظف.</span>
          </li>
        </ul>
      </div>

      <div className="agent-card" data-reveal="1">
        <div className="agent-head">
          <span className="ali-avatar" aria-hidden="true">
            ر
          </span>
          <div>
            <b>مساعد عيادة الرافدين</b>
            <p>عيادة وهمية للتجربة</p>
          </div>
          <span className="agent-live">
            <i aria-hidden="true" /> متصل
          </span>
        </div>

        <div
          className="agent-log"
          ref={log}
          role="log"
          aria-label="المحادثة مع المساعد"
          aria-busy={waiting}
          tabIndex={0}
        >
          <p className="agent-bubble" data-role="assistant">
            {GREETING}
          </p>
          {turns.map((turn, index) => (
            <p className="agent-bubble" data-role={turn.role} key={index}>
              {turn.content}
            </p>
          ))}
          {thinking && (
            <p className="agent-bubble agent-typing" data-role="assistant">
              <span className="sr-only">المساعد يكتب</span>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </p>
          )}
          {error && (
            <p className="agent-error" role="alert">
              {error}{" "}
              {last?.role === "user" && (
                <button type="button" onClick={() => void send(last.content)}>
                  أعد المحاولة
                </button>
              )}
            </p>
          )}
        </div>

        {turns.length === 0 && (
          <div className="agent-suggestions" role="group" aria-label="أسئلة مقترحة">
            {SUGGESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void send(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {finished ? (
          <div className="agent-finished">
            <p>وصلت نهاية التجربة. تريد مساعد مثله يشتغل على معلومات شغلك؟</p>
            <a className="btn" href="#book" onClick={onChooseService}>
              نحچي عن مساعد لشغلك <ArrowLeft size={18} />
            </a>
          </div>
        ) : (
          <form className="agent-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="agent-input">
              اكتب سؤالك للمساعد
            </label>
            <input
              ref={input}
              id="agent-input"
              type="text"
              autoComplete="off"
              enterKeyHint="send"
              maxLength={MAX_LENGTH}
              placeholder="اكتب سؤالك هنا…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              type="submit"
              aria-label="أرسل السؤال"
              disabled={waiting || !draft.trim()}
            >
              <ArrowUp size={19} aria-hidden="true" />
            </button>
          </form>
        )}

        <div className="agent-foot">
          <span>
            تجربة فقط · لا تكتب بيانات شخصية · ما يتم أي حجز فعلي
          </span>
          {turns.length > 0 && (
            <button type="button" onClick={restart}>
              <RotateCcw size={14} aria-hidden="true" /> ابدأ من جديد
            </button>
          )}
        </div>
      </div>

      <p className="agent-cta">
        تريد مساعد مثله يرد من معلومات شغلك؟{" "}
        <a className="text-link" href="#book" onClick={onChooseService}>
          نحچي عن مساعد لشغلك <ArrowLeft size={16} />
        </a>
      </p>
    </section>
  );
}
