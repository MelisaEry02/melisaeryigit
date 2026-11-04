import Link from "next/link";
import { BlogExpandList } from "@/components/BlogExpandList";
import { CommandPaletteTrigger } from "@/components/CommandPalette";
import { ContactCta } from "@/components/ContactCta";
import { EdgeLogos } from "@/components/EdgeLogos";
import { EmptyHint } from "@/components/EmptyHint";
import { ExperienceStrip } from "@/components/ExperienceStrip";
import { HeroSnowscape } from "@/components/HeroSnowscape";
import { SectionPanel } from "@/components/SectionPanel";
import { SnowflakeLogo } from "@/components/SnowflakeLogo";
import { WinterBridge } from "@/components/WinterBridge";
import {
  getDb,
  getSettings,
  type Experience,
  type Post,
  type Project,
} from "@/lib/db";

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

  const experiences = db
    .prepare(`SELECT * FROM experiences ORDER BY sort_order ASC, id DESC`)
    .all() as Experience[];

  return (
    <div className="pb-8 page-with-soft-snow">
      <section className="hero-stage relative overflow-hidden">
        <div className="hero-stage__bg" aria-hidden>
          <span className="hero-stage__mesh" />
        </div>
        <HeroSnowscape />

        <div className="site-shell relative z-[2] grid min-h-[calc(100vh-5rem)] place-items-center py-16 md:py-24">
          <div className="hero-brand fade-up max-w-4xl">
            <SnowflakeLogo className="hero-brand__mark" />
            <p className="hero-brand__eyebrow">Kişisel web sitesi</p>
            <h1 className="hero-brand__name hero-brand__name--xl">
              {settings.site_name || "Melisa Eryiğit"}
            </h1>
            <p className="fade-up-delay type-lead mt-2 max-w-2xl font-medium">
              {settings.tagline}
            </p>
            <p className="fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {settings.hero_intro}
            </p>
            <div className="fade-up-delay-2 mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/projeler" className="btn btn-primary">
                Projelerime bakın
              </Link>
              <ContactCta variant="ghost" />
              <CommandPaletteTrigger className="cmdk-trigger--cta" />
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <EdgeLogos />

        <SectionPanel eyebrow="Şu an" className="pt-4">
          <h2 className="type-h2">Ne üzerindeyim?</h2>
          <p className="mt-4 max-w-2xl type-lead">
            {settings.currently_working_on}
          </p>
        </SectionPanel>

        <SectionPanel>
          <div className="home-section__head">
            <h2 className="type-h2">Öne çıkan projeler</h2>
            <p className="text-ink-soft">Seçilmiş işler ve denemeler.</p>
            <Link href="/projeler" className="nav-link mt-1">
              Tümü
            </Link>
          </div>
          {projects.length === 0 ? (
            <EmptyHint
              title="Henüz öne çıkan proje yok"
              body="Admin’den bir proje yayınlayıp “öne çıkan” işaretlediğinde burada görünür."
            />
          ) : (
            <ul className="home-list mt-8 space-y-7">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="border-b border-pink-200/70 pb-7 last:border-0 last:pb-0"
                >
                  <Link href={`/projeler/${p.slug}`} className="group block">
                    <h3 className="type-h3 transition group-hover:text-rose">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-ink-soft">{p.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionPanel>

        <SectionPanel>
          <div className="home-section__head">
            <h2 className="type-h2">Son yazılar</h2>
            <p className="text-ink-soft">Blogdan kısa notlar — aynı sayfada açılır.</p>
            <Link href="/blog" className="nav-link mt-1">
              Blog
            </Link>
          </div>
          {posts.length === 0 ? (
            <EmptyHint
              title="Henüz yayınlanmış yazı yok"
              body="İlk yazını admin panelinden taslak olarak yazıp yayınladığında burada listelenir."
            />
          ) : (
            <div className="home-list mt-8">
              <BlogExpandList posts={posts} compact />
            </div>
          )}
        </SectionPanel>

        <section className="site-shell pb-2 pt-6">
          <ExperienceStrip items={experiences} />
        </section>

        <WinterBridge />
      </div>
    </div>
  );
}
