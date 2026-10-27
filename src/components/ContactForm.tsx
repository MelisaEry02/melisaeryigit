"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          body: data.get("body"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("err");
        setError(json.error || "Gönderilemedi.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
      setError("Bağlantı hatası.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div>
        <label className="label" htmlFor="name">
          Adın
        </label>
        <input className="field" id="name" name="name" required maxLength={120} />
      </div>
      <div>
        <label className="label" htmlFor="email">
          E-posta
        </label>
        <input
          className="field"
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
        />
      </div>
      <div>
        <label className="label" htmlFor="subject">
          Konu
        </label>
        <input className="field" id="subject" name="subject" maxLength={200} />
      </div>
      <div>
        <label className="label" htmlFor="body">
          Mesaj
        </label>
        <textarea
          className="field min-h-36"
          id="body"
          name="body"
          required
          maxLength={5000}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Gönderiliyor…" : "Gönder"}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-rose">Mesajın alındı. Teşekkürler.</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-red-700">{error}</p>
      ) : null}
    </form>
  );
}
