"use client";

import { useEffect } from "react";

/** Hafif scroll parallax — arka plan katmanlarını yormadan kaydırır. */
export function ScrollAtmosphere() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        document.documentElement.style.setProperty(
          "--scroll-y",
          `${Math.min(y, 2400)}px`
        );
        document.documentElement.style.setProperty(
          "--parallax-a",
          `${y * 0.06}px`
        );
        document.documentElement.style.setProperty(
          "--parallax-b",
          `${y * -0.04}px`
        );
        ticking = false;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-atmosphere" aria-hidden>
      <span className="scroll-atmosphere__orb scroll-atmosphere__orb--a" />
      <span className="scroll-atmosphere__orb scroll-atmosphere__orb--b" />
    </div>
  );
}
