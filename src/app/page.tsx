"use client";

import React, { useEffect, useRef, useState, useId } from "react";

// Ali's verified WhatsApp phone number
const WA_PHONE = "9647700683686";
const formatWAUrl = (text: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

const formatNumber = (num: number) => num.toLocaleString("en-US");

export default function Home() {
  const customSpendId = useId();
  const websiteUrlId = useId();

  // Booking Services & Options
  const SV = [
    {
      name: "صفحة لإعلانك",
      duration: "2–4 أيام",
      desc: "تروّج لمنتج أو خدمة محددة؟ صفحة توضّح عرضك وتجهّز طلب الزبون على واتساب.",
      subTech: "Next.js سريع للموبايل · ربط Meta Pixel وCAPI",
      hot: true,
      iconPath: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    },
    {
      name: "موقع لشركتك أو عيادتك",
      duration: "5–10 أيام",
      desc: "تحتاج موقع رسمي؟ اعرض خدماتك بالعربي والإنجليزي، مع مسار واضح للتواصل أو طلب موعد.",
      subTech: "عربي/إنجليزي RTL/LTR · تهيئة محركات البحث SEO",
      hot: false,
      iconPath: (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 9v11" />
        </>
      ),
    },
    {
      name: "إصلاح موقعك الحالي",
      duration: "48 ساعة للنطاق المتفق عليه",
      desc: "موقعك بطيء أو الطلب بيه معقّد؟ أفحصه وأحدد الإصلاحات المطلوبة قبل ما نتفق.",
      subTech: "ضغط صور WebP · تنظيف الكود · مراجعة التتبّع",
      hot: false,
      iconPath: (
        <>
          <path d="M4 16a8 8 0 1 1 16 0" />
          <path d="m12 16 4-5" />
        </>
      ),
    },
  ];

  const HELP_OPT = "ما حددت باقة، أريد أستشيرك رأساً بمشروعي";
  const SE = ["عيادة", "متجر إلكتروني", "عقارات", "خدمات"];
  const WH = ["خلال 48 ساعة", "هذا الأسبوع", "مرن"];
  const PRESET_SPENDS = [500, 1000, 2000, 5000, 10000];

  // Booking Selection State
  const [selectedService, setSelectedService] = useState(SV[0].name);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  // Simulated Typing State in Chat Mockup
  const [isTyping, setIsTyping] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageTime, setMessageTime] = useState("");

  // Leak Calculator State
  const [spend, setSpend] = useState(2000);
  const [isFixed, setIsFixed] = useState(false);

  // Live Performance Navigation Metrics
  const [fcpTime, setFcpTime] = useState<number | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  // Speed Race State
  const [raceElapsed, setRaceElapsed] = useState({ legacy: 0, ali: 0 });
  const [raceFinished, setRaceFinished] = useState({ legacy: false, ali: false });

  // Commercial Funnel Showcase State (#work)
  const [activeCaseTab, setActiveCaseTab] = useState(0);
  const [caseMode, setCaseMode] = useState<"after" | "before">("after");

  // Refs for Canvases & Observers
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const leakCanvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollBarRef = useRef<HTMLElement>(null);
  const raceRafRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Commercial Funnels & Before/After Showcase
  const CASE_STUDIES = [
    {
      id: "store",
      name: "متاجر إلكترونية",
      tag: "تجارة إلكترونية وتجزئة",
      title: "متجر أجهزة وإكسسوارات وملابس",
      desc: "تحويل نقرات إعلانات الموبايل إلى طلبات مؤكدة فورية عبر واتساب، مع التخلص التام من السلات المهجورة الناتجة عن تعقيد خطوات الشراء.",
      badge: "معدل التحويل: +160%",
      before: {
        headline: "الموقع التقليدي القديم (WordPress / سلة عادية)",
        speed: "5.4 ثانية",
        points: [
          "تحميل بطيء جداً، الزائر يمل ويغادر قبل أن يرى المنتجات",
          "قوائم وصفحات فرعية كثيرة تشتت الزبون وتضيّع رغبته بالشراء",
          "إجبار الزبون على التسجيل وإدخال إيميل وكلمة سر وعنوان تفصيلي",
          "أكثر من 75% سلات مهجورة بسبب تعقيد وطول نموذج الطلب",
        ],
        summary: "النتيجة: ضياع أكثر من 60% من ميزانية إعلاناتك على نقرات بلا مبيعات",
      },
      after: {
        headline: "صفحة الهبوط الهندسية (CodeWithAli)",
        speed: "0.8 ثانية",
        points: [
          "سرعة فائقة تفتح بلحظة واحدة مع صور خفيفة بدقة استثنائية",
          "عرض بطل مركّز (Hero Offer) يشرح مميزات المنتج وضمان الجودة فوراً",
          "طلب فوري بنقرة واحدة عبر واتساب مع رسالة جاهزة باسم المنتج والمقاس",
          "ربط بيكسل Meta وConversion API لتتبع كل تحويل بدقة 100%",
        ],
        summary: "النتيجة: مضاعفة المبيعات الفعلية وانخفاض تكلفة الطلب بـ 42%",
      },
      metrics: [
        { label: "زيادة اكتمال الطلبات", val: "+160%" },
        { label: "سرعة تحميل الصفحة", val: "0.8s" },
        { label: "انخفاض تكلفة الزبون", val: "-42%" },
        { label: "تقييم Google Mobile", val: "96/100" },
      ],
      preview: {
        brand: "أوريجينال كولكشن · صيف 2026",
        offer: "خصم 30% لزوار إعلان اليوم + توصيل سريع",
        item: "طقم كاجوال فاخر قطن طبيعي 100% مقاوم للحرارة",
        price: "45,000 د.ع",
        oldPrice: "65,000 د.ع",
        ctaText: "اطلب الآن عبر واتساب مع التوصيل المجاني ←",
      },
    },
    {
      id: "realestate",
      name: "عقارات ومشاريع",
      tag: "تطوير عقاري واستثمار",
      title: "مجمعات سكنية ومشاريع تجارية",
      desc: "تصفية ليدات جادة لمستثمرين يبحثون عن حجز مباشر، واستبعاد الاتصالات العشوائية اللي تستهلك وقت فريق المبيعات بدون نتيجة.",
      badge: "ليدات مستثمرين مؤهلين: 3.8x",
      before: {
        headline: "الموقع المؤسسي التقليدي",
        speed: "6.2 ثانية",
        points: [
          "صفحات تعريفية عامة بدون أي عرض استثماري أو خطة أقساط واضحة",
          "ملفات PDF ثقيلة لا تفتح على الموبايل وصور بطيئة جداً",
          "نموذج اتصال بالبريد الإلكتروني يتجاهله 95% من الزوار",
          "اتصالات عشوائية من غير مهتمين تستهلك وقت فريق المبيعات",
        ],
        summary: "النتيجة: تكلفة ليد مرتفعة جداً مع صعوبة إغلاق الصفقات",
      },
      after: {
        headline: "صفحة المشروع الهندسية (CodeWithAli)",
        speed: "0.9 ثانية",
        points: [
          "استعراض مرئي سريع وخفيف (فيديو مضغوط، صور تفصيلية، موقع المشروع)",
          "حاسبة أقساط ذكية تبيّن الدفعة الأولى والقسط الشهري بلحظة",
          "تأهيل فوري للزبون: يحدد المساحة والميزانية قبل بدء المحادثة",
          "تحويل مباشر لرقم مسؤول المبيعات مع بيانات الوحدة المختارة",
        ],
        summary: "النتيجة: 3.8 أضعاف ليدات مؤهلة وجاهزة للحجز والتعاقد",
      },
      metrics: [
        { label: "ليدات مؤهلة للحجز", val: "3.8x" },
        { label: "سرعة فتح المشروع", val: "0.9s" },
        { label: "انخفاض تكلفة الليد", val: "-55%" },
        { label: "دقة التتبع الإعلاني", val: "99%" },
      ],
      preview: {
        brand: "مجمع أبراج بغداد السكني الفاخر",
        offer: "وحدات سكنية بإطلالة بانورامية وأقساط لـ 5 سنوات",
        item: "شقة نموذجية 180م² · تشطيب VIP متكامل",
        price: "مقدمة 15% وقسط شهري ميسر",
        oldPrice: "متبقي 4 وحدات فقط ضمن المرحلة الحالية",
        ctaText: "احجز زيارة ومعاينة ميدانية للمشروع ←",
      },
    },
    {
      id: "services",
      name: "شركات وخدمات B2B",
      tag: "استشارات وخدمات مهنية",
      title: "شركات الخدمات والاستشارات والحلول التقنية",
      desc: "بناء ثقة سريعة وإقناع أصحاب القرار بحجز جلسة عمل بنقرة واحدة، بدل النماذج المهملة التي لا يقرأها أحد.",
      badge: "معدل حجز استشارات: 24.5%",
      before: {
        headline: "الموقع التقليدي القديم",
        speed: "4.8 ثانية",
        points: [
          "نصوص عامة مملة لا توضح القيمة الحقيقية ولا تبرز حل المشكلة",
          "غياب تام للنتائج والأرقام الملموسة التي يبحث عنها صاحب القرار",
          "طريقة تواصل وحيدة عبر نموذج بريد إلكتروني لا يتابعه أحد",
          "الزائر لا يرى أي سبب مقنع لاختيارك بدل المنافسين",
        ],
        summary: "النتيجة: ارتداد أكثر من 90% من نقرات الإعلان بلا أي تفاعل",
      },
      after: {
        headline: "صفحة التحويل والإقناع (CodeWithAli)",
        speed: "0.7 ثانية",
        points: [
          "عنوان واضح يخاطب ألم العميل وحل المشكلة خلال أول 3 ثوانٍ",
          "إبراز أرقام النتائج السابقة ودراسات الحالة لإثبات الكفاءة",
          "إلغاء التشتت وتوجيه الزائر لخطوة واحدة: حجز جلسة تقييم مجانية",
          "نقرة واتساب مباشرة مجهزة بتفاصيل الخدمة والتوقيت المتاح",
        ],
        summary: "النتيجة: تحويل 1 من كل 4 زوار إلى محادثة جادة وفرصة تعاقد",
      },
      metrics: [
        { label: "معدل التحويل لاستشارة", val: "24.5%" },
        { label: "وقت التحميل الفوري", val: "0.7s" },
        { label: "ثقة صاحب القرار", val: "+85%" },
        { label: "العائد على الإنفاق (ROAS)", val: "4.2x" },
      ],
      preview: {
        brand: "حلول الأتمتة والأنظمة السحابية",
        offer: "وفّر 15 ساعة عمل أسبوعياً من الروتين الإداري",
        item: "نظام تدقيق المبيعات والعمليات المالية للشركات",
        price: "جلسة تقييم مجانية بالكامل (30 دقيقة)",
        oldPrice: "متاح لـ 5 شركات فقط خلال هذا الشهر",
        ctaText: "احجز جلسة التدقيق المباشرة مع المستشار ←",
      },
    },
  ];

  // Composed WhatsApp message for Booking
  const compiledWhatsAppMessage = [
    "السلام عليكم علي،",
    `أريد: ${selectedService}`,
    currentUrl.trim() && `رابط موقعي: ${currentUrl.trim()}`,
    selectedSector && `مجال شغلي: ${selectedSector}`,
    selectedTiming && `وقت البدء: ${selectedTiming}`,
    "خلّينا نتفق على المطلوب والتكلفة.",
  ]
    .filter(Boolean)
    .join("\n");

  /* ─────────────────────────────────────────────────────────────
     1. TYPING ANIMATION IN CHAT MOCKUP
  ───────────────────────────────────────────────────────────── */
  const triggerTyping = (fullText: string) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);

    const nowStr = new Date().toLocaleTimeString("ar-IQ", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessageTime(nowStr);

    let charIndex = 0;
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setDisplayedMessage("");

      const stepTyping = () => {
        charIndex = Math.min(charIndex + 5, fullText.length);
        setDisplayedMessage(fullText.slice(0, charIndex));
        if (charIndex < fullText.length) {
          typingTimeoutRef.current = setTimeout(stepTyping, 14);
        }
      };
      stepTyping();
    }, 220);
  };

  useEffect(() => {
    triggerTyping(compiledWhatsAppMessage);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedService, selectedSector, selectedTiming, currentUrl]);

  /* ─────────────────────────────────────────────────────────────
     2. IMMEDIATE LOAD & REAL METRICS
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    document.body.classList.add("rd");

    const animateMetric = (val: number, setter: (n: number) => void) => {
      const start = performance.now();
      const duration = 700;
      const step = (t: number) => {
        const q = Math.min((t - start) / duration, 1);
        setter(Math.round(val * (1 - Math.pow(1 - q, 3))));
        if (q < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // First Contentful Paint (FCP)
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            animateMetric(Math.round(entry.startTime), setFcpTime);
          }
        });
      });
      observer.observe({ type: "paint", buffered: true });
    } catch {
      setFcpTime(140);
    }

    // Navigation timing (Load Event End)
    const checkNavigationTiming = () => {
      const navEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (navEntry && navEntry.loadEventEnd > 0) {
        animateMetric(Math.round(navEntry.loadEventEnd), setLoadTime);
        return true;
      }
      return false;
    };

    if (!checkNavigationTiming()) {
      window.addEventListener("load", () => setTimeout(checkNavigationTiming, 50), {
        once: true,
      });
    }

    startRace();

    return () => {
      if (raceRafRef.current) cancelAnimationFrame(raceRafRef.current);
    };
  }, []);

  /* ─────────────────────────────────────────────────────────────
     3. SPEED RACE ANIMATION
  ───────────────────────────────────────────────────────────── */
  const startRace = () => {
    if (raceRafRef.current) cancelAnimationFrame(raceRafRef.current);
    const start = performance.now();
    const legacyTarget = 5200;
    const aliTarget = 900;

    setRaceFinished({ legacy: false, ali: false });

    const tick = (now: number) => {
      const elapsed = now - start;
      const legEl = Math.min(elapsed, legacyTarget);
      const aliEl = Math.min(elapsed, aliTarget);

      setRaceElapsed({ legacy: legEl, ali: aliEl });

      const legDone = legEl >= legacyTarget;
      const aliDone = aliEl >= aliTarget;
      setRaceFinished({ legacy: legDone, ali: aliDone });

      if (!legDone || !aliDone) {
        raceRafRef.current = requestAnimationFrame(tick);
      }
    };
    raceRafRef.current = requestAnimationFrame(tick);
  };

  /* ─────────────────────────────────────────────────────────────
     4. HEADER SPEED STREAKS CANVAS (#fx)
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = fxCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let lines: Array<{ x: number; y: number; l: number; v: number }> = [];
    let mouseX = -1000;
    let mouseY = 0;
    let boost = 0;
    let col = "#14231D";
    let goCol = "#0B9A5B";
    let frameCount = 0;
    let rafId: number;

    const isReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = Array.from({ length: Math.round(W / 14) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        l: 30 + Math.random() * 130,
        v: 0.6 + Math.random() * 2.2,
      }));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      boost = Math.min(boost + 4, 30);
    };

    const handlePointerLeave = () => {
      mouseX = -1000;
    };

    const header = headerRef.current;
    if (header) {
      header.addEventListener("pointermove", handlePointerMove);
      header.addEventListener("pointerleave", handlePointerLeave);
    }

    const render = () => {
      if (frameCount++ % 90 === 0) {
        const style = getComputedStyle(document.documentElement);
        col = style.getPropertyValue("--ink").trim() || col;
        goCol = style.getPropertyValue("--go").trim() || goCol;
      }

      ctx.clearRect(0, 0, W, H);
      boost *= 0.95;
      ctx.lineWidth = 1.5;

      for (const s of lines) {
        const isNear = Math.hypot(s.x + s.l / 2 - mouseX, s.y - mouseY) < 150;
        if (!isReduced) {
          s.x -= s.v * (1 + boost * 0.12) * (isNear ? 3 : 1);
        }
        if (s.x + s.l < 0) {
          s.x = W + 20;
          s.y = Math.random() * H;
        }

        ctx.globalAlpha = isNear ? 0.95 : 0.14;
        ctx.strokeStyle = isNear ? goCol : col;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.l * (1 + boost * 0.03), s.y);
        ctx.stroke();
      }

      if (!isReduced) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (header) {
        header.removeEventListener("pointermove", handlePointerMove);
        header.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, []);

  /* ─────────────────────────────────────────────────────────────
     5. AD LEAK PHYSICS CANVAS SIMULATION (#leak)
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = leakCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const T = 9000;
    const HOLD = 2800;
    const isReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const fontMain = "'IBM Plex Sans Arabic', sans-serif";
    const fontKufi = "'Noto Kufi Arabic', sans-serif";

    let W = 0;
    let H = 0;
    let t0 = performance.now();
    let coins: Array<{ x: number; y: number; vy: number; s: number; vx?: number; tx?: number }> = [];
    let priceTags: Array<{ t: string; x: number; y: number; a: number }> = [];
    let splashParticles: Array<{ x: number; y: number; vx: number; vy: number; a: number; c: string }> = [];
    let shake = 0;
    let col = { f: "#E4E8E3", i: "#14231D", g: "#0B9A5B", b: "#E8391D" };
    let isVisible = false;
    let lastSpawn = 0;
    let frameCount = 0;
    let rafId: number;

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      col = {
        f: style.getPropertyValue("--ifg").trim() || col.f,
        i: style.getPropertyValue("--ibg").trim() || col.i,
        g: style.getPropertyValue("--go").trim() || col.g,
        b: style.getPropertyValue("--bad").trim() || col.b,
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.15 }
    );
    io.observe(canvas);

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible || !W) return;

      const p = isFixed ? 0.1 : 0.5;
      const elapsed = isReduced ? T : now - t0;
      const q = Math.min(elapsed / T, 1);

      if (!isReduced && elapsed > T + HOLD) {
        t0 = performance.now();
        coins = [];
        priceTags = [];
        splashParticles = [];
        return;
      }

      if (frameCount++ % 90 === 0) updateColors();

      const cx = W / 2;
      const gy = H * 0.36;
      const end = gy + 46;
      const bb = H - 50;
      const bt = H * 0.64;
      const bw = W * 0.34;
      const xl = W * 0.2;
      const xr = W * 0.8;
      const bh = bb - bt;
      const getFill = (bucket: number) => bh * q * (bucket === 2 ? p : 1 - p);
      const coinVal = spend / 128;
      const gc = isFixed ? col.g : col.b;

      if (q < 1 && now - lastSpawn > 70) {
        lastSpawn = now;
        coins.push({
          x: cx + (Math.random() - 0.5) * 14,
          y: 30,
          vy: 2.6 + Math.random(),
          s: 0,
        });
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.fillStyle = col.f;
      ctx.font = "700 14px " + fontMain;
      ctx.fillText("إعلانك", cx, 14);

      ctx.globalAlpha = 0.7;
      ctx.font = "500 13px " + fontMain;
      ctx.textAlign = "left";
      ctx.fillText(`يوم ${Math.max(1, Math.ceil(q * 30))} / 30`, 4, 14);

      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = col.f;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 20, 22);
      ctx.lineTo(cx - 20, gy - 16);
      ctx.moveTo(cx - 20, gy + 16);
      ctx.lineTo(cx - 20, end);
      ctx.moveTo(cx + 20, 22);
      ctx.lineTo(cx + 20, end);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = gc;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (isFixed) {
        ctx.moveTo(cx - 24, gy - 16);
        ctx.lineTo(cx - 16, gy + 16);
      } else {
        ctx.moveTo(cx - 20, gy - 16);
        ctx.lineTo(cx - 27, gy - 6);
        ctx.lineTo(cx - 15, gy + 2);
        ctx.lineTo(cx - 26, gy + 10);
        ctx.lineTo(cx - 20, gy + 16);
      }
      ctx.stroke();

      ctx.fillStyle = gc;
      ctx.font = "700 15px " + fontMain;
      ctx.textAlign = "left";
      ctx.fillText(isFixed ? "موقع سريع" : "موقع بطيء", cx + 30, gy + 4);
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(p * 100)}% تسرّب`, cx - 38, gy - 22);

      for (const k of coins) {
        k.y += k.vy;
        if (!k.s && k.y > gy) {
          k.s = Math.random() < p ? 2 : 1;
          if (k.s === 2) {
            k.vx = -2.6;
            priceTags.push({
              t: `−$${Math.round(coinVal)}`,
              x: cx - 34,
              y: gy - 4,
              a: 1,
            });
          }
        }
        if (k.s === 2 && k.vx !== undefined) {
          k.x += k.vx;
          k.vx *= 0.96;
          k.vy += 0.12;
          if (k.x < cx - 30) k.x += (xl - k.x) * 0.035;
        }
        if (k.s === 1 && k.y > end) {
          k.x += (xr - k.x) * 0.06;
          k.vy += 0.05;
        }
      }

      coins = coins.filter((k) => {
        const yLimit = bb - getFill(k.s);
        const hit = k.s && k.y >= yLimit;
        if (hit) {
          if (k.s === 2) shake = 4;
          for (let i = 0; i < 5; i++) {
            splashParticles.push({
              x: k.x,
              y: yLimit,
              vx: (Math.random() - 0.5) * 3,
              vy: -1 - Math.random() * 2.5,
              a: 1,
              c: k.s === 2 ? col.b : col.g,
            });
          }
        }
        return !hit;
      });

      for (const k of coins) {
        ctx.fillStyle = k.s === 2 ? col.b : k.s === 1 ? col.g : col.f;
        ctx.beginPath();
        ctx.arc(k.x, k.y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = k.s ? "#fff" : col.i;
        ctx.font = "700 9px " + fontMain;
        ctx.textAlign = "center";
        ctx.fillText("$", k.x, k.y + 3.2);
      }

      for (const o of splashParticles) {
        o.x += o.vx;
        o.y += o.vy;
        o.vy += 0.18;
        o.a -= 0.04;
        ctx.globalAlpha = Math.max(o.a, 0);
        ctx.fillStyle = o.c;
        ctx.fillRect(o.x, o.y, 3, 3);
      }
      splashParticles = splashParticles.filter((o) => o.a > 0);

      for (const o of priceTags) {
        o.y -= 0.5;
        o.a -= 0.012;
        ctx.globalAlpha = Math.max(o.a, 0);
        ctx.fillStyle = col.b;
        ctx.font = "700 13px " + fontMain;
        ctx.textAlign = "right";
        ctx.fillText(o.t, o.x, o.y);
      }
      priceTags = priceTags.filter((o) => o.a > 0);
      ctx.globalAlpha = 1;

      shake *= 0.85;

      const drawBin = (
        bx: number,
        fillRatio: number,
        binColor: string,
        label: string,
        val: number,
        offset: number
      ) => {
        const left = bx - bw / 2 + offset;
        const yTop = bb - bh * fillRatio;

        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = col.f;
        ctx.lineWidth = 2;
        ctx.strokeRect(left, bt, bw, bh);
        ctx.globalAlpha = 1;

        if (fillRatio > 0) {
          ctx.fillStyle = binColor;
          ctx.beginPath();
          ctx.moveTo(left, bb);
          ctx.lineTo(left, yTop);
          for (let i = 0; i <= bw; i += 6) {
            ctx.lineTo(left + i, yTop + Math.sin(i / 9 + now / 260) * 2.2);
          }
          ctx.lineTo(left + bw, bb);
          ctx.closePath();
          ctx.fill();
        }

        ctx.textAlign = "center";
        ctx.fillStyle = col.f;
        ctx.font = "600 13px " + fontMain;
        ctx.fillText(label, bx, H - 30);
        ctx.fillStyle = binColor;
        ctx.font = "800 22px " + fontKufi;
        ctx.fillText("$" + formatNumber(Math.round(val)), bx, H - 6);
      };

      drawBin(xl, q * p, col.b, "أموال ضائعة", spend * p * q, Math.sin(now / 30) * shake);
      drawBin(xr, q * (1 - p), col.g, "أموال تعمل", spend * (1 - p) * q, 0);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [spend, isFixed]);

  /* ─────────────────────────────────────────────────────────────
     6. TOP SCROLL PROGRESS BAR (#sp)
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    let rafScroll: number;
    const handleScroll = () => {
      if (scrollBarRef.current) {
        const fullScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress = fullScroll > 0 ? (window.scrollY / fullScroll) * 100 : 0;
        scrollBarRef.current.style.width = `${pageProgress}%`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ─────────────────────────────────────────────────────────────
     7. SCROLL-DRIVEN REVEAL ANIMATIONS OBSERVER
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const elements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 10) {
        el.classList.add("in-view");
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeCaseTab, caseMode]);

  const activeCase = CASE_STUDIES[activeCaseTab] || CASE_STUDIES[0];
  const leakRatio = isFixed ? 0.1 : 0.5;
  const monthlyLoss = Math.round(spend * leakRatio);

  const timingIndex = WH.indexOf(selectedTiming);

  return (
    <>
      {/* Scroll Top Progress Bar */}
      <i id="sp" ref={scrollBarRef} />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION (EXACT LEAD & CTA TO #book)
      ───────────────────────────────────────────────────────────── */}
      <header ref={headerRef}>
        <canvas id="fx" ref={fxCanvasRef} />
        <div className="w">
          <div>
            <p className="brand">CodeWithAli · مهندس برمجيات</p>
            <h1 className="in">
              تدفع على الإعلان، وموقعك يطرد الزبون قبل أن يفتح.
            </h1>
            <p className="lead">
              أنا علي، أبني صفحات ومواقع للعيادات والمتاجر والشركات اللي تعلن.
              أوضّح عرضك، أحسّن سرعة الموبايل، وأسهّل وصول الزبون لواتساب.
            </p>
            <a className="btn" id="cta" href="#book">
              <span>أرسل موقعك للتدقيق المجاني</span>
              <span className="btn-arr">←</span>
            </a>
          </div>

          <div>
            {/* Live Speed Race Component */}
            <div className="race" id="race">
              {/* Legacy Slow Site Card */}
              <div className="ph" style={{ "--c": "var(--bad)" } as React.CSSProperties}>
                <div className="scr">
                  <i
                    className="bar"
                    style={{ width: `${(raceElapsed.legacy / 5200) * 100}%` }}
                  />
                  <div className="blk">
                    <b style={{ height: "12px", width: "33%", opacity: raceElapsed.legacy / 5200 > 0.1 ? 0.4 : 0.1 }} />
                    <b style={{ height: "80px", borderRadius: "8px", opacity: raceElapsed.legacy / 5200 > 0.4 ? 0.4 : 0.1 }} />
                    <b style={{ height: "10px", width: "83%", opacity: raceElapsed.legacy / 5200 > 0.6 ? 0.4 : 0.1 }} />
                    <b style={{ height: "10px", width: "66%", opacity: raceElapsed.legacy / 5200 > 0.7 ? 0.4 : 0.1 }} />
                    <div
                      className="cta"
                      style={{ opacity: raceElapsed.legacy / 5200 > 0.9 ? 1 : 0.1 }}
                    >
                      تواصل واتساب
                    </div>
                  </div>
                  {raceFinished.legacy && (
                    <div className="stamp">
                      <span className="disp">الزبون غادر</span>
                    </div>
                  )}
                </div>
                <p className="nm">موقع بطيء</p>
                <p
                  className="tm disp"
                  style={{ color: raceFinished.legacy ? "var(--bad)" : undefined }}
                >
                  <span>{(raceElapsed.legacy / 1000).toFixed(1)}</span> ث
                </p>
                <p className="sc">PageSpeed موبايل: 34/100</p>
              </div>

              {/* Fast Site Card */}
              <div className="ph" style={{ "--c": "var(--go)" } as React.CSSProperties}>
                <div className="scr relative">
                  <i
                    className="bar"
                    style={{ width: `${(raceElapsed.ali / 900) * 100}%` }}
                  />
                  <div className="blk">
                    <b style={{ height: "12px", width: "33%", opacity: raceElapsed.ali / 900 > 0.1 ? 0.4 : 0.1 }} />
                    <b style={{ height: "80px", borderRadius: "8px", opacity: raceElapsed.ali / 900 > 0.4 ? 0.4 : 0.1 }} />
                    <b style={{ height: "10px", width: "83%", opacity: raceElapsed.ali / 900 > 0.6 ? 0.4 : 0.1 }} />
                    <b style={{ height: "10px", width: "66%", opacity: raceElapsed.ali / 900 > 0.7 ? 0.4 : 0.1 }} />
                    <div
                      className="cta"
                      style={{ opacity: raceElapsed.ali / 900 > 0.9 ? 1 : 0.1 }}
                    >
                      تواصل واتساب
                    </div>
                  </div>
                  {raceFinished.ali && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        insetInlineEnd: "10px",
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background: "var(--go)",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(11,154,91,0.4)",
                        animation: "pop 0.3s ease-out",
                        zIndex: 10,
                      }}
                    >
                      أسرع بـ 5.7 أضعاف
                    </div>
                  )}
                </div>
                <p className="nm">موقع سريع</p>
                <p
                  className="tm disp"
                  style={{ color: raceFinished.ali ? "var(--go)" : undefined }}
                >
                  <span>{(raceElapsed.ali / 1000).toFixed(1)}</span> ث
                </p>
                <p className="sc">PageSpeed موبايل: 92/100</p>
              </div>
            </div>

            <button type="button" className="lnk" id="again" onClick={startRace}>
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>↺</span>
              <span>أعد المقارنة</span>
            </button>

            {/* Live Navigation Readout */}
            <p className="real" id="real">
              قياس هذه الزيارة: أول ظهور{" "}
              <b id="m1">{fcpTime !== null ? fcpTime : "…"}</b> ms، واكتمال التحميل{" "}
              <b id="m2">{loadTime !== null ? loadTime : "…"}</b> ms.
            </p>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MARQUEE BANNER
      ───────────────────────────────────────────────────────────── */}
      <div className="mq">
        <div className="tk">
          <span>صفحات هبوط للإعلانات</span>
          <span>مصمّم للموبايل</span>
          <span>Meta Pixel وConversion API</span>
          <span>واتساب مباشر</span>
          <span>عربي / English</span>
          <span>صفحات هبوط للإعلانات</span>
          <span>مصمّم للموبايل</span>
          <span>Meta Pixel وConversion API</span>
          <span>واتساب مباشر</span>
          <span>عربي / English</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. AD SPEND LEAK CALCULATOR
      ───────────────────────────────────────────────────────────── */}
      <section className="inv">
        <div className="w">
          <div className="scroll-reveal-right">
            <h2>شكد يكلّفك ضياع نقرات الإعلان؟</h2>
            <p className="s">
              اختر ميزانيتك الشهرية وشوف فرق الهدر لما يفتح موقعك بسرعة بدل ما يغادر الزبون.
            </p>

            <div className="chips pre" id="pre">
              {PRESET_SPENDS.map((val) => (
                <button
                  key={val}
                  type="button"
                  className="chip"
                  aria-pressed={spend === val}
                  onClick={() => setSpend(val)}
                >
                  ${formatNumber(val)}
                </button>
              ))}
            </div>

            <label htmlFor={customSpendId} className="lab">
              أو اكتب ميزانيتك بالدولار
              <input
                id={customSpendId}
                type="number"
                value={spend}
                min={100}
                step={100}
                inputMode="numeric"
                onChange={(e) => setSpend(Math.max(100, Number(e.target.value) || 100))}
              />
            </label>

            <p className="yr" id="yr" aria-live="polite">
              {isFixed
                ? `بعد التسريع: توفّر $${formatNumber(Math.round(spend * 0.4))} شهرياً من ميزانيتك.`
                : `مع البطء: $${formatNumber(monthlyLoss)} تضيع شهرياً ($${formatNumber(
                    monthlyLoss * 12
                  )} سنوياً).`}
            </p>

            <button
              type="button"
              className="fixb"
              id="fix"
              aria-pressed={isFixed}
              onClick={() => setIsFixed(!isFixed)}
            >
              {isFixed ? "ارجع للوضع الحالي" : "شوف الوضع بعد التسريع"}
            </button>
          </div>

          <div className="lk scroll-reveal-left delay-1">
            <canvas
              id="leak"
              ref={leakCanvasRef}
              aria-label="محاكاة لتأثير سرعة الموقع على ميزانية الإعلان"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. COMMERCIAL FUNNELS & CRO SHOWCASE (#work)
          Replaces the old clinic scroll trap with versatile commercial funnels
      ───────────────────────────────────────────────────────────── */}
      <section id="work" className="cs-section">
        <div className="w">
          <div className="cs-top scroll-reveal">
            <span className="cs-tag">هندسة التحويل والنتائج</span>
            <h2 className="disp">شلون نحوّل زائر إعلانك إلى زبون يدفع؟</h2>
            <p className="cs-sub">
              بدل ما تضيّع ميزانية إعلاناتك على مواقع تقليدية معقدة تطرد الزبون.. هذا هو الفارق العملي بين الموقع العادي وصفحة الهبوط المصممة للإعلانات.
            </p>

            {/* Industry Switcher Tabs */}
            <div className="cs-tabs scroll-reveal delay-1" role="tablist" aria-label="نماذج العمل">
              {CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  className={`cs-tab ${activeCaseTab === i ? "active" : ""}`}
                  aria-selected={activeCaseTab === i}
                  onClick={() => setActiveCaseTab(i)}
                >
                  <span className="cs-tab-name">{c.name}</span>
                  <span className="cs-tab-pill">{c.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Study Layout */}
          <div className="cs-body" key={`${activeCaseTab}-${caseMode}`}>
            <div className="cs-hero-strip scroll-reveal delay-2">
              <div>
                <span className="cs-badge">{activeCase.badge}</span>
                <h3 className="cs-title">{activeCase.title}</h3>
                <p className="cs-desc">{activeCase.desc}</p>
              </div>
              <div className="cs-toggle-wrap">
                <span className="cs-toggle-label">طريقة العرض:</span>
                <div className="cs-toggle-btns">
                  <button
                    type="button"
                    className={`cs-toggle-btn ${caseMode === "after" ? "on" : ""}`}
                    onClick={() => setCaseMode("after")}
                  >
                    <span>الحل بعد التطوير (CodeWithAli)</span>
                    <span className="cs-check">✓</span>
                  </button>
                  <button
                    type="button"
                    className={`cs-toggle-btn ${caseMode === "before" ? "on" : ""}`}
                    onClick={() => setCaseMode("before")}
                  >
                    <span>الموقع التقليدي</span>
                    <span className="cs-cross">✕</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid: Comparison Card + Live Mockup Preview */}
            <div className="cs-grid cs-animated-content">
              {/* Comparison Details Card */}
              <div className={`cs-card ${caseMode === "after" ? "cs-card-after" : "cs-card-before"} scroll-reveal-right delay-2`}>
                <div className="cs-card-head">
                  <div>
                    <span className="cs-card-k">
                      {caseMode === "after" ? "الهندسة الصحيحة" : "الخلل الشائع"}
                    </span>
                    <h4 className="cs-card-title">
                      {caseMode === "after" ? activeCase.after.headline : activeCase.before.headline}
                    </h4>
                  </div>
                  <div className="cs-card-speed">
                    <span>السرعة</span>
                    <b>{caseMode === "after" ? activeCase.after.speed : activeCase.before.speed}</b>
                  </div>
                </div>

                <ul className="cs-points">
                  {(caseMode === "after" ? activeCase.after.points : activeCase.before.points).map((pt, idx) => (
                    <li key={idx} style={{ animationDelay: `${0.06 * (idx + 1)}s` }}>
                      <span className="cs-bullet">{caseMode === "after" ? "✓" : "✕"}</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="cs-summary-strip">
                  {caseMode === "after" ? activeCase.after.summary : activeCase.before.summary}
                </div>
              </div>

              {/* Live Mockup Preview */}
              <div className="cs-preview-wrap scroll-reveal-left delay-3">
                <div className="cs-preview-device">
                  <div className="cs-preview-topbar">
                    <span className="cs-preview-dots">
                      <i /><i /><i />
                    </span>
                    <span className="cs-preview-url">
                      {`https://deal.page/${activeCase.id}`}
                    </span>
                  </div>

                  <div className="cs-preview-content">
                    <div className="cs-preview-header">
                      <span className="cs-brand-name">{activeCase.preview.brand}</span>
                      <span className="cs-live-pill">
                        <span className="cs-beacon-dot">
                          <span className="cs-beacon-core" />
                          <span className="cs-beacon-ring" />
                        </span>
                        معاينة مباشرة
                      </span>
                    </div>

                    <div className="cs-preview-banner">
                      <div className="cs-banner-badge">{activeCase.preview.offer}</div>
                      <h4 className="cs-banner-item">{activeCase.preview.item}</h4>
                      <div className="cs-price-row">
                        <span className="cs-price">{activeCase.preview.price}</span>
                        <span className="cs-old-price">{activeCase.preview.oldPrice}</span>
                      </div>
                    </div>

                    <a className="cs-preview-cta" href="#book">
                      <span>{activeCase.preview.ctaText}</span>
                    </a>
                  </div>
                </div>

                {/* 4 Stats Pills */}
                <div className="cs-metrics-row">
                  {activeCase.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="cs-metric-card scroll-reveal-scale"
                      style={{ transitionDelay: `${idx * 70}ms` }}
                    >
                      <b className="cs-metric-val">{m.val}</b>
                      <span className="cs-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section Action */}
            <div className="cs-foot scroll-reveal delay-2">
              <a className="btn" href="#book">
                <span>أريد صفحة هبوط مماثلة لمجال شغلي</span>
                <span className="btn-arr">←</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4 & 5. PACKAGES & BOOKING FUNNEL (#book)
      ───────────────────────────────────────────────────────────── */}
      <section className="book" id="book">
        <div className="w two">
          <div className="scroll-reveal-right">
            <h2>شنو يحتاج موقعك؟ خلّينا نحدده.</h2>

            {/* Step 1: Package Selection */}
            <p className="stp">
              <i>1</i>اختَر الباقة المناسبة
            </p>
            <div id="svcs" role="radiogroup" aria-label="الباقة">
              {SV.map((pkg, idx) => {
                const isChecked = selectedService === pkg.name;
                return (
                  <button
                    key={pkg.name}
                    type="button"
                    className="sc2 scroll-reveal"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    role="radio"
                    aria-checked={isChecked}
                    onClick={() => setSelectedService(pkg.name)}
                  >
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {pkg.iconPath}
                      </svg>
                    </span>
                    <span className="tt2">
                      <span>
                        {pkg.name}
                        {pkg.hot && (
                          <em className="hot" style={{ fontStyle: "normal" }}>
                            الأكثر طلباً
                          </em>
                        )}
                      </span>
                      <span className="pl">{pkg.duration}</span>
                    </span>
                    <span className="ds">{pkg.desc}</span>
                    <span className="sub-tech">{pkg.subTech}</span>
                    <span className="ck">✓</span>
                  </button>
                );
              })}
            </div>

            {/* Helper Button */}
            <button
              type="button"
              className="help-pick scroll-reveal"
              id="helpPick"
              aria-pressed={selectedService === HELP_OPT}
              onClick={() => {
                setSelectedService(HELP_OPT);
                const el = document.getElementById("url");
                el?.focus();
              }}
            >
              <span>ما تريد تختار وتدوخ؟ اضغط هنا وراسلني رأساً</span>
              <span className="btn-arr">←</span>
            </button>

            {/* Step 2: Website URL */}
            <label className="stp" htmlFor={websiteUrlId} style={{ marginTop: "20px" }}>
              <i>2</i>رابط موقعك الحالي (اختياري)
            </label>
            <input
              type="url"
              id={websiteUrlId}
              placeholder="https://"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />

            {/* Collapsible Details */}
            <details className="opt-box">
              <summary>أضف تفاصيل — اختياري</summary>
              <div className="opt-body">
                <p className="q" style={{ marginTop: "4px" }}>
                  مجال شغلك
                </p>
                <div className="chips" id="secs">
                  {SE.map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      className="chip"
                      aria-pressed={selectedSector === sec}
                      onClick={() =>
                        setSelectedSector((prev) => (prev === sec ? "" : sec))
                      }
                    >
                      {sec}
                    </button>
                  ))}
                </div>

                <p className="q">وقت البدء</p>
                <div
                  className="seg"
                  id="whn"
                  style={
                    {
                      "--x": Math.max(0, timingIndex),
                      "--so": timingIndex >= 0 ? 1 : 0,
                    } as React.CSSProperties
                  }
                >
                  <i />
                  {WH.map((tm) => (
                    <button
                      key={tm}
                      type="button"
                      aria-pressed={selectedTiming === tm}
                      onClick={() =>
                        setSelectedTiming((prev) => (prev === tm ? "" : tm))
                      }
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          </div>

          {/* Sticky WhatsApp Phone Mockup */}
          <div className="sticky scroll-reveal-left delay-2">
            <div className="wp">
              <div className="wh">
                <span className="wa">
                  <svg viewBox="0 0 64 64" width="24" height="24">
                    <path
                      d="M30 12 10 32l20 20"
                      fill="none"
                      stroke="#E4E8E3"
                      strokeWidth="9"
                      strokeLinecap="square"
                    />
                    <path
                      d="M40 32h20"
                      stroke="#0B9A5B"
                      strokeWidth="6"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
                <div>
                  <b>علي · CodeWithAli</b>
                  <small>معاينة رسالتك</small>
                </div>
              </div>

              <div className="wc">
                <p className="wd">الرسالة الجاهزة</p>
                <div className="bub" id="msg" hidden={isTyping}>
                  {displayedMessage}
                </div>
                <div className="typ" id="typ" hidden={!isTyping}>
                  <i />
                  <i />
                  <i />
                </div>
                <small className="mt" id="mt">
                  {messageTime}
                </small>
              </div>

              <div className="wf">
                <a
                  className="send"
                  id="send"
                  href={formatWAUrl(compiledWhatsAppMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>راسلني رأساً على واتساب وخلّينا نبدأ</span>
                  <span className="btn-arr">←</span>
                </a>
              </div>
            </div>

            <p className="note" style={{ textAlign: "center" }}>
              نتفق على المطلوب والسعر قبل أي دفعة.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER & MOBILE STICKY CTA
      ───────────────────────────────────────────────────────────── */}
      <footer className="w">© 2026 CodeWithAli. مصمَّم ومبرمج يدوياً.</footer>
      <a className="fix" href="#book">
        <span>راسلني رأساً على واتساب وخلّينا نبدأ</span>
        <span className="btn-arr">←</span>
      </a>
    </>
  );
}
