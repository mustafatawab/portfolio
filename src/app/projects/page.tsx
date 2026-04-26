"use client";
import React, { useState } from "react";
import { projects } from "@/lib/project";
import ProjectArchiveCard from "@/components/ProjectArchiveCard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const categories = ["All", "Full Stack", "Web App", "Software"];

// Helper to determine categorization (can be improved by adding explicit category to lib/project.ts)
const getProjectCategory = (project: any) => {
    const tags = project.tags.join(' ').toLowerCase();
    if (tags.includes('nextjs') || tags.includes('react') || tags.includes('fullstack')) return "Full Stack";
    if (tags.includes('software') || tags.includes('system') || tags.includes('automation')) return "Software";
    return "Web App";
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => getProjectCategory(p) === filter);

  return (
    <main className="bg-background min-h-screen transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.02),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <section className="relative pt-48 pb-20 flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="container text-center space-y-8 text-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase mb-4">Central Database</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight uppercase">
              NEURAL <span className="text-gradient">VAULT</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/40 text-sm md:text-base font-mono max-w-xl mx-auto uppercase tracking-widest leading-relaxed"
          >
            A high-integrity repository of production architectures and specialized software deployments.
          </motion.p>
        </div>
      </section>

      {/* Filtering */}
      <section className="sticky top-20 z-30 py-8 backdrop-blur-md border-y border-border bg-background/40">
        <div className="container flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "default" : "ghost"}
              className={`rounded-full px-6 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                filter === cat 
                ? "bg-neon-cyan text-black" 
                : "text-foreground/40 hover:text-neon-cyan hover:bg-neon-cyan/5"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 relative z-10">
        <div className="container">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                  <ProjectArchiveCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="container py-32 flex justify-center">
         <div className="w-[1px] h-32 bg-gradient-to-b from-neon-cyan to-transparent opacity-20" />
      </div>
    </main>
  );
};

export default ProjectsPage;
