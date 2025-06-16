'use client'
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="p-5 container  mx-auto flex flex-col justify-center items-center gap-10">
        <h2 className="text-4xl tect-center font-bold text-center">Projects</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects &&
              projects.map((project, index) => {
                if (index < 3) {
                  return (
                    <div key={index} className="">
                      <ProjectCard project={project} />
                    </div>
                  );
                }
              })}
          </div>
        </motion.div>
        <Link
          href="/projects"
          className="flex gap-2 rounded-md border-2 px-4 py-2 duration-500 bg-black/90 text-white dark:bg-white/90 dark:text-black hover:bg-white hover:text-black "
        >
          Vew All Projects <ArrowBigRight />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
