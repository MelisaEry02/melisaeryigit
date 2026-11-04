/* Melisa Eryiğit — favicon/HTML cache yok */
const CACHE = "me-pwa-v7-empty";
self.addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
// Hiçbir fetch'i cache'leme — favicon/document her zaman ağ
self.addEventListener("fetch", () => {});
