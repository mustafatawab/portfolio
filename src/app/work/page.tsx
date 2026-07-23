"use client";
import React, { useState } from "react";
import { projects } from "@/lib/project";
import ProjectArchiveCard from "@/components/ProjectArchiveCard";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Management Systems",
  "Full-Stack Apps",
  "Websites",
  "Custom Software",
];

const getProjectCategory = (project: any) => project.category;

const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => getProjectCategory(p) === filter);

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-32 pb-12">
        <div className="container text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-center">Work</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Project Archive
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm max-w-xl mx-auto"
          >
            A curated collection of production-grade software and applications.
          </motion.p>
        </div>
      </section>

      <section className="sticky top-16 z-30 py-3 border-y border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-mono tracking-wider rounded-lg transition-all duration-[var(--duration-fast)] ease-[var(--ease)] ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]"
                    : "text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 ${
                    filter === cat
                      ? "text-primary-foreground/60"
                      : "text-primary/60"
                  }`}
                >
                  [{count}]
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Showing {filteredProjects.length} {filter} projects
          </div>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectArchiveCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
