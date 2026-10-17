"use client";

import { useState, useId } from "react";
import {
  Zap,
  ArrowUpRight,
  Gauge,
  Globe,
  Rocket,
  MessageCircle,
  ExternalLink,
  Smartphone,
  BarChart3,
  Code2,
  Shield,
  Clock,
  CheckCircle2,
  Terminal,
  Activity,
  AlertTriangle,
  Flame,
  Layers,
  ChevronDown,
  Menu,
  X,
  Send,
  Laptop,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   PRESET DATA & CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const WHATSAPP_NUMBER = "9647700000000"; // Can be replaced by user
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

interface ServicePackage {
  id: string;
  badge: string;
  badgeType: "accent" | "neutral" | "success";
  title: string;
  subtitle: string;
  price: string;
  priceDetail: string;
  timeline: string;
  deliverables: string[];
  ctaText: string;
  popular?: boolean;
}

const PACKAGES: ServicePackage[] = [
  {
    id: "campaign",
    badge: "الأكثر طلباً للمتاجر والمسوقين",
    badgeType: "accent",
    title: "باقة الحملة الإعلانية السريعة",
    subtitle: "صفحة هبوط Next.js صاروخية مصممة خصيصاً لتحويل زوار إعلانات Meta وTikTok إلى محادثات واتساب مباشرة.",
    price: "$350",
    priceDetail: "دفعة واحدة للمشروع",
    timeline: "تسليم نهائي خلال 5 أيام عمل",
    popular: true,
    deliverables: [
      "صفحة هبوط Next.js 15 مخصصة بدون قوالب بطيئة",
      "سرعة تحميل قياسية (< 1.2 ثانية) على شبكات 4G",
      "زر واتساب ذكي يرسل تفاصيل المنتج تلقائياً للمحادثة",
      "تركيب دقيق لـ Meta Pixel + Conversions API (CAPI)",
      "تصميم متجاوب 100% يركز على تجربة مستخدمي الهواتف",
      "استضافة سحابية عالمية فائقة السرعة على Cloudflare Edge",
      "تقرير PageSpeed رسمي للموبايل يثبت نتيجة 90+",
    ],
    ctaText: "احجز باقة الحملة الإعلانية",
  },
  {
    id: "bilingual",
    badge: "للعيادات والمكاتب والشركات",
    badgeType: "neutral",
    title: "باقة الموقع ثنائي اللغة (عربي / إنجليزي)",
    subtitle: "موقع مؤسسي رفيع المستوى يعكس هيبة أعمالك ويدعم اللغتين العربية والإنجليزية بتبديل فوري دون إعادة تحميل.",
    price: "$650",
    priceDetail: "دفعة واحدة للمشروع",
    timeline: "تسليم نهائي خلال 8-10 أيام عمل",
    deliverables: [
      "موقع كامل من 5 إلى 7 صفحات بهيكلية برمجية منظمة",
      "تبديل لغة فوري مع دعم كامل للاتجاهين (RTL / LTR)",
      "نظام حجز استشارات ومواعيد مربوط مباشرة بالواتساب",
      "تهيئة SEO تقنية متقدمة مع Schema للظهور في خرائط Google",
      "لوحة مبسطة لتعديل النصوص والأسعار والصور بسهولة",
      "شهادة أمان SSL مدمجة وحماية ضد هجمات DDoS",
      "كود TypeScript نظيف وقابل للتوسع المستقبلي بسهولة",
    ],
    ctaText: "احجز باقة الموقع ثنائي اللغة",
  },
  {
    id: "speed",
    badge: "علاج فوري للمواقع الحالية",
    badgeType: "success",
    title: "جراحة تسريع الأداء لموقعك الحالي",
    subtitle: "إصلاح شامل للمواقع والمتاجر البطيئة التي تخسر زوار إعلاناتها بسبب وقت التحميل الطويل ودرجات PageSpeed الضعيفة.",
    price: "$220",
    priceDetail: "دفعة واحدة للمشروع",
    timeline: "تسليم نهائي خلال 72 ساعة",
    deliverables: [
      "فحص شامل وتشخيص دقيق لجميع معايير Core Web Vitals",
      "ضغط الصور وتحويلها لأحدث صيغ الجيل القادم (AVIF / WebP)",
      "تنظيف كود JavaScript وحذف السكربتات المسببة لتجميد الصفحة",
      "إعداد أنظمة التخزين المؤقت الذكي (Edge Caching)",
      "تقليل وقت استجابة الخادم وتصفير الـ Cumulative Layout Shift",
      "ضمان كتابي برفع النتيجة فوق 90 على تقرير الموبايل",
      "تقرير مفصل بالأرقام يوثق الحالة قبل العمل وبعده",
    ],
    ctaText: "احجز جراحة تسريع الأداء",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SCORE CIRCLE GAUGE (LIGHTHOUSE STYLE)
   ═══════════════════════════════════════════════════════════════════ */

function LighthouseScoreGauge({
  score,
  label,
  isGreen = true,
}: {
  score: number;
  label: string;
  isGreen?: boolean;
}) {
  const strokeColor = isGreen ? "#10B981" : "#EF4444";
  const bgColor = isGreen ? "#ECFDF5" : "#FEF2F2";
  const textColor = isGreen ? "text-emerald-700" : "text-red-700";
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center rounded-full p-2"
        style={{ backgroundColor: bgColor }}
      >
        <svg className="w-24 h-24 sm:w-28 sm:h-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="7"
            className={isGreen ? "text-emerald-100" : "text-red-100"}
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl sm:text-4xl font-extrabold font-mono-nums ${textColor}`}>
            {score}
          </span>
        </div>
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(600);
  const [siteSpeedTier, setSiteSpeedTier] = useState<"slow" | "very_slow">("slow");
  const adSpendId = useId();

  // Calculations for Ad Spend Waste Calculator
  // Research baseline: each second over 2s loses ~10-15% of mobile traffic
  const dropoffRate = siteSpeedTier === "very_slow" ? 0.58 : 0.42;
  const wastedDollars = Math.round(monthlyAdSpend * dropoffRate);
  const potentialSavedClicks = Math.round((monthlyAdSpend / 0.35) * dropoffRate);

  const getWhatsAppLink = (message: string) => {
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFB] text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP UTILITY STATUS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200/80 bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono-nums text-[11px] text-slate-300">
              [STATUS: متاح لمشروعين فقط لهذا الشهر في العراق والخليج]
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 font-mono-nums">
            <span>الموقع: الموصل / عن بُعد</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">ضمان سرعة 90+ على PageSpeed</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand Logo & Studio Identity */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white font-mono text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
                <Code2 className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tracking-tight text-slate-950 font-mono-nums">
                    CodeWithAli
                  </span>
                  <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200/60 font-mono">
                    STUDIO
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  هندسة واجهات فائقة الأداء
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#proof" className="hover:text-indigo-600 transition-colors">
                إثبات السرعة (Lighthouse)
              </a>
              <a href="#calculator" className="hover:text-indigo-600 transition-colors">
                حاسبة هدر الإعلانات
              </a>
              <a href="#services" className="hover:text-indigo-600 transition-colors">
                الباقات والأسعار
              </a>
              <a href="#portfolio" className="hover:text-indigo-600 transition-colors">
                أعمال حية
              </a>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={getWhatsAppLink("مرحباً علي، أريد تدقيقاً مجانياً لسرعة موقعي ورأيك في تحسين تحويلات الإعلانات.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm hover:shadow active:scale-95"
              >
                <Gauge className="h-3.5 w-3.5" />
                <span>احجز فحص سرعة مجاني</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={getWhatsAppLink("مرحباً علي، أريد فحصاً لسرعة موقعي.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
              >
                فحص مجاني
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-2">
            <a
              href="#proof"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-semibold text-slate-700 border-b border-slate-100"
            >
              إثبات السرعة بالأرقام
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-semibold text-slate-700 border-b border-slate-100"
            >
              حاسبة هدر ميزانية الإعلانات
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-semibold text-slate-700 border-b border-slate-100"
            >
              الباقات والأسعار المحددة
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-semibold text-slate-700"
            >
              المشاريع الحية
            </a>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO SECTION (ENGINEERING PRECISION & HIGH-IMPACT ARABIC COPY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80 bg-white dev-grid-pattern">
        {/* Subtle radial wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Technical Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/90 px-3.5 py-1.5 text-xs font-semibold text-indigo-900 mb-8 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono-nums tracking-wide">
                معمارية Next.js 15 • سرعة 90+ على الموبايل مضمونة
              </span>
            </div>

            {/* Direct & Pain-Centric Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.15]">
              إعلاناتك تذب فلوس على موقع بطيء؟
              <br />
              <span className="text-indigo-600 block mt-2 sm:mt-3">
                الزبون يهرب قبل ما يشوف منتجك.
              </span>
            </h1>

            {/* Crystal-Clear Subheadline */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              أكثر من 50% من زوار إعلانات إنستغرام وتيك توك يغادرون إذا استغرق الموقع أكثر من 3 ثوانٍ.
              أبني صفحات هبوط وتطبيقات <strong>Next.js</strong> فائقة السرعة تفتح بـ <strong>0.8 ثانية</strong> وتربط العميل فوراً بالواتساب.
            </p>

            {/* High-Converting CTA Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={getWhatsAppLink("مرحباً علي، شفت موقعك وأريد تدقيقاً مجانياً لسرعة موقعي الحالي لنحدد أسباب هدر زوار الإعلانات.")}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-primary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>احصل على تدقيق مجاني لموقعك الآن</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400 rotate-180" />
              </a>

              <a
                href="#proof"
                id="hero-secondary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
              >
                <Activity className="h-4 w-4 text-indigo-600" />
                <span>شاهد مقارنة الأداء الحي (98 vs 34)</span>
              </a>
            </div>

            {/* Zero-Fluff Guarantees */}
            <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>ضمان سرعة 90+ على PageSpeed أو تسترجع مالك</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>كود Next.js مصدري أصلي بدون ووردبريس ثقيل</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>ربط مباشر مع WhatsApp و Meta Pixel CAPI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE BENCHMARK PROOF (AUTHENTIC DEVTOOLS / LIGHTHOUSE COMPARISON)
      ───────────────────────────────────────────────────────────── */}
      <section id="proof" className="py-16 sm:py-24 bg-[#FAFAFB] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/70 px-3 py-1 text-xs font-bold text-slate-700 font-mono mb-3">
              <Terminal className="h-3.5 w-3.5 text-indigo-600" />
              <span>GOOGLE_PAGESPEED_BENCHMARK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              أرقام صريحة: الموقع العادي ضد كود CodeWithAli
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              هذه ليست وعوداً تسويقية. هذا ما يقرأه Google Chrome ويدفع زوار إعلاناتك للانتظار أو الهروب.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Legacy Slow Site */}
            <div className="rounded-2xl border border-red-200/80 bg-white p-6 sm:p-8 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-red-100">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                      موقع تقليدي (WordPress / قالب جاهز بدون تحسين)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    تهريب 58% من الزوار
                  </span>
                </div>

                <div className="my-8 flex justify-center">
                  <LighthouseScoreGauge score={34} label="نتيجة سرعة الموبايل" isGreen={false} />
                </div>

                {/* Metrics Table */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                    <span className="text-slate-700">أول ظهور للمحتوى (FCP):</span>
                    <span className="font-bold text-red-700 font-mono-nums">4.8s (بطيء جداً)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                    <span className="text-slate-700">اكتمال تحميل الصفحة (LCP):</span>
                    <span className="font-bold text-red-700 font-mono-nums">8.4s (إغلاق شبه مؤكد)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                    <span className="text-slate-700">وقت التجميد التقني (TBT):</span>
                    <span className="font-bold text-red-700 font-mono-nums">1,640ms</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                    <span className="text-slate-700">اهتزاز عناصر الصفحة (CLS):</span>
                    <span className="font-bold text-red-700 font-mono-nums">0.32 (تجربة مزعجة)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-red-600 font-medium">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>النتيجة: كل 100 دولار تصرفها على الإعلانات، 58 دولار تضيع هباءً.</span>
              </div>
            </div>

            {/* Right Card: CodeWithAli Next.js Performance */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-white p-6 sm:p-8 shadow-sm relative flex flex-col justify-between ring-4 ring-emerald-50">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      بناء CodeWithAli (Next.js 15 + Edge Optimization)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    تحويل فوري + تجربة فورية
                  </span>
                </div>

                <div className="my-8 flex justify-center">
                  <LighthouseScoreGauge score={98} label="نتيجة سرعة الموبايل" isGreen={true} />
                </div>

                {/* Metrics Table */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-slate-700">أول ظهور للمحتوى (FCP):</span>
                    <span className="font-bold text-emerald-700 font-mono-nums">0.4s (وميض فوري)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-slate-700">اكتمال تحميل الصفحة (LCP):</span>
                    <span className="font-bold text-emerald-700 font-mono-nums">0.9s (ممتاز جداً)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-slate-700">وقت التجميد التقني (TBT):</span>
                    <span className="font-bold text-emerald-700 font-mono-nums">0ms (استجابة فورية)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-slate-700">اهتزاز عناصر الصفحة (CLS):</span>
                    <span className="font-bold text-emerald-700 font-mono-nums">0.00 (ثبات تام)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>النتيجة: العميل يضغط الإعلان ويجد نفسه يتحدث معك بالواتساب خلال ثانية.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE AD-SPEND WASTE CALCULATOR
      ───────────────────────────────────────────────────────────── */}
      <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="rounded-2xl border border-slate-300/80 bg-slate-900 text-white p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>METRIC_LOSS_ANALYZER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              احسب كم تخسر شهرياً من ميزانية إعلاناتك بسبب البطء
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              حسب دراسات Google و Meta، كل ثانية انتظار تزيد نسبة الارتداد بمعدل 20%، وتخفض عائد الإنفاق الإعلاني (ROAS).
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6 border-t border-slate-800">
              {/* Sliders and Configuration */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <label htmlFor={adSpendId} className="text-slate-200">
                      ميزانيتك الشهرية لإعلانات Meta و TikTok:
                    </label>
                    <span className="font-mono-nums text-lg font-bold text-indigo-400">
                      ${monthlyAdSpend}
                    </span>
                  </div>
                  <input
                    id={adSpendId}
                    type="range"
                    min="150"
                    max="3000"
                    step="50"
                    value={monthlyAdSpend}
                    onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono-nums">
                    <span>$150/شهر</span>
                    <span>$1,500/شهر</span>
                    <span>$3,000/شهر</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    كم يستغرق موقعك الحالي في التحميل على الموبايل؟
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setSiteSpeedTier("slow")}
                      className={`p-3 rounded-lg border text-right transition-all ${
                        siteSpeedTier === "slow"
                          ? "border-indigo-500 bg-indigo-950/60 text-white font-bold"
                          : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div>3 - 5 ثوانٍ</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">موقع عادي وبطيء نسبياً</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSiteSpeedTier("very_slow")}
                      className={`p-3 rounded-lg border text-right transition-all ${
                        siteSpeedTier === "very_slow"
                          ? "border-red-500 bg-red-950/40 text-white font-bold"
                          : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div>أكثر من 6 ثوانٍ</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">ووردبريس ثقيل مع إضافات كثيرة</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Loss Summary Card */}
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6 text-center sm:text-right">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                  التقدير المالي للهدر الشهري
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono-nums text-red-400 my-2">
                  ${wastedDollars}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تخسر تقريباً{" "}
                  <strong className="text-white font-mono-nums">{potentialSavedClicks} زائر إعلاني</strong> شهرياً
                  يغادرون قبل حتى أن يروا العرض أو الأسعار!
                </p>

                <div className="mt-5 pt-4 border-t border-red-500/20">
                  <a
                    href={getWhatsAppLink(
                      `مرحباً علي، حسبت الهدر الإعلاني في حاسبتك، وأصرف تقريباً $${monthlyAdSpend} شهرياً. أريد تحويل إعلاناتي لصفحة Next.js سريعة توقف هذا الهدر.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center rounded-lg bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    أوقف الهدر واسترجع نقودك الآن عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DIRECT SERVICE PACKAGES (3 FIXED CARDS)
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-24 bg-[#FAFAFB] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-2">
              [PRICING_PACKAGES]
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              باقات عمل محددة بأسعار شفافة وتسليم مؤكد
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              لا توجد تكاليف خفية. كود Next.js احترافي، تسليم خلال أيام، وضمان سرعة كامل على PageSpeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  pkg.popular
                    ? "border-2 border-indigo-600 shadow-md ring-4 ring-indigo-50"
                    : "border border-slate-200 shadow-xs hover:border-slate-300"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                      <Zap className="h-3 w-3" />
                      الأعلى تحويلاً
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 block mb-1">
                      {pkg.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950">{pkg.title}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[48px]">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-slate-950 font-mono-nums">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{pkg.priceDetail}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                      <Clock className="h-3.5 w-3.5 text-indigo-500" />
                      <span>{pkg.timeline}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      المخرجات التقنية الدقيقة:
                    </span>
                    {pkg.deliverables.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(
                    `مرحباً علي، أرغب في حجز "${pkg.title}" بقيمة ${pkg.price}. كيف نبدأ؟`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all ${
                    pkg.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{pkg.ctaText}</span>
                </a>
              </div>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RECURRING RETAINER CALLOUT ($150/MONTH)
          ───────────────────────────────────────────────────────────── */}
          <div className="mt-12 rounded-2xl border border-indigo-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 font-mono mb-2">
                  <Shield className="h-3.5 w-3.5 text-indigo-600" />
                  <span>RECURRING_MAINTENANCE_RETAINER</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  باقة الصيانة وحراسة الأداء: $150 / شهر
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  مواقع الويب بدون متابعة تفقد سرعتها وأمانها تدريجياً. أضمن لك استقراراً تاماً 24/7 مع نسخ احتياطية أسبوعية،
                  مراقبة مستمرة للسرعة، و 3 ساعات عمل شهرياً لتحديث المنتجات والتعديلات الفورية.
                </p>
              </div>

              <a
                href={getWhatsAppLink(
                  "مرحباً علي، أريد الاستفسار عن باقة الصيانة الشهرية ($150/شهر) لحماية وإدارة موقعي."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <span>احجز باقة الصيانة الشهرية</span>
                <ArrowUpRight className="h-4 w-4 text-indigo-400 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. LIVE PORTFOLIO PREVIEW (AUTHENTIC WORK SHOWCASE)
      ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-2">
              [PROVEN_PROJECTS]
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              أعمال حقيقية مبنية بنفس هذه المعايير
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              افحص الكود، جرب السرعة بنفسك، وانظر كيف تنعكس السرعة على سلاسة تجربة المستخدم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1: NexaFlow */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                      NF
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">NexaFlow</h3>
                      <span className="text-[11px] text-slate-400 font-mono">B2B Workflow & Leads</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                    98 PageSpeed
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  منصة SaaS متكاملة لأتمتة مسارات العمل وتوزيع العملاء المحتملين مع لوحة تحكم تفاعلية مدمجة ودعم ثنائي اللغة.
                </p>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 mb-6">
                  <span className="rounded bg-slate-100 px-2 py-0.5">Next.js 15</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">TypeScript</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">Tailwind CSS</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">LCP: 0.8s • FCP: 0.4s</span>
                <a
                  href="http://localhost:3000/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>معاينة حية</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Project 2: TradeTrackr */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                      TT
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">TradeTrackr</h3>
                      <span className="text-[11px] text-slate-400 font-mono">FinTech Analytics</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                    96 PageSpeed
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  تطبيق ويب مالي لتسجيل وتحليل صفقات التداول مع حساب تلقائي للمخاطر ونسب الربح ورسوم بيانية تفاعلية.
                </p>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 mb-6">
                  <span className="rounded bg-slate-100 px-2 py-0.5">Next.js App Router</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">Financial Charts</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">High Density UI</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">LCP: 1.0s • FCP: 0.5s</span>
                <a
                  href="#proof"
                  className="font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>مراجعة المعمارية</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Project 3: Clinic & E-Commerce Landing */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                      MD
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">MedCare Bilingual</h3>
                      <span className="text-[11px] text-slate-400 font-mono">Clinic Ad Funnel</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                    99 PageSpeed
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  صفحة هبوط مخصصة للعيادات والمراكز التخصصية تدعم العربية والإنجليزية مع زر حجز فوري يحول المريض للواتساب.
                </p>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 mb-6">
                  <span className="rounded bg-slate-100 px-2 py-0.5">Bilingual RTL/LTR</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">WhatsApp Hook</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5">Meta Pixel CAPI</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">LCP: 0.7s • FCP: 0.3s</span>
                <a
                  href={getWhatsAppLink("مرحباً علي، أريد رؤية نموذج حي لصفحة هبوط عيادة أو متجر.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>طلب النموذج</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. WHY WORK WITH CODEWITHALI (TECHNICAL CREDIBILITY)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              [ENGINEERING_MANIFESTO]
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              لا أبيع قوالب ووردبريس بطيئة.
              <br />
              أنا مهندس برمجيات أبني أصولاً رقمية تزيد مبيعاتك.
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              أنا علي، مطور ويب من الموصل متخصص في واجهات Next.js فائقة الأداء. معظم المواقع في العراق والخليج تفشل لسبب بسيط:
              قوالب ثقيلة مليئة بالجافاسكربت غير المفيد، مما يجعل الزائر يغادر قبل أن يرى المنتج. أسلوبي يعتمد على ثلاث ركائز تقنية صارمة:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">الهاتف أولاً (Mobile First)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                أكثر من 85% من زوار المتاجر والعيادات في العراق والخليج يستخدمون الهواتف المحمولة. كل سطر كود وكل صورة تُحسب بالميلي ثانية لتلائم شبكات الهواتف.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">ثقافة الواتساب (WhatsApp Native)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                في منطقتنا، الاستمارات الطويلة تقتل المبيعات. أربط الزائر بمحادثة واتساب مجهزة مسبقاً باسم المنتج والخدمة لتغلق الصفقة خلال دقائق من ضغطة الإعلان.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="h-10 w-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">أرقام معلنة ومحسوبة (Proof-Driven)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                لا أسلّم المشروع بكلمة "الموقع صار سريع". أسلّمك رابط Google PageSpeed الرسمي بنتيجة 90+ على الموبايل لترى بنفسك التفوق على منافسيك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FOOTER & DIRECT CONTACT
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white font-mono text-xs font-bold">
                <Code2 className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-950 block font-mono-nums">
                  CodeWithAli
                </span>
                <span className="text-[11px] text-slate-400">
                  الموصل، العراق • مشاريع عن بُعد للعراق ودول الخليج
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={getWhatsAppLink("مرحباً علي، أرغب في حجز موعد لمناقشة موقعي الجديد.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-xs"
              >
                <MessageCircle className="h-4 w-4" />
                <span>تحدث معي مباشرة عبر واتساب</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© 2026 CodeWithAli. جميع الحقوق محفوظة.</p>
            <p className="text-[11px]">
              هندسة واجهات Next.js خفيفة، بدون قوالب جاهزة، وضمان أداء 90+ على PageSpeed.
            </p>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          10. FIXED FLOATING WHATSAPP BUTTON (BOTTOM-LEFT IN RTL)
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href={getWhatsAppLink("مرحباً علي، أريد تدقيقاً مجانياً لسرعة موقعي.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل فوري عبر واتساب"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-100"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
