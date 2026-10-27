import type { Metadata } from "next";
import { getDb, type Skill } from "@/lib/db";

export const metadata: Metadata = { title: "Yetenekler" };

export default function SkillsPage() {
  const skills = getDb()
    .prepare(`SELECT * FROM skills ORDER BY sort_order ASC, id ASC`)
    .all() as Skill[];

  const byCategory = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const key = s.category || "Diğer";
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="site-shell py-16 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Yetenekler</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        Araçlar ve konular — seviye 1–5.
      </p>
      <div className="mt-12 space-y-12">
        {Object.entries(byCategory).map(([cat, list]) => (
          <section key={cat}>
            <h2 className="font-display text-2xl text-ink">{cat}</h2>
            <ul className="mt-5 space-y-5">
              {list.map((s) => (
                <li key={s.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-ink">{s.name}</span>
                    <span className="text-sm text-ink-soft">{s.level}/5</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-pink-200/80">
                    <div
                      className="h-full rounded-full bg-rose transition-all"
                      style={{ width: `${(s.level / 5) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
