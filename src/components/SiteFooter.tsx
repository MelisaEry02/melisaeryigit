import Link from "next/link";

type Props = {
  siteName: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  cvUrl?: string;
};

export function SiteFooter({ siteName, social, cvUrl }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-pink-200/70">
      <div className="site-shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-ink">{siteName}</p>
          <p className="mt-1 text-sm text-ink-soft">
            © {year} — kişisel site, local sürüm
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink-soft">
          {social.github ? (
            <a href={social.github} target="_blank" rel="noreferrer" className="nav-link">
              GitHub
            </a>
          ) : null}
          {social.linkedin ? (
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="nav-link">
              LinkedIn
            </a>
          ) : null}
          {social.instagram ? (
            <a href={social.instagram} target="_blank" rel="noreferrer" className="nav-link">
              Instagram
            </a>
          ) : null}
          {cvUrl ? (
            <a href={cvUrl} target="_blank" rel="noreferrer" className="nav-link">
              CV indir
            </a>
          ) : null}
          <Link href="/iletisim" className="nav-link">
            İletişim
          </Link>
        </div>
      </div>
    </footer>
  );
}
