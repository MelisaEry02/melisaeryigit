"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { slugify } from "@/lib/slug";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
}

export async function savePost(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(title);
  const excerpt = String(formData.get("excerpt") || "");
  const content = String(formData.get("content") || "");
  const status = String(formData.get("status") || "draft");
  const t = now();

  if (!title) throw new Error("Başlık gerekli");

  const db = getDb();
  if (id) {
    db.prepare(
      `UPDATE posts SET title=?, slug=?, excerpt=?, content=?, status=?,
       published_at=CASE WHEN ?='published' AND published_at IS NULL THEN ? ELSE published_at END,
       updated_at=? WHERE id=?`
    ).run(title, slug, excerpt, content, status, status, t, t, Number(id));
  } else {
    const publishedAt = status === "published" ? t : null;
    const info = db
      .prepare(
        `INSERT INTO posts (title, slug, excerpt, content, status, published_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(title, slug, excerpt, content, status, publishedAt, t, t);
    revalidatePath("/admin/yazilar");
    revalidatePath("/blog");
    redirect(`/admin/yazilar/${info.lastInsertRowid}`);
  }

  revalidatePath("/admin/yazilar");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect(`/admin/yazilar/${id}`);
}

export async function deletePost(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  getDb().prepare(`DELETE FROM posts WHERE id = ?`).run(id);
  revalidatePath("/admin/yazilar");
  revalidatePath("/blog");
  redirect("/admin/yazilar");
}
