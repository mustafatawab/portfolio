import mobile from "@/assets/mobile-app.png";
import devops from "@/assets/devops.png";
import desktop from "@/assets/desktop.png";
import web from "@/assets/web-development.png";
import wordress from "@/assets/wordpress.png";
import Image from "next/image";
import {
  Book,
  BookAIcon,
  BookDashedIcon,
  BookHeadphonesIcon,
} from "lucide-react";
import { ArrowRight, Cpu, Database, Globe, Layers, Users } from "lucide-react";

export const services = [
  {
    title: "Web Application Development",
    content:
      "Modern, responsive web applications built with the latest technologies",
    points: [
      "Single-page applications (SPAs)",
      "Progressive web apps (PWAs)",
      "E-commerce platforms",
      "Content management systems",
    ],
    icon: "layout",
  },

  {
    title: "Frontend Development",
    content: "Creating beautiful, interactive user interfaces with modern frameworks like React, Next.js, and Tailwind CSS.",
    points: [
      "Responsive UI design",
      "Interactive web components",
      "Modern JavaScript frameworks",
      "Performance optimization",
      "Cross-browser compatibility",
    ],
    icon: "monitor",
  },
  {
    title: "Fullstack Development",
    content:
      "End-to-end application development with modern frontend frameworks and robust backend solutions.",
    points: [
      "End-to-end application development",
      "API design and integration",
      "Database management and optimization",
      "Server-side logic implementation",
      "Frontend-backend synchronization",
    ],
    icon: "code",
  },
  {
    title: "Custom Agent Development",
    content:
      "Implementing intelligent solutions using machine learning and AI technologies to solve complex problems.",
    points: [
      "Autonomous agent architecture",
      "Multi-agent systems",
      "Task automation agents",
      "Conversational AI agents",
      "Custom agent development",
    ],
    icon: "cpu",
  },

  {
    title: "Database Design",
    content:
      "Create efficient and scalable database architectures for optimal data management.",
    points: [
      "Relational database modeling",
      "Schema design and normalization",
      "Query optimization and indexing",
      "Data integrity and security",
      "Scalable NoSQL solutions",
    ],

    icon: "database",
  },

  {
    title: "API Development",
    content:
      "Develop secure and efficient APIs to enable seamless application communication.",
    img: "wordress",
    points: [
      "RESTful API design",
      "GraphQL implementation",
      "Authentication and authorization",
      "API documentation and testing",
      "Rate limiting and scalability",
    ],
    icon: "settings",
  },
];
