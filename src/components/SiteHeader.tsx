"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HeaderSocialLinks } from "@/components/SocialIcons";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Ana sayfa" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/deneyim", label: "Deneyim" },
  { href: "/yetenekler", label: "Yetenekler" },
  { href: "/defter", label: "Defter" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-shell flex items-center gap-3 py-3 md:gap-4 md:py-4">
        <Link
          href="/"
          className="site-brand font-display tracking-tight text-ink shrink-0"
        >
          <SnowflakeLogo className="site-brand__mark" title="" />
          <span>{siteName}</span>
        </Link>

        <nav
          id="site-nav"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full z-30 flex-col gap-3 border-b border-pink-200/60 bg-[color:var(--header-bg)] px-4 py-4 backdrop-blur-md md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none`}
        >
          {links.map((l) => {
            const current =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}

          <div className="nav-social-cluster">
            <HeaderSocialLinks />
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-pink-200 bg-[color:var(--surface)] px-3 py-1.5 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menü
          </button>
        </div>
      </div>
    </header>
  );
}
