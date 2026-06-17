import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectArchiveCardProps {
  project: any;
  index: number;
}

const ProjectArchiveCard = ({ project, index }: ProjectArchiveCardProps) => {
  return (
    <div className="group flex flex-col h-full rounded-[1.5rem] overflow-hidden border border-border bg-foreground/5 hover:border-neon-cyan/20 transition-all duration-500 hover:-translate-y-2 active:scale-[0.98]">
      {/* Link wraps image + content (not the action buttons) */}
      <Link href={`/work/${project.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-background/60 backdrop-blur-md px-3 py-1 rounded-full border border-border text-[10px] font-mono text-neon-cyan/60 uppercase tracking-widest">
              NODE_0{index + 1}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 space-y-4">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-foreground/60 text-xs leading-relaxed line-clamp-2 font-sans group-hover:text-foreground transition-colors">
              {project.description}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag: string, i: number) => (
                <span key={i} className="text-[10px] font-mono tracking-tighter uppercase text-foreground/30 px-2 py-0.5 border border-border rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Action buttons - separate from the main link */}
      <div className="px-6 pb-6 flex justify-between items-center">
        <Link
          href={project.link}
          target="_blank"
          className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neon-cyan hover:text-foreground transition-colors"
        >
          LAUNCH <ExternalLink size={12} />
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            className="text-foreground/20 hover:text-neon-purple transition-colors"
          >
            <Github size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectArchiveCard;
