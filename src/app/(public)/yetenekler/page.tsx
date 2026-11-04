import type { Metadata } from "next";
import { SpeechBubble } from "@/components/SpeechBubble";
import { TechCards } from "@/components/TechCards";
import { getDb, type Skill } from "@/lib/db";

export const metadata: Metadata = { title: "Yetenekler" };

export default function SkillsPage() {
  const skills = getDb()
    .prepare(`SELECT * FROM skills ORDER BY sort_order ASC, id ASC`)
    .all() as Skill[];

  return (
    <div className="site-shell page-with-soft-snow py-16 md:py-20">
      <SpeechBubble label="Yetenekler">
        <h1 className="type-h1">Yetenekler</h1>
        <p className="mt-3 type-lead">
          Araçlar ve teknolojiler — hangisinde rahatım, hangisini hâlâ
          öğreniyorum.
        </p>
        <div className="mt-10">
          <TechCards skills={skills} />
        </div>
      </SpeechBubble>
    </div>
  );
}
