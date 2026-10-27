type Props = {
  className?: string;
  title?: string;
};

/** Marka kartanesi — splash, header ve hero’da ortak. */
export function SnowflakeLogo({
  className = "",
  title = "Melisa Eryiğit",
}: Props) {
  return (
    <svg
      className={`snowflake-logo ${className}`.trim()}
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 6v52M6 32h52" />
        <path d="M14.5 14.5l35 35M49.5 14.5l-35 35" />
        <path d="M32 14l-5 5m5-5l5 5M32 50l-5-5m5 5l5-5" />
        <path d="M14 32l5-5m-5 5l5 5M50 32l-5-5m5 5l-5 5" />
        <path d="M19.5 19.5l4.5 1.5m-4.5-1.5l1.5 4.5M44.5 19.5l-4.5 1.5m4.5-1.5l-1.5 4.5" />
        <path d="M19.5 44.5l4.5-1.5m-4.5 1.5l1.5-4.5M44.5 44.5l-4.5-1.5m4.5 1.5l-1.5-4.5" />
        <circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
