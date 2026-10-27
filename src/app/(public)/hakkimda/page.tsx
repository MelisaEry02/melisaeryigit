import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = { title: "Hakkımda" };

export default function AboutPage() {
  const settings = getSettings();
  const paragraphs = (settings.about_long || settings.about_short || "")
    .split(/\n\n+/)
    .filter(Boolean);

  return (
    <div className="site-shell py-16 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose">
        Hakkımda
      </p>
      <h1 className="type-h1 mt-3">
        {settings.site_name || "Melisa Eryiğit"}
      </h1>
      <p className="mt-4 max-w-2xl type-lead">{settings.about_short}</p>

      <div className="mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {settings.cv_url ? (
          <a
            href={settings.cv_url}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            CV indir
          </a>
        ) : null}
        <Link href="/iletisim" className="btn btn-ghost">
          İletişim
        </Link>
      </div>
    </div>
  );
}
