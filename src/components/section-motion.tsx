"use client";

import { useEffect } from "react";

// Content starts visible. Motion enhances entering sections without gating links,
// keyboard navigation, anchor jumps or browsers with JavaScript disabled.
export default function SectionMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets =
      document.querySelectorAll<HTMLElement>("main [data-reveal]");
    const seen = new WeakSet<Element>();
    const active = new Map<Element, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          observer.unobserve(entry.target);
          if (
            preference.matches ||
            document.hidden ||
            entry.target.contains(document.activeElement)
          )
            continue;
          const target = entry.target as HTMLElement;
          target.dataset.entered = "true";
          const animation = target.animate(
            [
              {
                opacity: 0,
                transform: "translateY(12px)",
                filter: "blur(4px)",
              },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
            ],
            {
              duration: 300,
              delay: (Number(target.dataset.reveal) || 0) * 100,
              easing: "ease-out",
              fill: "backwards",
            },
          );
          active.set(target, animation);
          void animation.finished
            .catch(() => {})
            .finally(() => active.delete(target));
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const settle = () => {
      active.forEach((animation) => animation.cancel());
      active.clear();
    };
    const onPreferenceChange = () => {
      if (preference.matches) settle();
    };
    const onFocus = (event: FocusEvent) => {
      active.forEach((animation, target) => {
        if (event.target instanceof Node && target.contains(event.target))
          animation.cancel();
      });
    };
    const onVisibilityChange = () => {
      if (document.hidden) settle();
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      settle();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
  return null;
}
