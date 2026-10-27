import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, now } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().default(""),
  body: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Lütfen alanları kontrol et." },
        { status: 400 }
      );
    }
    const { name, email, subject, body } = parsed.data;
    getDb()
      .prepare(
        `INSERT INTO messages (name, email, subject, body, status, created_at)
         VALUES (?, ?, ?, ?, 'unread', ?)`
      )
      .run(name, email, subject || "", body, now());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kaydedilemedi." }, { status: 500 });
  }
}
