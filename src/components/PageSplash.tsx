"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

const DURATION_MS = 3600;
const FADE_MS = 700;

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
    delay: (i % 9) * 0.16,
    duration: 2.6 + (i % 5) * 0.32,
    opacity: 0.28 + (i % 4) * 0.12,
    drift: ((i % 6) - 2.5) * 26,
  }));
}

/**
 * Sadece hard load (layout ilk mount).
 * App Router’da public layout client nav’da kalır → pathname’e bağlı değil.
 */
export function PageSplash({ siteName }: { siteName: string }) {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<"boot" | "mark" | "name" | "white" | "hold">(
    "boot"
  );
  const started = useRef(false);
  const flakes = useMemo(() => makeFlakes(22), []);
  const name = siteName || "Melisa Eryiğit";

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }

    setShow(true);

    const tMark = window.setTimeout(() => setPhase("mark"), 180);
    const tName = window.setTimeout(() => setPhase("name"), 520);
    const tWhite = window.setTimeout(() => setPhase("white"), 1400);
    const tHold = window.setTimeout(() => setPhase("hold"), 2100);
    const tLeave = window.setTimeout(
      () => setLeaving(true),
      DURATION_MS - FADE_MS
    );
    const tHide = window.setTimeout(() => setShow(false), DURATION_MS);

    return () => {
      window.clearTimeout(tMark);
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
              style={{ animationDelay: `${0.55 + i * 0.028}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
