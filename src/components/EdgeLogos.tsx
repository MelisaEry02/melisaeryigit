import { SnowflakeLogo } from "@/components/SnowflakeLogo";

type Spot = {
  top: string;
  left?: string;
  right?: string;
  size: number;
  rot: number;
  opacity: number;
};

const SPOTS: Spot[] = [
  { top: "4%", left: "2%", size: 26, rot: -14, opacity: 0.18 },
  { top: "9%", right: "3%", size: 22, rot: 16, opacity: 0.16 },
  { top: "14%", left: "5%", size: 18, rot: 8, opacity: 0.14 },
  { top: "18%", right: "6%", size: 30, rot: -10, opacity: 0.17 },
  { top: "24%", left: "1.5%", size: 24, rot: 20, opacity: 0.15 },
  { top: "28%", right: "2%", size: 20, rot: -18, opacity: 0.14 },
  { top: "33%", left: "4%", size: 32, rot: 6, opacity: 0.16 },
  { top: "38%", right: "4.5%", size: 18, rot: 12, opacity: 0.13 },
  { top: "43%", left: "2.5%", size: 22, rot: -8, opacity: 0.15 },
  { top: "48%", right: "1.5%", size: 28, rot: 22, opacity: 0.16 },
  { top: "53%", left: "6%", size: 16, rot: -20, opacity: 0.12 },
  { top: "58%", right: "5%", size: 24, rot: 9, opacity: 0.15 },
  { top: "63%", left: "1%", size: 30, rot: 14, opacity: 0.17 },
  { top: "68%", right: "3%", size: 20, rot: -12, opacity: 0.14 },
  { top: "73%", left: "4.5%", size: 26, rot: 4, opacity: 0.15 },
  { top: "78%", right: "2%", size: 18, rot: -16, opacity: 0.13 },
  { top: "83%", left: "2%", size: 22, rot: 18, opacity: 0.16 },
  { top: "88%", right: "6%", size: 28, rot: -6, opacity: 0.15 },
  { top: "93%", left: "5%", size: 20, rot: 10, opacity: 0.14 },
  { top: "12%", left: "8%", size: 14, rot: -4, opacity: 0.1 },
  { top: "55%", right: "8%", size: 15, rot: 7, opacity: 0.1 },
  { top: "76%", left: "7%", size: 17, rot: -11, opacity: 0.11 },
];

/** Alt bölüm kenarlarına daha sık, sade kartane. */
export function EdgeLogos() {
  return (
    <div className="edge-logos" aria-hidden>
      {SPOTS.map((s, i) => (
        <span
          key={i}
          className="edge-logos__item"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            transform: `rotate(${s.rot}deg)`,
          }}
        >
          <SnowflakeLogo title="" />
        </span>
      ))}
    </div>
  );
}
