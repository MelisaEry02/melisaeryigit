import { saveSettings } from "@/app/admin/ayarlar/actions";
import { getSettings } from "@/lib/db";

type Field = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  type?: string;
};

const siteFields: Field[] = [
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
    hint: "https://www.tiktok.com/@melisaery",
  },
  {
    key: "social_linkedin",
    label: "LinkedIn URL",
    hint: "Boş bırakırsan footer’da “eklenecek” görünür",
  },
  {
    key: "social_github",
    label: "GitHub URL",
    hint: "Boş bırakırsan footer’da gizlenmiş/muted",
  },
];

export default function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Site ayarları</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Metinler, iletişim bilgileri, sosyal linkler ve CV. Footer bu
        alanlardan beslenir; kaydettikten sonra ana siteyi yenile.
      </p>

      <form
        action={saveSettings}
        encType="multipart/form-data"
        className="mt-8 max-w-2xl space-y-10"
      >
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

        <section className="admin-panel space-y-4">
          <div>
            <h2 className="font-display text-xl text-ink">CV</h2>
            <p className="mt-1 text-sm text-ink-soft">
              PDF veya Word yükle; ya da doğrudan URL yapıştır.
            </p>
          </div>
          <FieldInput
            field={{
              key: "cv_url",
              label: "CV URL (manuel)",
              hint: "Dosya yüklersen otomatik dolar",
            }}
            value={settings.cv_url || ""}
          />
          <div>
            <label className="label" htmlFor="cv_file">
              CV yükle (PDF / Word, max 8MB)
            </label>
            <input
              className="field"
              id="cv_file"
              name="cv_file"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
            />
            {settings.cv_url ? (
              <p className="mt-2 text-sm text-ink-soft">
                Mevcut:{" "}
                <a
                  href={settings.cv_url}
                  className="nav-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {settings.cv_url}
                </a>
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink-soft">
                Henüz CV yok — yükle veya URL yapıştır.
              </p>
            )}
          </div>
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
