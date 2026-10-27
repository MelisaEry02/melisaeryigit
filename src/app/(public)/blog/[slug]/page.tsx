import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpeechBubble } from "@/components/SpeechBubble";
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
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Yazı">
        <Link href="/blog" className="nav-link text-sm">
          ← Blog
        </Link>
        <time className="mt-4 block text-sm text-ink-soft">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("tr-TR")
            : ""}
        </time>
        <h1 className="type-h1 mt-2">{post.title}</h1>
        <div className="mt-8 whitespace-pre-wrap leading-relaxed text-ink-soft">
          {post.content}
        </div>
      </SpeechBubble>
    </div>
  );
}
