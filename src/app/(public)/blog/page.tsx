import type { Metadata } from "next";
import { BlogExpandList } from "@/components/BlogExpandList";
import { EmptyHint } from "@/components/EmptyHint";
import { SpeechBubble } from "@/components/SpeechBubble";
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
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Blog">
        <h1 className="type-h1">Blog</h1>
        <p className="mt-3 type-lead">
          Notlar, öğrenimler ve ara sıra düşünceler — düzenli değil, samimi.
          Yazılar aynı sayfada açılır.
        </p>
        {posts.length === 0 ? (
          <EmptyHint
            title="Yazı yok (henüz)"
            body="İlk taslağını admin’den yazıp yayınladığında burası dolacak."
          />
        ) : (
          <div className="mt-10">
            <BlogExpandList posts={posts} />
          </div>
        )}
      </SpeechBubble>
    </div>
  );
}
