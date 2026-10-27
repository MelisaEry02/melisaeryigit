import type { Metadata } from "next";
import { getDb, type Experience } from "@/lib/db";

export const metadata: Metadata = { title: "Deneyim" };

export default function ExperiencePage() {
  const items = getDb()
    .prepare(
      `SELECT * FROM experiences ORDER BY sort_order ASC, id DESC`
    )
    .all() as Experience[];

  return (
    <div className="site-shell py-16 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">
        Deneyim & eğitim
      </h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        Zaman çizelgesi — iş ve okul.
      </p>
      <ol className="relative mt-14 space-y-0 border-l border-pink-300 pl-8">
        {items.map((item) => (
          <li key={item.id} className="relative pb-12">
            <span
              className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-rose ring-4 ring-pink-100"
              aria-hidden
            />
            <p className="text-sm font-semibold uppercase tracking-wide text-rose">
              {item.kind === "education" ? "Eğitim" : "İş"} ·{" "}
              {item.start_date}
              {item.end_date ? ` – ${item.end_date}` : " – devam"}
            </p>
            <h2 className="font-display mt-2 text-2xl text-ink md:text-3xl">
              {item.title}
            </h2>
            <p className="mt-1 text-ink-soft">
              {item.organization}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            {item.description ? (
              <p className="mt-3 max-w-2xl text-ink-soft">{item.description}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
