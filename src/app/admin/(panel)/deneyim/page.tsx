import {
  deleteExperience,
  saveExperience,
} from "@/app/admin/(panel)/deneyim/actions";
import { getDb, type Experience } from "@/lib/db";

export default function AdminExperiencePage() {
  const items = getDb()
    .prepare(`SELECT * FROM experiences ORDER BY sort_order ASC, id DESC`)
    .all() as Experience[];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Deneyim & eğitim</h1>
      <form action={saveExperience} className="mt-8 max-w-2xl space-y-3 rounded-xl border border-pink-200 bg-white/40 p-5">
        <p className="font-medium text-ink">Yeni kayıt</p>
        <input className="field" name="title" placeholder="Başlık" required />
        <input className="field" name="organization" placeholder="Kurum" />
        <select className="field" name="kind" defaultValue="work">
          <option value="work">İş</option>
          <option value="education">Eğitim</option>
        </select>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="field" name="start_date" placeholder="Başlangıç (2024)" />
          <input className="field" name="end_date" placeholder="Bitiş (boş = devam)" />
        </div>
        <input className="field" name="location" placeholder="Konum" />
        <textarea className="field min-h-20" name="description" placeholder="Açıklama" />
        <input className="field" name="sort_order" type="number" defaultValue={0} />
        <button type="submit" className="btn btn-primary">
          Ekle
        </button>
      </form>

      <ul className="mt-10 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-pink-200 bg-white/40 p-5"
          >
            <form action={saveExperience} className="space-y-3">
              <input type="hidden" name="id" value={item.id} />
              <input className="field" name="title" defaultValue={item.title} required />
              <input
                className="field"
                name="organization"
                defaultValue={item.organization}
              />
              <select className="field" name="kind" defaultValue={item.kind}>
                <option value="work">İş</option>
                <option value="education">Eğitim</option>
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field"
                  name="start_date"
                  defaultValue={item.start_date}
                />
                <input
                  className="field"
                  name="end_date"
                  defaultValue={item.end_date}
                />
              </div>
              <input
                className="field"
                name="location"
                defaultValue={item.location}
              />
              <textarea
                className="field min-h-20"
                name="description"
                defaultValue={item.description}
              />
              <input
                className="field"
                name="sort_order"
                type="number"
                defaultValue={item.sort_order}
              />
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
                <button
                  formAction={deleteExperience}
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
