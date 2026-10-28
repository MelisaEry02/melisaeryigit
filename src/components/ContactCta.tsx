import Link from "next/link";

type Props = {
  className?: string;
  variant?: "primary" | "ghost" | "text";
};

export function ContactCta({ className = "", variant = "ghost" }: Props) {
  const btn =
    variant === "primary"
      ? "btn btn-primary"
      : variant === "ghost"
        ? "btn btn-ghost"
        : "nav-link";

  return (
    <Link href="/iletisim" className={`${btn} ${className}`.trim()}>
      İletişime geç
    </Link>
  );
}
