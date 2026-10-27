import type { Metadata } from "next";
import { SpeechBubble } from "@/components/SpeechBubble";
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
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Yetenekler">
        <h1 className="type-h1">Yetenekler</h1>
        <p className="mt-3 type-lead">Araçlar ve konular.</p>
        <div className="mt-10 space-y-10">
          {Object.entries(byCategory).map(([cat, list]) => (
            <section key={cat}>
              <h2 className="type-h2">{cat}</h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {list.map((s) => (
                  <li key={s.id} className="text-ink-soft">
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </SpeechBubble>
    </div>
  );
}
