"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { slugify } from "@/lib/slug";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
}

export async function saveProject(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(title);
  const summary = String(formData.get("summary") || "");
  const content = String(formData.get("content") || "");
  const image_url = String(formData.get("image_url") || "");
  const project_url = String(formData.get("project_url") || "");
  const github_url = String(formData.get("github_url") || "");
  const featured = formData.get("featured") ? 1 : 0;
  const sort_order = Number(formData.get("sort_order") || 0);
  const status = String(formData.get("status") || "draft");
  const t = now();

  if (!title) throw new Error("Başlık gerekli");
  const db = getDb();

  if (id) {
    db.prepare(
      `UPDATE projects SET title=?, slug=?, summary=?, content=?, image_url=?,
       project_url=?, github_url=?, featured=?, sort_order=?, status=?, updated_at=?
       WHERE id=?`
    ).run(
      title,
      slug,
      summary,
      content,
      image_url,
      project_url,
      github_url,
      featured,
      sort_order,
      status,
      t,
      Number(id)
    );
  } else {
    const info = db
      .prepare(
        `INSERT INTO projects (title, slug, summary, content, image_url, project_url, github_url,
         featured, sort_order, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        title,
        slug,
        summary,
        content,
        image_url,
        project_url,
        github_url,
        featured,
        sort_order,
        status,
        t,
        t
      );
    revalidatePath("/admin/projeler");
    revalidatePath("/projeler");
    redirect(`/admin/projeler/${info.lastInsertRowid}`);
  }

  revalidatePath("/admin/projeler");
  revalidatePath("/projeler");
  revalidatePath(`/projeler/${slug}`);
  redirect(`/admin/projeler/${id}`);
}

export async function deleteProject(formData: FormData) {
  await guard();
  getDb()
    .prepare(`DELETE FROM projects WHERE id = ?`)
    .run(Number(formData.get("id")));
  revalidatePath("/admin/projeler");
  revalidatePath("/projeler");
  redirect("/admin/projeler");
}
