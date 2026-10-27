import Link from "next/link";
import type { Experience } from "@/lib/db";

/** Düz çizgi timeline — noktalı öğeler. */
export function ExperienceStrip({ items }: { items: Experience[] }) {
  return (
    <div className="exp-line">
      <div className="exp-line__head">
        <div>
          <p className="section-panel__eyebrow">Yolculuk</p>
          <h2 className="type-h2">Deneyimler</h2>
        </div>
        <Link href="/deneyim" className="nav-link">
          Tümü
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-ink-soft">
          Admin’den deneyim eklediğinde burada zaman çizelgesi oluşur.
        </p>
      ) : (
        <ol className="exp-line__rail">
          {items.map((item) => (
            <li key={item.id} className="exp-line__item">
              <span className="exp-line__dot" aria-hidden />
              <div className="exp-line__body">
                <p className="exp-line__meta">
                  {item.kind === "education" ? "Eğitim" : "İş"} ·{" "}
                  {item.start_date}
                  {item.end_date ? ` – ${item.end_date}` : " – …"}
                </p>
                <h3 className="type-h3">{item.title}</h3>
                <p className="exp-line__org">
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                {item.description ? (
                  <p className="exp-line__desc">{item.description}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
