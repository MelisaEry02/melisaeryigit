"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
}

export async function setMessageStatus(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "read");
  getDb()
    .prepare(`UPDATE messages SET status = ? WHERE id = ?`)
    .run(status, id);
  revalidatePath("/admin/mesajlar");
}

export async function deleteMessage(formData: FormData) {
  await guard();
  getDb()
    .prepare(`DELETE FROM messages WHERE id = ?`)
    .run(Number(formData.get("id")));
  revalidatePath("/admin/mesajlar");
}
