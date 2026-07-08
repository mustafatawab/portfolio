"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import maktab from "@/assets/project/maktab-one.png";
import myscribe from "@/assets/project/myscribe.png";
import farsight from "@/assets/project/farsight.png";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  href: string;
};

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
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

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
              <motion.span variants={fadeUp} className="section-label">
                Projects
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
              >
                Selected work
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="hidden md:block">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
              >
                View all
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp}>
                <Link
                  href={project.href}
                  className="card-hover block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 focus-visible:rounded-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={14}
                        className="text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            ))}
          </div>

          {/* Mobile "View all" link */}
          <motion.div variants={fadeUp} className="mt-8 text-center md:hidden">
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
  );
};

export default ProjectsSection;
