/* Melisa Eryiğit PWA — hafif önbellek (app shell) */
const CACHE = "me-pwa-v6";
const PRECACHE = [
  "/manifest.webmanifest?v=mev6",
  "/brand/me-v6-192.png",
  "/brand/me-v6-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Admin / API / favicon-brand: ağı doğrudan kullan (SW cache etme)
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api") ||
    url.pathname === "/favicon.ico" ||
    url.pathname.startsWith("/brand/") ||
    url.pathname === "/icon.png" ||
    url.pathname === "/apple-icon.png"
  ) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        throw new Error("offline");
      })
  );
});
