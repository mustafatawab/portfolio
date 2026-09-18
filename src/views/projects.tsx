"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { ChevronRight, ArrowUpRight } from "lucide-react"
import maktab from "@/assets/project/maktab-one.png"
import myscribe from "@/assets/project/myscribe.png"
import farsight from "@/assets/project/farsight.png"

type Project = {
    title: string
    description: string
    tags: string[]
    image: StaticImageData
    href: string
}

const projects: Project[] = [
    {
        title: "Maktab One",
        description:
            "A comprehensive school management system automating fee collection, expense tracking, and student records for mid-level schools.",
        tags: ["Next.js", "Prisma", "Neon DB", "TanStack Query"],
        image: maktab,
        href: "/projects/maktab-one",
    },
    {
        title: "My Scribe",
        description:
            "An AI-powered medical scribe that transcribes patient-clinician conversations and generates SOAP-format clinical notes in real time.",
        tags: ["Vue.js", "Laravel", "AI", "Python"],
        image: myscribe,
        href: "/projects/my-scribe",
    },
    {
        title: "Farsight System",
        description:
            "A software agency website showcasing AI-powered applications and custom web development services with a clean, conversion-focused design.",
        tags: ["Tailwind CSS", "HTML", "JavaScript", "CSS"],
        image: farsight,
        href: "/projects/farsight-system",
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [30, -30])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

    return (
        <motion.div
            ref={cardRef}
            key={project.title}
            variants={fadeUp}
            style={{ y }}
        >
            <Link
                href={project.href}
                className="glass-card block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 focus-visible:rounded-xl group"
            >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <motion.div
                        style={{ scale: imageScale }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-[var(--ease)] group-hover:scale-105"
                        />
                    </motion.div>
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        <ArrowUpRight
                            size={14}
                            className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[11px] font-mono text-muted-foreground tracking-tight"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 md:py-32 bg-muted/40">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {/* Header */}
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <motion.span
                                variants={fadeUp}
                                className="section-label"
                            >
                                Projects
                            </motion.span>
                            <motion.h2
                                variants={fadeUp}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
                            >
                                Selected work
                            </motion.h2>
                        </div>
                        <motion.div
                            variants={fadeUp}
                            className="hidden md:block"
                        >
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                            >
                                View all
                                <ChevronRight
                                    size={14}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={i}
                            />
                        ))}
                    </div>

                    {/* Mobile "View all" link */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-8 text-center md:hidden"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 text-sm text-foreground font-medium hover:text-primary transition-colors duration-[var(--duration-fast)]"
                        >
                            View all projects
                            <ChevronRight size={14} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection
