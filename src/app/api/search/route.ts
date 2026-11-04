import { NextResponse } from "next/server";
import { getDb, type Post, type Project } from "@/lib/db";

export const dynamic = "force-dynamic";

const PAGES = [
  { title: "Ana sayfa", href: "/", group: "Sayfalar" },
  { title: "Hakkımda", href: "/hakkimda", group: "Sayfalar" },
  { title: "Projeler", href: "/projeler", group: "Sayfalar" },
  { title: "Blog", href: "/blog", group: "Sayfalar" },
  { title: "Deneyim", href: "/deneyim", group: "Sayfalar" },
  { title: "Yetenekler", href: "/yetenekler", group: "Sayfalar" },
  { title: "İletişim", href: "/iletisim", group: "Sayfalar" },
  { title: "Ziyaretçi defteri", href: "/defter", group: "Sayfalar" },
];

export async function GET() {
  try {
    const db = getDb();
    const posts = db
      .prepare(
        `SELECT id, title, slug FROM posts WHERE status = 'published'
         ORDER BY published_at DESC, id DESC LIMIT 40`
      )
      .all() as Pick<Post, "id" | "title" | "slug">[];
    const projects = db
      .prepare(
        `SELECT id, title, slug FROM projects WHERE status = 'published'
         ORDER BY sort_order ASC, id DESC LIMIT 40`
      )
      .all() as Pick<Project, "id" | "title" | "slug">[];

    const items = [
      ...PAGES,
      ...posts.map((p) => ({
        title: p.title,
        href: `/blog/${p.slug}`,
        group: "Yazılar",
      })),
      ...projects.map((p) => ({
        title: p.title,
        href: `/projeler/${p.slug}`,
        group: "Projeler",
      })),
    ];

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: PAGES });
  }
}
