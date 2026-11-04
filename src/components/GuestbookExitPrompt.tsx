"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "me-defter-seen";
/** v3: eski v2 flag laptop’ta (Chrome session restore) smoke’u kilitlemesin */
const SHOWN_KEY = "me-gb-nudge-v3";
const LEGACY_SHOWN_KEYS = ["me-gb-nudge-v2", "me-exit-gb-shown"] as const;
const NUDGE_MS = 90_000;
const NUDGE_MS_SMOKE = 3_000;

function clearNudgeFlags() {
  try {
    sessionStorage.removeItem(SEEN_KEY);
    sessionStorage.removeItem(SHOWN_KEY);
    for (const k of LEGACY_SHOWN_KEYS) sessionStorage.removeItem(k);
  } catch {
    /* ignore */
  }
}

/**
 * Siteye girdikten ~90 sn sonra soft defter nudge (oturumda 1 kez).
 *
 * Laptop vs telefon: kodda ayrı path yok. Laptop’ta gelmemesinin kök nedeni
 * sessionStorage (`me-gb-nudge-v2` / `me-defter-seen`) — Chrome “kaldığın yerden
 * devam” session’ı restore eder; telefon genelde taze oturum. `?me_nudge` artık
 * flag’leri temizleyip smoke’u laptop’ta da zorlar.
 */
export function GuestbookExitPrompt() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState("");

  useEffect(() => {
    pathnameRef.current = pathname;
    if (pathname?.startsWith("/defter")) {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [pathname]);

  // Timer yalnızca mount’ta bir kez — pathname değişince reset yok
  useEffect(() => {
    let ms = NUDGE_MS;
    let smoke = false;
    try {
      smoke = new URLSearchParams(window.location.search).has("me_nudge");
      if (smoke) {
        clearNudgeFlags();
        ms = NUDGE_MS_SMOKE;
      }
    } catch {
      /* ignore */
    }

    const id = window.setTimeout(() => {
      try {
        const path = pathnameRef.current || window.location.pathname || "";
        if (sessionStorage.getItem(SEEN_KEY) === "1") return;
        if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
        if (path.startsWith("/defter")) return;
        if (path.startsWith("/admin")) return;
        setOpen(true);
        // Flag’i open sonrası yaz — dialog gerçekten açıldı
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, ms);

    return () => window.clearTimeout(id);
  }, []);

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
