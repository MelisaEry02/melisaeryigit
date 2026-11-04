import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const isVercel = Boolean(process.env.VERCEL);
const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "uploads");
const publicUploadsDir = path.join(process.cwd(), "public", "uploads");

function ensureDirs() {
  // Vercel’de proje dizini salt okunur; yazılabilir alan /tmp
  if (!isVercel) {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    if (!fs.existsSync(publicUploadsDir)) {
      fs.mkdirSync(publicUploadsDir, { recursive: true });
    }
  } else if (!fs.existsSync("/tmp")) {
    /* no-op */
  }
}

function resolveDbPath() {
  if (process.env.DATABASE_PATH) return process.env.DATABASE_PATH;
  // v6: skills.proficiency + guestbook; tech seed
  if (isVercel) return path.join("/tmp", "melisa-eryigit-site-v6.db");
  return path.join(dataDir, "site.db");
}

/** Vercel /tmp boşsa repodaki seed.db’yi kopyala (gerçek deneyimler vb.). */
function ensureSeedCopy(dbPath: string) {
  if (!isVercel) return;
  if (fs.existsSync(dbPath)) return;
  const candidates = [
    path.join(process.cwd(), "data", "seed.db"),
    path.join(__dirname, "..", "..", "data", "seed.db"),
  ];
  for (const seed of candidates) {
    if (fs.existsSync(seed)) {
      fs.copyFileSync(seed, dbPath);
      return;
    }
  }
}

let _db: Database.Database | null = null;

