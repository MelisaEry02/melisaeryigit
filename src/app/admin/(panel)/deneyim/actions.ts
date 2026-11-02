"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, now } from "@/lib/db";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
}

export async function saveExperience(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const organization = String(formData.get("organization") || "");
  const kind = String(formData.get("kind") || "work");
  const location = String(formData.get("location") || "");
  const start_date = String(formData.get("start_date") || "");
  const end_date = String(formData.get("end_date") || "");
  const description = String(formData.get("description") || "");
  const sort_order = Number(formData.get("sort_order") || 0);
  const t = now();
  if (!title) throw new Error("Başlık gerekli");

  const db = getDb();
  if (id) {
    db.prepare(
      `UPDATE experiences SET title=?, organization=?, kind=?, location=?,
       start_date=?, end_date=?, description=?, sort_order=?, updated_at=? WHERE id=?`
    ).run(
      title,
      organization,
      kind,
      location,
      start_date,
      end_date,
      description,
      sort_order,
      t,
      Number(id)
    );
  } else {
    db.prepare(
      `INSERT INTO experiences (title, organization, kind, location, start_date, end_date,
       description, sort_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      title,
      organization,
      kind,
      location,
      start_date,
      end_date,
      description,
      sort_order,
      t,
      t
    );
  }
  revalidatePath("/admin/deneyim");
  revalidatePath("/deneyim");
  revalidatePath("/");
  redirect("/admin/deneyim");
}

export async function deleteExperience(formData: FormData) {
  await guard();
  getDb()
    .prepare(`DELETE FROM experiences WHERE id = ?`)
    .run(Number(formData.get("id")));
  revalidatePath("/admin/deneyim");
  revalidatePath("/deneyim");
  revalidatePath("/");
}
