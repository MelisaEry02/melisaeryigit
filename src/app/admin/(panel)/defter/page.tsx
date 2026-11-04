import { deleteGuestbookEntry } from "@/app/admin/(panel)/defter/actions";
import { getDb, type GuestbookEntry } from "@/lib/db";

export default function AdminGuestbookPage() {
  const entries = getDb()
    .prepare(
      `SELECT * FROM guestbook ORDER BY id DESC LIMIT 200`
    )
    .all() as GuestbookEntry[];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Ziyaretçi defteri</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Spam veya uygunsuz notları buradan silebilirsin.
      </p>
      <ul className="mt-8 space-y-4">
        {entries.length === 0 && (
          <li className="text-ink-soft">Henüz kayıt yok.</li>
        )}
        {entries.map((e) => (
          <li
            key={e.id}
            className="rounded-xl border border-pink-200 bg-white/40 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{e.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{e.message}</p>
                <p className="mt-2 text-xs text-ink-soft">{e.created_at}</p>
              </div>
              <form action={deleteGuestbookEntry}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="btn btn-ghost">
                  Sil
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