export function getDb() {
  if (_db) return _db;
  ensureDirs();
  const dbPath = resolveDbPath();
  ensureSeedCopy(dbPath);
  _db = new Database(dbPath);
  // WAL /tmp üzerinde sorun çıkarabilir
  _db.pragma(isVercel ? "journal_mode = DELETE" : "journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  migrate(_db);
  seedIfEmpty(_db);
  ensureContactDefaults(_db);
  ensureSkillProficiencyColumn(_db);
  ensureTechSkills(_db);
  ensureNonCodeSkillBadges(_db);
  return _db;
}

function tableHasColumn(db: Database.Database, table: string, column: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as {
    name: string;
  }[];
  return cols.some((c) => c.name === column);
}

function ensureSkillProficiencyColumn(db: Database.Database) {
  if (!tableHasColumn(db, "skills", "proficiency")) {
    db.exec(
      `ALTER TABLE skills ADD COLUMN proficiency TEXT NOT NULL DEFAULT 'comfortable'`
    );
  }
  db.prepare(
    `UPDATE skills SET proficiency = CASE
       WHEN level <= 2 THEN 'learning'
       ELSE 'comfortable'
     END
     WHERE proficiency IS NULL OR proficiency = ''`
  ).run();
}

/** Modern stack kartları — eksikse ekler, mevcut satırları ezmez. */
function ensureTechSkills(db: Database.Database) {
  const t = now();
  const defaults: Array<[string, string, number, string, number]> = [
    ["Next.js", "Geliştirme", 4, "comfortable", 1],
    ["React", "Geliştirme", 4, "comfortable", 2],
    ["TypeScript", "Geliştirme", 4, "comfortable", 3],
    ["Tailwind CSS", "Geliştirme", 3, "comfortable", 4],
    ["Git", "Araçlar", 4, "comfortable", 5],
    ["SQLite", "Veri", 3, "comfortable", 6],
    ["Node.js", "Geliştirme", 3, "learning", 7],
    ["Figma", "Tasarım", 3, "learning", 8],
  ];
  const exists = db.prepare(`SELECT id FROM skills WHERE name = ?`);
  const insert = db.prepare(
    `INSERT INTO skills (name, category, level, proficiency, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  for (const [name, cat, level, proficiency, order] of defaults) {
    if (exists.get(name)) continue;
    insert.run(name, cat, level, proficiency, order, t, t);
  }
}

/** Kod dışı becerilerde “kod yazıyorum” rozetini düzelt. */
function ensureNonCodeSkillBadges(db: Database.Database) {
  const rows = db
    .prepare(`SELECT id, name, category, level, proficiency FROM skills`)
    .all() as {
    id: number;
    name: string;
    category: string;
    level: number;
    proficiency: string;
  }[];
  const update = db.prepare(
    `UPDATE skills SET proficiency = ?, updated_at = ? WHERE id = ?`
  );
  const t = now();
  for (const row of rows) {
    if (!isNonCodeSkill(row.name, row.category)) continue;
    if (
      row.proficiency === "daily" ||
      row.proficiency === "skilled" ||
      row.proficiency === "learning"
    ) {
      continue;
    }
    const blob = `${row.name} ${row.category}`;
    const next =
      row.level >= 4 ||
      /(sosyal|içerik|sponsor|iletişim|yönetim)/i.test(blob)
        ? "daily"
        : "skilled";
    update.run(next, t, row.id);
  }
}

function isNonCodeSkill(name: string, category: string) {
  const blob = `${name} ${category}`.toLocaleLowerCase("tr");
  if (
    /(next|react|typescript|javascript|tailwind|node|sqlite|git\b|html|css|python|java\b)/i.test(
      blob
    )
  ) {
    return false;
  }
  if (/figma|ui tasarım|tasarım/i.test(blob)) return true;
  if (
    /(geliştirme|veri|araçlar)/i.test(category) &&
    !/(yönetim|ticaret|sosyal)/i.test(blob)
  ) {
    return false;
  }
  return true;
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
      proficiency TEXT NOT NULL DEFAULT 'comfortable',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'visible',
      created_at TEXT NOT NULL
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

/**
 * Eksik iletişim anahtarlarını ekler; mevcut değerleri ASLA ezmez.
 * social_github / social_tiktok hardcoded URL ile doldurulmaz —
 * admin veya seed’deki değer (veya boş) korunur.
 */
function ensureContactDefaults(db: Database.Database) {
  const defaults: Record<string, string> = {
    contact_email: "melisaeryigit02@gmail.com",
    contact_phone: "05528465257",
    contact_location: "İstanbul Kağıthane",
    social_whatsapp: "https://wa.me/905528465257",
    social_instagram: "https://instagram.com/melisaerygit",
    social_linkedin: "",
    social_email: "melisaeryigit02@gmail.com",
  };
  const insert = db.prepare(
    `INSERT INTO site_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO NOTHING`
  );
  for (const [k, v] of Object.entries(defaults)) {
    insert.run(k, v);
  }
  // Anahtar yoksa boş bırak — seed/admin yazar; kod eski hesabı dayatmasın
  insert.run("social_github", "");
  insert.run("social_tiktok", "");
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
    social_github: "https://github.com/MelisaEry02",
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

  const expInsert = db.prepare(
    `INSERT INTO experiences (title, organization, kind, location, start_date, end_date, description, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  expInsert.run(
    "Öğrenci / geliştirici",
    "Lise",
    "education",
    "Türkiye",
    "2023",
    "2027",
    "Yer tutucu eğitim kaydı.",
    1,
    t,
    t
  );
  expInsert.run(
    "Stajyer",
    "Kağıthane Belediyesi",
    "work",
    "",
    "2026",
    "2026",
    "Sosyal Hizmetler de 1 ay görev aldı.",
    2,
    t,
    t
  );
  expInsert.run(
    "FRC Robotik Takımı",
    "",
    "work",
    "Sponsorluk Kaptanı & Sosyal Medya Kaptan yardımcısı",
    "2025",
    "2026",
    "",
    2,
    t,
    t
  );
  expInsert.run(
    "Stajyer",
    "Beyin Atölyesi",
    "work",
    "",
    "2026",
    "",
    "Devam ediyor.",
    3,
    t,
    t
  );

  const skills = [
    ["Next.js", "Geliştirme", 4, "comfortable", 1],
    ["React", "Geliştirme", 4, "comfortable", 2],
    ["TypeScript", "Geliştirme", 4, "comfortable", 3],
    ["Tailwind CSS", "Geliştirme", 3, "comfortable", 4],
    ["Git", "Araçlar", 4, "comfortable", 5],
    ["SQLite", "Veri", 3, "comfortable", 6],
    ["Node.js", "Geliştirme", 3, "learning", 7],
    ["Figma", "Tasarım", 3, "learning", 8],
  ] as const;

  const insertSkill = db.prepare(
    `INSERT INTO skills (name, category, level, proficiency, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  for (const [name, cat, level, proficiency, order] of skills) {
    insertSkill.run(name, cat, level, proficiency, order, t, t);
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

export type SkillProficiency =
  | "learning"
  | "comfortable"
  | "daily"
  | "skilled";

export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
  proficiency: SkillProficiency | string;
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

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  status: string;
  created_at: string;
};

export function skillBadgeLabel(proficiency: string): string {
  switch (proficiency) {
    case "learning":
      return "Henüz öğreniyorum";
    case "daily":
      return "Günlük kullanıyorum";
    case "skilled":
      return "İyi biliyorum";
    case "comfortable":
    default:
      return "Rahatlıkla kod yazıyorum";
  }
}

export function normalizeSkillProficiency(raw: string): SkillProficiency {
  if (raw === "learning" || raw === "daily" || raw === "skilled") return raw;
  return "comfortable";
}

export function isVercelRuntime() {
  return isVercel;
}

export { now, uploadsDir };
