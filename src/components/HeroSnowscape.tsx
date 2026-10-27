import { SnowflakeLogo } from "@/components/SnowflakeLogo";

/** Hero: yukarıdan düşen kar → yer birikimi → kardan adam (blob yok). */
export function HeroSnowscape() {
  const flakes = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="hero-snow" aria-hidden>
      <div className="hero-snow__fall">
        {flakes.map((i) => (
          <span
            key={i}
            className="hero-snow__flake"
            style={{
              left: `${(i * 5.7 + 2) % 98}%`,
              animationDelay: `${(i % 9) * 0.4}s`,
              animationDuration: `${6.5 + (i % 6) * 0.9}s`,
              ["--size" as string]: `${9 + (i % 6) * 2.5}px`,
              opacity: 0.4 + (i % 4) * 0.12,
            }}
          >
            <SnowflakeLogo title="" />
          </span>
        ))}
      </div>

      <div className="hero-snow__ground" />
      <div className="hero-snow__ground hero-snow__ground--mid" />

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
