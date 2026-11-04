"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, now } from "@/lib/db";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
}

export async function saveSkill(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "");
  const level = Math.min(5, Math.max(1, Number(formData.get("level") || 3)));
  const proficiencyRaw = String(formData.get("proficiency") || "comfortable");
  const proficiency =
    proficiencyRaw === "learning" ? "learning" : "comfortable";
  const sort_order = Number(formData.get("sort_order") || 0);
  const t = now();
  if (!name) throw new Error("İsim gerekli");

  const db = getDb();
  if (id) {
    db.prepare(
      `UPDATE skills SET name=?, category=?, level=?, proficiency=?, sort_order=?, updated_at=? WHERE id=?`
    ).run(name, category, level, proficiency, sort_order, t, Number(id));
  } else {
    db.prepare(
      `INSERT INTO skills (name, category, level, proficiency, sort_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(name, category, level, proficiency, sort_order, t, t);
  }
  revalidatePath("/admin/yetenekler");
  revalidatePath("/yetenekler");
  redirect("/admin/yetenekler");
}

export async function deleteSkill(formData: FormData) {
  await guard();
  getDb()
    .prepare(`DELETE FROM skills WHERE id = ?`)
    .run(Number(formData.get("id")));
  revalidatePath("/admin/yetenekler");
  revalidatePath("/yetenekler");
}
