import mobile from "@/assets/mobile-app.png";
import devops from "@/assets/devops.png";
import desktop from "@/assets/desktop.png";
import web from "@/assets/web-development.png";
import wordress from "@/assets/wordpress.png";
import Image from "next/image";
import { Book, BookAIcon, BookDashedIcon, BookHeadphonesIcon } from "lucide-react";
import { ArrowRight, Cpu, Database, Globe, Layers, Users } from "lucide-react"

export const services = [
    {
      title: "Web Application Development",
      content:
        "Modern, responsive web applications built with the latest technologies",
      img: web,
      points : [
        "Single-page applications (SPAs)",
        "Progressive web apps (PWAs)",
        "E-commerce platforms",
        "Content management systems"
      ],
      icon : Globe
    },

    {
      title: "AI Integration",
      content:
        "Integrate cutting-edge AI capabilities into your applications.",
      img: wordress,
      points : [
        "Generative AI implementation",
        "Natural language processing",
        "Computer vision solutions",
        "Recommendation systems",
        "Custom AI model training"
      ]
    },

    {
      title: "AI Agent Development",
      content:
        "Build autonomous AI agents to automate tasks and solve problems",
      img: mobile,
      points : [
        "Autonomous agent architecture",
        "Multi-agent systems",
        "Task automation agents",
        "Conversational AI agents",
        "Custom agent development",
      ]
    },

    {
      title: "Backend Development",
      content:
        "Robust, scalable backend systems and APIs",
      img: desktop,
      points : [
        "RESTful API development",
        "GraphQL API development",
        "Database design and optimization",
        "Serverless architecture",
        "Microservices implementation"
      ]
    },

    {
      title : "Technical Training",
      content : "Comprehensive training programs for individuals and teams.",
      points : [
        "Web development workshops",
        "React and Next.js courses",
        "AI and machine learning training",
        "Custom team training programs",
        "One-on-one mentoring",
      ]
    }

  ];