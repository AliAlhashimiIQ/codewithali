"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Code2,
  Globe2,
  MessageCircle,
  Plus,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import ConversionStory from "../components/conversion-story";
import HeroJourney from "../components/hero-journey";
import SectionMotion from "../components/section-motion";

const PHONE = "9647700683686";
const whatsapp = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const SERVICES = [
  {
    id: "landing",
    name: "صفحة لإعلانك",
    tag: "لعرض واحد. وهدف واضح.",
    icon: Zap,
    description:
      "إعلانك يجيب المهتم. الصفحة تشرح العرض وتسهّل عليه يطلب أو يسأل.",
    items: [
      "صفحة واحدة، لحد ٧ أقسام، بلغة واحدة",
      "ترتيب نصوصك وتصميم للموبايل",
      "واتساب أو نموذج استفسار بسيط",
      "ربط تحليلات وبيكسل واحد عند توفير الصلاحيات",
    ],
    boundary:
      "المتجر الكامل، الدفع الإلكتروني وإدارة الإعلانات إلها اتفاق منفصل.",
  },
  {
    id: "website",
    name: "موقع لشركتك أو عيادتك",
    tag: "مكان يعرّف الناس بشغلك.",
    icon: Globe2,
    description:
      "خدماتك، معلوماتك وطرق التواصل بمكان واحد، حتى الزبون يعرفك قبل ما يحچي وياك.",
    items: [
      "لحد ٥ صفحات، بلغة واحدة",
      "تنظيم المحتوى والصور اللي توفّرها",
      "واتساب، خريطة ونموذج استفسار",
      "أساسيات السرعة وتهيئة محركات البحث",
    ],
    boundary:
      "طلبات المواعيد عبر التواصل؛ نظام الحجز واللغة الثانية إضافات منفصلة.",
  },
  {
    id: "repair",
    name: "إصلاح موقعك الحالي",
    tag: "نحدد المشكلة. ونصلحها.",
    icon: Wrench,
    description:
      "مشكلة بالموبايل؟ نموذج ما يشتغل؟ نحدد الخلل ونطاق الإصلاح قبل الاتفاق.",
    items: [
      "فحص المشكلة وتحديد العمل كتابةً",
      "نسخة احتياطية إذا تسمح المنصة والصلاحيات",
      "إصلاح المشاكل المتفق عليها",
      "اختبار الأجزاء المعدّلة وملخّص بالتغييرات",
    ],
    boundary: "إعادة التصميم أو البناء الكامل إلها عرض منفصل بعد الفحص.",
  },
] as const;
const FAQS = [
  [
    "شكد يكلّف الموقع؟",
    "السعر يعتمد على الخدمة، عدد الصفحات والوظائف المطلوبة. احچيلي عن مشروعك وأرسل لك نطاق واضح وسعر ثابت قبل البدء. الدومين والاستضافة والاشتراكات الخارجية تُحسب بشكل منفصل وتعرف تكلفتها قبل الاشتراك.",
  ],
  [
    "شلون يصير الدفع والتسليم؟",
    "٥٠٪ للبدء، و٥٠٪ بعد مراجعتك للنسخة النهائية على رابط معاينة وقبل النشر وتسليم الملفات. نثبّت السعر، العملة وموعد التسليم كتابةً. مدة التنفيذ تبدأ بعد وصول الدفعة الأولى والمحتوى والصلاحيات المطلوبة.",
  ],
  [
    "كم تعديل يشمل؟ وأكو دعم بعد التسليم؟",
    "صفحة الإعلان وموقع الشركة يشملن جولتين تعديل، والإصلاح جولة مراجعة ضمن النطاق. كل جولة قائمة ملاحظات مجمّعة. الدعم ١٤ يوم لتصحيح أخطاء التنفيذ، والرد خلال يومَي عمل. المحتوى الجديد والوظائف الإضافية تُسعّر بشكل منفصل.",
  ],
  [
    "الدومين والاستضافة يبقن باسمي؟",
    "إي، الحسابات تنفتح باسمك وبإيميلك وتبقى ملكك، وإنت تدفع تكاليفها وتجديدها. آخذ صلاحية للعمل حسب الحاجة وأساعدك بالإعداد والربط. بعد استلام كامل المبلغ، تستلم ملفات المشروع والصلاحيات المتفق عليها.",
  ],
  [
    "ما عندي موقع بعد، أگدر أبدأ؟",
    "أكيد. نبدأ بهدف الموقع والخدمة اللي تريد تعرضها، وبعدها تحدد المحتوى والصور المتوفرة عندك. تگدر تراسلني بدون رابط، ونحدد سويّة شنو تحتاج قبل أي دفعة.",
  ],
  [
    "هل الموقع يضمن مبيعات أكثر؟",
    "نشتغل على وضوح العرض، تجربة الموبايل وسهولة التواصل. النتيجة تعتمد هم على الإعلان، الجمهور، السعر والمتابعة. ما أوعدك بعدد مبيعات أو درجة سرعة قبل القياس؛ نحدد شنو نقيس حتى نعرف وين نتحسن.",
  ],
];

