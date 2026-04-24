"use client";
import React from "react";
import { projects } from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import Image from "next/image";

const ProjectsPage = () => {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Header Section */}
      <section className="relative pt-48 pb-32 flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
          <Image
            src="/bg.webp"
            fill
            priority
            alt=""
            className="object-cover opacity-30 scale-105 animate-pulse-slow"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-20 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase mb-4">Project Archive</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight">
              NEURAL <span className="text-gradient">DEPLOYMENTS</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            An exhaustive catalog of autonomous systems, sophisticated web architectures, 
            and intelligent applications engineered for the digital frontier.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects &&
              projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-[radial-gradient(circle_at_80%_80%,rgba(188,19,254,0.03),transparent_40%)] -z-10" />
      </section>
    </main>
  );
};

export default ProjectsPage;
