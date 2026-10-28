"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/lib/db";

type Props = {
  posts: Post[];
  /** Ana sayfa gibi daha sade liste */
  compact?: boolean;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("tr-TR");
}

function readTargetSlug(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("yazi");
  if (fromQuery) return fromQuery;
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("post-")) return hash.slice(5);
  return null;
}

export function BlogExpandList({ posts, compact = false }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      const target = readTargetSlug();
      if (!target) return;
      setOpenSlug(target);
      const el = document.getElementById(`post-${target}`);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    window.addEventListener("popstate", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.removeEventListener("popstate", apply);
    };
  }, []);

  function toggle(slug: string) {
    setOpenSlug((prev) => {
      const next = prev === slug ? null : slug;
      const url = new URL(window.location.href);
      if (next) {
        url.searchParams.set("yazi", next);
        url.hash = `post-${next}`;
      } else {
        url.searchParams.delete("yazi");
        url.hash = "";
      }
      history.replaceState(null, "", url.pathname + url.search + url.hash);
      return next;
    });
  }

  return (
    <ul className={`blog-expand ${compact ? "blog-expand--compact" : ""}`}>
      {posts.map((post) => {
        const open = openSlug === post.slug;
        return (
          <li
            key={post.id}
            id={`post-${post.slug}`}
            className="blog-expand__item"
          >
            <article>
              {post.published_at ? (
                <time className="blog-expand__date" dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
              ) : null}
              <h2 className={compact ? "type-h3" : "type-h2"}>
                <button
                  type="button"
                  className="blog-expand__title"
                  aria-expanded={open}
                  aria-controls={`post-body-${post.slug}`}
                  onClick={() => toggle(post.slug)}
                >
                  {post.title}
                </button>
              </h2>
              {post.excerpt ? (
                <p className="blog-expand__excerpt">{post.excerpt}</p>
              ) : null}

              <button
                type="button"
                className="blog-expand__toggle"
                aria-expanded={open}
                aria-controls={`post-body-${post.slug}`}
                onClick={() => toggle(post.slug)}
              >
                {open ? "Daralt" : "Devamını oku"}
              </button>

              <div
                id={`post-body-${post.slug}`}
                className={`blog-expand__body${open ? " is-open" : ""}`}
                aria-hidden={!open}
              >
                <div className="blog-expand__content whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
