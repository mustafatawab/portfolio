import { getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudyListing } from "@/views/case-studies/case-study-listing";

export const metadata = {
  title: "Case Studies",
  description:
    "Engineering deep dives - architecture, design decisions, trade-offs, and lessons learned from production software systems.",
  openGraph: {
    title: "Case Studies | Mustafa Tawab",
    description:
      "Engineering deep dives - architecture, design decisions, trade-offs, and lessons learned from production software systems.",
  },
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  return <CaseStudyListing studies={studies} />;
}
