"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Banknote,
  Users,
  Receipt,
  Bell,
  Mic,
  FileText,
  Shield,
  Pencil,
  Pill,
  ShoppingCart,
  BarChart3,
  Truck,
  LayoutDashboard,
  Blocks,
  Palette,
  Zap,
  LayoutGrid,
  Sparkles,
  Smartphone,
  Mail,
  ShoppingBag,
  CreditCard,
  Search,
  DoorOpen,
  Building2,
  User,
  Clock,
  Monitor,
  Globe,
} from "lucide-react";
import {
  ProjectShowcase,
  getRelatedProjects,
  getPrevNext,
} from "@/lib/projects-data";
import { Callout } from "@/components/case-studies/callout";

const iconMap: Record<string, React.ReactNode> = {
  Banknote: <Banknote size={22} />,
  Users: <Users size={22} />,
  Receipt: <Receipt size={22} />,
  Bell: <Bell size={22} />,
  Mic: <Mic size={22} />,
  FileText: <FileText size={22} />,
  Shield: <Shield size={22} />,
  Pencil: <Pencil size={22} />,
  Pill: <Pill size={22} />,
  ShoppingCart: <ShoppingCart size={22} />,
  BarChart3: <BarChart3 size={22} />,
  Truck: <Truck size={22} />,
  LayoutDashboard: <LayoutDashboard size={22} />,
  Blocks: <Blocks size={22} />,
  Palette: <Palette size={22} />,
  LayoutGrid: <LayoutGrid size={22} />,
  Sparkles: <Sparkles size={22} />,
  Smartphone: <Smartphone size={22} />,
  Mail: <Mail size={22} />,
  ShoppingBag: <ShoppingBag size={22} />,
  CreditCard: <CreditCard size={22} />,
  Search: <Search size={22} />,
  DoorOpen: <DoorOpen size={22} />,
  Building2: <Building2 size={22} />,
  User: <User size={22} />,
};

