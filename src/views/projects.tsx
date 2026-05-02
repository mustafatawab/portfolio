"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/project";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectSection = ({ project, index }: { project: any, index: number }) => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className="relative min-h-[70vh] md:min-h-screen flex items-center py-16 md:py-20 overflow-hidden bg-background transition-colors duration-500">
      <div className={`container flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-5 sm:gap-7 md:gap-10  lg:gap-0`}>
        
        {/* Background Large Title (Decorative) */}
        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} opacity-[0.02] text-[20vw] lg:text-[15vw] font-bold font-display select-none pointer-events-none whitespace-nowrap uppercase text-foreground`}>
          {project.title}
        </div>

        {/* Image Stage */}
        <motion.div 
          style={{ y: isDesktop ? yImage : 0 }}
          className="w-full lg:w-[60%] relative aspect-video group"
        >
          <div className="absolute inset-0 bg-neon-cyan/20 rounded-2xl md:rounded-[2rem] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
          <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-border shadow-2xl">
            <Image 
              src={project.image} 
              fill 
              alt={project.title} 
              className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* Content Card (Unified with Archive Card styling) */}
        <motion.div 
          style={{ y: isDesktop ? yContent : 0 }}
          className={`w-full lg:w-[45%] lg:-ml-[10%] ${!isEven && 'lg:-mr-[10%] lg:ml-0'} z-20`}
        >
          <div className="glass-card p-8 md:p-12 rounded-[2rem] border-border hover:neon-glow-cyan transition-all duration-500 space-y-6">
            <div className="space-y-3">
              <div className={`flex items-center gap-2 text-[10px] font-mono tracking-[0.4em] text-neon-purple uppercase ${isEven ? ' md:justify-end' : ''}`}>
                <Hash size={12} />
                <span>Segment 0{index + 1}</span>
              </div>
              <h3 className={`text-3xl md:text-5xl font-bold font-display tracking-tighter leading-tight group-hover:text-neon-cyan transition-colors ${isEven ? 'lg:text-right' : 'md:text-left'} text-foreground`}>
                {project.title}
              </h3>
            </div>

            <p className={`text-foreground/70 text-sm md:text-lg leading-relaxed font-sans ${isEven ? 'lg:text-right' : ''}`}>
              {project.description}
            </p>

            <div className={`flex flex-wrap gap-2 pt-2 ${isEven ? 'md:justify-end' : ''}`}>
              {project.tags.slice(0, 5).map((tag: string, i: number) => (
                <Badge key={i} className="bg-foreground/5 border-border text-[9px] md:text-[10px] font-mono tracking-widest uppercase px-2 md:px-3 py-0.5 md:py-1 text-foreground/40">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-8 pt-6 border-t border-border ${isEven ? 'md:justify-end' : ''}`}>
              <Link 
                href={project.link}
                target="_blank"
                className="group flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan hover:text-foreground transition-colors"
              >
                LAUNCH SYSTEM <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
              </Link>
              {project.githubLink && (
                <Link 
                  href={project.githubLink}
                  target="_blank"
                  className="group flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  SOURCE <Github size={14} />
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
    <section id="projects" className="bg-background relative transition-colors duration-500">
      <div className="absolute top-0 left-0 z-0 h-screen w-full flex items-center justify-center pointer-events-none ">
         <div className="w-[800px] h-[800px] bg-neon-cyan/5 blur-[150px] rounded-full animate-pulse-slow" />
      </div>

      <div className="relative z-10 pt-16 md:pt-32">
        <div className="container text-center mb-16 md:mb-32">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase mb-4"
          >
            Curated Archive
          </motion.h3>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold font-display tracking-tighter leading-none text-foreground uppercase text-gradient">Selected Works</h2>
        </div>

        {projects && projects.slice(0, 5).map((project, index) => (
          <ProjectSection key={index} project={project} index={index} />
        ))}

        <div className="container  text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-4 px-12 py-6 glass-card rounded-full text-foreground/60 hover:text-neon-cyan hover:neon-glow-cyan transition-all duration-500 group"
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
