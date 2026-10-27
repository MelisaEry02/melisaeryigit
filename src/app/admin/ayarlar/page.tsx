import { saveSettings } from "@/app/admin/ayarlar/actions";
import { getSettings } from "@/lib/db";

const fields: { key: string; label: string; multiline?: boolean }[] = [
  { key: "site_name", label: "Site adı / marka" },
  { key: "tagline", label: "Slogan" },
  { key: "hero_intro", label: "Ana sayfa giriş metni", multiline: true },
  { key: "about_short", label: "Hakkımda kısa", multiline: true },
  { key: "about_long", label: "Hakkımda uzun", multiline: true },
  {
    key: "currently_working_on",
    label: "Şu an ne üzerindeyim",
    multiline: true,
  },
  { key: "contact_blurb", label: "İletişim sayfası metni", multiline: true },
  { key: "cv_url", label: "CV dosya / URL" },
  { key: "social_github", label: "GitHub" },
  { key: "social_linkedin", label: "LinkedIn" },
  { key: "social_instagram", label: "Instagram" },
  { key: "social_email", label: "E-posta (görünen, bildirim yok)" },
];

export default function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Site ayarları</h1>
      <p className="mt-2 text-ink-soft">
        Slogan, hakkımda, sosyal linkler ve “şu an…” metni.
      </p>
      <form action={saveSettings} className="mt-8 max-w-2xl space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="label" htmlFor={f.key}>
              {f.label}
            </label>
            {f.multiline ? (
              <textarea
                className="field min-h-28"
                id={f.key}
                name={f.key}
                defaultValue={settings[f.key] || ""}
              />
            ) : (
              <input
                className="field"
                id={f.key}
                name={f.key}
                defaultValue={settings[f.key] || ""}
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
      </form>
    </div>
  );
}
