import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudyDetail } from "@/views/case-studies/case-study-detail";

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case Study Not Found" };

  return {
    title: study.subtitle,
    description: `Engineering case study: ${study.subtitle}. Architecture, design decisions, trade-offs, and lessons learned.`,
    openGraph: {
      title: `${study.title} - Case Study | Mustafa Tawab`,
      description: `Engineering case study: ${study.subtitle}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return <CaseStudyDetail study={study} />;
}
