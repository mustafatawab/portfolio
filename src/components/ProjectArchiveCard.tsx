"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectArchiveCardProps {
  project: any;
  index: number;
}

const ProjectArchiveCard = ({ project, index }: ProjectArchiveCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 bg-deep-obsidian"
    >
      {/* Background Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
      />

      {/* Default State Overlay (Index & Title) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
        <div className="flex items-center gap-1 text-neon-cyan/40">
           <Hash size={14} />
           <span className="text-xs font-mono tracking-widest">0{index + 1}</span>
        </div>
        <h3 className="text-2xl font-bold font-display tracking-tight text-white/80">
          {project.title.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h3>
      </div>

      {/* Hover State: Glassmorphic Blade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
        <div className="glass-card p-6 rounded-2xl border-white/10 space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-neon-purple uppercase tracking-widest">Archive Segment</div>
            <h4 className="text-xl font-bold text-white">{project.title}</h4>
          </div>

          <p className="text-white/40 text-xs leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.slice(0, 3).map((tag: string, i: number) => (
              <Badge key={i} className="bg-white/5 border-white/5 text-[9px] font-mono tracking-tighter uppercase px-2 py-0.5 text-white/30">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <Link 
              href={project.link}
              className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neon-cyan hover:text-white transition-colors"
            >
              LAUNCH <ExternalLink size={12} />
            </Link>
            {project.githubLink && (
              <Link 
                href={project.githubLink}
                className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/30 hover:text-white transition-colors"
              >
                SOURCE <Github size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tech Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProjectArchiveCard;
