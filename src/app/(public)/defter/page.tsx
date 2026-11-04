import type { Metadata } from "next";
import { Guestbook } from "@/components/Guestbook";
import { SpeechBubble } from "@/components/SpeechBubble";
import { listGuestbookVisible } from "@/lib/guestbook";

export const metadata: Metadata = { title: "Ziyaretçi defteri" };
export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const entries = await listGuestbookVisible(80);

  return (
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Defter">
        <h1 className="type-h1">Ziyaretçi defteri</h1>
        <p className="mt-3 type-lead">
          Kısa bir not bırak — teşekkür, selam veya küçük bir iz.
        </p>
        <div className="mt-10">
          <Guestbook initialEntries={entries} />
        </div>
      </SpeechBubble>
    </div>
  );
}
