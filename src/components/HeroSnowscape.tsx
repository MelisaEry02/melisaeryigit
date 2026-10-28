import { SnowflakeLogo } from "@/components/SnowflakeLogo";

/**
 * Sıra: başta yer/kardan adam yok → kar düşer → birikir →
 * birikim artar → kardan adam parça parça oluşur; yerde kar kalır.
 */
export function HeroSnowscape() {
  const flakes = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div className="hero-snow" aria-hidden>
      <div className="hero-snow__fall">
        {flakes.map((i) => {
          const size = 15 + (i % 8) * 3.5;
          return (
            <span
              key={i}
              className={`hero-snow__flake${i % 4 === 0 ? " hero-snow__flake--dot" : ""}`}
              style={{
                left: `${(i * 3.2 + 1) % 98}%`,
                animationDelay: `${-((i * 0.28) % 4.5)}s`,
                animationDuration: `${3.8 + (i % 7) * 0.55}s`,
                width: size,
                height: size,
                ["--drift" as string]: `${((i % 5) - 2) * 20}px`,
              }}
            >
              {i % 4 === 0 ? (
                <span className="hero-snow__dot" />
              ) : (
                <SnowflakeLogo title="" />
              )}
            </span>
          );
        })}
      </div>

      {/* Başta gizli; animasyonla büyüyen birikim */}
      <div className="hero-snow__ground hero-snow__ground--base" />
      <div className="hero-snow__ground hero-snow__ground--heap" />

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
