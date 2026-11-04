import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, now } from "@/lib/db";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  message: z.string().trim().min(2).max(500),
});

export async function GET() {
  const rows = getDb()
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook
       WHERE status = 'visible'
       ORDER BY id DESC LIMIT 80`
    )
    .all();
  return NextResponse.json({ entries: rows });
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ad ve mesajı kontrol et (mesaj en az 2 karakter)." },
        { status: 400 }
      );
    }
    const { name, message } = parsed.data;
    const info = getDb()
      .prepare(
        `INSERT INTO guestbook (name, message, status, created_at)
         VALUES (?, ?, 'visible', ?)`
      )
      .run(name, message, now());

    return NextResponse.json({
      ok: true,
      id: Number(info.lastInsertRowid),
    });
  } catch {
    return NextResponse.json({ error: "Kaydedilemedi." }, { status: 500 });
  }
}
