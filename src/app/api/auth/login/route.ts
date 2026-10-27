import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");
    if (!password) {
      return NextResponse.json({ error: "Şifre gerekli." }, { status: 400 });
    }
    const ok = await verifyPassword(password);
    if (!ok) {
      return NextResponse.json({ error: "Şifre yanlış." }, { status: 401 });
    }
    await createSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Giriş yapılamadı." }, { status: 500 });
  }
}
