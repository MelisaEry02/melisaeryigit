/** Admin ayarındaki sosyal URL’den görünen handle/ad. */
export function socialLabel(
  url: string,
  network: "tiktok" | "github" | "instagram"
): string {
  const raw = (url || "").trim();
  if (!raw) return "";

  try {
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(href);
    const parts = u.pathname.split("/").filter(Boolean);

    if (network === "github") {
      // github.com/MelisaEry02[/...] → MelisaEry02
      return decodeURIComponent(parts[0] || "").replace(/^@/, "");
    }

    // tiktok.com/@x veya instagram.com/x → @x
    let seg = decodeURIComponent(parts[0] || "");
    if (!seg && u.hostname.includes("tiktok")) {
      seg = "";
    }
    if (!seg) return "";
    return seg.startsWith("@") ? seg : `@${seg}`;
  } catch {
    if (network === "github") return raw.replace(/^@/, "");
    return raw.startsWith("@") ? raw : `@${raw.replace(/^@/, "")}`;
  }
}
