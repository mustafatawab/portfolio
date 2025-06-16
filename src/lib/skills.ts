interface Stack {
  label : string,
  tooltip : string,
}

interface SkillType {
  label : string,
  stack : Stack[],
}
export const skills: SkillType[] = [
  {
    label: "Frontend Technologies",
    stack: [
      {
        label: "HTML/CSS",
        tooltip: "Web Page Design",
      },

      {
        label: "Javacript/Typescript",
        tooltip: "Core Web Programming",
      },
      {
        label: "Tailwind CSS",
        tooltip: "Design Library",
      },

      {
        label: "Bootstrap",
        tooltip: "Design Library",
      },
      {
        label: "React.js",
        tooltip: "Frontend developement",
      },

      {
        label: "Vue.js",
        tooltip: "Frontend developement",
      },


      {
        label: "Shadcn UI",
        tooltip: "Component Based Design Library",
      },
    ],
  },

  {
    label: "Backend Technologies",
    stack: [
      {
        label: "Next.js",
        tooltip: "Full Stack Framework",
      },

      {
        label: "Node.js",
        tooltip: "Javascript Backend Technology",
      },

      {
        label: "Express.js",
        tooltip: "API Development using JS",
      },

      {
        label: "Laravel",
        tooltip: "PHP Based web framework",
      },

      {
        label: "Fast API",
        tooltip: "Python based Microservice developement",
      },
    ],
  },

  {
    label : "Artificial Intelligence",
    stack : [
      {
        label : "Generative AI",
        tooltip : "Generative AI"
      },
      {
        label : "AI Agents",
        tooltip : "Developing Agents"
      },
      {
        label : "Crew AI",
        tooltip : "Multi Agent Framework"
      },

      {
        label : "Langchain & Langraph",
        tooltip : "Agentic Workflow and Agents Development"
      }
    ]
  },

  {
    label: "Databases & DevOps",
    stack: [
      {
        label: "Mongodb",
        tooltip: "NoSQL Databsase",
      },

      {
        label: "MySQL",
        tooltip: "SQL Database",
      },

      {
        label : "Pincorn",
        tooltip : "Vector database for AI"
      },

      {
        label: "PostgreSQL",
        tooltip: "Open Source & ORDBMS",
      },
      {
        label: "Docker",
        tooltip: "Containerized Applications",
      },

      {
        label: "Kubernetes",
        tooltip: "Automate and Scale Applications",
      },

      {
        label: "Terraform",
        tooltip: "Infrastructure as Code",
      },
    ],
  },
];
