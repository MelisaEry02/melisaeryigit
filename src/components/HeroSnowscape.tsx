import { SnowflakeLogo } from "@/components/SnowflakeLogo";

/** Hero: düşen kar + yer birikimi + kardan adam (CSS, az eleman). */
export function HeroSnowscape() {
  const flakes = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="hero-snow" aria-hidden>
      <div className="hero-snow__fall">
        {flakes.map((i) => (
          <span
            key={i}
            className="hero-snow__flake"
            style={{
              left: `${(i * 7.1 + 3) % 100}%`,
              animationDelay: `${(i % 7) * 0.55}s`,
              animationDuration: `${7 + (i % 5) * 1.1}s`,
              ["--size" as string]: `${10 + (i % 5) * 3}px`,
              opacity: 0.35 + (i % 4) * 0.1,
            }}
          >
            <SnowflakeLogo title="" />
          </span>
        ))}
      </div>

      <div className="hero-snow__ground" />

      <div className="hero-snow__man">
        <span className="hero-snow__man-ball hero-snow__man-ball--base" />
        <span className="hero-snow__man-ball hero-snow__man-ball--mid" />
        <span className="hero-snow__man-ball hero-snow__man-ball--head" />
        <span className="hero-snow__man-eye hero-snow__man-eye--l" />
        <span className="hero-snow__man-eye hero-snow__man-eye--r" />
        <span className="hero-snow__man-nose" />
        <span className="hero-snow__man-arm hero-snow__man-arm--l" />
        <span className="hero-snow__man-arm hero-snow__man-arm--r" />
      </div>
    </div>
  );
}
