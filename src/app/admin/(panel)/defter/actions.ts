"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { deleteGuestbookById } from "@/lib/guestbook";

export async function deleteGuestbookEntry(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
  await deleteGuestbookById(Number(formData.get("id")));
  revalidatePath("/admin/defter");
  revalidatePath("/defter");
}
