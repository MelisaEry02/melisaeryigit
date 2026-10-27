import type { Metadata } from "next";
import Link from "next/link";
import { EmptyHint } from "@/components/EmptyHint";
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
      <h1 className="type-h1">Blog</h1>
      <p className="mt-3 max-w-xl type-lead">
        Notlar, öğrenimler ve ara sıra düşünceler — düzenli değil, samimi.
      </p>
      {posts.length === 0 ? (
        <EmptyHint
          title="Yazı yok (henüz)"
          body="İlk taslağını admin’den yazıp yayınladığında burası dolacak. İstersen iletişimden de yazabilirsin."
        />
      ) : (
        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-pink-200/70 pb-10">
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-sm text-ink-soft">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("tr-TR")
                    : ""}
                </time>
                <h2 className="type-h2 mt-2 transition group-hover:text-rose">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink-soft">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
