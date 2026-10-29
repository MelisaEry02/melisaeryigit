import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/ProjectForm";
import { getDb, type Project } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getDb()
    .prepare(`SELECT * FROM projects WHERE id = ?`)
    .get(Number(id)) as Project | undefined;
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl text-ink">Projeyi düzenle</h1>
      <ProjectForm project={project} />
    </div>
  );
}
