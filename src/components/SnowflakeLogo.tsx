type Props = {
  className?: string;
  title?: string;
};

/**
 * İnce, altı kollu marka kartanesi.
 * Splash, header ve ana sayfada aynı SVG.
 */
export function SnowflakeLogo({
  className = "",
  title = "Melisa Eryiğit",
}: Props) {
  const decorative = !title;

  return (
    <svg
      className={`snowflake-logo ${className}`.trim()}
      viewBox="0 0 80 80"
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
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Ana kollar: 0° / 60° / 120° */}
        <path d="M40 8v64M8 40h64" />
        <path d="M17.57 17.57l44.86 44.86M62.43 17.57L17.57 62.43" />

        {/* Orta halka */}
        <circle cx="40" cy="40" r="5.5" strokeWidth="1.2" />
        <circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" />

        {/* Uç çatallar — dikey */}
        <path d="M40 12l-4.2 5.2M40 12l4.2 5.2" />
        <path d="M40 68l-4.2-5.2M40 68l4.2-5.2" />
        {/* Yatay */}
        <path d="M12 40l5.2-4.2M12 40l5.2 4.2" />
        <path d="M68 40l-5.2-4.2M68 40l-5.2 4.2" />
        {/* Çapraz */}
        <path d="M20.2 20.2l6.4.4M20.2 20.2l.4 6.4" />
        <path d="M59.8 20.2l-6.4.4M59.8 20.2l-.4 6.4" />
        <path d="M20.2 59.8l6.4-.4M20.2 59.8l.4-6.4" />
        <path d="M59.8 59.8l-6.4-.4M59.8 59.8l-.4-6.4" />

        {/* Ara dallar */}
        <path d="M40 24l-3.2 2.4M40 24l3.2 2.4" />
        <path d="M40 56l-3.2-2.4M40 56l3.2-2.4" />
        <path d="M24 40l2.4-3.2M24 40l2.4 3.2" />
        <path d="M56 40l-2.4-3.2M56 40l-2.4 3.2" />
        <path d="M28.5 28.5l3.8.6M28.5 28.5l.6 3.8" />
        <path d="M51.5 28.5l-3.8.6M51.5 28.5l-.6 3.8" />
        <path d="M28.5 51.5l3.8-.6M28.5 51.5l.6-3.8" />
        <path d="M51.5 51.5l-3.8-.6M51.5 51.5l-.6-3.8" />
      </g>
    </svg>
  );
}
