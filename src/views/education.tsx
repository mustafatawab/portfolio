"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/edu";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const Education = () => {
  return (
    <section id="education" className="py-32 bg-background relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-accent/2 blur-[80px] rounded-full" />
      </div>

      <div className="container relative">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-display text-foreground tracking-tight">
            Education & <span className="text-accent">Certifications</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {education.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-hover p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-foreground/40 tracking-wider">{edu.period}</span>
                        {edu.link ? (
                          <Link href={edu.link} target="_blank" className="inline-flex items-center gap-1.5 group">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                              {edu.degree}
                            </h3>
                            <ExternalLink size={14} className="text-foreground/20 group-hover:text-accent transition-colors" />
                          </Link>
                        ) : (
                          <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                        )}
                        <p className="text-foreground/50 text-sm mt-0.5">{edu.institution}</p>
                      </div>
                    </div>
                    <p className="text-foreground/60 text-sm mt-4 leading-relaxed">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border">
                      {edu.achievements.map((achievement, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-border text-foreground/40 text-xs font-mono px-3 py-1"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
