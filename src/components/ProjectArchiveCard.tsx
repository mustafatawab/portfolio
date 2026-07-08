import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectArchiveCardProps {
  project: any;
}

const ProjectArchiveCard = ({ project }: ProjectArchiveCardProps) => {
  return (
    <div className="group card-hover flex flex-col rounded-xl overflow-hidden">
      <Link href={`/work/${project.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="p-5 flex flex-col flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider text-primary">
              {project.category}
            </span>
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="text-base font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[10px] font-mono text-muted-foreground tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 flex justify-between items-center">
        <Link
          href={project.link}
          target="_blank"
          className="flex items-center gap-1 text-xs font-mono text-primary hover:text-foreground transition-colors duration-[var(--duration-fast)]"
        >
          Launch <ExternalLink size={10} />
        </Link>
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            className="text-muted-foreground/40 hover:text-foreground/60 transition-colors duration-[var(--duration-fast)]"
          >
            <Github size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectArchiveCard;
