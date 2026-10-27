"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

const DURATION_MS = 2000;
const FADE_MS = 400;

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
    left: `${(i * 37 + 11) % 100}%`,
    size: 10 + ((i * 7) % 14),
    delay: (i % 8) * 0.12,
    duration: 1.55 + (i % 5) * 0.2,
    opacity: 0.5 + (i % 4) * 0.1,
    drift: ((i % 5) - 2) * 12,
  }));
}

export function PageSplash({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [nameWhite, setNameWhite] = useState(false);
  const flakes = useMemo(() => makeFlakes(20), []);

  useEffect(() => {
    setShow(true);
    setLeaving(false);
    setNameWhite(false);

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const t = window.setTimeout(() => setShow(false), 180);
      return () => window.clearTimeout(t);
    }

    const toWhite = window.setTimeout(() => setNameWhite(true), 650);
    const toLeave = window.setTimeout(
      () => setLeaving(true),
      DURATION_MS - FADE_MS
    );
    const toHide = window.setTimeout(() => setShow(false), DURATION_MS);

    return () => {
      window.clearTimeout(toWhite);
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

      <div className="page-splash__brand">
        <SnowflakeLogo className="page-splash__mark" title="" />
        <p
          className={`page-splash__name font-display${
            nameWhite ? " page-splash__name--white" : ""
          }`}
        >
          {siteName || "Melisa Eryiğit"}
        </p>
      </div>
    </div>
  );
}
