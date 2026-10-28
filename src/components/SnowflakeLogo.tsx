type Props = {
  className?: string;
  title?: string;
};

/** Tek kol — 6 kez döndürülerek gerçekçi kristal simetri. */
function CrystalArm() {
  return (
    <g>
      {/* Ana mil */}
      <path d="M0 -7.5 V -44" />
      {/* Üçlü uç */}
      <path d="M0 -44 L -5.5 -37.5 M0 -44 L 5.5 -37.5" />
      {/* Üst yan dallar */}
      <path d="M0 -34 L -7.5 -28.5 M0 -34 L 7.5 -28.5" />
      <path d="M-7.5 -28.5 L -10 -31.5 M7.5 -28.5 L 10 -31.5" />
      {/* Orta yan dallar */}
      <path d="M0 -24 L -9 -17.5 M0 -24 L 9 -17.5" />
      <path d="M-9 -17.5 L -12.5 -20 M9 -17.5 L 12.5 -20" />
      {/* Alt yan dallar */}
      <path d="M0 -15 L -6.5 -10.5 M0 -15 L 6.5 -10.5" />
      {/* Küçük kristal noktalar */}
      <circle cx="0" cy="-29" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="0" cy="-19" r="0.85" fill="currentColor" stroke="none" />
    </g>
  );
}

/**
 * Gerçekçi, ince, 6 kollu kristal kartane.
 * Splash + header + hero aynı marka.
 */
export function SnowflakeLogo({
  className = "",
  title = "Melisa Eryiğit Kişisel Web Sitesi",
}: Props) {
  const decorative = !title;
  const angles = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      className={`snowflake-logo ${className}`.trim()}
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      {!decorative ? <title>{title}</title> : null}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(50 50)"
      >
        {/* Merkez hexagon */}
        <path d="M0 -7.2 L 6.24 -3.6 L 6.24 3.6 L 0 7.2 L -6.24 3.6 L -6.24 -3.6 Z" />
        <circle cx="0" cy="0" r="2.2" fill="currentColor" stroke="none" />
        {angles.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <CrystalArm />
          </g>
        ))}
      </g>
    </svg>
  );
}
