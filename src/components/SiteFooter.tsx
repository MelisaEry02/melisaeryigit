import Link from "next/link";
import { CvLink } from "@/components/CvLink";
import {
  InstagramIcon,
  SOCIAL,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

type Props = {
  siteName: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
  cvUrl?: string;
};

export function SiteFooter({ siteName, social, cvUrl }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="site-footer__brand">
            <SnowflakeLogo className="site-footer__mark" title="" />
            <p className="font-display text-2xl text-ink">{siteName}</p>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
            Tasarım, yazılım ve merak — kişisel notlar burada toplanır.
          </p>
          <p className="mt-2 text-sm text-ink-soft">{SOCIAL.location}</p>
          <p className="mt-3 text-xs text-ink-soft/80">© {year}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-soft">
          <a
            href={SOCIAL.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="nav-link inline-flex items-center gap-1.5"
          >
            <WhatsAppIcon className="text-base" />
            WhatsApp
          </a>
          {social.instagram ? (
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="nav-link inline-flex items-center gap-1.5"
            >
              <InstagramIcon className="text-base" />
              Instagram
            </a>
          ) : null}
          {social.tiktok ? (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="nav-link inline-flex items-center gap-1.5"
            >
              <TikTokIcon className="text-base" />
              TikTok
            </a>
          ) : null}
          {social.github ? (
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          ) : null}
          {social.linkedin ? (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          ) : null}
          <CvLink cvUrl={cvUrl} variant="text" />
          <Link href="/hakkimda" className="nav-link">
            Hakkımda
          </Link>
          <Link href="/iletisim" className="nav-link">
            İletişim
          </Link>
        </div>
      </div>
    </footer>
  );
}
