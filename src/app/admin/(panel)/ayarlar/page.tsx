import { saveSettings } from "@/app/admin/(panel)/ayarlar/actions";
import { getSettings } from "@/lib/db";

type Field = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  type?: string;
};

const siteFields: Field[] = [
  {
    key: "site_name",
    label: "Marka adı",
    hint: "Header / hero’da görünür (örn. Melisa Eryiğit)",
  },
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
];

const contactFields: Field[] = [
  {
    key: "contact_email",
    label: "E-posta",
    hint: "Footer mailto + iletişim alanı",
    type: "email",
  },
  {
    key: "contact_phone",
    label: "Telefon",
    hint: "Örn. 05528465257",
  },
  {
    key: "contact_location",
    label: "Konum",
    hint: "Örn. İstanbul Kağıthane — harita linki otomatik",
  },
  {
    key: "social_whatsapp",
    label: "WhatsApp linki",
    hint: "https://wa.me/905528465257",
  },
  {
    key: "social_instagram",
    label: "Instagram URL",
    hint: "https://instagram.com/melisaerygit",
  },
  {
    key: "social_tiktok",
    label: "TikTok URL",
    hint: "https://www.tiktok.com/@melisaerygit",
  },
  {
    key: "social_linkedin",
    label: "LinkedIn URL",
    hint: "Boş bırakırsan footer’da “eklenecek” görünür",
  },
  {
    key: "social_github",
    label: "GitHub URL",
    hint: "Boş bırakırsan footer’da muted",
  },
];

export default function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Site ayarları</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Metinler, iletişim bilgileri ve sosyal linkler. Site başlığı tarayıcıda
        “Melisa Eryiğit Kişisel Web Sitesi”; CV yok — site CV yerine geçiyor.
      </p>

      <form action={saveSettings} className="mt-8 max-w-2xl space-y-10">
        <section className="admin-panel space-y-4">
          <div>
            <h2 className="font-display text-xl text-ink">İçerik</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Ana sayfa, hakkımda ve iletişim metinleri.
            </p>
          </div>
          {siteFields.map((f) => (
            <FieldInput key={f.key} field={f} value={settings[f.key] || ""} />
          ))}
        </section>

        <section className="admin-panel space-y-4">
          <div>
            <h2 className="font-display text-xl text-ink">İletişim & sosyal</h2>
            <p className="mt-1 text-sm text-ink-soft">
              E-posta, telefon, konum ve sosyal URL’ler — footer ikonları.
            </p>
          </div>
          {contactFields.map((f) => (
            <FieldInput key={f.key} field={f} value={settings[f.key] || ""} />
          ))}
        </section>

        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
      </form>
    </div>
  );
}

function FieldInput({ field, value }: { field: Field; value: string }) {
  return (
    <div>
      <label className="label" htmlFor={field.key}>
        {field.label}
      </label>
      {field.multiline ? (
        <textarea
          className="field min-h-28"
          id={field.key}
          name={field.key}
          defaultValue={value}
        />
      ) : (
        <input
          className="field"
          id={field.key}
          name={field.key}
          type={field.type || "text"}
          defaultValue={value}
        />
      )}
      {field.hint ? (
        <p className="mt-1 text-xs text-ink-soft">{field.hint}</p>
      ) : null}
    </div>
  );
}
