'use client'
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
            >
              System Deployments
            </motion.h3>
            <h2 className="text-4xl md:text-6xl font-bold font-display">SELECTED <span className="text-gradient">WORKS</span></h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-neon-cyan transition-colors"
            >
              Explore Full Archive <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects &&
            projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(188,19,254,0.03),transparent_40%)]" />
    </section>
  );
};

export default Projects;
