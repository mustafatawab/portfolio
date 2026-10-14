export interface ExperienceType {
    title: string
    company: string
    location: string
    period: string
    description: string
    tags: string[]
    dotColor: string
}

export const experiences: ExperienceType[] = [
    {
        title: "Software Engineer",
        company: "Webtronix",
        location: "Luxus Mall, Gulberg Green, Islamabad, Pakistan",
        period: "July 2026 — Present",
        description:
            "Building AI-driven products and internal tools using Next.js and the MERN stack. Current work includes a School ERP system and an AI Interview Application, with a focus on AI integration and production-grade architecture.",
        tags: ["Next.js", "Node.js", "AI Integration", "MongoDB", "TanStack"],
        dotColor: "bg-primary",
    },
    {
        title: "Full Stack Developer",
        company: "Atlas Solution",
        location: "Gulberg Green, Islamabad, Pakistan",
        period: "March 2026 — July 2026",
        description:
            "Led end-to-end development of maktabOne, a School Fee Management ERP — from requirements and UI design through production deployment on a VPS with Nginx reverse proxy, SSL, and Docker. Also built 3 client websites including the company's own.",
        tags: ["MongoDB", "Express.js", "React", "Node.js", "Docker", "Nginx"],
        dotColor: "bg-primary",
    },
    {
        title: "Frontend Developer",
        company: "Nodesol Corp Pvt Ltd",
        location: "Mingora, Swat, Pakistan",
        period: "2025 — 2026 (1 Year)",
        description:
            "Led frontend developers while spearheading research in modern frontend libraries, state architecture, and enterprise design systems.",
        tags: ["Vue.js", "Quasar.js", "GraphQL API", "API Integration"],
        dotColor: "bg-primary",
    },
    {
        title: "Web Developer",
        company: "Yodo",
        location: "Johar Town, Lahore, Pakistan",
        period: "2024 (3 Months)",
        description:
            "Designed and developed custom web applications with responsive architecture. Worked on WordPress customization and Lumen API development under strict delivery timelines.",
        tags: ["WordPress", "HTML/CSS", "PHP", "Git & GitHub"],
        dotColor: "bg-primary",
    },
]

