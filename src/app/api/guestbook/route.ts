import { NextResponse } from "next/server";
import { z } from "zod";
import {
  addGuestbookEntry,
  guestbookBackend,
  listGuestbookVisible,
} from "@/lib/guestbook";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  message: z.string().trim().min(2).max(500),
});

export async function GET() {
  try {
    const entries = await listGuestbookVisible(80);
    return NextResponse.json({
      entries,
      backend: guestbookBackend(),
    });
  } catch {
    return NextResponse.json({ error: "Liste alınamadı." }, { status: 500 });
  }
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
    const entry = await addGuestbookEntry(name, message);
    return NextResponse.json({
      ok: true,
      id: entry.id,
      created_at: entry.created_at,
      backend: guestbookBackend(),
    });
  } catch {
    return NextResponse.json({ error: "Kaydedilemedi." }, { status: 500 });
  }
}
