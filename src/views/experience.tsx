"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/experience";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-display text-foreground tracking-tight">
            Professional <span className="text-accent">Experience</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-hover p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-mono text-accent tracking-wider">{exp.period}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">{exp.title}</h3>
                  <p className="text-foreground/50 text-sm mt-0.5">{exp.company} &middot; {exp.location}</p>
                </div>
              </div>

              <p className="text-foreground/60 leading-relaxed text-sm mb-6">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-border text-foreground/40 text-xs font-mono px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
