import { SnowflakeLogo } from "@/components/SnowflakeLogo";

/** Hero: net görünen düşen kar → birikim → kardan adam. */
export function HeroSnowscape() {
  const flakes = Array.from({ length: 28 }, (_, i) => i);

  return (
    <div className="hero-snow" aria-hidden>
      <div className="hero-snow__fall">
        {flakes.map((i) => {
          const size = 16 + (i % 7) * 4;
          return (
            <span
              key={i}
              className={`hero-snow__flake${i % 3 === 0 ? " hero-snow__flake--dot" : ""}`}
              style={{
                left: `${(i * 3.7 + 1.5) % 97}%`,
                animationDelay: `${-((i * 0.37) % 5)}s`,
                animationDuration: `${4.2 + (i % 6) * 0.7}s`,
                width: size,
                height: size,
                ["--drift" as string]: `${((i % 5) - 2) * 18}px`,
              }}
            >
              {i % 3 === 0 ? (
                <span className="hero-snow__dot" />
              ) : (
                <SnowflakeLogo title="" />
              )}
            </span>
          );
        })}
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
