interface ExperieceType  {
    title : String;
    company: String;
    period: String;
    description: String;
    tags : String[];
    dotColor: String;
}

 export const experiences: ExperieceType[] = [
    {
      title: "Lead Frontend Developer",
      company: "Nodesol Corp Pvt Ltd",
      period: "1 Year",
      description: "Leading the frontend developers. Spearheading research in new frontend librariries and design libraries.",
      tags: ["Vuejs", "Quasar.js", "GraphQL API" , "API Integration"],
      dotColor: "bg-accent-cyan",
    },
    {
      title: "Web Developer",
      company: "Yodo",
      period: "3 Months",
      description: "Designed websites using custom css and html while using git with the team. Performed wordpress website creation task till deadline. Worked on Wordpress customization using PHP. Worked on Lumen API developement.",
      tags: ["Wordpress", "HTML/CSS Bootstrap", "Php" , "Git & Github"],
      dotColor: "bg-green-500",
    },
    
  ];