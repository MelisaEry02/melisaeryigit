import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "uploads");
const publicUploadsDir = path.join(process.cwd(), "public", "uploads");

function ensureDirs() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(publicUploadsDir)) {
    fs.mkdirSync(publicUploadsDir, { recursive: true });
  }
}

const dbPath =
  process.env.DATABASE_PATH || path.join(dataDir, "site.db");

let _db: Database.Database | null = null;

export function getDb() {
  if (_db) return _db;
  ensureDirs();
  _db = new Database(dbPath);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  migrate(_db);
  seedIfEmpty(_db);
  ensureContactDefaults(_db);
  return _db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT DEFAULT '',
      content TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      project_url TEXT DEFAULT '',
      github_url TEXT DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      organization TEXT DEFAULT '',
      kind TEXT NOT NULL DEFAULT 'work',
      location TEXT DEFAULT '',
      start_date TEXT DEFAULT '',
      end_date TEXT DEFAULT '',
      description TEXT DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT DEFAULT '',
      level INTEGER NOT NULL DEFAULT 3,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT DEFAULT '',
      mime_type TEXT DEFAULT '',
      size INTEGER DEFAULT 0,
      path TEXT NOT NULL,
      alt_text TEXT DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT DEFAULT '',
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

function now() {
  return new Date().toISOString();
}

/** Mevcut DB’de eksik iletişim anahtarlarını ekler; dolu değerleri ezmez. */
function ensureContactDefaults(db: Database.Database) {
  const defaults: Record<string, string> = {
    contact_email: "melisaeryigit02@gmail.com",
    contact_phone: "05528465257",
    contact_location: "İstanbul Kağıthane",
    social_whatsapp: "https://wa.me/905528465257",
    social_instagram: "https://instagram.com/melisaerygit",
    social_tiktok: "https://www.tiktok.com/@melisaery",
    social_linkedin: "",
    social_github: "",
    social_email: "melisaeryigit02@gmail.com",
    cv_url: "",
  };
  const insert = db.prepare(
    `INSERT INTO site_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO NOTHING`
  );
  for (const [k, v] of Object.entries(defaults)) {
    insert.run(k, v);
  }
}

function seedIfEmpty(db: Database.Database) {
  const count = db.prepare("SELECT COUNT(*) as c FROM site_settings").get() as {
    c: number;
  };
  if (count.c > 0) return;

  const t = now();

  const settings: Record<string, string> = {
    site_name: "Melisa Eryiğit",
    tagline: "Tasarım, yazılım ve merakın kesişiminde.",
    hero_intro:
      "Merhaba — burası kişisel alanım. Projeler, yazılar ve şu an üzerinde olduğum şeyler; abartısız, net, benim.",
    about_short:
      "Arayüz, ürün düşüncesi ve temiz kodla ilgileniyorum. Hikâyenin devamı biraz aşağıda.",
    about_long:
      "Bu metin yer tutucu — kendi cümlelerinle değiştir.\n\nNereden geldiğin, neyi önemsediğin, nasıl çalıştığın: hepsi buraya sığar. Admin → Site ayarları.",
    currently_working_on:
      "Kişisel sitemi inceliyorum: soft pastel pembe bir dil, kartanesi markası ve local admin ile içerik akışı.",
    cv_url: "",
    social_github: "",
    social_linkedin: "",
    social_instagram: "https://instagram.com/melisaerygit",
    social_tiktok: "https://www.tiktok.com/@melisaery",
    social_whatsapp: "https://wa.me/905528465257",
    social_email: "melisaeryigit02@gmail.com",
    contact_email: "melisaeryigit02@gmail.com",
    contact_phone: "05528465257",
    contact_location: "İstanbul Kağıthane",
    contact_blurb:
      "Proje, işbirliği veya sadece merhaba — formu doldurman yeterli. Mesajın e-postasız, doğrudan admin gelen kutuma düşer.",
  };

  const insertSetting = db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?)"
  );
  for (const [k, v] of Object.entries(settings)) {
    insertSetting.run(k, v);
  }

  db.prepare(
    `INSERT INTO posts (title, slug, excerpt, content, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "İlk yazı: buraya hoş geldin",
    "ilk-yazi",
    "Kişisel sitemin ilk satırları — yakında gerçek içerik gelecek.",
    "Bu bir örnek blog yazısıdır. Admin panelinden düzenleyebilir veya silebilirsin.\n\nYeni yazılar eklemek için /admin/yazilar yolunu kullan.",
    "published",
    t,
    t,
    t
  );

  db.prepare(
    `INSERT INTO posts (title, slug, excerpt, content, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Taslak: henüz yayınlanmadı",
    "taslak-ornek",
    "Sadece adminde görünen taslak.",
    "Taslak içerik.",
    "draft",
    null,
    t,
    t
  );

  db.prepare(
    `INSERT INTO projects (title, slug, summary, content, featured, sort_order, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Kişisel site",
    "kisisel-site",
    "Next.js + SQLite ile kendi sitem.",
    "Bu projenin kendisi. Admin paneli, blog, iletişim formu ve pastel pembe bir görünüm.",
    1,
    1,
    "published",
    t,
    t
  );

  db.prepare(
    `INSERT INTO projects (title, slug, summary, content, featured, sort_order, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Örnek proje",
    "ornek-proje",
    "Yer tutucu proje kartı — gerçek projelerini ekle.",
    "Detay metni admin’den güncellenir.",
    1,
    2,
    "published",
    t,
    t
  );

  db.prepare(
    `INSERT INTO experiences (title, organization, kind, location, start_date, end_date, description, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Öğrenci / geliştirici",
    "Üniversite",
    "education",
    "Türkiye",
    "2022",
    "",
    "Yer tutucu eğitim kaydı.",
    1,
    t,
    t
  );

  db.prepare(
    `INSERT INTO experiences (title, organization, kind, location, start_date, end_date, description, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Stajyer",
    "Örnek Şirket",
    "work",
    "Uzaktan",
    "2024",
    "2024",
    "Yer tutucu deneyim kaydı.",
    2,
    t,
    t
  );

  const skills = [
    ["TypeScript", "Geliştirme", 4, 1],
    ["Next.js", "Geliştirme", 4, 2],
    ["UI tasarımı", "Tasarım", 3, 3],
    ["SQLite", "Veri", 3, 4],
  ] as const;

  const insertSkill = db.prepare(
    `INSERT INTO skills (name, category, level, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  for (const [name, cat, level, order] of skills) {
    insertSkill.run(name, cat, level, order, t, t);
  }

  db.prepare(
    `INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)`
  ).run("melisa", "env-managed", t);
}

export function getSetting(key: string, fallback = ""): string {
  const row = getDb()
    .prepare("SELECT value FROM site_settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? fallback;
}

export function getSettings(): Record<string, string> {
  const rows = getDb()
    .prepare("SELECT key, value FROM site_settings")
    .all() as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function setSetting(key: string, value: string) {
  getDb()
    .prepare(
      `INSERT INTO site_settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, value);
}

export function setSettings(entries: Record<string, string>) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO site_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`
  );
  const tx = db.transaction((data: Record<string, string>) => {
    for (const [k, v] of Object.entries(data)) stmt.run(k, v);
  });
  tx(entries);
}

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  project_url: string;
  github_url: string;
  featured: number;
  sort_order: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: number;
  title: string;
  organization: string;
  kind: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  status: string;
  created_at: string;
};

export { now, uploadsDir };
