"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function deleteGuestbookEntry(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
  getDb()
    .prepare(`DELETE FROM guestbook WHERE id = ?`)
    .run(Number(formData.get("id")));
  revalidatePath("/admin/defter");
  revalidatePath("/defter");
}
