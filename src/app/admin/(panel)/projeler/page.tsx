import Link from "next/link";
import { getDb, type Project } from "@/lib/db";

export default function AdminProjectsPage() {
  const projects = getDb()
    .prepare(`SELECT * FROM projects ORDER BY sort_order ASC, id DESC`)
    .all() as Project[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">Projeler</h1>
        <Link href="/admin/projeler/yeni" className="btn btn-primary">
          Yeni proje
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-pink-200/80 border-y border-pink-200/80">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <Link
                href={`/admin/projeler/${p.id}`}
                className="font-medium text-ink hover:text-rose"
              >
                {p.title}
              </Link>
              <p className="text-sm text-ink-soft">
                {p.status === "published" ? "Yayında" : "Taslak"}
                {p.featured ? " · öne çıkan" : ""}
              </p>
            </div>
            <Link href={`/admin/projeler/${p.id}`} className="text-sm text-rose">
              Düzenle
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
