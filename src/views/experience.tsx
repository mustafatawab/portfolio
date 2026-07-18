"use client";
import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/experience";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-muted/40">
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">
            Experience
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 mb-14"
          >
            Where I have worked.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          {/* Vertical line — centered on the 100px column boundary */}
          <div className="absolute left-[100px] top-0 bottom-0 w-px bg-border hidden sm:block" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative pb-12 last:pb-0"
            >
              {/* Period — absolutely positioned left of the line */}
              <div className="hidden sm:block absolute left-0 top-1.5 w-[88px] text-right">
                <span className="text-xs font-mono text-muted-foreground/60 tracking-tight">
                  {exp.period}
                </span>
              </div>

              {/* Timeline dot — centered on the line */}
              <div className="hidden sm:block absolute left-[100px] top-1.5 w-[9px] h-[9px] rounded-full bg-background border-2 border-primary -translate-x-1/2 z-10 transition-colors duration-300" />

              {/* Card — offset from the line */}
              <div className="sm:pl-[124px]">
                <div className="card-hover p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-primary">
                        {exp.company}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground/50 sm:hidden">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag as string}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[11px] sm:text-[12px] font-mono text-muted-foreground tracking-tight"
                      >
                        {tag as string}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
