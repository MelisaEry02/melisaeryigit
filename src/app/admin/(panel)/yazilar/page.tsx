import Link from "next/link";
import { getDb, type Post } from "@/lib/db";

export default function AdminPostsPage() {
  const posts = getDb()
    .prepare(`SELECT * FROM posts ORDER BY updated_at DESC`)
    .all() as Post[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">Yazılar</h1>
        <Link href="/admin/yazilar/yeni" className="btn btn-primary">
          Yeni yazı
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-pink-200/80 border-y border-pink-200/80">
        {posts.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <Link
                href={`/admin/yazilar/${p.id}`}
                className="font-medium text-ink hover:text-rose"
              >
                {p.title}
              </Link>
              <p className="text-sm text-ink-soft">
                {p.status === "published" ? "Yayında" : "Taslak"} · /{p.slug}
              </p>
            </div>
            <Link href={`/admin/yazilar/${p.id}`} className="text-sm text-rose">
              Düzenle
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
