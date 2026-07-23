"use client"
import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BsGithub } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"

interface ProjectPropType {
    image: any
    title: string
    description: string
    tags: string[]
    githubLink?: string
    link: string
    more?: string[]
}

const ProjectCard = ({ project }: { project: ProjectPropType }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <div className="card-hover h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden border-b border-border">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 right-3 flex gap-2">
                        <Link
                            href={
                                project.githubLink ||
                                "https://www.github.com/mustafatawab"
                            }
                            className="p-2 rounded-lg bg-background/60 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                        >
                            <BsGithub size={15} />
                        </Link>
                        <Link
                            href={project.link}
                            className="p-2 rounded-lg bg-background/60 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                        >
                            <FaExternalLinkAlt size={13} />
                        </Link>
                    </div>
                </div>
                <div className="p-6 space-y-3">
                    <div className="space-y-1.5">
                        <h4 className="text-lg font-semibold tracking-tight text-foreground">
                            {project.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap pt-1">
                        {project.tags.slice(0, 4).map((tag, i) => (
                            <Badge
                                key={i}
                                className="bg-foreground/5 text-[10px] font-mono tracking-tight uppercase px-2 py-0.5 text-muted-foreground border-border"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
