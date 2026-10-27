import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb, type Project } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getDb()
    .prepare(
      `SELECT title FROM projects WHERE slug = ? AND status = 'published'`
    )
    .get(slug) as { title: string } | undefined;
  return { title: project?.title || "Proje" };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getDb()
    .prepare(`SELECT * FROM projects WHERE slug = ? AND status = 'published'`)
    .get(slug) as Project | undefined;

  if (!project) notFound();

  return (
    <article className="site-shell py-16 md:py-20">
      <Link href="/projeler" className="nav-link text-sm">
        ← Projeler
      </Link>
      <h1 className="type-h1 mt-6">{project.title}</h1>
      <p className="mt-4 max-w-2xl type-lead">{project.summary}</p>
      <div className="mt-10 max-w-2xl whitespace-pre-wrap leading-relaxed text-ink-soft">
        {project.content}
      </div>
      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        {project.project_url ? (
          <a
            href={project.project_url}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Projeyi aç
          </a>
        ) : null}
        {project.github_url ? (
          <a
            href={project.github_url}
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
