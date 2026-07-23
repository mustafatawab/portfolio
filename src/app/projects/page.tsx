import { ProjectsListing } from "@/views/projects-listing"

export const metadata = {
    title: "Projects",
    description:
        "Software products built to solve real business problems. Browse project showcases with architecture overviews, technology decisions, and engineering case studies.",
    openGraph: {
        title: "Projects | Mustafa Tawab",
        description:
            "Software products built to solve real business problems. Browse project showcases with architecture overviews, technology decisions, and engineering case studies.",
    },
}

export default function ProjectsPage() {
    return <ProjectsListing />
}
