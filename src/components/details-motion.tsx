"use client";

import { useEffect } from "react";

const SELECTOR = ".service-details, .faq-list details, .extra-details";

// Browsers that can animate to `auto` height use the CSS in motion.css. This is
// the same open/close motion for the rest (notably Safari on iPhone). Native
// <details> keeps working untouched if this never runs.
export default function DetailsMotion() {
  useEffect(() => {
    if (
      CSS.supports("interpolate-size: allow-keywords") &&
      CSS.supports("selector(details::details-content)")
    )
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map<
      HTMLDetailsElement,
      { animation: Animation; closing: boolean }
    >();

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const summary = event.target.closest("summary");
      const details = summary?.parentElement;
      if (
        !(details instanceof HTMLDetailsElement) ||
        !details.matches(SELECTOR) ||
        preference.matches
      )
        return;
      event.preventDefault();
      const current = active.get(details);
      const from = details.offsetHeight;
      const wasOpen = details.open && !current?.closing;
      current?.animation.cancel();
      // Measure both resting heights synchronously; nothing paints in between.
      details.open = !wasOpen;
      const target = details.offsetHeight;
      details.open = true;
      const animation = details.animate(
        [
          { blockSize: `${from}px`, overflow: "clip" },
          { blockSize: `${target}px`, overflow: "clip" },
        ],
        { duration: 250, easing: "cubic-bezier(0.2, 0, 0, 1)" },
      );
      active.set(details, { animation, closing: wasOpen });
      animation.onfinish = () => {
        active.delete(details);
        if (wasOpen) details.open = false;
      };
    };
    const settle = () => {
      if (!preference.matches) return;
      active.forEach(({ animation }) => animation.finish());
    };
    document.addEventListener("click", onClick);
    preference.addEventListener("change", settle);
    return () => {
      document.removeEventListener("click", onClick);
      preference.removeEventListener("change", settle);
      active.forEach(({ animation }) => animation.finish());
    };
  }, []);
  return null;
}
