"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle, Clock, Star, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LearnSkillsPage() {
  const skills = [
    {
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript to build the foundation of modern web development.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Beginner",
      duration: "4 weeks",
      topics: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design", "Web Accessibility"],
      link: "/#contact",
    },
    {
      title: "React & Next.js Development",
      description: "Master React and Next.js to build modern, performant web applications.",
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
      description: "Learn Vue.js to build reactive, component-based web applications.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Intermediate",
      duration: "6 weeks",
      topics: ["Vue.js Fundamentals", "Vue Router", "Vuex", "Composition API", "Vue 3 Features"],
      link: "/#contact",
    },
    {
      title: "Quasar Framework",
      description: "Build high-performance Vue.js applications with the Quasar Framework.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Intermediate",
      duration: "5 weeks",
      topics: ["Quasar CLI", "UI Components", "Layouts", "Quasar Plugins", "Mobile Development"],
      link: "/#contact",
    },
    {
      title: "Python Programming",
      description: "Learn Python for backend development, data analysis, and automation.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      topics: ["Python Basics", "Data Structures", "OOP in Python", "Web Scraping", "API Development"],
      link: "/#contact",
    },
    {
      title: "AI Agent Development",
      description: "Build autonomous AI agents that can perform complex tasks and solve problems.",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Advanced",
      duration: "10 weeks",
      topics: ["Agent Architecture", "LLM Integration", "Tool Use", "Memory Systems", "Multi-agent Systems"],
      link: "/#contact",
    },
  ];

  return (
    <main className="bg-background min-h-screen pb-32 transition-colors duration-500">
      {/* Cinematic Header */}
      <section className="relative pt-48 pb-20 flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="fixed inset-0 -z-10 dark:opacity-20 opacity-5">
          <Image src="/bg.webp" fill alt="" className="object-cover scale-110 animate-pulse-slow" />
        </div>
        
        <div className="container text-center space-y-8 text-foreground uppercase tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase mb-4">Training Protocols</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight uppercase">
              SKILLS <span className="text-gradient">ACQUISITION</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/40 text-sm md:text-base font-mono max-w-xl mx-auto uppercase tracking-widest leading-relaxed"
          >
            Systematic learning paths engineered to master modern full-stack development and AI integration.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl group hover:neon-glow-cyan transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 rounded-xl bg-foreground/5 text-neon-cyan group-hover:scale-110 transition-transform">
                      {skill.icon}
                   </div>
                   <div className="flex items-center gap-1 text-foreground/20 font-mono text-[10px] tracking-widest">
                      <Hash size={10} />
                      <span>MODULE_0{index + 1}</span>
                   </div>
                </div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-bold text-foreground leading-tight">{skill.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed font-sans">{skill.description}</p>
                  
                  <div className="flex gap-4 pt-2">
                     <div className="flex items-center gap-1 text-[10px] font-mono text-neon-purple uppercase tracking-widest">
                        <Star size={12} /> {skill.level}
                     </div>
                     <div className="flex items-center gap-1 text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
                        <Clock size={12} /> {skill.duration}
                     </div>
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <div className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">Curriculum Node</div>
                    <ul className="space-y-2">
                      {skill.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-foreground/50 group-hover:text-foreground/80 transition-colors">
                          <CheckCircle size={14} className="text-neon-cyan" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={skill.link} className="mt-10">
                  <Button className="w-full bg-neon-cyan text-background font-bold rounded-xl hover:scale-[1.02] transition-transform">
                    INITIATE LEARNING <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative footer element */}
      <div className="container py-32 flex justify-center">
         <div className="w-[1px] h-32 bg-gradient-to-b from-neon-purple to-transparent opacity-20" />
      </div>
    </main>
  );
}
