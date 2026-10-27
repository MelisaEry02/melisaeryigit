"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Özet", exact: true },
  { href: "/admin/yazilar", label: "Yazılar" },
  { href: "/admin/projeler", label: "Projeler" },
  { href: "/admin/deneyim", label: "Deneyim" },
  { href: "/admin/yetenekler", label: "Yetenekler" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
  { href: "/admin/ayarlar", label: "Site ayarları" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-b border-pink-200 bg-[rgba(255,255,255,0.55)] p-5 md:min-h-screen md:border-b-0 md:border-r">
      <p className="font-display text-xl text-ink">Admin</p>
      <p className="mt-1 text-xs text-ink-soft">Melisa Eryiğit</p>
      <nav className="mt-6 flex flex-wrap gap-2 md:flex-col md:gap-1">
        {links.map((l) => {
          const active = l.exact
            ? pathname === l.href
            : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-pink-200/70 font-semibold text-ink"
                  : "text-ink-soft hover:bg-pink-100/80"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 flex flex-col gap-2">
        <Link href="/" className="text-sm text-ink-soft hover:text-ink">
          Siteye dön
        </Link>
        <button
          type="button"
          onClick={logout}
          className="text-left text-sm text-rose hover:underline"
        >
          Çıkış yap
        </button>
      </div>
    </aside>
  );
}
