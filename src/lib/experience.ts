interface ExperieceType  {
    title : String;
    company: String;
    location : String;
    period: String;
    description: String;
    tags : String[];
    dotColor: String;
}

 export const experiences: ExperieceType[] = [
    {
      title: "Full Stack Developer",
      company: "Atlas Solution",
      location : "Gulberg Green, Islamabad, Pakistan",
      period: "March 2026 - Present",
      description: "Building scalable digital platforms and custom software solutions for startups and enterprises. Focusing on full-stack development with Next.js and FastAPI, integrating AI-driven workflows to automate business processes.",
      tags: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "TanStack"],
      dotColor: "bg-purple-600",
    },
    {
      title: "Lead Frontend Developer",
      company: "Nodesol Corp Pvt Ltd",
      location : "Mingora, Swat, Pakistan",
      period: "1 Year",
      description: "Leading the frontend developers. Spearheading research in new frontend librariries and design libraries.",
      tags: ["Vuejs", "Quasar.js", "GraphQL API" , "API Integration"],
      dotColor: "bg-accent-cyan",
    },
    {
      title: "Web Developer",
      company: "Yodo",
      period: "3 Months",
      location : "Johar Town, Lahore, Pakistan",
      description: "Designed websites using custom css and html while using git with the team. Performed wordpress website creation task till deadline. Worked on Wordpress customization using PHP. Worked on Lumen API developement.",
      tags: ["Wordpress", "HTML/CSS Bootstrap", "Php" , "Git & Github"],
      dotColor: "bg-green-500",
    },
    
  ];