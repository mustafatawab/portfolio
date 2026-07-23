"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearnSkillsPage() {
  const skills = [
    {
      title: "Web Development Fundamentals",
      description:
        "Learn HTML, CSS, and JavaScript to build the foundation of modern web development.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Beginner",
      duration: "4 weeks",
      topics: [
        "HTML5",
        "CSS3",
        "JavaScript Basics",
        "Responsive Design",
        "Web Accessibility",
      ],
      link: "/#contact",
    },
    {
      title: "React & Next.js Development",
      description:
        "Master React and Next.js to build modern, performant web applications.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Intermediate",
      duration: "8 weeks",
      topics: [
        "React Fundamentals",
        "Hooks & State Management",
        "Next.js App Router",
        "Server Components",
        "API Integration",
      ],
      link: "/#contact",
    },
    {
      title: "Vue.js Development",
      description:
        "Learn Vue.js to build reactive, component-based web applications.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Intermediate",
      duration: "6 weeks",
      topics: [
        "Vue.js Fundamentals",
        "Vue Router",
        "Vuex",
        "Composition API",
        "Vue 3 Features",
      ],
      link: "/#contact",
    },
    {
      title: "Quasar Framework",
      description:
        "Build high-performance Vue.js applications with the Quasar Framework.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Intermediate",
      duration: "5 weeks",
      topics: [
        "Quasar CLI",
        "UI Components",
        "Layouts",
        "Quasar Plugins",
        "Mobile Development",
      ],
      link: "/#contact",
    },
    {
      title: "Python Programming",
      description:
        "Learn Python for backend development, data analysis, and automation.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      topics: [
        "Python Basics",
        "Data Structures",
        "OOP in Python",
        "Web Scraping",
        "API Development",
      ],
      link: "/#contact",
    },
    {
      title: "AI Agent Development",
      description:
        "Build autonomous AI agents that can perform complex tasks and solve problems.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Advanced",
      duration: "10 weeks",
      topics: [
        "Agent Architecture",
        "LLM Integration",
        "Tool Use",
        "Memory Systems",
        "Multi-agent Systems",
      ],
      link: "/#contact",
    },
  ];

  return (
    <main className="bg-background min-h-screen pb-32">
      <section className="relative pt-40 pb-16 text-center">
        <div className="container space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold font-display text-foreground tracking-tight">
              Skills <span className="text-accent">Acquisition</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/40 text-sm max-w-xl mx-auto leading-relaxed"
          >
            Systematic learning paths designed to master modern full-stack
            development and AI integration.
          </motion.p>
        </div>
      </section>

      <section className="relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-hover p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                    {skill.icon}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="flex gap-4 pt-1">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-accent uppercase tracking-wider">
                      <Star size={10} /> {skill.level}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-foreground/30 uppercase tracking-wider">
                      <Clock size={10} /> {skill.duration}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <ul className="space-y-1.5">
                      {skill.topics.map((topic, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-foreground/40"
                        >
                          <CheckCircle size={12} className="text-accent" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={skill.link} className="mt-6 block">
                  <Button className="w-full bg-accent text-background font-semibold hover:bg-accent/90 transition-colors text-sm">
                    Start Learning <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
