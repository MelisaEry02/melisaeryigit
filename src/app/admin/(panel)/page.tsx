import Link from "next/link";
import { getDb } from "@/lib/db";

export default function AdminDashboard() {
  const db = getDb();
  const posts = (
    db.prepare(`SELECT COUNT(*) as c FROM posts`).get() as { c: number }
  ).c;
  const projects = (
    db.prepare(`SELECT COUNT(*) as c FROM projects`).get() as { c: number }
  ).c;
  const unread = (
    db
      .prepare(`SELECT COUNT(*) as c FROM messages WHERE status = 'unread'`)
      .get() as { c: number }
  ).c;
  const messages = (
    db.prepare(`SELECT COUNT(*) as c FROM messages`).get() as { c: number }
  ).c;

  const cards = [
    { label: "Yazılar", value: posts, href: "/admin/yazilar" },
    { label: "Projeler", value: projects, href: "/admin/projeler" },
    { label: "Okunmamış mesaj", value: unread, href: "/admin/mesajlar" },
    { label: "Toplam mesaj", value: messages, href: "/admin/mesajlar" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Özet</h1>
      <p className="mt-2 text-ink-soft">Hoş geldin. İçerikleri buradan yönet.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              className="block rounded-xl border border-pink-200 bg-white/50 px-5 py-4 transition hover:border-pink-300"
            >
              <p className="text-sm text-ink-soft">{c.label}</p>
              <p className="font-display mt-1 text-3xl text-ink">{c.value}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
