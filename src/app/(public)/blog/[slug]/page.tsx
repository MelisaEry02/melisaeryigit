import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb, type Post } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getDb()
    .prepare(`SELECT title FROM posts WHERE slug = ? AND status = 'published'`)
    .get(slug) as { title: string } | undefined;
  return { title: post?.title || "Yazı" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getDb()
    .prepare(`SELECT * FROM posts WHERE slug = ? AND status = 'published'`)
    .get(slug) as Post | undefined;

  if (!post) notFound();

  return (
    <article className="site-shell py-16 md:py-20">
      <Link href="/blog" className="nav-link text-sm">
        ← Blog
      </Link>
      <time className="mt-6 block text-sm text-ink-soft">
        {post.published_at
          ? new Date(post.published_at).toLocaleDateString("tr-TR")
          : ""}
      </time>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-10 max-w-2xl whitespace-pre-wrap leading-relaxed text-ink-soft">
        {post.content}
      </div>
    </article>
  );
}
