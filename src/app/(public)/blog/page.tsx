import type { Metadata } from "next";
import Link from "next/link";
import { getDb, type Post } from "@/lib/db";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getDb()
    .prepare(
      `SELECT * FROM posts WHERE status = 'published'
       ORDER BY published_at DESC, id DESC`
    )
    .all() as Post[];

  return (
    <div className="site-shell py-16 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Blog</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        Notlar, öğrenimler ve ara sıra düşünceler.
      </p>
      <ul className="mt-12 space-y-10">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-pink-200/70 pb-10">
            <Link href={`/blog/${post.slug}`} className="group block">
              <time className="text-sm text-ink-soft">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("tr-TR")
                  : ""}
              </time>
              <h2 className="font-display mt-2 text-3xl text-ink transition group-hover:text-rose">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
