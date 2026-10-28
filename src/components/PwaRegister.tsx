"use client";

import { useEffect } from "react";

/** Service worker — yalnızca güvenli bağlam (localhost / https). */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const secure =
      window.isSecureContext ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    if (!secure) {
      // LAN http://IP — iOS Ana Ekrana Ekle yine çalışır; SW Chrome için HTTPS ister
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* sessiz: PWA ikon/manifest yine de A2HS için yeterli */
    });
  }, []);

  return null;
}
