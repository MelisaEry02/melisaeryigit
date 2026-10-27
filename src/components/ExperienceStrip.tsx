import Link from "next/link";
import type { Experience } from "@/lib/db";

export function ExperienceStrip({ items }: { items: Experience[] }) {
  if (items.length === 0) {
    return (
      <div className="exp-strip">
        <div className="exp-strip__head">
          <h2 className="type-h2">Deneyimler</h2>
          <p className="text-ink-soft">Admin’den deneyim eklediğinde burada şerit halinde görünür.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exp-strip">
      <div className="exp-strip__head">
        <div>
          <p className="section-panel__eyebrow">Yolculuk</p>
          <h2 className="type-h2">Deneyimler</h2>
        </div>
        <Link href="/deneyim" className="nav-link">
          Tümü
        </Link>
      </div>
      <div className="exp-strip__track" role="list">
        {items.map((item) => (
          <article key={item.id} className="exp-strip__card" role="listitem">
            <p className="exp-strip__meta">
              {item.kind === "education" ? "Eğitim" : "İş"} · {item.start_date}
              {item.end_date ? ` – ${item.end_date}` : " – …"}
            </p>
            <h3 className="type-h3">{item.title}</h3>
            <p className="exp-strip__org">
              {item.organization}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            {item.description ? (
              <p className="exp-strip__desc">{item.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
