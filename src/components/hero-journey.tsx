"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Check,
  Code2,
  MessageCircle,
  MousePointer2,
  RotateCcw,
} from "lucide-react";

// This is a single, bounded illustration, never a loading state or a live lead.
export default function HeroJourney() {
  const root = useRef<HTMLDivElement>(null);
  const replay = useRef<() => void>(() => {});

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    let played = false;
    let generation = 0;

    function settle() {
      generation++;
      animations.forEach((animation) => animation.cancel());
      animations = [];
      element!.dataset.journeyState = "complete";
    }

    function play() {
      settle();
      if (preference.matches || document.hidden || !element) return;
      played = true;
      const current = generation;
      element.dataset.journeyState = "playing";
      function animate(
        selector: string,
        frames: Keyframe[],
        duration: number,
        delay: number,
      ) {
        const target = element!.querySelector<HTMLElement | SVGElement>(
          selector,
        );
        if (!target) return;
        animations.push(
          target.animate(frames, {
            duration,
            delay,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            fill: "backwards",
          }),
        );
      }
      const enter = [
        { opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
      ];
      [0, 650, 2900].forEach((delay, index) => {
        animate(
          `.journey-steps li:nth-child(${index + 1}) .journey-step-track`,
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          600,
          delay,
        );
        animate(
          `.journey-steps li:nth-child(${index + 1}) .journey-step-number`,
          [{ opacity: 0.35 }, { opacity: 1 }],
          300,
          delay,
        );
      });
      animate(".journey-ad", enter, 300, 0);
      animate(
        ".ad-icon svg",
        [
          { transform: "translate(7px, -7px)" },
          { transform: "translate(0, 0)" },
        ],
        300,
        180,
      );
      animate(
        ".journey-line",
        [
          { transform: "scaleY(0)", opacity: 0 },
          { transform: "scaleY(1)", opacity: 1 },
        ],
        400,
        350,
      );
      animate(".mini-page", enter, 300, 650);
      animate(".mini-step", enter, 300, 850);
      // The assistant "types" before its reply appears, like a real chat.
      animate(
        ".journey-typing",
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)", offset: 0.2 },
          { opacity: 1, transform: "translateY(0)", offset: 0.85 },
          { opacity: 0, transform: "translateY(0)" },
        ],
        750,
        950,
      );
      [0, 1, 2].forEach((dot) =>
        animate(
          `.journey-typing i:nth-child(${dot + 1})`,
          [
            { opacity: 0.35, transform: "translateY(0)" },
            { opacity: 1, transform: "translateY(-3px)", offset: 0.25 },
            { opacity: 0.35, transform: "translateY(0)", offset: 0.5 },
            { opacity: 1, transform: "translateY(-3px)", offset: 0.75 },
            { opacity: 0.35, transform: "translateY(0)" },
          ],
          600,
          1000 + dot * 110,
        ),
      );
      [
        ".mini-content h2",
        ".mini-content p",
        ".mini-features",
        ".mini-button",
      ].forEach((selector, index) =>
        animate(selector, enter, 300, 1600 + index * 100),
      );
      animate(
        ".mini-orbit",
        [
          { transform: "rotate(-42deg)", opacity: 0 },
          { transform: "rotate(-16deg)", opacity: 1 },
        ],
        1000,
        800,
      );
      animate(
        ".journey-pointer",
        [
          { opacity: 0, transform: "translate(-28px, 24px)" },
          { opacity: 1, transform: "translate(0, 0)", offset: 0.45 },
          { opacity: 1, transform: "translate(0, 0)", offset: 0.8 },
          { opacity: 0, transform: "translate(0, 0)" },
        ],
        800,
        2100,
      );
      animate(
        ".mini-button",
        [{ scale: "1" }, { scale: ".96", offset: 0.5 }, { scale: "1" }],
        300,
        2500,
      );
      animate(
        ".journey-click-ring",
        [
          { opacity: 0.8, transform: "scale(.5)" },
          { opacity: 0, transform: "scale(1.5)" },
        ],
        450,
        2550,
      );
      animate(".journey-message", enter, 300, 2900);
      animate(
        ".journey-message p",
        [{ opacity: 0 }, { opacity: 1 }],
        300,
        3000,
      );
      const path = element.querySelector<SVGPathElement>(".journey-check path");
      if (path) {
        const length = path.getTotalLength();
        animate(
          ".journey-check path",
          [
            { strokeDasharray: `${length}`, strokeDashoffset: `${length}` },
            { strokeDasharray: `${length}`, strokeDashoffset: "0" },
          ],
          350,
          3250,
        );
      }
      void Promise.all(animations.map((animation) => animation.finished))
        .then(() => {
          if (current === generation) element.dataset.journeyState = "complete";
        })
        .catch(() => {
          /* Cancelling on exit or reduced motion restores the static illustration. */
        });
    }
    replay.current = play;
    element.dataset.motionEnhanced = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !played &&
          !preference.matches &&
          !document.hidden
        )
          play();
        else if (!entry.isIntersecting && played) settle();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    const onPreferenceChange = () => {
      if (preference.matches) settle();
    };
    const onVisibilityChange = () => {
      // Finish on returning from another tab; never surprise the visitor with a resumed sequence.
      if (document.hidden) settle();
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      settle();
      observer.disconnect();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      replay.current = () => {};
      delete element.dataset.motionEnhanced;
    };
  }, []);

  return (
    <div
      ref={root}
      className="hero-visual"
      aria-label="محاكاة توضيحية: استفسار زبون، تنظيم الطلب بمساعد ذكي، ثم متابعة الموظف"
    >
      <ol className="journey-steps" aria-label="من الاستفسار إلى المتابعة">
        {["استفسار زبون", "تنظيم الطلب", "متابعة الموظف"].map((label, index) => (
          <li key={label}>
            <span className="journey-step-number">{["١", "٢", "٣"][index]}</span>
            <span>{label}</span>
            <span className="journey-step-track" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="journey-ad">
        <span className="ad-icon">
          <MousePointer2 size={19} />
        </span>
        <div>
          <small>٠١ / استفسار الزبون</small>
          <b>أحتاج موعد. شنو المتوفر؟</b>
        </div>
        <ArrowLeft className="journey-ad-arrow" size={21} />
      </div>
      <div className="journey-line" aria-hidden="true" />
      <div className="mini-page">
        <div className="mini-bar">
          <span className="mini-logo">
            <Code2 size={15} /> مشروعك
          </span>
          <span dir="ltr">your-business.iq</span>
          <i aria-hidden="true">•••</i>
        </div>
        <div className="mini-content">
          <span className="mini-step">٠٢ / مساعد استقبال ذكي</span>
          <div className="mini-reply">
            <span className="journey-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <h2>
              يجمع الطلب.
              <br />
              <em>ويوضّح الخطوة.</em>
            </h2>
          </div>
          <p>
            يسأل عن الخدمة والوقت المناسب.
            <br />
            ويجهّز الطلب لمتابعة الموظف.
          </p>
          <div className="mini-features">
            <span>
              <Check size={13} /> طلب منظّم
            </span>
            <span>
              <Check size={13} /> مراجعة بشرية
            </span>
          </div>
          <div className="mini-button">
            <MessageCircle size={17} /> جهّز المتابعة <ArrowLeft size={16} />
            <span className="journey-click-ring" aria-hidden="true" />
            <MousePointer2
              className="journey-pointer"
              size={24}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="mini-orbit" aria-hidden="true">
          <div>
            <MousePointer2 size={38} strokeWidth={1.4} />
          </div>
        </div>
      </div>
      <div className="journey-message">
        <span className="message-symbol">
          <MessageCircle size={23} />
        </span>
        <div>
          <small>٠٣ / متابعة الموظف</small>
          <p>
            طلب موعد ينتظر التأكيد.
            <br />
            الموظف يراجع الجدول ويتواصل.
          </p>
        </div>
        <Check className="journey-check" size={18} />
      </div>
      <div className="journey-caption">
        <p className="visual-note">
          محاكاة: استفسار ← تنظيم ← متابعة
        </p>
        <button
          className="journey-replay"
          type="button"
          onClick={() => replay.current()}
        >
          <RotateCcw size={14} /> أعد المشهد
        </button>
      </div>
    </div>
  );
}
