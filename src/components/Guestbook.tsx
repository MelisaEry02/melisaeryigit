"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function Guestbook({
  initialEntries,
}: {
  initialEntries: Entry[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("err");
        setError(json.error || "Gönderilemedi.");
        return;
      }
      const entry: Entry = {
        id: json.id,
        name: String(data.get("name") || "").trim(),
        message: String(data.get("message") || "").trim(),
        created_at: new Date().toISOString(),
      };
      setEntries((prev) => [entry, ...prev]);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
      setError("Bağlantı hatası.");
    }
  }

  return (
    <div className="guestbook">
      <form onSubmit={onSubmit} className="guestbook__form">
        <div>
          <label className="label" htmlFor="gb-name">
            Adın
          </label>
          <input
            className="field"
            id="gb-name"
            name="name"
            required
            maxLength={80}
            autoComplete="nickname"
          />
        </div>
        <div>
          <label className="label" htmlFor="gb-message">
            Mesaj
          </label>
          <textarea
            className="field min-h-28"
            id="gb-message"
            name="message"
            required
            maxLength={500}
            placeholder="Kısa bir not bırak…"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Gönderiliyor…" : "Deftere yaz"}
        </button>
        {status === "ok" && (
          <p className="text-sm text-ink-soft">Teşekkürler — kaydedildi.</p>
        )}
        {status === "err" && <p className="text-sm text-red-700">{error}</p>}
      </form>

      <ul className="guestbook__list">
        {entries.length === 0 && (
          <li className="guestbook__empty">Henüz not yok — ilk sen bırak.</li>
        )}
        {entries.map((e) => (
          <li key={e.id} className="guestbook__card">
            <div className="guestbook__meta">
              <strong>{e.name}</strong>
              <time dateTime={e.created_at}>{formatDate(e.created_at)}</time>
            </div>
            <p className="guestbook__msg">{e.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
