"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowUpLeft,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  ShieldCheck,
  Code2,
  Smartphone,
  Activity,
  MessageCircle,
  ExternalLink,
  Layers,
  Cpu,
  BarChart3,
  Clock,
  Check,
  Play,
  RotateCcw,
  Terminal,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";

// ==========================================
// إعدادات الروابط والتواصل (عدّل رقمك هنا فقط)
// ==========================================
const WHATSAPP_NUMBER = "9647700000000"; // ضع رقمك الحقيقي هنا مع مفتاح العراق 964 بدون +
const NEXAFLOW_URL = "https://nexa-flow-gamma.vercel.app";
const BILINGUAL_SITE_URL = "https://nexa-flow-gamma.vercel.app"; // ضع رابط الموقع الثنائي اللغة بعد رفعه
const TRADETRACKR_URL = "https://nexa-flow-gamma.vercel.app"; // ضع رابط TradeTrackr بعد رفعه

// ==========================================
// بيانات المخطط الهندسي التفاعلي (Pipeline)
// ==========================================
const PIPELINE_STEPS = [
  {
    id: "01",
    title: "نقرة الإعلان (Meta / TikTok Ads)",
    metric: "CTR Target: High Intent",
    shortDesc: "الزبون يضغط على إعلانك الممول من الموبايل",
    engineeringDetail:
      "أغلب زوار الإعلانات في العراق والخليج يتصفحون من داخل تطبيق إنستغرام وفيسبوك (In-App Browser) وعلى شبكات 4G متقلبة. هنا تبدأ المعركة الحقيقية مع أجزاء الثانية.",
    codePreview: `// 1. Incoming Ad Traffic Detection
const utmSource = searchParams.get('utm_source'); // 'instagram_ads'
const fbclid = searchParams.get('fbclid');
// Pre-warming Edge Route & Assets in < 50ms`,
  },
  {
    id: "02",
    title: "تحميل فوري (< 0.8 ثانية بـ Next.js)",
    metric: "LCP: 0.8s | Score: 92+",
    shortDesc: "فتح الصفحة فوراً قبل أن يفكر الزبون بالخروج",
    engineeringDetail:
      "بدل قوالب ووردبريس الثقيلة التي تحمل 40 إضافة غير ضرورية، أبني صفحتك بـ Next.js Server Rendering مع ضغط الصور بصيغة WebP/AVIF وتوزيعها عبر شبكة Edge عالمية.",
    codePreview: `// 2. Zero-Bloat Edge Rendering (92/100 Mobile Score)
export const runtime = 'edge';
// Preloaded Arabic Fonts + Next/Image AVIF Compression
// First Contentful Paint achieved in 0.6s`,
  },
  {
    id: "03",
    title: "تتبع برمجي دقيق (Meta Pixel & CAPI)",
    metric: "Event Match Quality: 9.2/10",
    shortDesc: "تعليم خوارزمية الإعلان من هم الزبائن الذين يشترون فعلاً",
    engineeringDetail:
      "أربط أحداث التتبع برمجياً (ViewContent, InitiateCheckout, Lead) بدون أخطاء تكرار، حتى تفهم خوارزمية ميتا مواصفات الزبون المهتم وتجلب لك عملاء يشترون بسعر نقرة أرخص.",
    codePreview: `// 3. Precision Pixel & Conversion Event Firing
trackMetaEvent('Lead', {
  content_name: 'High_Intent_WhatsApp_Booking',
  currency: 'USD',
  value: 150.00,
  event_id: generateDeduplicationId()
});`,
  },
  {
    id: "04",
    title: "تحويل مباشر (رسالة واتساب أو حجز مكتمل)",
    metric: "+210% زيادة بمعدل الرسائل",
    shortDesc: "الزبون يرسل لك طلبه جاهزاً ومفصلاً بضغطة زر واحدة",
    engineeringDetail:
      "بدل أن يدخل الزبون ويكتب (مرحبا بيش هذا؟) وتضيع المحادثة، الموقع يجهز له اختيارات واضحة ويحولها إلى رسالة واتساب منظمة تحتوي على طلبه الكامل جاهزاً للإغلاق.",
    codePreview: `// 4. Frictionless WhatsApp Funnel Handoff
const encodedPayload = encodeURIComponent(structuredLeadSummary);
window.open(\`https://wa.me/\${CLIENT_PHONE}?text=\${encodedPayload}\`);`,
  },
];

