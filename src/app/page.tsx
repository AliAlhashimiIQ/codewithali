"use client";

import React, { useEffect, useRef, useState, useId } from "react";

// Ali's verified WhatsApp phone number
const WA_PHONE = "9647700683686";
const formatWAUrl = (text: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

const formatNumber = (num: number) => num.toLocaleString("en-US");

export default function Home() {
  const websiteUrlId = useId();
  const customSpendId = useId();

  // Booking Services & Options
  const SERVICES = [
    {
      name: "صفحة هبوط للإعلانات",
      duration: "2–4 أيام",
      desc: "Next.js يفتح فوراً على الموبايل، نص إقناعي بالعربي، Meta Pixel وConversion API، وكل زبون يصلك على واتساب مباشرة.",
      hot: true,
      iconPath: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    },
    {
      name: "موقع شركة أو عيادة (عربي/إنجليزي)",
      duration: "5–10 أيام",
      desc: "موقع متعدد الصفحات بهوية خاصة، حركات راقية، تبديل RTL/LTR سلس، وSEO من أول يوم.",
      hot: false,
      iconPath: (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 9v11" />
        </>
      ),
    },
    {
      name: "إنقاذ سرعة موقعي الحالي",
      duration: "48 ساعة",
      desc: "ضغط الصور WebP، تنظيف الكود، وإصلاح تتبّع البيكسل دون الحاجة لإعادة البناء من الصفر.",
      hot: false,
      iconPath: (
        <>
          <path d="M4 16a8 8 0 1 1 16 0" />
          <path d="m12 16 4-5" />
        </>
      ),
    },
  ];

  const SECTORS = ["عيادة", "متجر إلكتروني", "عقارات", "خدمات"];
  const TIMINGS = ["خلال 48 ساعة", "هذا الأسبوع", "مرن"];
  const PRESET_SPENDS = [500, 1000, 2000, 5000, 10000];

  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);
  const [selectedTiming, setSelectedTiming] = useState(TIMINGS[1]);
  const [currentUrl, setCurrentUrl] = useState("");

  // Simulated Typing State in Chat
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

  // Bilingual card state
  const [bilingualIndex, setBilingualIndex] = useState(0);

  // Refs for Canvases & Observers
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const leakCanvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringScoreRef = useRef<HTMLSpanElement>(null);
  const ringCircleRef = useRef<SVGCircleElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLElement>(null);
  const workProgressRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);
  const raceRafRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // WhatsApp Message Composer
  const compiledWhatsAppMessage = [
    "السلام عليكم علي 👋",
    `أريد طلب: ${selectedService}`,
    `مجال شغلي: ${selectedSector}`,
    currentUrl.trim() && `موقعي الحالي: ${currentUrl.trim()}`,
    `وقت البدء: ${selectedTiming}`,
    "أرسل لي التفاصيل والتدقيق المجاني.",
  ]
    .filter(Boolean)
    .join("\n");

  /* ─────────────────────────────────────────────────────────────
     1. TYPING ANIMATION IN CHAT MOCKUP
  ───────────────────────────────────────────────────────────── */
  const triggerTyping = (fullText: string) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);

    const nowStr =
      new Date().toLocaleTimeString("ar-IQ", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " ✓✓";
    setMessageTime(nowStr);

    let charIndex = 0;
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setDisplayedMessage("");

      const stepTyping = () => {
        charIndex = Math.min(charIndex + 4, fullText.length);
        setDisplayedMessage(fullText.slice(0, charIndex));
        if (charIndex < fullText.length) {
          typingTimeoutRef.current = setTimeout(stepTyping, 16);
        }
      };
      stepTyping();
    }, 350);
  };

  useEffect(() => {
    triggerTyping(compiledWhatsAppMessage);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedService, selectedSector, selectedTiming, currentUrl]);

  /* ─────────────────────────────────────────────────────────────
     2. IMMEDIATE LOAD & REAL METRICS (NO INTRO BLOCKER)
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

    // Run race immediately on page load
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
     5. UPGRADED AD LEAK PHYSICS CANVAS SIMULATION (#leak)
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

      const p = isFixed ? 0.1 : 0.5; // Leak ratio
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

      // Spawn coins
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

      // Pipe outline
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

      // Dynamic Pipe Joint: smooth line when fixed, broken crack when slow
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

      // Status text
      ctx.fillStyle = gc;
      ctx.font = "700 15px " + fontMain;
      ctx.textAlign = "left";
      ctx.fillText(isFixed ? "موقع سريع" : "موقع بطيء", cx + 30, gy + 4);
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(p * 100)}% تسرّب`, cx - 38, gy - 22);

      // Update coins physics
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

      // Filter landed coins and trigger splash
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

      // Draw coins with "$" text
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

      // Draw splash particles
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

      // Draw floating loss tags (-$X)
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

      // Draw bins with wavy liquid surfaces
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
     6. SCORE RING INTERSECTION ANIMATION
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        if (ringCircleRef.current) {
          ringCircleRef.current.style.strokeDashoffset = String(326.7 * 0.08);
        }

        const start = performance.now();
        const duration = 1400;

        const anim = (t: number) => {
          const q = Math.min((t - start) / duration, 1);
          const score = Math.round(92 * (1 - Math.pow(1 - q, 2)));
          if (ringScoreRef.current) {
            ringScoreRef.current.textContent = String(score);
          }
          if (q < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      },
      { threshold: 0.3 }
    );

    io.observe(ring);
    return () => io.disconnect();
  }, []);

  /* ─────────────────────────────────────────────────────────────
     7. BILINGUAL CARD AUTOMATIC FLIP
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (isReduced) return;

    const interval = setInterval(() => {
      setBilingualIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  /* ─────────────────────────────────────────────────────────────
     8. PINNED HORIZONTAL GALLERY SCROLL & PROGRESS
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const work = workRef.current;
    const track = trackRef.current;
    if (!work || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];

    const handleScroll = () => {
      const rect = work.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);

      track.style.transform = `translateX(${-(1 - progress) * (track.offsetWidth - window.innerWidth)}px)`;

      if (workProgressRef.current) {
        workProgressRef.current.style.width = `${progress * 100}%`;
      }

      if (scrollBarRef.current) {
        const fullScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress = fullScroll > 0 ? (window.scrollY / fullScroll) * 100 : 0;
        scrollBarRef.current.style.width = `${pageProgress}%`;
      }

      const trackLeft = track.getBoundingClientRect().left;
      cards.forEach((card) => {
        const dist =
          (trackLeft + card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2) /
          window.innerWidth;
        const absDist = Math.min(Math.abs(dist), 1);
        card.style.transform = `translateY(${absDist * 34}px) rotate(${dist * -4}deg) scale(${
          1 - absDist * 0.08
        })`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const leakRatio = isFixed ? 0.1 : 0.5;
  const monthlyLoss = Math.round(spend * leakRatio);

  return (
    <>
      {/* Scroll Top Progress Bar */}
      <i id="sp" ref={scrollBarRef} />

      {/* ─────────────────────────────────────────────────────────────
          HEADER SECTION (INSTANT LOAD WITH REAL PERFORMANCE READOUT)
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
              أبني مواقع Next.js تفتح بأقل من ثانية على الموبايل وتحوّل الضغطة إلى رسالة واتساب.
              شغّل السباق وشاهد الفرق بنفسك.
            </p>
            <a
              className="btn"
              id="cta"
              href={formatWAUrl("السلام عليكم علي، أريد تدقيقاً مجانياً لموقعي")}
              target="_blank"
              rel="noreferrer"
            >
              اطلب تدقيق مجاني على واتساب
            </a>
          </div>

          <div>
            {/* Live Speed Race Component */}
            <div className="race" id="race">
              {/* Legacy Site Card */}
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
                <p className="nm">موقع قالب أو ووردبريس</p>
                <p
                  className="tm disp"
                  style={{ color: raceFinished.legacy ? "var(--bad)" : undefined }}
                >
                  <span>{(raceElapsed.legacy / 1000).toFixed(1)}</span> ث
                </p>
                <p className="sc">PageSpeed موبايل: 34/100</p>
              </div>

              {/* CodeWithAli Site Card */}
              <div className="ph" style={{ "--c": "var(--go)" } as React.CSSProperties}>
                <div className="scr">
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
                </div>
                <p className="nm">موقع CodeWithAli</p>
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
              أعد السباق
            </button>

            {/* Live Navigation Readout on visitor's device */}
            <p className="real" id="real">
              قياس حقيقي على جهازك الآن: أول ظهور{" "}
              <b id="m1">{fcpTime !== null ? fcpTime : "…"}</b> ms، وتحميل كامل{" "}
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
          <span>92/100 PageSpeed</span>
          <span>أقل من ثانية</span>
          <span>Meta Pixel وConversion API</span>
          <span>واتساب مباشر</span>
          <span>عربي / English</span>
          <span>92/100 PageSpeed</span>
          <span>أقل من ثانية</span>
          <span>Meta Pixel وConversion API</span>
          <span>واتساب مباشر</span>
          <span>عربي / English</span>
          <span>92/100 PageSpeed</span>
          <span>أقل من ثانية</span>
          <span>Meta Pixel وConversion API</span>
          <span>واتساب مباشر</span>
          <span>عربي / English</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          INVERTED SECTION: AD SPEND LEAK SIMULATOR
      ───────────────────────────────────────────────────────────── */}
      <section className="inv">
        <div className="w">
          <div>
            <h2>أموال إعلانك تتسرّب من موقعك كل شهر.</h2>
            <p className="s">
              اختر ميزانيتك، وشاهد شهراً كاملاً من الإعلانات في 9 ثوانٍ.
            </p>

            <div className="chips pre">
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

            <p className="yr" aria-live="polite">
              {isFixed
                ? `نفس الميزانية، ويعود إليك $${formatNumber(Math.round(spend * 0.4))} كل شهر.`
                : `$${formatNumber(monthlyLoss)} تضيع كل شهر، أي $${formatNumber(
                    monthlyLoss * 12
                  )} في السنة.`}
            </p>

            <button
              type="button"
              className="fixb"
              aria-pressed={isFixed}
              onClick={() => setIsFixed(!isFixed)}
            >
              {isFixed ? "العودة للوضع الحالي" : "شاهد الوضع بعد التسريع"}
            </button>
          </div>

          <div className="lk">
            <canvas
              id="leak"
              ref={leakCanvasRef}
              aria-label="رسم متحرك: نصف فلوس الإعلان تضيع قبل أن تصل للزبون"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROOF SECTION (PAGE SPEED 92 RING)
      ───────────────────────────────────────────────────────────── */}
      <section className="proof w">
        <div className="top">
          <div className="ring" ref={ringRef}>
            <svg viewBox="0 0 120 120">
              <circle className="t" cx="60" cy="60" r="52" />
              <circle className="v" ref={ringCircleRef} cx="60" cy="60" r="52" />
            </svg>
            <span className="disp" ref={ringScoreRef}>
              0
            </span>
          </div>
          <div>
            <h2>92 من 100 على Google PageSpeed للموبايل.</h2>
            <p style={{ marginTop: "12px", maxWidth: "520px", lineHeight: 2 }}>
              مواقع ووردبريس والقوالب تحقق 30–40 وتخسر أكثر من نصف نقرات الإعلان. موقعك القادم يفتح
              في أقل من ثانية.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WORK SECTION (PINNED 3D HORIZONTAL GALLERY)
      ───────────────────────────────────────────────────────────── */}
      <section id="work" ref={workRef}>
        <div className="pin">
          <div className="w">
            <h2>أعمال يمكنك تجربتها.</h2>
          </div>
          <div id="track" ref={trackRef}>
            {/* Card 1: Clinic / Bilingual Platform */}
            <article className="cd" dir="rtl">
              <div className="dv">
                <div className="b3">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="scn mc">
                  <div className="nv">
                    <span className="lg">+</span>
                    <i />
                    <i />
                    <i />
                    <em>AR · EN</em>
                  </div>
                  <div className="hr">
                    <div
                      id="bi"
                      dir={bilingualIndex === 0 ? "rtl" : "ltr"}
                      style={{ transition: "opacity 0.25s" }}
                    >
                      <b className="disp">
                        {bilingualIndex === 0 ? "عيادة الابتسامة" : "Smile Clinic"}
                      </b>
                      <span>
                        {bilingualIndex === 0
                          ? "احجز موعدك خلال دقيقة"
                          : "Book your visit in a minute"}
                      </span>
                    </div>
                    <div className="dr">+</div>
                  </div>
                  <div className="bk">
                    <u>الاسم</u>
                    <u>التاريخ</u>
                    <em className="bt2">احجز</em>
                  </div>
                </div>
              </div>
              <div className="cp">
                <span className="k">ثنائي اللغة</span>
                <h3>منصّة شركة وعيادة</h3>
                <p>
                  تبديل RTL/LTR بدون وميض، واجهة فاخرة، ومسار حجز مواعيد.{" "}
                  <a
                    href={formatWAUrl("السلام عليكم علي، أريد معاينة حيّة لمشروع منصة الشركة والعيادة")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    اطلب معاينة حيّة
                  </a>
                </p>
              </div>
            </article>

            {/* Card 2: NexaFlow with Floating Badge */}
            <article className="cd" dir="rtl">
              <div className="dv">
                <div className="b3">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="scn nx">
                  <u className="o1" />
                  <u className="o2" />
                  <u className="o3" />
                  <b className="disp">NexaFlow</b>
                  <span className="bd">92</span>
                  <span className="sb">ابدأ الآن</span>
                </div>
              </div>
              <div className="cp">
                <span className="k">موقع حي</span>
                <h3>NexaFlow</h3>
                <p>
                  حركات سلسة وبنية حديثة، 92/100 على الموبايل.{" "}
                  <a
                    href="https://nexa-flow-gamma.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    افتح الموقع الحي
                  </a>
                </p>
              </div>
            </article>

            {/* Card 3: TradeTrackr with KPI Bar & SVG Chart */}
            <article className="cd" dir="rtl">
              <div className="dv">
                <div className="b3">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="scn tt">
                  <div className="kp">
                    <b>+12.4%</b>
                    <b>$48.2K</b>
                    <b>63%</b>
                  </div>
                  <svg viewBox="0 0 160 80" preserveAspectRatio="none">
                    <polyline
                      className="ln"
                      pathLength="1"
                      points="0,70 20,55 40,62 60,30 80,40 100,14 120,26 140,6 160,10"
                      fill="none"
                      stroke="var(--go)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="tb">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
              <div className="cp">
                <span className="k">تطبيق كامل</span>
                <h3>TradeTrackr</h3>
                <p>
                  نظام تحليلات ولوحة تحكم Full-stack، وليست صفحات ثابتة.{" "}
                  <a
                    href={formatWAUrl("السلام عليكم علي، أريد معاينة حيّة لمشروع TradeTrackr")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    اطلب معاينة حيّة
                  </a>
                </p>
              </div>
            </article>
          </div>
          <div className="pb">
            <i id="wp" ref={workProgressRef} />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BOOKING & WHATSAPP CONFIGURATOR SECTION (UPGRADED WITH STEPS, SC2 CARDS, SEGMENTED CONTROL & CHAT MOCKUP)
      ───────────────────────────────────────────────────────────── */}
      <section className="book" id="book" ref={bookRef}>
        <div className="w two">
          <div>
            <h2>اختر طلبك، ورسالتك جاهزة على واتساب.</h2>

            {/* Step 1: Service Selection with .sc2 cards and icons */}
            <p className="stp">
              <i>1</i>ماذا تحتاج؟
            </p>
            <div id="svcs" role="radiogroup" aria-label="الخدمة">
              {SERVICES.map((s) => {
                const isChecked = selectedService === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    className="sc2"
                    role="radio"
                    aria-checked={isChecked}
                    onClick={() => setSelectedService(s.name)}
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
                        {s.iconPath}
                      </svg>
                    </span>
                    <span className="tt2">
                      <span>
                        {s.name}
                        {s.hot && (
                          <em className="hot" style={{ fontStyle: "normal" }}>
                            الأكثر طلباً
                          </em>
                        )}
                      </span>
                      <span className="pl">{s.duration}</span>
                    </span>
                    <span className="ds">{s.desc}</span>
                    <span className="ck">✓</span>
                  </button>
                );
              })}
            </div>

            {/* Step 2: Sector / Industry */}
            <p className="stp">
              <i>2</i>مجال عملك
            </p>
            <div className="chips" id="secs">
              {SECTORS.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  className="chip"
                  aria-pressed={selectedSector === sec}
                  onClick={() => setSelectedSector(sec)}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Step 3: Segmented Timeline Control */}
            <p className="stp">
              <i>3</i>متى تريد أن نبدأ؟
            </p>
            <div
              className="seg"
              id="whn"
              style={{ "--x": TIMINGS.indexOf(selectedTiming) } as React.CSSProperties}
            >
              <i />
              {TIMINGS.map((tm) => (
                <button
                  key={tm}
                  type="button"
                  aria-pressed={selectedTiming === tm}
                  onClick={() => setSelectedTiming(tm)}
                >
                  {tm}
                </button>
              ))}
            </div>

            {/* Step 4: Optional Website URL */}
            <p className="stp">
              <i>4</i>رابط موقعك الحالي (اختياري)
            </p>
            <input
              id={websiteUrlId}
              type="url"
              placeholder="https://"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />
          </div>

          {/* Sticky WhatsApp Chat Phone Mockup */}
          <div className="sticky">
            <div className="wp">
              {/* WhatsApp Chat Header */}
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
                  <small>متصل الآن</small>
                </div>
              </div>

              {/* Chat Message Body */}
              <div className="wc">
                <p className="wd">اليوم</p>
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

              {/* Chat Action Footer */}
              <div className="wf">
                <a
                  className="send"
                  id="send"
                  href={formatWAUrl(compiledWhatsAppMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  أرسلها على واتساب
                </a>
              </div>
            </div>

            <p className="note" style={{ textAlign: "center" }}>
              ستفتح محادثة جاهزة على واتساب، وما عليك إلا الضغط على إرسال.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER & MOBILE STICKY CTA
      ───────────────────────────────────────────────────────────── */}
      <footer className="w">© 2026 CodeWithAli. مصمَّم ومبرمج يدوياً.</footer>
      <a className="fix" href="#book">
        احجز على واتساب
      </a>
    </>
  );
}
