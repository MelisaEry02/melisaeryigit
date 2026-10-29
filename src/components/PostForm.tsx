import { deletePost, savePost } from "@/app/admin/(panel)/yazilar/actions";
import type { Post } from "@/lib/db";

export function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePost} className="max-w-2xl space-y-4">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div>
        <label className="label" htmlFor="title">
          Başlık
        </label>
        <input
          className="field"
          id="title"
          name="title"
          required
          defaultValue={post?.title}
        />
      </div>
      <div>
        <label className="label" htmlFor="slug">
          Slug (boş bırakılırsa otomatik)
        </label>
        <input className="field" id="slug" name="slug" defaultValue={post?.slug} />
      </div>
      <div>
        <label className="label" htmlFor="excerpt">
          Özet
        </label>
        <textarea
          className="field min-h-20"
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt}
        />
      </div>
      <div>
        <label className="label" htmlFor="content">
          İçerik
        </label>
        <textarea
          className="field min-h-56"
          id="content"
          name="content"
          required
          defaultValue={post?.content}
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
          defaultValue={post?.status || "draft"}
        >
          <option value="draft">Taslak</option>
          <option value="published">Yayında</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
        {post ? (
          <button
            formAction={deletePost}
            type="submit"
            className="btn btn-ghost"
            name="id"
            value={post.id}
          >
            Sil
          </button>
        ) : null}
      </div>
    </form>
  );
}
