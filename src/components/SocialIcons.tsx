const IG = "https://instagram.com/melisaerygit";
const TT = "https://www.tiktok.com/@melisaery";
const WA = "https://wa.me/905528465257";
const LOCATION = "İstanbul Kağıthane";

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden
      fill="currentColor"
    >
      <path d="M14.2 3h2.1c.2 1.7 1.2 3.2 2.7 4.1v2.2c-1.1-.1-2.1-.5-3-1.1v6.3c0 3.1-2.5 5.6-5.6 5.6S4.8 17.6 4.8 14.5 7.3 8.9 10.4 8.9c.3 0 .6 0 .9.1v2.3c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V3z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden
      fill="currentColor"
    >
      <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38A9.95 9.95 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.94C22 6.45 17.54 2 12.04 2zm0 18.15c-1.54 0-3.04-.41-4.35-1.2l-.31-.18-3.13.82.84-3.05-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23s8.25 3.69 8.25 8.23-3.7 8.31-8.09 8.31zm4.53-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.74 1.49.64 2.08.7 2.83.59.43-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function HeaderSocialLinks() {
  return (
    <div className="header-social-block">
      <div className="header-social">
        <a
          href={IG}
          target="_blank"
          rel="noreferrer"
          className="header-social__link"
          aria-label="Instagram — melisaerygit"
          title="@melisaerygit"
        >
          <InstagramIcon />
        </a>
        <a
          href={TT}
          target="_blank"
          rel="noreferrer"
          className="header-social__link"
          aria-label="TikTok — melisaery"
          title="@melisaery"
        >
          <TikTokIcon />
        </a>
      </div>
      <div className="header-meta">
        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          className="header-meta__wa"
          aria-label="WhatsApp 0552 846 52 57"
        >
          <WhatsAppIcon />
          <span>0552 846 52 57</span>
        </a>
        <p className="header-meta__loc">{LOCATION}</p>
      </div>
    </div>
  );
}

export const SOCIAL = {
  instagram: IG,
  tiktok: TT,
  whatsapp: WA,
  location: LOCATION,
};
