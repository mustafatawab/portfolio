"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/project";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectSection = ({ project, index }: { project: any, index: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yContent = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className={`container flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-0`}>
        
        {/* Background Large Title (Decorative) */}
        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} opacity-[0.02] text-[15vw] font-bold font-display select-none pointer-events-none whitespace-nowrap`}>
          {project.title.toUpperCase()}
        </div>

        {/* Image Stage */}
        <motion.div 
          style={{ y: yImage }}
          className="w-full lg:w-[60%] relative aspect-video group"
        >
          <div className="absolute inset-0 bg-neon-cyan/20 rounded-[2rem] translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src={project.image} 
              fill 
              alt={project.title} 
              className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          style={{ y: yContent }}
          className={`w-full lg:w-[45%] lg:-ml-[10%] ${!isEven && 'lg:-mr-[10%] lg:ml-0'} z-20`}
        >
          <div className="glass-card p-10 md:p-16 rounded-[2.5rem] border-white/10 hover:neon-glow-cyan transition-all duration-500 space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] font-mono tracking-[0.4em] text-neon-purple uppercase">Deployment 0{index + 1}</div>
              <h3 className="text-4xl md:text-6xl font-bold font-display tracking-tighter leading-tight group-hover:text-neon-cyan transition-colors">
                {project.title}
              </h3>
            </div>

            <p className="text-white/60 text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag: string, i: number) => (
                <Badge key={i} className="bg-white/5 border-white/10 text-[10px] font-mono tracking-widest uppercase px-3 py-1 text-white/40">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-6 pt-4">
              <Link 
                href={project.link}
                className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-neon-cyan hover:text-white transition-colors"
              >
                Launch System <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
              {project.githubLink && (
                <Link 
                  href={project.githubLink}
                  className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                >
                  Source <Github size={16} />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-black relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0">
         <div className="w-[800px] h-[800px] bg-neon-cyan/5 blur-[150px] rounded-full animate-pulse-slow" />
      </div>

      <div className="relative z-10 pt-32">
        <div className="container text-center mb-32">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase mb-4"
          >
            Curated Archive
          </motion.h3>
          <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter">SYSTEM <span className="text-gradient">WORKS</span></h2>
        </div>

        {projects && projects.slice(0, 5).map((project, index) => (
          <ProjectSection key={index} project={project} index={index} />
        ))}

        <div className="container py-32 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-4 px-12 py-6 glass-card rounded-full text-white/60 hover:text-neon-cyan hover:neon-glow-cyan transition-all duration-500 group"
          >
            <span className="font-mono text-sm tracking-[0.3em] uppercase">Initialize Full Archive Access</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