const ease = [0.25, 0.1, 0.25, 1] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-xs font-mono tracking-wider text-primary uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function TechGroup({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/[0.04] border border-border text-xs font-mono text-foreground/70 tracking-tight"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetail({ project }: { project: ProjectShowcase }) {
  const related = getRelatedProjects(project.relatedSlugs);
  const { prev, next } = getPrevNext(project.slug);

  const allFrontend = project.techStack.frontend;
  const allBackend = project.techStack.backend;
  const allDatabase = project.techStack.database;
  const allInfra = project.techStack.infrastructure;
  const allTools = project.techStack.tools;

  return (
    <main className="bg-background min-h-screen">
      {/* ── Back link ── */}
      <div className="pt-28 pb-6">
        <div className="container">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            All projects
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <div className="relative aspect-[21/10] rounded-xl overflow-hidden border border-border shadow-[var(--shadow-md)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-primary/10 backdrop-blur-sm border border-primary/20 text-xs font-mono tracking-wider text-primary">
                  {project.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border text-xs font-mono tracking-wider text-muted-foreground">
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                {project.title}
              </h1>
              <p className="text-base md:text-lg text-foreground/60 mt-2 max-w-2xl">
                {project.tagline}
              </p>
              <p className="text-sm text-foreground/50 mt-4 max-w-xl leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {project.links.demo && (
                  <Link
                    href={project.links.demo}
                    target="_blank"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] active:scale-[0.97]"
                  >
                    Live Demo{" "}
                    <ExternalLink
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}
                {project.links.github && (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-foreground/30 active:scale-[0.97]"
                  >
                    View Source <ExternalLink size={14} />
                  </Link>
                )}
                {project.links.caseStudy && (
                  <Link
                    href={project.links.caseStudy}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground/70 rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-primary/20 hover:text-primary active:scale-[0.97]"
                  >
                    <BookOpen size={14} />
                    Read Case Study
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container max-w-4xl pb-32 space-y-20">
        {/* 1. Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Project Overview</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  What it is
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {project.overview.what}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  Who it serves
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {project.overview.who}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  Business value
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {project.overview.businessValue}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  Primary users
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {project.overview.primaryUsers}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Quick Facts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Quick Facts</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Category", value: project.category },
              { label: "Role", value: project.role },
              { label: "Timeline", value: project.timeline },
              { label: "Status", value: project.status },
              { label: "Team", value: project.teamSize },
              { label: "Platform", value: project.platform },
              { label: "Industry", value: project.industry },
              { label: "Frontend", value: allFrontend[0] || "-" },
            ].map((f) => (
              <div
                key={f.label}
                className="border border-border rounded-lg bg-card p-4"
              >
                <p className="text-[10px] font-mono tracking-wider text-muted-foreground mb-1">
                  {f.label}
                </p>
                <p className="text-sm font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. Business Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Business Problem</SectionHeading>
          <p className="text-base text-foreground/70 leading-relaxed">
            {project.businessProblem}
          </p>
          {project.links.caseStudy && (
            <div className="mt-4">
              <Link
                href={project.links.caseStudy}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <BookOpen size={14} />
                Read the full case study for deeper context
                <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </motion.section>

        {/* 4. Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Key Features</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((f, i) => (
              <div
                key={i}
                className="border border-border rounded-xl bg-card p-6 transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:shadow-[var(--shadow-sm)]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4">
                  {iconMap[f.icon] || <Zap size={22} />}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Technology Stack</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TechGroup label="Frontend" items={allFrontend} />
            <TechGroup label="Backend" items={allBackend} />
            <TechGroup label="Database" items={allDatabase} />
            <TechGroup label="Infrastructure" items={allInfra} />
            {allTools.length > 0 && (
              <div className="sm:col-span-2">
                <TechGroup label="Tools & Services" items={allTools} />
              </div>
            )}
          </div>
        </motion.section>

        {/* 6. Architecture Preview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Architecture Preview</SectionHeading>
          <div className="border border-border rounded-xl bg-card p-6 md:p-8">
            <p className="text-sm text-foreground/70 leading-relaxed">
              {project.architecturePreview.explanation}
            </p>
          </div>
          {project.links.caseStudy && (
            <div className="mt-4">
              <Link
                href={project.links.caseStudy}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <BookOpen size={14} />
                Read full engineering case study with architecture decisions
                <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </motion.section>

        {/* 7. Challenges Solved */}
        {project.challengesSolved.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
          >
            <SectionHeading>Challenges Solved</SectionHeading>
            <div className="space-y-4">
              {project.challengesSolved.map((c, i) => (
                <div
                  key={i}
                  className="border border-border rounded-xl bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {c.problem}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {project.links.caseStudy && (
              <div className="mt-4">
                <Link
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <BookOpen size={14} />
                  More challenges in the full case study
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </motion.section>
        )}

        {/* 8. Results */}
        {project.results.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
          >
            <SectionHeading>Results</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-4 rounded-lg border border-border bg-card"
                >
                  <CheckCircle2
                    size={15}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-foreground/70 leading-relaxed">
                    {r}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 9. Lessons Learned */}
        {project.lessonsLearned.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
          >
            <SectionHeading>Lessons Learned</SectionHeading>
            <div className="space-y-3">
              {project.lessonsLearned.map((l, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed p-4 rounded-lg border border-border bg-card"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-foreground/5 text-muted-foreground text-[10px] font-mono shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {l}
                </div>
              ))}
            </div>
            {project.links.caseStudy && (
              <div className="mt-4">
                <Link
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <BookOpen size={14} />
                  Deeper lessons in the engineering case study
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </motion.section>
        )}

        {/* 10. Related Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading>Related Projects</SectionHeading>

          {/* Prev / Next */}
          <div className="flex justify-between mb-8">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-3 max-w-[45%]"
              >
                <ChevronLeft
                  size={16}
                  className="text-muted-foreground shrink-0 transition-transform group-hover:-translate-x-0.5"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-mono tracking-wider text-muted-foreground">
                    Previous
                  </p>
                  <p className="text-sm text-foreground/70 truncate group-hover:text-foreground transition-colors">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center gap-3 text-right max-w-[45%]"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-mono tracking-wider text-muted-foreground">
                    Next
                  </p>
                  <p className="text-sm text-foreground/70 truncate group-hover:text-foreground transition-colors">
                    {next.title}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Recommended cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/projects/${r.slug}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-[var(--duration-fast)]"
              >
                <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {r.tagline}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground shrink-0 ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 11. CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="p-8 md:p-10 rounded-xl bg-primary-light border border-primary/20 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Interested in building something similar?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              I am always open to discussing new projects, technical challenges,
              and engineering opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-sm)] active:scale-[0.97]"
              >
                Contact Me
              </Link>
              {project.links.caseStudy && (
                <Link
                  href={project.links.caseStudy}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 border border-border text-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-primary/20 hover:text-primary active:scale-[0.97]"
                >
                  <BookOpen size={14} />
                  Read Case Study
                  <ChevronRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
