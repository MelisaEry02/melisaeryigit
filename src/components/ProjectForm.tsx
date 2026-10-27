import { deleteProject, saveProject } from "@/app/admin/projeler/actions";
import type { Project } from "@/lib/db";

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="max-w-2xl space-y-4">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <div>
        <label className="label" htmlFor="title">
          Başlık
        </label>
        <input
          className="field"
          id="title"
          name="title"
          required
          defaultValue={project?.title}
        />
      </div>
      <div>
        <label className="label" htmlFor="slug">
          Slug
        </label>
        <input
          className="field"
          id="slug"
          name="slug"
          defaultValue={project?.slug}
        />
      </div>
      <div>
        <label className="label" htmlFor="summary">
          Kısa özet
        </label>
        <textarea
          className="field min-h-20"
          id="summary"
          name="summary"
          defaultValue={project?.summary}
        />
      </div>
      <div>
        <label className="label" htmlFor="content">
          Detay
        </label>
        <textarea
          className="field min-h-40"
          id="content"
          name="content"
          defaultValue={project?.content}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="project_url">
            Proje URL
          </label>
          <input
            className="field"
            id="project_url"
            name="project_url"
            defaultValue={project?.project_url}
          />
        </div>
        <div>
          <label className="label" htmlFor="github_url">
            GitHub URL
          </label>
          <input
            className="field"
            id="github_url"
            name="github_url"
            defaultValue={project?.github_url}
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="image_url">
          Görsel URL
        </label>
        <input
          className="field"
          id="image_url"
          name="image_url"
          defaultValue={project?.image_url}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="sort_order">
            Sıra
          </label>
          <input
            className="field"
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
          />
        </div>
        <div>
          <label className="label" htmlFor="status">
            Durum
          </label>
          <select
            className="field"
            id="status"
            name="status"
            defaultValue={project?.status || "draft"}
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(project?.featured)}
        />
        Ana sayfada öne çıkar
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
        {project ? (
          <button formAction={deleteProject} type="submit" className="btn btn-ghost">
            Sil
          </button>
        ) : null}
      </div>
    </form>
  );
}
