"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { setSettings } from "@/lib/db";

const KEYS = [
  "site_name",
  "tagline",
  "hero_intro",
  "about_short",
  "about_long",
  "currently_working_on",
  "contact_blurb",
  "cv_url",
  "contact_email",
  "contact_phone",
  "contact_location",
  "social_github",
  "social_linkedin",
  "social_instagram",
  "social_tiktok",
  "social_whatsapp",
] as const;

const publicUploads = path.join(process.cwd(), "public", "uploads");

export async function saveSettings(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Yetkisiz");

  const entries: Record<string, string> = {};
  for (const key of KEYS) {
    entries[key] = String(formData.get(key) || "").trim();
  }

  const file = formData.get("cv_file");
  if (file && typeof file !== "string" && "arrayBuffer" in file && file.size > 0) {
    const name = file.name || "cv.pdf";
    if (!name.match(/\.(pdf|doc|docx)$/i)) {
      throw new Error("CV için PDF veya Word yükle.");
    }
    if (file.size > 8 * 1024 * 1024) {
      throw new Error("CV dosyası 8MB’dan küçük olmalı.");
    }
    if (!fs.existsSync(publicUploads)) {
      fs.mkdirSync(publicUploads, { recursive: true });
    }
    const ext = path.extname(name) || ".pdf";
    const filename = `cv-${Date.now()}${ext}`;
    const dest = path.join(publicUploads, filename);
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(dest, buf);
    entries.cv_url = `/uploads/${filename}`;
  }

  setSettings(entries);
  revalidatePath("/");
  revalidatePath("/hakkimda");
  revalidatePath("/iletisim");
  revalidatePath("/admin/ayarlar");
}
