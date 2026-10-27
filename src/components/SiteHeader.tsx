"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";

const links = [
  { href: "/", label: "Ana sayfa" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/deneyim", label: "Deneyim" },
  { href: "/yetenekler", label: "Yetenekler" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pink-200/60 bg-[rgba(255,247,249,0.78)] backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="site-brand font-display tracking-tight text-ink"
        >
          <SnowflakeLogo className="site-brand__mark" title="" />
          <span>{siteName}</span>
        </Link>

        <button
          type="button"
          className="rounded-full border border-pink-200 bg-white/70 px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menü
        </button>

        <nav
          id="site-nav"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-3 border-b border-pink-200/60 bg-[rgba(255,247,249,0.96)] px-4 py-4 md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0`}
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
        </nav>
      </div>
    </header>
  );
}
