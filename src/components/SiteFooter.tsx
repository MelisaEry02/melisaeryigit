import type { ReactNode } from "react";
import { ContactCta } from "@/components/ContactCta";
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SOCIAL,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

type Props = {
  siteName: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    whatsapp?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
};

type ContactItem = {
  key: string;
  href?: string;
  label: string;
  sub: string;
  icon: ReactNode;
  muted?: boolean;
};

export function SiteFooter({ siteName, contact }: Props) {
  const year = new Date().getFullYear();
  const email = contact.email || SOCIAL.email;
  const phone = contact.phone || SOCIAL.phone;
  const location = contact.location || SOCIAL.location;
  const whatsapp = contact.whatsapp || SOCIAL.whatsapp;
  const github = (contact.github || "").trim();
  const linkedin = (contact.linkedin || "").trim();
  const instagram = contact.instagram || SOCIAL.instagram;
  const tiktok = contact.tiktok || SOCIAL.tiktok;
  const phoneTel = phone.replace(/\s/g, "").replace(/^0/, "+90");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  const linkedinOk = /^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedin);
  const githubOk =
    /^https?:\/\/(www\.)?github\.com\/.+/i.test(github) &&
    !/^https?:\/\/(www\.)?github\.com\/?$/i.test(github);

  const items: ContactItem[] = [
    {
      key: "instagram",
      href: instagram,
      label: "Instagram",
      sub: "@melisaerygit",
      icon: <InstagramIcon className="contact-block__icon" />,
    },
    {
      key: "whatsapp",
      href: whatsapp,
      label: "WhatsApp",
      sub: phone,
      icon: <WhatsAppIcon className="contact-block__icon" />,
    },
    {
      key: "tiktok",
      href: tiktok,
      label: "TikTok",
      sub: "@melisaery",
      icon: <TikTokIcon className="contact-block__icon" />,
    },
    linkedinOk
      ? {
          key: "linkedin",
          href: linkedin,
          label: "LinkedIn",
          sub: "Profil",
          icon: <LinkedInIcon className="contact-block__icon" />,
        }
      : {
          key: "linkedin",
          label: "LinkedIn",
          sub: "Admin’den eklenecek",
          icon: <LinkedInIcon className="contact-block__icon" />,
          muted: true,
        },
    githubOk
      ? {
          key: "github",
          href: github,
          label: "GitHub",
          sub: "Kodlar",
          icon: <GithubIcon className="contact-block__icon" />,
        }
      : {
          key: "github",
          label: "GitHub",
          sub: "Admin’den eklenecek",
          icon: <GithubIcon className="contact-block__icon" />,
          muted: true,
        },
    {
      key: "phone",
      href: `tel:${phoneTel}`,
      label: "Telefon",
      sub: phone,
      icon: <PhoneIcon className="contact-block__icon" />,
    },
    {
      key: "email",
      href: `mailto:${email}`,
      label: "E-posta",
      sub: email,
      icon: <MailIcon className="contact-block__icon" />,
    },
    {
      key: "maps",
      href: mapsHref,
      label: "Konum",
      sub: location,
      icon: <PinIcon className="contact-block__icon" />,
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-shell py-12 md:py-14">
        <div className="contact-block">
          <div className="contact-block__intro">
            <div className="site-footer__brand">
              <SnowflakeLogo className="site-footer__mark" title="" />
              <div>
                <p className="font-display text-2xl text-ink">{siteName}</p>
                <p className="text-xs text-ink-soft">Kişisel web sitesi</p>
              </div>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
              Yazışmak veya merhaba demek için buradayım.
            </p>
            <p className="contact-block__loc mt-3">
              <PinIcon className="contact-block__icon" />
              <a href={mapsHref} target="_blank" rel="noreferrer">
                {location}
              </a>
            </p>
            <div className="mt-4">
              <ContactCta variant="ghost" />
            </div>
          </div>

          <ul className="contact-block__grid">
            {items.map((item) => (
              <li key={item.key}>
                {item.muted || !item.href ? (
                  <span className="contact-block__item contact-block__item--muted">
                    {item.icon}
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.sub}</small>
                    </span>
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="contact-block__item"
                    target={
                      item.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    {item.icon}
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.sub}</small>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center text-xs text-ink-soft/80">
          © {year} Melisa Eryiğit Kişisel Web Sitesi
        </p>
      </div>
    </footer>
  );
}
