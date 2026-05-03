import { GraduationCap, Award } from "lucide-react";

interface EduType  {
    degree: string;
    institution: string;
    period: string;
    description: string;
    achievements: string[];
    icon: any;
    color: string;
    link?: string;
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
    {
      degree: "Certified Agentic AI Developer",
      institution: "Panaversity",
      period: "2025 - 2026",
      description: "Ongoing professional development through advanced certifications and specialized training programs in emerging AI technologies and Agentic AI Development.",
      achievements: [
        "Modern Python",
        "FastAPI",
        "OpenAI Agent SDK",
        "N8N",
        "Prompt Engineering",
        "Context Engineering",
      ],
      icon: Award,
      color: "orange",
      link: "https://panaversity.org/p/tawab05-vr5v/c/7810"
    },

    {
      degree: "Certified Metaverse and Web3 Program",
      institution: "PIAIC",
      period: "2023 - 2024",
      description: "Strong foundation in algorithms, data structures, and software engineering. Minor in Mathematics with focus on linear algebra and optimization theory. Completed Full stack development using modern and latest technology",
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