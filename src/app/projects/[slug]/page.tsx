import { notFound } from "next/navigation";
import { getProjectShowcase, getAllProjectShowcases } from "@/lib/projects-data";
import { ProjectDetail } from "@/views/project-detail";
import { JsonLd, softwareSourceCodeSchema, breadcrumbSchema } from "@/lib/json-ld";

export async function generateStaticParams() {
  const projects = getAllProjectShowcases();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectShowcase(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Project`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Project Showcase | Mustafa Tawab`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectShowcase(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={softwareSourceCodeSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://mustafatawab.com" },
          { name: "Projects", url: "https://mustafatawab.com/projects" },
          { name: project.title, url: `https://mustafatawab.com/projects/${project.slug}` },
        ])}
      />
      <ProjectDetail project={project} />
    </>
  );
}