// ==========================================
// بيانات معرض الأعمال الحي
// ==========================================
const PORTFOLIO_PROJECTS = [
  {
    id: "bilingual-clinic",
    category: "corporate",
    badge: "ثنائي اللغة (RTL / LTR) | سرعة فائقة",
    title: "واجهة الشركات والعيادات ثنائية اللغة",
    subtitle: "Arabic & English High-Conversion Corporate Platform",
    description:
      "موقع متكامل مصمم للشركات والعيادات يجمع بين الفخامة البصرية وسرعة التصفح على الموبايل، مع نظام حجز وتحويل مباشر للواتساب وتجربة مستخدم سلسة باللغتين العربية والإنكليزية.",
    metrics: [
      { label: "سرعة الفتح", value: "0.9s" },
      { label: "توافق الموبايل", value: "100%" },
      { label: "اللغات", value: "AR / EN" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "RTL/LTR Architecture"],
    liveUrl: BILINGUAL_SITE_URL,
    ctaText: "معاينة المشروع الحي",
    highlightColor: "emerald",
  },
  {
    id: "nexaflow",
    category: "landing",
    badge: "مُثبت بشهادة Google PageSpeed: 92/100 على الموبايل",
    title: "منصة NexaFlow — هندسة الأداء الفائق",
    subtitle: "92/100 Verified Mobile Performance Architecture",
    description:
      "نموذج حي لهندسة الواجهات الحديثة بـ Next.js و Tailwind CSS. يحقق تقييم 92/100 في فحص Google PageSpeed الرسمي على الموبايل مع أنميشن انسيابي بدون أي ثقل على المتصفح.",
    metrics: [
      { label: "PageSpeed Mobile", value: "92/100" },
      { label: "LCP Time", value: "0.8s" },
      { label: "CLS Shift", value: "0.00" },
    ],
    tech: ["Next.js App Router", "Framer Motion", "WebP Optimization", "Vercel Edge"],
    liveUrl: NEXAFLOW_URL,
    ctaText: "افتح الموقع وافحص سرعته بنفسك",
    highlightColor: "emerald",
  },
  {
    id: "tradetrackr",
    category: "system",
    badge: "هندسة أنظمة ولوحات تحكم متقدمة",
    title: "نظام TradeTrackr — لوحة تحكم وتحليل بيانات",
    subtitle: "Full-Stack Analytics & Real-Time Dashboard System",
    description:
      "إثبات عملي للقدرة البرمجية على بناء أنظمة ويب معقدة، لوحات تحكم تفاعلية (Dashboards)، وإدارة بيانات وإحصائيات لحظية بأعلى معايير الأمان والسرعة.",
    metrics: [
      { label: "معالجة البيانات", value: "Real-Time" },
      { label: "معمارية الكود", value: "Modular" },
      { label: "حماية وأمان", value: "Enterprise" },
    ],
    tech: ["React", "TypeScript", "State Management", "Interactive Charts"],
    liveUrl: TRADETRACKR_URL,
    ctaText: "استعراض النظام الحي",
    highlightColor: "zinc",
  },
];

export default function CodeWithAliLandingPage() {
  // ------------------------------------------
  // State 1: محاكي السرعة ومقارنة هدر الإعلانات
  // ------------------------------------------
  const [simMode, setSimMode] = useState<"ali" | "slow">("ali");
  const [isRacing, setIsRacing] = useState(false);
  const [aliTimer, setAliTimer] = useState(0.8);
  const [slowTimer, setSlowTimer] = useState(5.8);

  const runSpeedRace = () => {
    setIsRacing(true);
    setAliTimer(0.0);
    setSlowTimer(0.0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const progress = currentStep * 0.1;

      if (progress <= 0.8) {
        setAliTimer(Number(progress.toFixed(1)));
      } else {
        setAliTimer(0.8);
      }

      if (progress <= 5.8) {
        setSlowTimer(Number(progress.toFixed(1)));
      } else {
        setSlowTimer(5.8);
        setIsRacing(false);
        clearInterval(interval);
      }
    }, 35);
  };

  // ------------------------------------------
  // State 2: المخطط الهندسي التفاعلي (Pipeline)
  // ------------------------------------------
  const [activePipelineIndex, setActivePipelineIndex] = useState(0);

  // ------------------------------------------
  // State 3: فلتر معرض الأعمال
  // ------------------------------------------
  const [portfolioFilter, setPortfolioFilter] = useState<string>("all");

  const filteredProjects =
    portfolioFilter === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === portfolioFilter);

  // ------------------------------------------
  // State 4: محرك الحجز الذكي وحاسبة الواتساب
  // ------------------------------------------
  const [businessType, setBusinessType] = useState("عيادة / مركز طبي");
  const [projectGoal, setProjectGoal] = useState(
    "صفحة هبوط سريعة تضاعف نتائج إعلاناتي"
  );
  const [adStatus, setAdStatus] = useState(
    "مشغل إعلانات حالياً وأريد نتائج أفضل"
  );
  const [monthlyAdBudget, setMonthlyAdBudget] = useState(500);

  // حساب الخسارة التقديرية من بطء الموقع
  const estimatedWastedDollars = Math.round(monthlyAdBudget * 0.48);

  const generatedWhatsAppMessage = `السلام عليكم أستاذ علي، دخلت لموقعك CodeWithAli وأريد أستفسر عن بناء مشروع:
• نوع البزنس: ${businessType}
• المطلوب: ${projectGoal}
• حالة الإعلانات: ${adStatus}
• ميزانية الإعلانات التقريبية: $${monthlyAdBudget} شهرياً
أحب نتناقش بالتفاصيل وفحص مشروعي.`;

  const getWhatsAppUrl = (customText?: string) => {
    const text = customText || generatedWhatsAppMessage;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#09090B] text-[#FAFAFA] relative overflow-x-hidden"
    >
      {/* خلفية الشبكة الهندسية الدقيقة (Linear Architectural Grid) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 40%, transparent 100%)",
        }}
      />

      {/* إضاءة خافتة جداً باللون الزمردي أعلى الصفحة */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[750px] h-[280px] bg-emerald-500/10 blur-[130px] rounded-full z-0"
      />

      {/* ==========================================
          1. الشريط العلوي الهندسي الثابت (Navbar)
      ========================================== */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090B]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* الشعار + حالة التفرغ */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/50 flex items-center justify-center transition-colors">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span
                  dir="ltr"
                  className="font-mono font-bold text-base tracking-tight text-white flex items-center gap-1"
                >
                  CodeWithAli
                  <span className="text-emerald-400">.dev</span>
                </span>
                <span className="text-[10px] text-zinc-400">
                  هندسة واجهات وصفحات هبوط
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>متاح لاستلام مشروعين هذا الأسبوع</span>
            </div>
          </div>

          {/* روابط التنقل */}
          <nav className="hidden lg:flex items-center gap-7 text-sm text-zinc-400">
            <a
              href="#simulator"
              className="hover:text-white transition-colors"
            >
              محاكي السرعة
            </a>
            <a href="#problem" className="hover:text-white transition-colors">
              ليش تخسر إعلاناتك؟
            </a>
            <a
              href="#portfolio"
              className="hover:text-white transition-colors"
            >
              أعمالي الحية
            </a>
            <a href="#packages" className="hover:text-white transition-colors">
              الباقات والخدمات
            </a>
          </nav>

          {/* زر التواصل السريع */}
          <a
            href={getWhatsAppUrl(
              "السلام عليكم أستاذ علي، شفت موقعك CodeWithAli وأريد أستفسر عن بناء صفحة هبوط / موقع للبزنس مالتي."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>افحص موقعك عبر واتساب</span>
          </a>
        </div>
      </header>

      {/* ==========================================
          2. الواجهة الرئيسية + محاكي السرعة الحي (Hero)
      ========================================== */}
      <section
        id="simulator"
        className="relative z-10 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-zinc-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* العمود الأيمن: النصوص البيعية الحادة */}
            <div className="lg:col-span-7 space-y-6">
              {/* الشارة التقنية العلوية */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>هندسة واجهات فائقة السرعة</span>
                <span className="text-zinc-600">|</span>
                <span
                  dir="ltr"
                  className="font-mono text-emerald-400 font-semibold"
                >
                  92/100 Google PageSpeed
                </span>
              </div>

              {/* العنوان الرئيسي */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.22] tracking-tight text-white">
                إعلاناتك تجيب نقرات بس{" "}
                <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">
                  ماكو مبيعات؟
                </span>{" "}
                المشكلة مو بالإعلان.. المشكلة بموقعك البطيء.
              </h1>

              {/* العنوان الفرعي */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                أني <strong className="text-white">علي، مهندس برمجيات</strong>.
                أبني صفحات هبوط ومواقع للشركات والعيادات والمتاجر بـ{" "}
                <span dir="ltr" className="font-mono text-zinc-200 text-sm">
                  Next.js
                </span>{" "}
                تفتح بأقل من ثانية على الموبايل، مع ربط برمجي دقيق لـ{" "}
                <span dir="ltr" className="font-mono text-zinc-200 text-sm">
                  Meta Pixel
                </span>{" "}
                والواتساب حتى تحول كل دولار تصرفه بالإعلان إلى زبون حقيقي.
              </p>

              {/* أزرار القرار (CTAs) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  <span>احصل على صفحة تضاعف مبيعاتك</span>
                  <ArrowUpLeft className="w-5 h-5" />
                </a>

                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 text-zinc-200 border border-zinc-800 font-medium text-base transition-colors"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>شاهد نماذج حية وافحص سرعتها بنفسك</span>
                </a>
              </div>

              {/* شريط الثقة المصغر */}
              <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>كود برمجي خاص 100% (بدون ووردبريس بطيء)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>أداء 92+ موثق على شبكات الموبايل</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تسليم النسخة الأولى خلال 48–72 ساعة</span>
                </div>
              </div>
            </div>

            {/* العمود الأيسر: محاكي السرعة وهدر الإعلانات التفاعلي */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#121215] border border-zinc-800/90 shadow-2xl overflow-hidden">
                {/* رأس المحاكي (شريط نافذة هندسي) */}
                <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-zinc-200">
                      محاكي أداء الإعلانات وسرعة الموبايل
                    </span>
                  </div>
                  <span
                    dir="ltr"
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                  >
                    1,000 Ad Clicks Test
                  </span>
                </div>

                {/* أزرار التبديل بين وضع علي والوضع البطيء */}
                <div className="p-4 border-b border-zinc-800/70 bg-zinc-950/40">
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setSimMode("ali")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        simMode === "ali"
                          ? "bg-emerald-500 text-zinc-950 shadow-md"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>بنية CodeWithAli</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimMode("slow")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        simMode === "slow"
                          ? "bg-red-500/90 text-white shadow-md"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>المواقع التقليدية البطيئة</span>
                    </button>
                  </div>
                </div>

                {/* جسم المحاكي التفاعلي */}
                <div className="p-5 space-y-5">
                  {/* سباق التحميل الحي (Live Race Bars) */}
                  <div className="space-y-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        مقارنة زمن فتح الصفحة على 4G:
                      </span>
                      <button
                        type="button"
                        onClick={runSpeedRace}
                        disabled={isRacing}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                      >
                        {isRacing ? (
                          <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                        <span>اختبر السرعة الآن ⚡</span>
                      </button>
                    </div>

                    {/* شريط سرعة CodeWithAli */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-400 font-medium">
                          معمارية CodeWithAli (Next.js)
                        </span>
                        <span
                          dir="ltr"
                          className="font-mono font-bold text-emerald-400"
                        >
                          {aliTimer.toFixed(1)}s ⚡
                        </span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 rounded-full"
                          initial={{ width: "100%" }}
                          animate={{
                            width: `${Math.min((aliTimer / 0.8) * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* شريط سرعة الموقع البطيء */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">
                          موقع تقليدي / قالب جاهز
                        </span>
                        <span
                          dir="ltr"
                          className="font-mono font-bold text-red-400"
                        >
                          {slowTimer.toFixed(1)}s 🐢
                        </span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-red-500 rounded-full"
                          initial={{ width: "100%" }}
                          animate={{
                            width: `${Math.min((slowTimer / 5.8) * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* بطاقة النتيجة حسب الوضع المختار */}
                  <AnimatePresence mode="wait">
                    {simMode === "ali" ? (
                      <motion.div
                        key="ali-mode"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                          <div className="space-y-1">
                            <span className="text-xs text-emerald-300 font-medium">
                              تقييم Google PageSpeed للموبايل
                            </span>
                            <div className="text-2xl font-bold text-white">
                              أداء فائق ومثالي للإعلانات
                            </div>
                            <p className="text-xs text-zinc-300">
                              يحتفظ بـ 94% من زوار الإعلان داخل الصفحة
                            </p>
                          </div>
                          {/* عداد دائري 92 */}
                          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#27272a"
                                strokeWidth="5"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#10B981"
                                strokeWidth="5"
                                strokeDasharray="175"
                                strokeDashoffset="14"
                                strokeLinecap="round"
                                fill="none"
                              />
                            </svg>
                            <span
                              dir="ltr"
                              className="absolute font-mono font-bold text-lg text-emerald-400"
                            >
                              92
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-emerald-400"
                            >
                              0.8s
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              سرعة الفتح LCP
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-emerald-400"
                            >
                              0.00
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              ثبات العناصر CLS
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-emerald-400"
                            >
                              2.4x
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              مضاعفة الرسائل
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="slow-mode"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                          <div className="space-y-1">
                            <span className="text-xs text-red-300 font-medium">
                              تقييم أغلب المواقع التجارية التقليدية
                            </span>
                            <div className="text-xl font-bold text-white">
                              خسارة 53% من ميزانية الإعلان
                            </div>
                            <p className="text-xs text-zinc-300">
                              نصف الزبائن يغلقون الصفحة قبل أن تفتح أصلاً!
                            </p>
                          </div>
                          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#27272a"
                                strokeWidth="5"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#EF4444"
                                strokeWidth="5"
                                strokeDasharray="175"
                                strokeDashoffset="108"
                                strokeLinecap="round"
                                fill="none"
                              />
                            </svg>
                            <span
                              dir="ltr"
                              className="absolute font-mono font-bold text-lg text-red-400"
                            >
                              38
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-red-400"
                            >
                              5.8s
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              بطء التحميل
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-red-400"
                            >
                              -53%
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              تسرب الزوار
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <div
                              dir="ltr"
                              className="font-mono text-sm font-bold text-red-400"
                            >
                              Weak
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              تتبع الـ Pixel
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. قسم المشكلة والحل + المخطط الهندسي التفاعلي
      ========================================== */}
      <section
        id="problem"
        className="relative z-10 py-20 border-b border-zinc-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* عنوان القسم */}
          <div className="max-w-3xl space-y-3">
            <div
              dir="ltr"
              className="inline-block font-mono text-xs uppercase tracking-widest text-emerald-400"
            >
              // WHY AD CAMPAIGNS FAIL
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              ليش أغلب الحملات الإعلانية تحرق فلوسها بدون عائد؟
            </h2>
            <p className="text-zinc-400 text-base">
              حتى لو كان تصميم إعلانك ممتازاً، إرسال الزبون إلى صفحة غير مهيأة
              هندسياً يضيع تعبك وميزانيتك بثلاث طرق رئيسية:
            </p>
          </div>

          {/* البطاقات الثلاث للمشكلة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121215] border border-zinc-800/90 hover:border-emerald-500/40 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span
                  dir="ltr"
                  className="font-mono text-xs px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20"
                >
                  ERROR 01 // SPEED
                </span>
                <Clock className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                كارثة الـ 5 ثواني على الموبايل
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                أكثر من 53% من الزبائن بالعراق والخليج يغلقون الصفحة إذا تأخرت
                أكثر من 3 ثواني بالفتح على شبكة الموبايل. أنت تدفع لميتا ثمن
                النقرة، وموقعك البطيء يطرد الزبون قبل أن يرى عرضك.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-zinc-800/90 hover:border-emerald-500/40 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span
                  dir="ltr"
                  className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
                >
                  ERROR 02 // UX FUNNEL
                </span>
                <Smartphone className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                تشتت الزبون وضياع الرسائل
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                المواقع التقليدية مليئة بقوائم معقدة تضيّع الزبون. صفحات الهبوط
                التي أبنيها مصممة بهندسة نفسية تقود الزبون بخط مستقيم من أول
                ثانية يدخل فيها حتى يضغط زر الحجز أو الواتساب.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-zinc-800/90 hover:border-emerald-500/40 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span
                  dir="ltr"
                  className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  SOLUTION 03 // PIXEL & CAPI
                </span>
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                غياب التتبع البرمجي الدقيق
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                بدون ربط برمجي نظيف لأحداث الـ Pixel، خوارزمية فيسبوك وإنستغرام
                لن تعرف من هو الزبون الذي يشتري فعلاً. أربط لك التتبع برمجياً
                حتى تجلب لك الخوارزمية زبائن يشترون فعلاً.
              </p>
            </div>
          </div>

          {/* المخطط الهندسي التفاعلي (Interactive Conversion Pipeline) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-zinc-800/90 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span
                  dir="ltr"
                  className="font-mono text-xs text-emerald-400 block mb-1"
                >
                  INTERACTIVE ARCHITECTURE PIPELINE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  شلون تشتغل منظومة CodeWithAli لتحويل النقرة إلى مبيعات؟
                </h3>
              </div>
              <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                اضغط على أي مرحلة لمعاينة التفاصيل الهندسية 👇
              </span>
            </div>

            {/* أزرار المراحل الأربعة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PIPELINE_STEPS.map((step, index) => {
                const isActive = activePipelineIndex === index;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActivePipelineIndex(index)}
                    className={`text-right p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.12)]"
                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        dir="ltr"
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-emerald-500 text-zinc-950"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        STEP {step.id}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono text-[11px] text-emerald-400"
                      >
                        {step.metric}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white mb-1">
                        {step.title}
                      </div>
                      <p className="text-xs text-zinc-400">{step.shortDesc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* تفاصيل المرحلة المختارة مع نافذة الكود */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-zinc-950/80 p-5 rounded-xl border border-zinc-800/80">
              <div className="lg:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <Code2 className="w-4 h-4" />
                  <span>
                    STAGE {PIPELINE_STEPS[activePipelineIndex].id} ENGINEERING
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  {PIPELINE_STEPS[activePipelineIndex].title}
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {PIPELINE_STEPS[activePipelineIndex].engineeringDetail}
                </p>
              </div>
              <div className="lg:col-span-6">
                <pre
                  dir="ltr"
                  className="p-4 rounded-lg bg-[#09090B] border border-zinc-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed"
                >
                  <code>{PIPELINE_STEPS[activePipelineIndex].codePreview}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. معرض الأعمال الحي (Live Portfolio)
      ========================================== */}
      <section
        id="portfolio"
        className="relative z-10 py-20 border-b border-zinc-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div
                dir="ltr"
                className="inline-block font-mono text-xs uppercase tracking-widest text-emerald-400"
              >
                // VERIFIED LIVE PRODUCTION WORK
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                لا تصدق الكلام.. افحص الأداء الحي بموبايلك
              </h2>
              <p className="text-zinc-400 text-base max-w-2xl">
                كل مشروع هنا مبرمج من الصفر بكود نظيف ومصمم لهدف واحد: السرعة،
                الفخامة البصرية، وتحويل الزائر إلى عميل.
              </p>
            </div>

            {/* أزرار الفلترة */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "جميع المشاريع (3)" },
                { id: "corporate", label: "مواقع شركات وعيادات" },
                { id: "landing", label: "صفحات هبوط 92/100" },
                { id: "system", label: "أنظمة ولوحات تحكم" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPortfolioFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    portfolioFilter === tab.id
                      ? "bg-emerald-500 text-zinc-950 border-emerald-500"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* شبكة المشاريع */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-[#121215] border border-zinc-800/90 hover:border-emerald-500/50 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* رأس البطاقة الهندسي */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                      {project.badge}
                    </span>
                    <Layers className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <div
                      dir="ltr"
                      className="font-mono text-xs text-zinc-400 text-right"
                    >
                      {project.subtitle}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* المقاييس الرقمية للمشروع */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-center"
                      >
                        <div
                          dir="ltr"
                          className="font-mono text-sm font-bold text-emerald-400"
                        >
                          {m.value}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* التقنيات المستخدمة */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        dir="ltr"
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* زر فتح المشروع الحي */}
                <div className="p-4 bg-zinc-950/80 border-t border-zinc-800/80">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-emerald-500 text-zinc-200 hover:text-zinc-950 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-zinc-800 hover:border-emerald-400"
                  >
                    <span>{project.ctaText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. الباقات والخدمات (Service Packages)
      ========================================== */}
      <section
        id="packages"
        className="relative z-10 py-20 border-b border-zinc-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div
              dir="ltr"
              className="inline-block font-mono text-xs uppercase tracking-widest text-emerald-400"
            >
              // TRANSPARENT ENGINEERING PACKAGES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              شنو أگدر أبني للبزنس مالتك؟
            </h2>
            <p className="text-zinc-400 text-base">
              اختر الباقة التي تناسب مرحلة مشروعك الحالية — جميع الباقات تُسلم
              بكود نظيف وسرعة مضمونة فوق 90 على الموبايل.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* الباقة الأولى */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800/90 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    للمواقع البطيئة الحالية
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-xs text-emerald-400"
                  >
                    48 Hours Delivery
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  تسريع وإصلاح المواقع القائمة
                </h3>
                <p className="text-sm text-zinc-400">
                  لأصحاب المواقع الذين يعانون من بطء التحميل على الموبايل أو
                  ضعف التحويل من الإعلانات الممولة.
                </p>

                <ul className="space-y-3 pt-4 border-t border-zinc-800/80 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ضغط وتحويل الصور إلى الجيل الجديد WebP/AVIF</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تنظيف الكود وإزالة الإضافات المسببة للبطء</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>إصلاح مشاكل تجاوب الشاشات على الموبايل</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ضبط وربط أحداث Meta Pixel بشكل صحيح</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  "السلام عليكم أستاذ علي، أريد أستفسر عن باقة (تسريع وإصلاح موقعي الحالي) وفحص سرعته."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm border border-zinc-800 text-center transition-colors"
              >
                اطلب فحص وتسريع موقعك
              </a>
            </div>

            {/* الباقة الثانية (الأكثر طلباً - مميزة باللون الزمردي) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121215] border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الأكثر طلباً لأصحاب الإعلانات</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    للعيادات والمتاجر والعقارات
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-xs text-emerald-400 font-bold"
                  >
                    2 - 4 Days Delivery
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  صفحة هبوط فائقة السرعة للحملات
                </h3>
                <p className="text-sm text-zinc-300">
                  صفحة مصممة ومبرمجة خصيصاً بـ Next.js لتحويل زوار إعلانات فيسبوك
                  وإنستغرام وتيك توك إلى رسائل واتساب وحجوزات فعلية.
                </p>

                <ul className="space-y-3 pt-4 border-t border-zinc-800 text-sm text-zinc-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>برمجة خاصة بـ Next.js بسرعة مضمونة 90+ بالموبايل</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>كتابة النصوص البيعية المقنعة وترتيب رحلة الزبون</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>نظام حجز تفاعلي يحول الزبون لواتساب مع تفاصيل طلبه</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ربط برمجي كامل لـ Meta Pixel لتقليل سعر النقرة</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>استضافة مجانية فائقة السرعة على Vercel Edge</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  "السلام عليكم أستاذ علي، أريد أحجز (الباقة الثانية: بناء صفحة هبوط فائقة السرعة لحملتي الإعلانية)."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm text-center transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)]"
              >
                احجز صفحة هبوط لحملتك الآن
              </a>
            </div>

            {/* الباقة الثالثة */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800/90 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    للشركات والبراندات
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-xs text-emerald-400"
                  >
                    5 - 10 Days Delivery
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  موقع رسمي متكامل أو نظام مخصص
                </h3>
                <p className="text-sm text-zinc-400">
                  للشركات، العيادات الكبرى، والبراندات التي تريد واجهة رقمية
                  فخمة ثنائية اللغة أو لوحة تحكم خاصة.
                </p>

                <ul className="space-y-3 pt-4 border-t border-zinc-800/80 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>موقع متعدد الصفحات باللغتين (عربي RTL / إنكليزي LTR)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تصميم هندسي فخم مع أنميشن تفاعلي مخصص</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>لوحة تحكم سهلة لإدارة المحتوى أو الطلبات</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تهيئة كاملة لمحركات البحث (Technical SEO)</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  "السلام عليكم أستاذ علي، أريد أستفسر عن (الباقة الثالثة: بناء موقع رسمي متكامل / نظام مخصص)."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm border border-zinc-800 text-center transition-colors"
              >
                تواصل لمناقشة موقع شركتك
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. محرك الحجز الذكي وحاسبة التوفير (Booking Funnel)
      ========================================== */}
      <section id="booking" className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#121215] border border-zinc-800/90 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="space-y-2 border-b border-zinc-800 pb-6">
              <div
                dir="ltr"
                className="font-mono text-xs text-emerald-400 uppercase tracking-widest"
              >
                // INTERACTIVE PROJECT CONFIGURATOR
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                صمّم طلبك بـ 3 ضغطات واحصل على فحص مجاني لمشروعك
              </h2>
              <p className="text-sm text-zinc-400">
                اختر تفاصيل مشروعك بالأسفل، وسيقوم النظام بتجهيز ملخص هندسي
                كامل وإرساله مباشرة لمحادثتي على واتساب:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* خطوات الاختيار التفاعلية */}
              <div className="lg:col-span-7 space-y-6">
                {/* الخطوة 1 */}
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-zinc-200 block">
                    1. شنو نوع البزنس مالتك؟
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      "عيادة / مركز طبي",
                      "متجر إلكتروني / براند",
                      "شركة عقارات / خدمات",
                      "مشروع خاص / نظام ويب",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setBusinessType(item)}
                        className={`p-3 rounded-xl text-xs font-semibold text-right border transition-all ${
                          businessType === item
                            ? "bg-emerald-500/15 border-emerald-500 text-white"
                            : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الخطوة 2 */}
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-zinc-200 block">
                    2. شنو الهدف الأساسي حالياً؟
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "صفحة هبوط سريعة تضاعف نتائج إعلاناتي",
                      "موقع تعريفي متكامل يبني ثقة عالية (عربي/إنكليزي)",
                      "تسريع موقعي الحالي وحل مشاكل الموبايل",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setProjectGoal(item)}
                        className={`p-3 rounded-xl text-xs font-semibold text-right border transition-all flex items-center justify-between ${
                          projectGoal === item
                            ? "bg-emerald-500/15 border-emerald-500 text-white"
                            : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span>{item}</span>
                        {projectGoal === item && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الخطوة 3: سلايدر ميزانية الإعلانات */}
                <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300">
                      3. ميزانية إعلاناتك الشهرية التقريبية:
                    </label>
                    <span
                      dir="ltr"
                      className="font-mono text-sm font-bold text-emerald-400"
                    >
                      ${monthlyAdBudget} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={100}
                    value={monthlyAdBudget}
                    onChange={(e) =>
                      setMonthlyAdBudget(Number(e.target.value))
                    }
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="text-xs text-zinc-400 flex items-center justify-between pt-1">
                    <span>الهدر الشهري المتوقع بسبب بطء الموقع:</span>
                    <span
                      dir="ltr"
                      className="font-mono font-bold text-amber-400"
                    >
                      ~${estimatedWastedDollars} شهرياً يمكنك استعادتها
                    </span>
                  </div>
                </div>
              </div>

              {/* معاينة الرسالة الحية وزر الإرسال */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>معاينة طلبك الجاهز للإرسال</span>
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-[11px] text-zinc-400"
                    >
                      WhatsApp Direct
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                    {generatedWhatsAppMessage}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>أرسل تفاصيل مشروعك على واتساب الآن</span>
                  </a>
                  <p className="text-[11px] text-center text-zinc-400">
                    رد مباشر مني شخصياً (علي) خلال ساعات العمل • بدون أي التزام
                    مسبق
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. الفوتر + زر الواتساب العائم
      ========================================== */}
      <footer className="border-t border-zinc-800/80 py-8 bg-[#09090B] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span dir="ltr" className="font-mono font-bold text-white">
              CodeWithAli.dev
            </span>
            <span>— هندسة برمجيات وصفحات هبوط عالية التحويل</span>
          </div>
          <div dir="ltr" className="font-mono">
            Built with Next.js & Tailwind CSS • 92+ Mobile Performance
          </div>
        </div>
      </footer>

      {/* زر واتساب عائم أسفل اليسار */}
      <a
        href={getWhatsAppUrl(
          "السلام عليكم أستاذ علي، عندي استفسار سريع بخصوص بناء صفحة هبوط / موقع."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform hover:scale-105"
      >
        <MessageCircle className="w-4 h-4" />
        <span>فحص مجاني لموقعك</span>
      </a>
    </div>
  );
}
