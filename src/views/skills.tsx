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
  level: number;
  category: "Frontend" | "Backend" | "DevOps";
}

const skills: SkillProps[] = [
  { name: "React", icon: <SiReact size={24} />, level: 90, category: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs size={24} />, level: 95, category: "Backend" },
  { name: "FastAPI", icon: <SiFastapi size={24} />, level: 85, category: "Backend" },
  { name: "TypeScript", icon: <SiTypescript size={24} />, level: 88, category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={24} />, level: 95, category: "Frontend" },
  { name: "Node.js", icon: <SiNodedotjs size={24} />, level: 85, category: "Backend" },
  { name: "MongoDB", icon: <SiMongodb size={24} />, level: 80, category: "Backend" },
  { name: "PostgreSQL", icon: <SiPostgresql size={24} />, level: 85, category: "Backend" },
  { name: "Docker", icon: <SiDocker size={24} />, level: 85, category: "DevOps" },
  { name: "Kubernetes", icon: <SiKubernetes size={24} />, level: 75, category: "DevOps" },
  { name: "Git & Github", icon: <SiGithub size={24} />, level: 95, category: "DevOps" },
  { name: "Linux", icon: <SiLinux size={24} />, level: 80, category: "DevOps" },
  { name: "Vercel", icon: <SiVercel size={24} />, level: 90, category: "DevOps" },
  { name: "Railway", icon: <SiRailway size={24} />, level: 85, category: "DevOps" },
  { name: "Shadcn UI", icon: <SiShadcnui size={24} />, level: 95, category: "Frontend" },
];

const Skills = () => {
  const [filter, setFilter] = useState<string>("All");
  const filteredSkills = filter === "All" ? skills : skills.filter(s => s.category === filter);

  return (
    <section id="skills" className="py-32 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase"
          >
            Capabilities
          </motion.h3>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black font-display uppercase tracking-tight text-foreground flex flex-col md:block"><span>TECHNICAL</span> <span className="text-gradient">INFRASTRUCTURE</span></h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["All", "Frontend", "Backend", "DevOps"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "default" : "outline"}
              className={`rounded-full px-8 py-6 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                filter === cat 
                ? "bg-neon-cyan text-background hover:bg-neon-cyan/80" 
                : "border-border text-foreground/60 hover:border-neon-cyan/50 hover:text-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 rounded-2xl group hover:neon-glow-cyan transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-foreground/5 text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-neon-cyan transition-colors text-foreground">{skill.name}</h4>
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-tighter">{skill.category}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-foreground/40">
                    <span>PROFICIENCY</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05),transparent_50%)]" />
    </section>
  );
};

export default Skills;
