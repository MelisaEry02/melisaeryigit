import Link from "next/link";
import type { Experience } from "@/lib/db";

/** Zigzag timeline — kutucuksuz; metinler sağ/sol. */
export function ExperienceStrip({ items }: { items: Experience[] }) {
  return (
    <div className="exp-zig">
      <div className="exp-zig__head">
        <div>
          <p className="section-panel__eyebrow">Yolculuk</p>
          <h2 className="type-h2">Deneyimler</h2>
        </div>
        <Link href="/deneyim" className="nav-link">
          Tümü
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-center text-ink-soft">
          Admin’den deneyim eklediğinde burada zigzag zaman çizelgesi oluşur.
        </p>
      ) : (
        <ol className="exp-zig__rail">
          {items.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <li
                key={item.id}
                className={`exp-zig__item exp-zig__item--${side}`}
              >
                <span className="exp-zig__dot" aria-hidden />
                <div className="exp-zig__body">
                  <p className="exp-zig__meta">
                    {item.kind === "education" ? "Eğitim" : "İş"} ·{" "}
                    {item.start_date}
                    {item.end_date ? ` – ${item.end_date}` : " – …"}
                  </p>
                  <h3 className="type-h3">{item.title}</h3>
                  <p className="exp-zig__org">
                    {item.organization}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {item.description ? (
                    <p className="exp-zig__desc">{item.description}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
