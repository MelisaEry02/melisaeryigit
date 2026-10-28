import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

/** Eski slug URL’leri blog listesine (in-page expand) yönlendirir. */
export default async function BlogPostRedirect({ params }: Props) {
  const { slug } = await params;
  const post = getDb()
    .prepare(`SELECT slug FROM posts WHERE slug = ? AND status = 'published'`)
    .get(slug) as { slug: string } | undefined;

  if (post) {
    redirect(`/blog?yazi=${encodeURIComponent(post.slug)}`);
  }
  redirect("/blog");
}
