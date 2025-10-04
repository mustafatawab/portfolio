import { GraduationCap, School, Laptop, Award } from "lucide-react";

interface EduType  {
    degree: String;
    institution: String;
    period: String;
    description: String;
    achievements: String[];
    icon: any;
    color: string
}

export const education: EduType[] = [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "University of Lahore, Islamabad Campus",
      period: "2019 - 2024",
      description: "Specialization in Artificial Intelligence and Machine Learning. Dissertation: \"Autonomous Agent Coordination in Multi-Agent Reinforcement Learning Environments\"",
      achievements: [
        "CGPA : 2.85/4.00",
        "Final Year Project",
        "Conducted seminars on tech",
      ],
      icon: GraduationCap,
      color: "blue",
    },
    // {
    //   degree: "M.S. in Machine Learning",
    //   institution: "Carnegie Mellon University",
    //   period: "2009 - 2011",
    //   description: "Advanced coursework in deep learning, neural networks, and statistical learning theory. Thesis on \"Hierarchical Reinforcement Learning for Complex Decision Making\"",
    //   achievements: [
    //     "GPA: 3.95/4.0",
    //     "Teaching Assistant",
    //     "Dean's List",
    //   ],
    //   icon: School,
    //   color: "green",
    // },
    
    {
      degree: "Certified Agentic and Robotic Engineer",
      institution: "Panaversity",
      period: "2025 - Present",
      description: "Ongoing professional development through advanced certifications and specialized training programs in emerging AI technologies and Agentic AI Developement.",
      achievements: [
        "Modern Python",
        "FastAPI",
        "OpenAI Agent SDK",
        "N8N",
        "Prompt Engnineering",
        "Context Engineering",
      ],
      icon: Award,
      color: "orange",
    },

    {
      degree: "Certified Metaverse and Web3 Program",
      institution: "PIAIC",
      period: "2023 - 2024",
      description: "Strong foundation in algorithms, data structures, and software engineering. Minor in Mathematics with focus on linear algebra and optimization theory. Completed Full stack developement using modern and latest technology",
      achievements: [
        "Nextjs",
        "Tailwind CSS",
        "PostgreSQL",
        "Headless CMS",
        "API Development"
      ],
      icon: Award,
      color: "purple",
    },
  ];