const IG = "https://instagram.com/melisaerygit";
const TT = "https://www.tiktok.com/@melisaerygit";
const WA = "https://wa.me/905528465257";
const PHONE = "05528465257";
const PHONE_TEL = "tel:+905528465257";
const EMAIL = "melisaeryigit02@gmail.com";
const LOCATION = "İstanbul Kağıthane";
const LINKEDIN_PLACEHOLDER = "https://www.linkedin.com/in/melisaeryigit";
const GITHUB_PLACEHOLDER = "https://github.com/";

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
      <path d="M14.2 3h2.1c.2 1.7 1.2 3.2 2.7 4.1v2.2c-1.1-.1-2.1-.5-3-1.1v6.3c0 3.1-2.5 5.6-5.6 5.6S4.8 17.6 4.8 14.5 7.3 8.9 10.4 8.9c.3 0 .6 0 .9.1v2.3c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V3z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
      <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38A9.95 9.95 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.94C22 6.45 17.54 2 12.04 2zm0 18.15c-1.54 0-3.04-.41-4.35-1.2l-.31-.18-3.13.82.84-3.05-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23s8.25 3.69 8.25 8.23-3.7 8.31-8.09 8.31zm4.53-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.74 1.49.64 2.08.7 2.83.59.43-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
      <path d="M6.94 8.5H3.75V20h3.19V8.5zM5.34 7.16c1.02 0 1.85-.83 1.85-1.85S6.36 3.46 5.34 3.46 3.5 4.29 3.5 5.31s.82 1.85 1.84 1.85zM20.25 20h-3.18v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.88V8.5h3.05v1.57h.04c.43-.8 1.46-1.65 3.01-1.65 3.22 0 3.81 2.12 3.81 4.88V20z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16.5 12.5 20.5 14v3a2 2 0 0 1-2.2 2A15 15 0 0 1 5 7.2 2 2 0 0 1 7 3z" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.67.94.67 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

/** Header’da sadece IG + TikTok — URL’ler admin/seed’den; hardcoded ezme. */
export function HeaderSocialLinks({
  instagram,
  tiktok,
}: {
  instagram?: string;
  tiktok?: string;
} = {}) {
  const ig = (instagram || "").trim();
  const tt = (tiktok || "").trim();
  const igOk = /^https?:\/\//i.test(ig);
  const ttOk = /^https?:\/\/(www\.)?tiktok\.com\//i.test(tt);

  return (
    <div className="header-social">
      {igOk ? (
        <a
          href={ig}
          target="_blank"
          rel="noreferrer"
          className="header-social__link"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      ) : null}
      {ttOk ? (
        <a
          href={tt}
          target="_blank"
          rel="noreferrer"
          className="header-social__link"
          aria-label="TikTok"
        >
          <TikTokIcon />
        </a>
      ) : null}
    </div>
  );
}

export const SOCIAL = {
  instagram: IG,
  tiktok: TT,
  whatsapp: WA,
  phone: PHONE,
  phoneTel: PHONE_TEL,
  email: EMAIL,
  location: LOCATION,
  linkedinPlaceholder: LINKEDIN_PLACEHOLDER,
  githubPlaceholder: GITHUB_PLACEHOLDER,
};
