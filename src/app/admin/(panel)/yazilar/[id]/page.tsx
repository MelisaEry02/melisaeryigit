import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { getDb, type Post } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = getDb()
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(Number(id)) as Post | undefined;
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl text-ink">Yazıyı düzenle</h1>
      <PostForm post={post} />
    </div>
  );
}