type Intent = "project" | "audit";
// Connect this event to an analytics provider before using it for campaign reports.
// Never include the message, URL, sector or other visitor-entered values.
function track(event: string, source: string) {
  window.dispatchEvent(
    new CustomEvent("codewithali:conversion", { detail: { event, source } }),
  );
}

export default function Home() {
  const [intent, setIntent] = useState<Intent>("project");
  const [service, setService] = useState("ما محدد بعد، أحتاج مساعدتك أختار");
  const [sector, setSector] = useState("");
  const [website, setWebsite] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const book = useRef<HTMLElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  const message = [
    "السلام عليكم علي،",
    intent === "audit"
      ? "أريد تدقيق موقعي المجاني: وضوح العرض، تجربة الموبايل وسهولة التواصل."
      : `أريد: ${service}`,
    sector && `مجال شغلي: ${sector}`,
    website.trim() && `رابط موقعي: ${website.trim()}`,
    details.trim() && `عن المشروع: ${details.trim()}`,
    intent === "audit"
      ? "شنو أهم شي يحتاج تحسين؟"
      : "ممكن نحدد نطاق العمل والسعر وموعد التسليم؟",
  ]
    .filter(Boolean)
    .join("\n");

  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      const heroBottom = hero.current?.getBoundingClientRect().bottom ?? 0;
      const bookTop = book.current?.getBoundingClientRect().top ?? Infinity;
      setShowSticky(heroBottom < 0 && bookTop > window.innerHeight);
    });
    if (hero.current) observer.observe(hero.current);
    if (book.current) observer.observe(book.current);
    return () => observer.disconnect();
  }, []);

  function chooseIntent(next: Intent, source: string) {
    setIntent(next);
    setError("");
    track("enquiry_start", source);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = website.trim();
    if (intent === "audit" && !raw) {
      setError(
        "أضف رابط موقعك حتى أگدر أراجعه، أو اختَر «مشروع جديد» إذا بعد ما عندك موقع.",
      );
      urlInput.current?.focus();
      return;
    }
    if (raw) {
      try {
        const parsed = new URL(
          /^https?:\/\//i.test(raw) ? raw : `https://${raw}`,
        );
        if (
          !["http:", "https:"].includes(parsed.protocol) ||
          !parsed.hostname.includes(".") ||
          /\s/.test(raw) ||
          parsed.username ||
          parsed.password
        )
          throw new Error("invalid");
      } catch {
        setError(
          "اكتب رابط موقع صحيح، مثل example.com أو https://example.com.",
        );
        urlInput.current?.focus();
        return;
      }
    }
    setError("");
    track("whatsapp_click", intent);
    window.location.assign(whatsapp(message));
  }

  return (
    <>
      <a className="skip-link" href="#main">
        تخطَّ إلى المحتوى
      </a>
      <nav className="site-nav wrap" aria-label="التنقل الرئيسي">
        <a className="wordmark" href="#main" aria-label="CodeWithAli، الرئيسية">
          <span className="brand-symbol">
            <Code2 size={22} />
          </span>
          <b dir="ltr">
            CodeWithAli<span>.</span>
          </b>
        </a>
        <div className="nav-links">
          <a href="#work">جرّب الفكرة</a>
          <a href="#services">الخدمات</a>
          <a href="#faq">أسئلتك</a>
        </div>
        <a
          className="nav-contact"
          href="#book"
          onClick={() => chooseIntent("project", "navigation")}
        >
          نحچي عن مشروعك <ArrowUpLeft size={17} />
        </a>
      </nav>
      <main id="main" tabIndex={-1}>
        <SectionMotion />
        <header className="hero wrap" ref={hero}>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> تصميم وتطوير مواقع لأصحاب المشاريع
            </p>
            <h1>
              موقع يوضّح شغلك.
              <br />
              <span>ويسهّل التواصل وياك.</span>
            </h1>
            <p className="hero-description">
              أنا علي، مهندس برمجيات. أبني موقع يوضّح عرضك ويسهّل على الزبون
              يتواصل وياك.
            </p>
            <div className="hero-actions">
              <a
                className="btn"
                href="#book"
                onClick={() => chooseIntent("project", "hero")}
              >
                نحچي عن مشروعك <ArrowLeft size={19} />
              </a>
              <a className="text-link" href="#work">
                جرّب المثال <ArrowLeft size={16} />
              </a>
            </div>
            <p className="quiet hero-reassurance">
              <ShieldCheck size={16} /> نحدد المطلوب والسعر قبل أي دفعة.
            </p>
          </div>
          <HeroJourney />
        </header>

        <div className="audience-bar">
          <div className="wrap">
            <span>مصمّم على شغلك</span>
            <b>عيادات</b>
            <b>متاجر</b>
            <b>عقارات</b>
            <b>شركات</b>
            <span className="audience-end">
              <Smartphone size={17} /> الموبايل أولاً
            </span>
          </div>
        </div>

        <ConversionStory
          onChooseService={(selectedSector) => {
            setService(SERVICES[0].name);
            setSector(selectedSector);
            chooseIntent("project", "interactive_example");
          }}
        />

        <section
          id="services"
          className="section wrap"
          aria-labelledby="services-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">٠٢ / نختار اللي تحتاجه</p>
              <h2 id="services-title">شنو يحتاج مشروعك؟</h2>
            </div>
            <p>
              عرض واحد، موقع متكامل، أو إصلاح محدد.
              <br />
              نبدأ باحتياجك ونوضّح شنو يشمل الشغل.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((item, index) => (
              <article
                className={`service-card${index === 0 ? " service-featured" : ""}`}
                key={item.id}
                data-reveal={index}
              >
                <div className="service-top">
                  <item.icon size={25} strokeWidth={1.6} />
                  <span dir="ltr">0{index + 1}</span>
                </div>
                <div className="service-title">
                  <p className="service-tag">{item.tag}</p>
                  <h3>{item.name}</h3>
                </div>
                <p className="service-description">{item.description}</p>
                <p className="service-scope"><Check size={15} aria-hidden="true" />{item.items[0]}</p>
                <details className="service-details">
                  <summary aria-label={`شنو يشمل الشغل؟ ${item.name}`}>شنو يشمل الشغل؟ <Plus size={17} aria-hidden="true" /></summary>
                  <div>
                    <ul>
                      {item.items.slice(1).map((text) => (
                        <li key={text}><Check size={15} aria-hidden="true" /><span>{text}</span></li>
                      ))}
                    </ul>
                    <p className="service-boundary">{item.boundary}</p>
                  </div>
                </details>
                <a
                  href="#book"
                  className="service-link"
                  onClick={() => {
                    setService(item.name);
                    chooseIntent("project", item.id);
                  }}
                >
                  نحچي عن {index === 2 ? "الإصلاح" : "المشروع"}{" "}
                  <ArrowLeft size={17} />
                </a>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            مو متأكد شنو تختار؟{" "}
            <a
              href="#book"
              onClick={() => {
                setService("ما محدد بعد، أحتاج مساعدتك أختار");
                chooseIntent("project", "help");
              }}
            >
              احچيلي فكرتك ونحددها سويّة <ArrowLeft size={15} />
            </a>
          </p>
        </section>

        <section
          className="process-section section"
          aria-labelledby="process-title"
        >
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">٠٣ / شغل واضح من البداية</p>
                <h2 id="process-title">
                  تعرف شنو راح تستلم.
                  <br />
                  قبل ما نبدأ.
                </h2>
              </div>
              <p>
                تتواصل وياي مباشرة من أول رسالة
                <br />
                إلى مراجعة الموقع وتسليمه.
              </p>
            </div>
            <ol className="process-grid">
              <li data-reveal data-process-step>
                <span>01</span>
                <h3>نحچي ونحدد</h3>
                <p>
                  نفهم هدفك، جمهورك والمحتوى المتوفر. تستلم نطاق عمل وسعر وموعد
                  تسليم مكتوب.
                </p>
              </li>
              <li data-reveal="1" data-process-step>
                <span>02</span>
                <h3>تشوف وتراجع</h3>
                <p>
                  بعد دفعة البدء، أبني الموقع وتراجعه على رابط معاينة. نجمع
                  الملاحظات ضمن جولات التعديل المتفق عليها.
                </p>
              </li>
              <li data-reveal="2" data-process-step>
                <span>03</span>
                <h3>ننشر ونسلّم</h3>
                <p>
                  بعد المراجعة والدفعة الأخيرة، ننشر الموقع. الحسابات باسمك،
                  ودعم أخطاء التنفيذ لمدة ١٤ يوم.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="audit-section wrap"
          data-reveal
          aria-labelledby="audit-title"
        >
          <div className="audit-icon">
            <Sparkles size={28} />
          </div>
          <div>
            <p className="eyebrow">عندك موقع وتعلن عليه؟</p>
            <h2 id="audit-title">خلّيني أشوف وين تصعب الخطوة.</h2>
            <p>
              أراجع وضوح العرض، تجربة الموبايل وطريق التواصل، وأحدد لك أهم
              ملاحظات التحسين.
            </p>
          </div>
          <a
            className="btn btn-outline"
            href="#book"
            onClick={() => chooseIntent("audit", "free_review")}
          >
            اطلب تدقيق مجاني <ArrowLeft size={18} />
          </a>
        </section>

        <section
          id="faq"
          className="faq-section section wrap"
          aria-labelledby="faq-title"
        >
          <div data-reveal>
            <p className="eyebrow">٠٤ / قبل ما تسأل</p>
            <h2 id="faq-title">
              اتفاق واضح.
              <br />
              وشغل ترتاح له.
            </h2>
            <p className="quiet">تفاصيل تساعدك تقرر على راحتك.</p>
          </div>
          <div className="faq-list">
            {FAQS.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="book"
          className="booking-section section"
          ref={book}
          aria-labelledby="book-title"
        >
          <div className="wrap">
            <div className="booking-heading" data-reveal>
              <p className="eyebrow">الخطوة الجاية بسيطة</p>
              <h2 id="book-title">خلّينا نحچي عن شغلك.</h2>
              <p>اختَر اللي تحتاجه. راجع رسالتك. وكمّل على واتساب.</p>
            </div>
            <div className="booking-grid">
              <form onSubmit={submit} noValidate>
                <noscript>
                  <p className="field-hint">
                    للتواصل مباشرة:{" "}
                    <a
                      className="text-link"
                      href={whatsapp(
                        "السلام عليكم علي، أريد أحچي وياك عن موقعي.",
                      )}
                    >
                      افتح واتساب مع علي
                    </a>
                  </p>
                </noscript>
                <fieldset className="intent-switch">
                  <legend className="sr-only">نوع الاستفسار</legend>
                  {(
                    [
                      ["project", "مشروع جديد أو إصلاح"],
                      ["audit", "تدقيق مجاني لموقعي"],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="intent"
                        value={value}
                        checked={intent === value}
                        onChange={() => chooseIntent(value, "enquiry_form")}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>
                {intent === "project" && (
                  <div className="form-field">
                    <label htmlFor="service">شنو تحتاج؟</label>
                    <select
                      id="service"
                      name="service"
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                    >
                      <option>ما محدد بعد، أحتاج مساعدتك أختار</option>
                      {SERVICES.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-field">
                  <label htmlFor="website">
                    رابط موقعك{" "}
                    {intent === "audit" ? "(مطلوب للتدقيق)" : "(اختياري)"}
                  </label>
                  <input
                    ref={urlInput}
                    id="website"
                    name="website"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    dir="ltr"
                    spellCheck={false}
                    placeholder="example.com"
                    value={website}
                    maxLength={500}
                    required={intent === "audit"}
                    aria-invalid={!!error}
                    aria-describedby={error ? "website-error" : "website-hint"}
                    onChange={(event) => {
                      setWebsite(event.target.value);
                      setError("");
                    }}
                  />
                  <p id="website-hint" className="field-hint">
                    {intent === "audit"
                      ? "أرسل رابط الصفحة اللي تريد أراجعها."
                      : "ما عندك موقع؟ اتركه فارغ ونبدأ من فكرتك."}
                  </p>
                  <p id="website-error" className="field-error" role="alert">
                    {error}
                  </p>
                </div>
                <details className="extra-details">
                  <summary>
                    أضف تفاصيل عن مشروعك <span>اختياري</span>
                    <Plus size={16} />
                  </summary>
                  <div className="form-field">
                    <label htmlFor="sector">مجال شغلك</label>
                    <select
                      id="sector"
                      name="sector"
                      value={sector}
                      onChange={(event) => setSector(event.target.value)}
                    >
                      <option value="">اختَر المجال</option>
                      <option>عيادة</option>
                      <option>متجر إلكتروني</option>
                      <option>عقارات</option>
                      <option value="خدمات">شركة أو خدمات</option>
                      <option>مجال آخر</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="project-details">
                      شنو تريد الموقع يساعدك بيه؟
                    </label>
                    <textarea
                      id="project-details"
                      name="details"
                      maxLength={700}
                      rows={3}
                      placeholder="مثلاً: أعلن على خدمة وأريد أسهّل استقبال الاستفسارات."
                      value={details}
                      onChange={(event) => setDetails(event.target.value)}
                    />
                  </div>
                </details>
                <button className="btn submit-enquiry" type="submit">
                  <MessageCircle size={20} /> افتح رسالتي على واتساب{" "}
                  <ArrowUpLeft size={18} />
                </button>
                <p className="field-hint">
                  يفتح واتساب؛ تراجع الرسالة وتضغط إرسال بنفسك.
                </p>
              </form>
              <aside
                className="message-preview"
                aria-label="معاينة رسالة واتساب"
              >
                <div className="preview-heading">
                  <span className="ali-avatar">ع</span>
                  <div>
                    <b>علي · CodeWithAli</b>
                    <p>تتواصل وياي مباشرة</p>
                  </div>
                  <MessageCircle size={22} />
                </div>
                <p className="preview-label">معاينة رسالتك</p>
                <p className="message-bubble">{message}</p>
                <div className="preview-footer">
                  <ShieldCheck size={18} />
                  <p>
                    نتفق على المطلوب والتكلفة قبل أي دفعة.
                    <br />
                    تفاصيلك تبقى هنا إلى أن تختار تفتح واتساب.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#main" dir="ltr">
          CodeWithAli.
        </a>
        <p>مواقع توضّح شغلك. وتسهّل التواصل وياك.</p>
        <span>© 2026 CodeWithAli</span>
      </footer>
      <a
        className={`mobile-contact${showSticky ? " is-visible" : ""}`}
        href="#book"
        tabIndex={showSticky ? 0 : -1}
        aria-hidden={!showSticky}
        onClick={() => chooseIntent("project", "mobile_sticky")}
      >
        <MessageCircle size={19} /> نحچي عن مشروعك <ArrowLeft size={18} />
      </a>
    </>
  );
}
