"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

const DURATION_MS = 2800;
const FADE_MS = 520;

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
    left: `${(i * 41 + 7) % 100}%`,
    size: 12 + ((i * 9) % 18),
    delay: (i % 10) * 0.14,
    duration: 2.1 + (i % 6) * 0.28,
    opacity: 0.35 + (i % 5) * 0.1,
    drift: ((i % 7) - 3) * 18,
  }));
}

export function PageSplash({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<"in" | "white" | "hold">("in");
  const flakes = useMemo(() => makeFlakes(26), []);
  const name = siteName || "Melisa Eryiğit";

  useEffect(() => {
    setShow(true);
    setLeaving(false);
    setPhase("in");

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const t = window.setTimeout(() => setShow(false), 160);
      return () => window.clearTimeout(t);
    }

    const toWhite = window.setTimeout(() => setPhase("white"), 900);
    const toHold = window.setTimeout(() => setPhase("hold"), 1600);
    const toLeave = window.setTimeout(
      () => setLeaving(true),
      DURATION_MS - FADE_MS
    );
    const toHide = window.setTimeout(() => setShow(false), DURATION_MS);

    return () => {
      window.clearTimeout(toWhite);
      window.clearTimeout(toHold);
      window.clearTimeout(toLeave);
      window.clearTimeout(toHide);
    };
  }, [pathname]);

  if (!show) return null;

  function skip() {
    setLeaving(true);
    window.setTimeout(() => setShow(false), FADE_MS);
  }

  return (
    <div
      className={`page-splash${leaving ? " page-splash--out" : ""}`}
      role="presentation"
      aria-hidden="true"
      onClick={skip}
    >
      <div className="page-splash__veil" aria-hidden />

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

      <div
        className={`page-splash__brand page-splash__brand--${phase}`}
      >
        <div className="page-splash__mark-wrap">
          <SnowflakeLogo className="page-splash__mark" title="" />
        </div>
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
              style={{ animationDelay: `${0.35 + i * 0.035}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
