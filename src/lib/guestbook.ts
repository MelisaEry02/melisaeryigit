import { del, get, list, put } from "@vercel/blob";
import { getDb, now, type GuestbookEntry } from "@/lib/db";

const PREFIX = "guestbook/entries/";

function blobStoreEnabled() {
  // Yalnızca Vercel runtime: Blob (OIDC + BLOB_STORE_ID).
  // Local’de SQLite (data/site.db) — OIDC token yokken Blob kırılmasın.
  if (!process.env.VERCEL) return false;
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN
  );
}

function entryPath(id: number) {
  return `${PREFIX}${id}.json`;
}

async function streamToText(
  stream: ReadableStream<Uint8Array> | null
): Promise<string> {
  if (!stream) return "";
  return new Response(stream).text();
}

async function readBlobEntry(
  pathname: string
): Promise<GuestbookEntry | null> {
  try {
    const res = await get(pathname, {
      access: "private",
      useCache: false,
    });
    if (!res || res.statusCode !== 200 || !res.stream) return null;
    const raw = await streamToText(res.stream);
    const parsed = JSON.parse(raw) as GuestbookEntry;
    if (!parsed?.id || !parsed.name || !parsed.message) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function listFromBlob(limit = 80): Promise<GuestbookEntry[]> {
  const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
  const entries = (
    await Promise.all(blobs.map((b) => readBlobEntry(b.pathname)))
  ).filter((e): e is GuestbookEntry => Boolean(e));
  entries.sort((a, b) => b.id - a.id);
  return entries.slice(0, limit);
}

async function addToBlob(
  name: string,
  message: string
): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id: Date.now(),
    name,
    message,
    status: "visible",
    created_at: now(),
  };
  await put(entryPath(entry.id), JSON.stringify(entry), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  });
  return entry;
}

async function deleteFromBlob(id: number) {
  await del(entryPath(id));
}

function listFromSqlite(limit = 80): GuestbookEntry[] {
  return getDb()
    .prepare(
      `SELECT id, name, message, status, created_at FROM guestbook
       WHERE status = 'visible'
       ORDER BY id DESC LIMIT ?`
    )
    .all(limit) as GuestbookEntry[];
}

function listAllFromSqlite(limit = 200): GuestbookEntry[] {
  return getDb()
    .prepare(
      `SELECT id, name, message, status, created_at FROM guestbook
       ORDER BY id DESC LIMIT ?`
    )
    .all(limit) as GuestbookEntry[];
}

function addToSqlite(name: string, message: string): GuestbookEntry {
  const created_at = now();
  const info = getDb()
    .prepare(
      `INSERT INTO guestbook (name, message, status, created_at)
       VALUES (?, ?, 'visible', ?)`
    )
    .run(name, message, created_at);
  return {
    id: Number(info.lastInsertRowid),
    name,
    message,
    status: "visible",
    created_at,
  };
}

function deleteFromSqlite(id: number) {
  getDb().prepare(`DELETE FROM guestbook WHERE id = ?`).run(id);
}

/** Public liste (yalnızca visible). */
export async function listGuestbookVisible(
  limit = 80
): Promise<Omit<GuestbookEntry, "status">[]> {
  const rows = blobStoreEnabled()
    ? await listFromBlob(limit)
    : listFromSqlite(limit);
  return rows
    .filter((e) => e.status === "visible")
    .map(({ id, name, message, created_at }) => ({
      id,
      name,
      message,
      created_at,
    }));
}

/** Admin: tüm statusler. */
export async function listGuestbookAdmin(
  limit = 200
): Promise<GuestbookEntry[]> {
  if (blobStoreEnabled()) {
    const rows = await listFromBlob(limit);
    return rows;
  }
  return listAllFromSqlite(limit);
}

export async function addGuestbookEntry(
  name: string,
  message: string
): Promise<GuestbookEntry> {
  if (blobStoreEnabled()) return addToBlob(name, message);
  return addToSqlite(name, message);
}

export async function deleteGuestbookById(id: number) {
  if (blobStoreEnabled()) {
    await deleteFromBlob(id);
    return;
  }
  deleteFromSqlite(id);
}

export function guestbookBackend(): "blob" | "sqlite" {
  return blobStoreEnabled() ? "blob" : "sqlite";
}
