"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SEEN_KEY = "me-defter-seen";
const SHOWN_KEY = "me-exit-gb-shown";

/** Defter görmeden çıkışa yakın: soft mini defter (abartısız). */
export function GuestbookExitPrompt() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/defter")) {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [pathname]);

  const tryOpen = useCallback(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
      if (pathname?.startsWith("/defter")) return;
      if (pathname?.startsWith("/admin")) return;
      sessionStorage.setItem(SHOWN_KEY, "1");
      setOpen(true);
    } catch {
      /* ignore */
    }
  }, [pathname]);

  useEffect(() => {
    function onLeave(e: MouseEvent) {
      if (e.clientY > 12) return;
      if (e.relatedTarget) return;
      tryOpen();
    }
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [tryOpen]);

  function close() {
    setOpen(false);
  }

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
      setStatus("ok");
      form.reset();
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("err");
      setError("Bağlantı hatası.");
    }
  }

  if (!open) return null;

  return (
    <div className="exit-gb" role="dialog" aria-modal="true" aria-label="Defter">
      <button
        type="button"
        className="exit-gb__backdrop"
        aria-label="Kapat"
        onClick={close}
      />
      <div className="exit-gb__panel">
        <p className="exit-gb__title">Bir şey yazmak ister misiniz?</p>
        <p className="exit-gb__lead">
          Kısa bir not — ziyaretçi defterine düşer.
        </p>
        {status === "ok" ? (
          <div className="exit-gb__done">
            <p>Teşekkürler — kaydedildi.</p>
            <Link href="/defter" className="btn btn-ghost" onClick={close}>
              Deftere git
            </Link>
            <button type="button" className="btn btn-primary" onClick={close}>
              Kapat
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="exit-gb__form">
            <input
              className="field"
              name="name"
              placeholder="Adın"
              required
              maxLength={80}
              autoComplete="nickname"
            />
            <textarea
              className="field min-h-20"
              name="message"
              placeholder="Notun…"
              required
              maxLength={500}
            />
            <div className="exit-gb__actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "…" : "Yaz"}
              </button>
              <Link href="/defter" className="btn btn-ghost" onClick={close}>
                Defter
              </Link>
              <button type="button" className="exit-gb__skip" onClick={close}>
                Şimdi değil
              </button>
            </div>
            {status === "err" ? (
              <p className="text-sm text-red-700">{error}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
