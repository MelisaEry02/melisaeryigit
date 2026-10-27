import Link from "next/link";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";
import { getDb, getSettings, type Post, type Project } from "@/lib/db";

export default function HomePage() {
  const settings = getSettings();
  const db = getDb();

  const projects = db
    .prepare(
      `SELECT * FROM projects WHERE status = 'published' AND featured = 1
       ORDER BY sort_order ASC, id DESC LIMIT 3`
    )
    .all() as Project[];

  const posts = db
    .prepare(
      `SELECT * FROM posts WHERE status = 'published'
       ORDER BY published_at DESC, id DESC LIMIT 3`
    )
    .all() as Post[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="hero-orb pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#f3c4d4]/40 blur-3xl"
          aria-hidden
        />
        <div
          className="hero-orb pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[#e8a8bc]/30 blur-3xl"
          aria-hidden
          style={{ animationDelay: "1.5s" }}
        />

        <div className="site-shell relative grid min-h-[calc(100vh-5rem)] place-items-center py-16 md:py-20">
          <div className="hero-brand fade-up max-w-3xl">
            <SnowflakeLogo className="hero-brand__mark" />
            <h1 className="hero-brand__name">
              {settings.site_name || "Melisa Eryiğit"}
            </h1>
            <p className="fade-up-delay type-lead mt-1 max-w-2xl font-medium">
              {settings.tagline}
            </p>
            <p className="fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {settings.hero_intro}
            </p>
            <div className="fade-up-delay-2 mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/projeler" className="btn btn-primary">
                Projelerime bakın
              </Link>
              <Link href="/iletisim" className="btn btn-ghost">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell home-section border-t border-pink-200/60 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose">
          Şu an
        </p>
        <h2 className="type-h2 mt-2">Ne üzerindeyim?</h2>
        <p className="mt-4 max-w-2xl type-lead">
          {settings.currently_working_on}
        </p>
      </section>

      <section className="site-shell home-section py-16">
        <div className="home-section__head">
          <h2 className="type-h2">Öne çıkan projeler</h2>
          <p className="text-ink-soft">Seçilmiş işler ve denemeler.</p>
          <Link href="/projeler" className="nav-link mt-1">
            Tümü
          </Link>
        </div>
        <ul className="home-list mt-10 space-y-8">
          {projects.map((p) => (
            <li key={p.id} className="border-b border-pink-200/70 pb-8">
              <Link href={`/projeler/${p.slug}`} className="group block">
                <h3 className="type-h3 transition group-hover:text-rose">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-2xl text-ink-soft">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="site-shell home-section pb-20">
        <div className="home-section__head">
          <h2 className="type-h2">Son yazılar</h2>
          <p className="text-ink-soft">Blogdan kısa notlar.</p>
          <Link href="/blog" className="nav-link mt-1">
            Blog
          </Link>
        </div>
        <ul className="home-list mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-pink-200/70 pb-8">
              <Link href={`/blog/${post.slug}`} className="group block">
                <h3 className="type-h3 transition group-hover:text-rose">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-2xl text-ink-soft">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
