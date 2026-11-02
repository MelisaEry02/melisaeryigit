import type { Metadata } from "next";
import Link from "next/link";
import { EmptyHint } from "@/components/EmptyHint";
import { SpeechBubble } from "@/components/SpeechBubble";
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
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Projeler">
        <h1 className="type-h1">Projeler</h1>
        <p className="mt-3 type-lead">
          Üzerinde çalıştığım ve paylaşmak istediğim işler — her biri bir öğrenme
          izi bırakır.
        </p>
        {projects.length === 0 ? (
          <EmptyHint
            title="Liste henüz boş"
            body="İlk projeni admin panelinden ekleyip yayınladığında burada görünür."
          />
        ) : (
          <ul className="mt-10 space-y-8">
            {projects.map((p, i) => {
              const img =
                p.image_url ||
                (i % 2 === 0
                  ? "/placeholders/photo-2.png"
                  : "/placeholders/photo-3.png");
              return (
                <li
                  key={p.id}
                  className="border-b border-pink-200/70 pb-8 last:border-0"
                >
                  <Link href={`/projeler/${p.slug}`} className="group block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${img}?v=mauve3`}
                      alt=""
                      className="project-cover"
                      width={1200}
                      height={1200}
                    />
                    <h2 className="type-h2 mt-4 transition group-hover:text-rose">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-ink-soft">{p.summary}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </SpeechBubble>
    </div>
  );
}
