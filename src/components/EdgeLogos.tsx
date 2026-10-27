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
  { top: "8%", left: "3%", size: 28, rot: -12, opacity: 0.14 },
  { top: "22%", right: "4%", size: 22, rot: 18, opacity: 0.12 },
  { top: "48%", left: "2%", size: 34, rot: 8, opacity: 0.1 },
  { top: "63%", right: "3%", size: 26, rot: -20, opacity: 0.13 },
  { top: "82%", left: "5%", size: 20, rot: 14, opacity: 0.11 },
  { top: "35%", right: "6%", size: 18, rot: -8, opacity: 0.09 },
  { top: "90%", right: "8%", size: 24, rot: 6, opacity: 0.1 },
];

/** Alt bölüm kenarlarına sade kartane serpiştirme. */
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
