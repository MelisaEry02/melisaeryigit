import { skillBadgeLabel, type Skill } from "@/lib/db";

function mark(name: string) {
  const parts = name.replace(/\.js$/i, "").split(/\s+/);
  return (parts[0]?.slice(0, 2) || "?").toUpperCase();
}

export function TechCards({ skills }: { skills: Skill[] }) {
  if (!skills.length) return null;

  return (
    <ul className="tech-grid">
      {skills.map((s) => {
        const learning = s.proficiency === "learning";
        return (
          <li key={s.id} className="tech-card" tabIndex={0}>
            <span className="tech-card__mark" aria-hidden>
              {mark(s.name)}
            </span>
            <div className="tech-card__body">
              <p className="tech-card__name">{s.name}</p>
              {s.category ? (
                <p className="tech-card__cat">{s.category}</p>
              ) : null}
              <span
                className={`tech-card__badge${learning ? " tech-card__badge--learn" : ""}`}
              >
                {skillBadgeLabel(s.proficiency || "comfortable")}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
