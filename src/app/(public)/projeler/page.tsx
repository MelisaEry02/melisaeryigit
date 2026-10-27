import type { Metadata } from "next";
import Link from "next/link";
import { getDb, type Project } from "@/lib/db";

export const metadata: Metadata = { title: "Projeler" };

export default function ProjectsPage() {
  const projects = getDb()
    .prepare(
      `SELECT * FROM projects WHERE status = 'published'
       ORDER BY sort_order ASC, id DESC`
    )
    .all() as Project[];

  return (
    <div className="site-shell py-16 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Projeler</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        Üzerinde çalıştığım ve paylaşmak istediğim işler.
      </p>
      <ul className="mt-12 space-y-10">
        {projects.map((p) => (
          <li key={p.id} className="border-b border-pink-200/70 pb-10">
            <Link href={`/projeler/${p.slug}`} className="group block">
              <h2 className="font-display text-3xl text-ink transition group-hover:text-rose">
                {p.title}
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
