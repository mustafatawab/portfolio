"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiFastapi,
  SiShadcnui,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiRailway,
} from "react-icons/si";
import { Button } from "@/components/ui/button";

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  category: "Frontend" | "Backend" | "DevOps";
}

const skills: SkillProps[] = [
  { name: "React", icon: <SiReact size={20} />, category: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs size={20} />, category: "Backend" },
  { name: "FastAPI", icon: <SiFastapi size={20} />, category: "Backend" },
  { name: "TypeScript", icon: <SiTypescript size={20} />, category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={20} />, category: "Frontend" },
  { name: "Node.js", icon: <SiNodedotjs size={20} />, category: "Backend" },
  { name: "MongoDB", icon: <SiMongodb size={20} />, category: "Backend" },
  { name: "PostgreSQL", icon: <SiPostgresql size={20} />, category: "Backend" },
  { name: "Docker", icon: <SiDocker size={20} />, category: "DevOps" },
  { name: "Kubernetes", icon: <SiKubernetes size={20} />, category: "DevOps" },
  { name: "Git & Github", icon: <SiGithub size={20} />, category: "DevOps" },
  { name: "Linux", icon: <SiLinux size={20} />, category: "DevOps" },
  { name: "Vercel", icon: <SiVercel size={20} />, category: "DevOps" },
  { name: "Railway", icon: <SiRailway size={20} />, category: "DevOps" },
  { name: "Shadcn UI", icon: <SiShadcnui size={20} />, category: "Frontend" },
];

const Skills = () => {
  const [filter, setFilter] = useState<string>("All");
  const filteredSkills = filter === "All" ? skills : skills.filter(s => s.category === filter);

  return (
    <section id="skills" className="py-32 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-display text-foreground tracking-tight">
            Technical <span className="text-accent">Skills</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Frontend", "Backend", "DevOps"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "default" : "outline"}
              className={`rounded-full px-6 py-2 text-xs tracking-wider transition-all duration-300 ${
                filter === cat
                ? "bg-accent text-background hover:bg-accent/90 shadow-[var(--shadow-sm)]"
                : "border-border text-foreground/50 hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {filteredSkills.length} {filter} skills
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="card-hover p-5 flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{skill.name}</div>
                  <div className="text-xs text-foreground/40 font-mono mt-0.5">{skill.category}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
