import { deleteSkill, saveSkill } from "@/app/admin/(panel)/yetenekler/actions";
import { getDb, skillBadgeLabel, type Skill } from "@/lib/db";

export default function AdminSkillsPage() {
  const skills = getDb()
    .prepare(`SELECT * FROM skills ORDER BY sort_order ASC, id ASC`)
    .all() as Skill[];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Yetenekler</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Rozet: {skillBadgeLabel("learning")} / {skillBadgeLabel("comfortable")}
      </p>
      <form
        action={saveSkill}
        className="mt-8 max-w-2xl space-y-3 rounded-xl border border-pink-200 bg-white/40 p-5"
      >
        <p className="font-medium text-ink">Yeni yetenek</p>
        <input className="field" name="name" placeholder="İsim" required />
        <input className="field" name="category" placeholder="Kategori" />
        <div className="grid gap-3 sm:grid-cols-2">
          <select className="field" name="proficiency" defaultValue="comfortable">
            <option value="comfortable">Rahatlıkla kod yazıyorum</option>
            <option value="learning">Henüz öğreniyorum</option>
          </select>
          <input
            className="field"
            name="level"
            type="number"
            min={1}
            max={5}
            defaultValue={3}
            placeholder="Seviye 1-5"
          />
          <input className="field" name="sort_order" type="number" defaultValue={0} />
        </div>
        <button type="submit" className="btn btn-primary">
          Ekle
        </button>
      </form>

      <ul className="mt-10 space-y-4">
        {skills.map((s) => (
          <li
            key={s.id}
            className="rounded-xl border border-pink-200 bg-white/40 p-5"
          >
            <form action={saveSkill} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="id" value={s.id} />
              <input className="field" name="name" defaultValue={s.name} required />
              <input
                className="field"
                name="category"
                defaultValue={s.category}
              />
              <select
                className="field"
                name="proficiency"
                defaultValue={
                  s.proficiency === "learning" ? "learning" : "comfortable"
                }
              >
                <option value="comfortable">Rahatlıkla kod yazıyorum</option>
                <option value="learning">Henüz öğreniyorum</option>
              </select>
              <input
                className="field"
                name="level"
                type="number"
                min={1}
                max={5}
                defaultValue={s.level}
              />
              <input
                className="field"
                name="sort_order"
                type="number"
                defaultValue={s.sort_order}
              />
              <div className="flex gap-2 sm:col-span-2">
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
                <button
                  formAction={deleteSkill}
                  type="submit"
                  className="btn btn-ghost"
                >
                  Sil
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
