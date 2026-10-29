import {
  deleteMessage,
  setMessageStatus,
} from "@/app/admin/(panel)/mesajlar/actions";
import { getDb, type Message } from "@/lib/db";

export default function AdminMessagesPage() {
  const messages = getDb()
    .prepare(`SELECT * FROM messages ORDER BY created_at DESC`)
    .all() as Message[];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Gelen kutusu</h1>
      <p className="mt-2 text-ink-soft">
        İletişim formundan gelen mesajlar. E-posta gönderilmez.
      </p>
      {messages.length === 0 ? (
        <p className="mt-8 text-ink-soft">Henüz mesaj yok.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {messages.map((m) => (
            <li
              key={m.id}
              className="rounded-xl border border-pink-200 bg-white/45 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">
                    {m.name}{" "}
                    <span className="font-normal text-ink-soft">&lt;{m.email}&gt;</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {m.subject || "(konu yok)"} ·{" "}
                    {new Date(m.created_at).toLocaleString("tr-TR")} ·{" "}
                    {m.status === "unread"
                      ? "okunmadı"
                      : m.status === "archived"
                        ? "arşiv"
                        : "okundu"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.status !== "read" ? (
                    <form action={setMessageStatus}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="status" value="read" />
                      <button type="submit" className="btn btn-ghost !px-3 !py-1.5 text-sm">
                        Okundu
                      </button>
                    </form>
                  ) : null}
                  {m.status !== "archived" ? (
                    <form action={setMessageStatus}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="status" value="archived" />
                      <button type="submit" className="btn btn-ghost !px-3 !py-1.5 text-sm">
                        Arşivle
                      </button>
                    </form>
                  ) : null}
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="btn btn-ghost !px-3 !py-1.5 text-sm">
                      Sil
                    </button>
                  </form>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-ink-soft">{m.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
