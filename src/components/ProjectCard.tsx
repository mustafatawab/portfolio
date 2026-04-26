'use client'
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectPropType {
    image : any,
    title : string,
    description : string,
    tags : string[],
    githubLink? : string,
    link : string,
    more? : string[] 
}

const ProjectCard = ({ project } : {project : ProjectPropType}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="glass-card p-0 border-border h-full overflow-hidden group hover:neon-glow-cyan transition-all duration-500 rounded-3xl">
        <div className="relative aspect-video overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out grayscale-[0.5] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Link 
              href={project.githubLink || "https://www.github.com/mustafatawab"}
              className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground/70 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
            >
              <BsGithub size={18} />
            </Link>
            <Link 
              href={project.link}
              className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground/70 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
            >
              <FaExternalLinkAlt size={16} />
            </Link>
          </div>
        </div>

        <CardContent className="p-8 space-y-4">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold tracking-tight group-hover:text-neon-cyan transition-colors text-foreground">{project.title}</h4>
            <p className="text-foreground/50 text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/70 transition-colors">
              {project.description}
            </p>
          </div>
          
          <div className="flex gap-2 flex-wrap pt-2">
            {project.tags.slice(0, 4).map((tag, i) => (
              <Badge
                key={i}
                className="bg-foreground/5 text-[10px] font-mono tracking-tighter uppercase px-3 py-1 text-foreground/40 border-border group-hover:border-neon-cyan/30 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
