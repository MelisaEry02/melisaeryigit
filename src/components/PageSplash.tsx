"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

const DURATION_MS = 3200;
const FADE_MS = 640;

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
    size: 14 + ((i * 11) % 22),
    delay: (i % 9) * 0.18,
    duration: 2.8 + (i % 5) * 0.35,
    opacity: 0.22 + (i % 4) * 0.1,
    drift: ((i % 6) - 2.5) * 22,
  }));
}

export function PageSplash({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<"boot" | "mark" | "name" | "white" | "hold">(
    "boot"
  );
  const flakes = useMemo(() => makeFlakes(16), []);
  const name = siteName || "Melisa Eryiğit";

  useEffect(() => {
    setShow(true);
    setLeaving(false);
    setPhase("boot");

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const t = window.setTimeout(() => setShow(false), 140);
      return () => window.clearTimeout(t);
    }

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
  }, [pathname]);

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
