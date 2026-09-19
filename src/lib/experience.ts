interface ExperieceType {
    title: String
    company: String
    location: String
    period: String
    description: String
    tags: String[]
    dotColor: String
}

export const experiences: ExperieceType[] = [
    {
        title: "Software Engineer",
        company: "Webtronix",
        location: "Luxus Mall, Gulberg Green, Islamabad, Pakistan",
        period: "July 2026 - Present",
        description:
            "Building AI-driven products and internal tools using Next.js and the MERN stack. Current work includes a School ERP system and an AI Interview Application, with a focus on AI integration and production-grade architecture.",
        tags: ["Next.js", "Node.js", "AI Integration", "MongoDB", "TanStack"],
        dotColor: "bg-purple-600",
    },
    {
        title: "Full Stack Developer",
        company: "Atlas Solution",
        location: "Gulberg Green, Islamabad, Pakistan",
        period: "March 2026 - July 2026",
        description:
            "Led end-to-end development of maktabOne, a School Fee Management ERP - from requirements and UI design through production deployment on a Hostinger VPS with Nginx reverse proxy, SSL, and Docker. Also built 3 client websites including the company's own.",
        tags: ["MongoDB", "Express.js", "React", "Node.js", "Docker", "Nginx"],
        dotColor: "bg-purple-600",
    },
    {
        title: "Frontend Developer",
        company: "Nodesol Corp Pvt Ltd",
        location: "Mingora, Swat, Pakistan",
        period: "1 Year",
        description:
            "Leading the frontend developers. Spearheading research in new frontend librariries and design libraries.",
        tags: ["Vuejs", "Quasar.js", "GraphQL API", "API Integration"],
        dotColor: "bg-accent-cyan",
    },
    {
        title: "Web Developer",
        company: "Yodo",
        period: "3 Months",
        location: "Johar Town, Lahore, Pakistan",
        description:
            "Designed websites using custom css and html while using git with the team. Performed wordpress website creation task till deadline. Worked on Wordpress customization using PHP. Worked on Lumen API developement.",
        tags: ["Wordpress", "HTML/CSS Bootstrap", "Php", "Git & Github"],
        dotColor: "bg-green-500",
    },
]
