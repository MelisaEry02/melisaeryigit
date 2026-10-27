"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { setSettings } from "@/lib/db";

const KEYS = [
  "site_name",
  "tagline",
  "hero_intro",
  "about_short",
  "about_long",
  "currently_working_on",
  "cv_url",
  "social_github",
  "social_linkedin",
  "social_instagram",
  "social_email",
  "contact_blurb",
] as const;

export async function saveSettings(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");
  const entries: Record<string, string> = {};
  for (const key of KEYS) {
    entries[key] = String(formData.get(key) || "");
  }
  setSettings(entries);
  revalidatePath("/");
  revalidatePath("/hakkimda");
  revalidatePath("/iletisim");
  revalidatePath("/admin/ayarlar");
}
