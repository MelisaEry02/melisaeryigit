import type { Metadata } from "next";
import { Guestbook } from "@/components/Guestbook";
import { SpeechBubble } from "@/components/SpeechBubble";
import { getDb, isVercelRuntime, type GuestbookEntry } from "@/lib/db";

export const metadata: Metadata = { title: "Ziyaretçi defteri" };

export default function GuestbookPage() {
  const entries = getDb()
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook
       WHERE status = 'visible'
       ORDER BY id DESC LIMIT 80`
    )
    .all() as Omit<GuestbookEntry, "status">[];

  return (
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Defter">
        <h1 className="type-h1">Ziyaretçi defteri</h1>
        <p className="mt-3 type-lead">
          Kısa bir not bırak — teşekkür, selam veya küçük bir iz.
        </p>
        <div className="mt-10">
          <Guestbook
            initialEntries={entries}
            ephemeral={isVercelRuntime()}
          />
        </div>
      </SpeechBubble>
    </div>
  );
}
