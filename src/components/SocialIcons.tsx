const IG = "https://instagram.com/melisaerygit";
const TT = "https://www.tiktok.com/@melisaery";

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

export function HeaderSocialLinks() {
  return (
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
  );
}

export const SOCIAL = { instagram: IG, tiktok: TT };
