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
      [
        ".mini-step",
        ".mini-content h2",
        ".mini-content p",
        ".mini-features",
        ".mini-button",
      ].forEach((selector, index) =>
        animate(selector, enter, 300, 850 + index * 100),
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
        1550,
      );
      animate(
        ".mini-button",
        [{ scale: "1" }, { scale: ".96", offset: 0.5 }, { scale: "1" }],
        300,
        1950,
      );
      animate(
        ".journey-click-ring",
        [
          { opacity: 0.8, transform: "scale(.5)" },
          { opacity: 0, transform: "scale(1.5)" },
        ],
        450,
        2000,
      );
      animate(".journey-message", enter, 300, 2350);
      animate(
        ".journey-message p",
        [{ opacity: 0 }, { opacity: 1 }],
        300,
        2450,
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
          2700,
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
      aria-label="مثال توضيحي لمسار من الإعلان إلى صفحة واضحة ثم استفسار واتساب"
    >
      <div className="visual-label">
        <span>طريق أقصر للتواصل</span>
        <span dir="ltr">THE CLICK → THE CONVERSATION</span>
      </div>
      <div className="journey-ad">
        <span className="ad-icon">
          <MousePointer2 size={19} />
        </span>
        <div>
          <small>٠١ / الإعلان</small>
          <b>لفت انتباهه. هسه شنو؟</b>
        </div>
        <ArrowLeft size={21} />
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
          <span className="mini-step">٠٢ / صفحة توضّح العرض</span>
          <h2>
            كل اللي يحتاجه.
            <br />
            <em>حتى ياخذ الخطوة.</em>
          </h2>
          <p>
            خدمتك واضحة. التفاصيل قريبة.
            <br />
            والتواصل بضغطة واحدة.
          </p>
          <div className="mini-features">
            <span>
              <Check size={13} /> عرض مفهوم
            </span>
            <span>
              <Check size={13} /> موبايل أولاً
            </span>
          </div>
          <div className="mini-button">
            <MessageCircle size={17} /> اسأل عن الخدمة <ArrowLeft size={16} />
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
          <span>وضوح</span>
          <span>سهولة</span>
          <span>تواصل</span>
        </div>
      </div>
      <div className="journey-message">
        <span className="message-symbol">
          <MessageCircle size={23} />
        </span>
        <div>
          <small>٠٣ / بداية محادثة</small>
          <p>
            السلام عليكم، مهتم بخدمتكم.
            <br />
            ممكن أعرف التفاصيل؟
          </p>
        </div>
        <Check className="journey-check" size={18} />
      </div>
      <div className="journey-caption">
        <p className="visual-note">
          مثال توضيحي للمسار، مو نتيجة مبيعات مضمونة.
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
