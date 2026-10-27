type Props = {
  cvUrl?: string;
  className?: string;
  variant?: "primary" | "ghost" | "text";
};

export function CvLink({
  cvUrl,
  className = "",
  variant = "ghost",
}: Props) {
  const label = "CV indir";
  const btn =
    variant === "primary"
      ? "btn btn-primary"
      : variant === "ghost"
        ? "btn btn-ghost"
        : "nav-link";

  if (cvUrl) {
    return (
      <a
        href={cvUrl}
        target="_blank"
        rel="noreferrer"
        className={`${btn} ${className}`.trim()}
      >
        {label}
      </a>
    );
  }

  return (
    <span
      className={`${btn} ${className} cv-link--placeholder`.trim()}
      title="Admin → Site ayarları → CV URL ekle"
    >
      {label} (yakında)
    </span>
  );
}
