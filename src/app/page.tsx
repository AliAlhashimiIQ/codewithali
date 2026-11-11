"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Code2,
  Globe2,
  LoaderCircle,
  MessageCircle,
  Plus,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import ConversionStory from "../components/conversion-story";
import DetailsMotion from "../components/details-motion";
import HeroJourney from "../components/hero-journey";
import SectionMotion from "../components/section-motion";

const PHONE = "9647700683686";
const whatsapp = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const SERVICES = [
  {
    id: "ai-agents",
    name: "وكلاء ذكاء اصطناعي",
    tag: "استقبال ومتابعة أوضح للزبون.",
    icon: MessageCircle,
    description:
      "نبني مساعد خدمة زبائن أو موظف استقبال ذكي يجاوب على الأسئلة المتكررة، ويحوّل الطلب للموظف عند الحاجة.",
    items: [
      "دعم الزبائن واستقبال الاستفسارات آلياً",
      "جمع الاحتياج وتأهيل العملاء المحتملين",
      "مساعد لطلبات المواعيد والحجز حسب الربط",
      "تحويل المحادثة إلى موظف مع ملخّص الطلب",
    ],
    boundary:
      "نحدد مصادر المعلومات وحدود الرد والقنوات قبل التنفيذ. تأكيد الحجز يحتاج ربطاً بنظام المواعيد.",
  },
  {
    id: "automation",
    name: "أتمتة الأعمال",
    tag: "شغل متكرر أقل. متابعة أرتب.",
    icon: Zap,
    description:
      "نربط خطوات العمل حتى تنتقل المعلومات بين أدواتك، وتقل المتابعة اليدوية ونسخ البيانات.",
    items: [
      "أتمتة خطوات العمل المتكررة",
      "تذكير بالمواعيد ومتابعة الزبائن",
      "ربط نظام إدارة العملاء (CRM)",
      "ربط أدوات العمل ونقل البيانات بينها",
    ],
    boundary:
      "الربط يعتمد على إمكانيات أدواتك والصلاحيات المتوفرة. نوضح الاشتراكات المطلوبة قبل الاتفاق.",
  },
  {
    id: "business-systems",
    name: "أنظمة أعمال مخصصة",
    tag: "معلوماتك وطلباتك بمكان واحد.",
    icon: Code2,
    description:
      "نبني نظام يناسب طريقة شغلك، حتى تدير الحجوزات والعملاء وتعرف حالة الطلبات بدون ملفات متفرقة.",
    items: [
      "إدارة الحجوزات والمواعيد",
      "لوحات متابعة وتقارير للأعمال",
      "أدوات لإدارة العملاء وسجل المتابعة",
      "تطبيقات ويب داخلية وصلاحيات للفريق",
    ],
    boundary:
      "نحدد الوظائف والصلاحيات وترحيل البيانات ضمن النطاق. نبدأ بالأولوية ونوسّع النظام حسب الحاجة.",
  },
  {
    id: "websites",
    name: "مواقع وصفحات هبوط",
    tag: "واجهة تخدم نظام شغلك.",
    icon: Globe2,
    description:
      "نكمّل منظومة عملك بموقع يوضّح خدماتك، ويحوّل اهتمام الزبون إلى استفسار أو طلب حجز واضح.",
    items: [
      "صفحات هبوط تركّز على طلب الخدمة",
      "مواقع للشركات والعيادات والمتاجر",
      "تحسين الأداء وتجربة الموبايل",
      "صفحات لجمع الاستفسارات وطلبات الحجز",
    ],
    boundary:
      "نحدد الصفحات والمحتوى والربط ضمن الاتفاق. نظام الحجز والدفع الإلكتروني إلهم نطاق مستقل.",
  },
] as const;
const FAQS = [
  [
    "شلون أعرف شنو يحتاج شغلي؟",
    "نبدأ بالمشكلة: أسئلة تتكرر، مواعيد تحتاج متابعة، أو معلومات موزّعة بين ملفات. نراجع خطواتك الحالية ونحدد إذا تحتاج أتمتة بسيطة، مساعد ذكاء اصطناعي أو نظام مخصص. مو كل مشكلة تحتاج AI، وتگدر تبدأ بدون موقع.",
  ],
  [
    "شكد التكلفة؟ وأكو اشتراكات شهرية؟",
    "التكلفة تعتمد على الوظائف والربط وحجم الاستخدام. نثبت النطاق والسعر والعملة ومراحل الدفع والتسليم كتابةً قبل البدء. رسوم خدمات الذكاء الاصطناعي والرسائل والاستضافة والبرامج الخارجية تُحسب منفصلة؛ نوضحها حسب الحل المختار قبل الاشتراك.",
  ],
  [
    "هل الذكاء الاصطناعي يحل محل الموظف؟",
    "نصممه للمهام المحددة والرد من معلومات معتمدة، مع تحويل الحالات غير الواضحة للموظف. ممكن يخطئ، لذلك نختبر الردود ونحدد شنو يحتاج مراجعة بشرية. في العيادات يكون الاستقبال للمواعيد والمعلومات الإدارية، مو للتشخيص أو النصائح الطبية.",
  ],
  [
    "تگدرون تربطون الأدوات اللي أستخدمها؟",
    "نراجع برنامج الحجوزات أو إدارة العملاء وأدواتك الحالية قبل ما نوعد بالربط. التنفيذ يعتمد على واجهات الربط والصلاحيات وشروط مزوّد الخدمة. إذا الربط غير متاح، نوضح البدائل وحدودها قبل الاتفاق.",
  ],
  [
    "من يملك الحسابات؟ وشلون تنحفظ البيانات؟",
    "الحسابات تنفتح باسمك، وصلاحيات العمل تكون حسب الحاجة. نتفق على البيانات المطلوبة، مكان تخزينها والخدمات اللي تمر بيها، وصلاحيات الفريق قبل الربط. بعد إكمال الدفع تستلم ملفات المشروع والصلاحيات المتفق عليها. لا ترسل بيانات زبائن أو مرضى ضمن الاستفسار الأول.",
  ],
  [
    "شلون نختبر الحل؟ وأكو دعم بعده؟",
    "نجرب حالات عمل متفق عليها، بما فيها نقص المعلومات والتحويل للموظف، قبل التشغيل. نحدد مقياس يناسب المشكلة، مثل وقت معالجة الطلب أو عدد خطواته اليدوية، بدون وعد بنسبة توفير أو زيادة مبيعات. جولات المراجعة والدعم والصيانة وتكاليفها تتحدد بالعرض.",
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
  const [opening, setOpening] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const book = useRef<HTMLElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  const lines = (
    [
      ["greeting", "السلام عليكم علي،"],
      [
        "request",
        intent === "audit"
          ? "أريد تدقيق موقعي المجاني: استقبال الاستفسارات ووضوح طلب الخدمة أو الحجز."
          : `أريد: ${service}`,
      ],
      ["sector", sector && `مجال شغلي: ${sector}`],
      ["website", website.trim() && `رابط موقعي: ${website.trim()}`],
      ["details", details.trim() && `عن شغلي: ${details.trim()}`],
      [
        "question",
        intent === "audit"
          ? "وين تتعطل خطوة الاستفسار، وشنو يحتاج تحسين؟"
          : "ممكن نناقش خطوات العمل الحالية ونحدد الحل المناسب ونطاقه وتكلفته؟",
      ],
    ] as const
  ).filter(([, text]) => text);
  const message = lines.map(([, text]) => text).join("\n");
  // Only lines that differ from the previous render are highlighted in the preview,
  // so the first render stays still and one edit flashes one line.
  const lineKeys = lines.map(([id, text]) => `${id}:${text}`);
  const [preview, setPreview] = useState({ keys: lineKeys, fresh: [] as string[] });
  if (preview.keys.join("\n") !== lineKeys.join("\n"))
    setPreview({
      keys: lineKeys,
      fresh: lineKeys.filter((key) => !preview.keys.includes(key)),
    });

  useEffect(() => {
    // Returning from WhatsApp (including the back/forward cache) restores the button.
    const restore = () => setOpening(false);
    window.addEventListener("pageshow", restore);
    const observer = new IntersectionObserver(() => {
      const heroBottom = hero.current?.getBoundingClientRect().bottom ?? 0;
      const bookTop = book.current?.getBoundingClientRect().top ?? Infinity;
      setShowSticky(heroBottom < 0 && bookTop > window.innerHeight);
    });
    if (hero.current) observer.observe(hero.current);
    if (book.current) observer.observe(book.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  function chooseIntent(next: Intent, source: string) {
    setIntent(next);
    setError("");
    track("enquiry_start", source);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (opening) return;
    const raw = website.trim();
    if (intent === "audit" && !raw) {
      setError(
        "أضف رابط موقعك حتى أگدر أراجعه، أو اختَر «حل لشغلي» إذا بعد ما عندك موقع.",
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
    const destination = whatsapp(message);
    // A short acknowledged state so the tap feels registered before the app switch.
    setOpening(true);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => window.location.assign(destination), calm ? 0 : 450);
    window.setTimeout(() => setOpening(false), 4000);
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
          نحچي عن شغلك <ArrowUpLeft size={17} />
        </a>
      </nav>
      <main id="main" tabIndex={-1}>
        <SectionMotion />
        <DetailsMotion />
        <header className="hero wrap" ref={hero}>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> أتمتة أعمال وذكاء اصطناعي في العراق
            </p>
            <h1>
              نبني أنظمة.
              <br />
              <span>تخلّي شغلك أذكى.</span>
            </h1>
            <p className="hero-description">
              من خدمة الزبائن بالذكاء الاصطناعي إلى أتمتة المتابعة والأنظمة المخصصة؛
              نبني حلول تقلّل الشغل المتكرر وتنظّم عملك.
            </p>
            <div className="hero-actions">
              <a
                className="btn"
                href="#book"
                onClick={() => chooseIntent("project", "hero")}
              >
                نحچي عن شغلك <ArrowLeft size={19} />
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
            <span>حلول للأعمال في العراق</span>
            <b>عيادات</b>
            <b>متاجر</b>
            <b>عقارات</b>
            <b>خدمات</b>
            <span className="audience-end">
              <Smartphone size={17} /> إدارة أسهل لشغلك
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
              <h2 id="services-title">حلول تخدم شغلك اليومي.</h2>
            </div>
            <p>
              استفسارات تتكرر؟ متابعة تاخذ وقتك؟
              <br />
              نختار الحل حسب المشكلة وأدواتك الحالية.
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
                  aria-label={`ناقش هالحل: ${item.name}`}
                  onClick={() => {
                    setService(item.name);
                    chooseIntent("project", item.id);
                  }}
                >
                  ناقش هالحل{" "}
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
              احچيلي شنو يعطّل شغلك <ArrowLeft size={15} />
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
                إلى اختبار النظام وتشغيله.
              </p>
            </div>
            <ol className="process-grid">
              <li data-reveal data-process-step>
                <span>01</span>
                <h3>نفهم طريقة شغلك</h3>
                <p>
                  نراجع الطلب من وصوله إلى متابعته، ونحدد وين يتكرر الشغل.
                  نتفق على الحل والربط والتكلفة ومقياس النجاح كتابةً.
                </p>
              </li>
              <li data-reveal="1" data-process-step>
                <span>02</span>
                <h3>نبني ونختبر</h3>
                <p>
                  نبني نسخة تگدر تجربها بحالات من شغلك. نختبر الردود، انتقال
                  البيانات والاستثناءات، ونحدد متى يتدخل الموظف.
                </p>
              </li>
              <li data-reveal="2" data-process-step>
                <span>03</span>
                <h3>نشغّل ونسلّم</h3>
                <p>
                  بعد موافقتك نشغّل الحل ونشرح استخدامه للفريق. تستلم الحسابات
                  والصلاحيات، ونتابع ضمن اتفاق الدعم والصيانة.
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
            <p className="eyebrow">موقعك يستقبل استفسارات؟</p>
            <h2 id="audit-title">نراجع بداية رحلة الزبون.</h2>
            <p>
              نراجع وضوح طلب الخدمة أو الحجز وسهولة التواصل من الموبايل.
              نحدد مشاكل الصفحة كخطوة أولى قبل ربطها بنظام المتابعة.
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
              <p>احچيلي عن الشغل اللي تريد تسهّله. نحدد الحل المناسب على واتساب.</p>
            </div>
            <div className="booking-grid">
              <form onSubmit={submit} noValidate>
                <noscript>
                  <p className="field-hint">
                    للتواصل مباشرة:{" "}
                    <a
                      className="text-link"
                      href={whatsapp(
                        "السلام عليكم علي، أريد أناقش أتمتة شغلي وتنظيم خدمة الزبائن.",
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
                      ["project", "حل لشغلي"],
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
                      : "ما عندك موقع؟ اتركه فارغ ونبدأ من احتياج شغلك."}
                  </p>
                  <p id="website-error" className="field-error" role="alert">
                    {error}
                  </p>
                </div>
                <details className="extra-details">
                  <summary>
                    أضف تفاصيل عن شغلك <span>اختياري</span>
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
                      <option>متجر</option>
                      <option>عقارات</option>
                      <option value="خدمات">شركة أو خدمات</option>
                      <option>مجال آخر</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="project-details">
                      شنو الخطوة اللي تتعبك بالشغل؟
                    </label>
                    <textarea
                      id="project-details"
                      name="details"
                      maxLength={700}
                      rows={3}
                      placeholder="مثلاً: ندير مواعيد العيادة يدوياً ونحتاج تذكير ومتابعة. بدون بيانات زبائن."
                      value={details}
                      onChange={(event) => setDetails(event.target.value)}
                    />
                  </div>
                </details>
                <button
                  className="btn submit-enquiry"
                  type="submit"
                  aria-busy={opening}
                >
                  {opening ? (
                    <>
                      <LoaderCircle className="submit-spinner" size={20} />{" "}
                      نفتح واتساب…
                    </>
                  ) : (
                    <>
                      <MessageCircle size={20} /> افتح رسالتي على واتساب{" "}
                      <ArrowUpLeft size={18} />
                    </>
                  )}
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
                <p className="message-bubble">
                  {lines.map(([id, text], index) => (
                    // Keying by text remounts a changed line, replaying its highlight.
                    <Fragment key={`${id}:${text}`}>
                      {index > 0 && "\n"}
                      <span
                        className={
                          preview.fresh.includes(`${id}:${text}`)
                            ? "message-line is-fresh"
                            : "message-line"
                        }
                      >
                        {text}
                      </span>
                    </Fragment>
                  ))}
                </p>
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
        <p>ذكاء اصطناعي وأتمتة وأنظمة تخدم شغلك.</p>
        <span>© 2026 CodeWithAli</span>
      </footer>
      <a
        className={`mobile-contact${showSticky ? " is-visible" : ""}`}
        href="#book"
        tabIndex={showSticky ? 0 : -1}
        aria-hidden={!showSticky}
        onClick={() => chooseIntent("project", "mobile_sticky")}
      >
        <MessageCircle size={19} /> نحچي عن شغلك <ArrowLeft size={18} />
      </a>
    </>
  );
}
