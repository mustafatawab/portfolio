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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col h-full rounded-[1.5rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-neon-cyan/20 transition-all duration-500"
    >
      {/* Image Container with high aspect ratio control */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.5] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-mono text-neon-cyan/60 uppercase tracking-widest">
            NODE_0{index + 1}
          </span>
        </div>
      </div>

      {/* Content Area - Always Readable */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 font-sans group-hover:text-white/60 transition-colors">
            {project.description}
          </p>
        </div>

        {/* Footer: Tags & Links */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string, i: number) => (
              <span key={i} className="text-[9px] font-mono tracking-tighter uppercase text-white/30 px-2 py-0.5 border border-white/5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Link 
              href={project.link}
              target="_blank"
              className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neon-cyan hover:text-white transition-colors"
            >
              LAUNCH <ExternalLink size={12} />
            </Link>
            {project.githubLink && (
              <Link 
                href={project.githubLink}
                target="_blank"
                className="text-white/20 hover:text-neon-purple transition-colors"
              >
                <Github size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectArchiveCard;
