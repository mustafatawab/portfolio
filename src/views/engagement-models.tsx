"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search, ClipboardList, Palette, Code, CheckCircle2, Rocket, TrendingUp, Briefcase, Lightbulb, Hammer, Handshake } from "lucide-react";

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
  visible: { transition: { staggerChildren: 0.06 } },
};

const processSteps = [
  { icon: Search, label: "Discovery" },
  { icon: ClipboardList, label: "Planning" },
  { icon: Palette, label: "Design" },
  { icon: Code, label: "Development" },
  { icon: CheckCircle2, label: "Testing" },
  { icon: Rocket, label: "Deployment" },
  { icon: TrendingUp, label: "Continuous Improvement" },
];

const models = [
  {
    icon: Lightbulb,
    title: "Discovery & Consultation",
    description:
      "A clear roadmap before any commitment — we start by understanding your business goals and technical constraints.",
    deliverables: ["Requirement Gathering", "Technical Recommendations", "Project Scope", "Implementation Roadmap"],
    cta: { label: "Start a conversation", href: "/#contact" },
  },
  {
    icon: Rocket,
    title: "MVP Development",
    description:
      "A production-ready minimum viable product shipped fast — validated with real users before investing in full-scale development.",
    deliverables: ["Core Feature Set", "Working Prototype", "User Testing", "Iteration Plan"],
    cta: { label: "See an example", href: "/projects/maktab-one" },
  },
  {
    icon: Briefcase,
    title: "Full Product Development",
    description:
      "End-to-end engineering from architecture and design through deployment — a complete product built for production.",
    deliverables: ["System Architecture", "Full Implementation", "CI/CD Pipeline", "Production Deployment"],
    cta: { label: "View case studies", href: "/case-studies" },
  },
  {
    icon: Hammer,
    title: "System Modernization",
    description:
      "Refactor or rebuild existing systems with modern technologies — reduce tech debt, improve performance, and strengthen security.",
    deliverables: ["Codebase Assessment", "Migration Plan", "Modernized Architecture", "Performance Benchmarks"],
    cta: { label: "Read the approach", href: "/case-studies/navpoint-health" },
  },
  {
    icon: Handshake,
    title: "Long-Term Engineering Partnership",
    description:
      "Ongoing development, feature enhancements, and scaling support — I become an extension of your team without the overhead.",
    deliverables: ["Sprint-Based Delivery", "Feature Development", "Maintenance & Support", "Scalability Planning"],
    cta: { label: "Let's talk", href: "/#contact" },
  },
];

export default function EngagementModels() {
  return (
    <section id="engagement" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* ── How We Work — Process Stepper ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">
            How I Work
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2"
          >
            From concept to production, with you every step.
          </motion.h2>

          <motion.div variants={fadeUp} className="relative mt-12">
            <div className="hidden md:block absolute top-[18px] left-0 right-0 h-px bg-border" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 md:gap-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="relative z-10 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-primary mb-2.5">
                    <step.icon size={15} />
                  </div>
                  <span className="text-[11px] md:text-xs font-mono tracking-wider text-muted-foreground leading-tight">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Engagement Models ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">
            Engagement Models
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
          >
            Flexible ways to work together.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[15.5px] md:text-base text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every project is different. Whether you need a quick discovery session
            or a long-term engineering partnership, there is a model that fits.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14"
        >
          {models.map((model) => (
            <motion.div
              key={model.title}
              variants={fadeUp}
              className="card-hover p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-5">
                <model.icon size={20} />
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {model.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-6">
                {model.description}
              </p>

              <div className="border-t border-border pt-4 mb-6">
                <p className="text-[11px] font-mono tracking-wider text-muted-foreground/50 uppercase mb-3">
                  What You Get
                </p>
                <ul className="space-y-2">
                  {model.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[5px] flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-0">
                <Link
                  href={model.cta.href}
                  className="group inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline underline-offset-2"
                >
                  {model.cta.label}
                  <ArrowUpRight
                    size={11}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
