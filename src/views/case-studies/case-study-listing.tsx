"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, User } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
};

export function CaseStudyListing({ studies }: { studies: CaseStudy[] }) {
  return (
    <main className="bg-background min-h-screen">
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="section-label">Case Studies</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mt-2">
              Engineering deep dives
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
              Detailed case studies on how each project was designed, built, and
              shipped - including architecture decisions, trade-offs, and lessons learned.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map((study, i) => (
              <motion.div
                key={study.slug}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Link href={`/case-studies/${study.slug}`} className="group block">
                  <div className="card-hover overflow-hidden rounded-xl">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border text-[10px] font-mono tracking-wider text-muted-foreground">
                          {study.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-foreground">
                          {study.title}
                        </h2>
                        <ArrowUpRight
                          size={16}
                          className="text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {study.subtitle}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <User size={12} />
                          {study.role}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {study.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
