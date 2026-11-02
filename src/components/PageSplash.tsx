"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

/** Giriş motion + hold = 3.1 sn */
const DURATION_MS = 3100;
const FADE_MS = 350;

type Flake = {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

function makeFlakes(count: number): Flake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 47 + 5) % 100}%`,
    size: 16 + ((i * 11) % 26),
    delay: (i % 9) * 0.05,
    duration: 2 + (i % 5) * 0.25,
    opacity: 0.28 + (i % 4) * 0.12,
    drift: ((i % 6) - 2.5) * 26,
  }));
}

/**
 * Hard load: SSR + useState(true) → pembe kapak gecikmesiz.
 * Hold ~3.5 sn (toplam ~4.5 sn).
 */
export function PageSplash({ siteName }: { siteName: string }) {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<"mark" | "name" | "white" | "hold">("mark");
  const started = useRef(false);
  const flakes = useMemo(() => makeFlakes(18), []);
  const name = siteName || "Melisa Eryiğit";

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // React ağacından .remove() etme — soft nav’da insertBefore/removeChild patlar.
    // Sadece gizle; node layout’ta kalsın.
    const boot = document.getElementById("me-boot-splash");
    if (boot) boot.setAttribute("data-done", "1");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }

    const tName = window.setTimeout(() => setPhase("name"), 0);
    const tWhite = window.setTimeout(() => setPhase("white"), 320);
    const tHold = window.setTimeout(() => setPhase("hold"), 700);
    const tLeave = window.setTimeout(
      () => setLeaving(true),
      DURATION_MS - FADE_MS
    );
    const tHide = window.setTimeout(() => setShow(false), DURATION_MS);

    return () => {
      window.clearTimeout(tName);
      window.clearTimeout(tWhite);
      window.clearTimeout(tHold);
      window.clearTimeout(tLeave);
      window.clearTimeout(tHide);
    };
  }, []);

  if (!show) return null;

  function skip() {
    setLeaving(true);
    window.setTimeout(() => setShow(false), FADE_MS);
  }

  return (
    <div
      className={`page-splash page-splash--${phase}${
        leaving ? " page-splash--out" : ""
      }`}
      role="presentation"
      aria-hidden="true"
      onClick={skip}
    >
      <div className="page-splash__grain" aria-hidden />
      <div className="page-splash__veil" aria-hidden />
      <div className="page-splash__bloom" aria-hidden />

      <div className="page-splash__snow" aria-hidden>
        {flakes.map((f) => (
          <span
            key={f.id}
            className="page-splash__flake"
            style={{
              left: f.left,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              opacity: f.opacity,
              ["--drift" as string]: `${f.drift}px`,
            }}
          >
            <SnowflakeLogo className="page-splash__flake-icon" title="" />
          </span>
        ))}
      </div>

      <div className="page-splash__stage">
        <div className="page-splash__ring" aria-hidden />
        <div className="page-splash__mark-wrap">
          <SnowflakeLogo className="page-splash__mark" title="" />
        </div>
        <span className="page-splash__rule" aria-hidden />
        <p
          className={`page-splash__name font-display${
            phase === "white" || phase === "hold"
              ? " page-splash__name--white"
              : ""
          }`}
        >
          {name.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="page-splash__letter"
              style={{ animationDelay: `${i * 0.016}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
