"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import { ProjectShowcase, getAllProjectShowcases, PROJECT_CATEGORIES } from "@/lib/projects-data";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

function ProjectGridCard({ project }: { project: ProjectShowcase }) {
  const allTech = [
    ...project.techStack.frontend.slice(0, 2),
    ...project.techStack.backend.slice(0, 2),
    ...project.techStack.database,
  ];

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-xl overflow-hidden border border-border bg-card transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {project.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-background/70 backdrop-blur-sm border border-border text-[10px] font-mono tracking-wider text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{project.tagline}</p>
          <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2 mt-2 mb-3">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {allTech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[10px] font-mono text-muted-foreground tracking-tight"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-primary font-medium">
            <span className="inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View Project <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsListing() {
  const allProjects = getAllProjectShowcases();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = allProjects.find((p) => p.featured);
  const nonFeatured = allProjects.filter((p) => !p.featured);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? nonFeatured : nonFeatured.filter((p) => p.categories.includes(activeCategory));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.techStack.frontend.some((t) => t.toLowerCase().includes(q)) ||
          p.techStack.backend.some((t) => t.toLowerCase().includes(q)) ||
          p.techStack.database.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [activeCategory, search, nonFeatured]);

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="section-label">Projects</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mt-2">
              Building modern software for real businesses.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
              A catalog of SaaS platforms, business applications, desktop software,
              and enterprise solutions I have designed and built from the ground up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Project ── */}
      {featured && (
        <section className="pb-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <Link
                href={`/projects/${featured.slug}`}
                className="group block relative rounded-2xl overflow-hidden border border-border bg-card"
              >
                <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-muted">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease)] group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 backdrop-blur-sm border border-primary/20 text-[10px] font-mono tracking-wider text-primary mb-3">
                      Featured Project
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                      {featured.title}
                    </h2>
                    <p className="text-sm md:text-base text-foreground/60 mt-1 max-w-xl">
                      {featured.tagline}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium transition-all group-hover:bg-primary/90">
                        View Project <ArrowUpRight size={12} />
                      </span>
                      {featured.links.caseStudy && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm border border-border text-foreground rounded-lg text-xs font-medium transition-all group-hover:bg-background/80">
                          Read Case Study <BookOpen size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Filters & Search ── */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.filter((c) => c !== "All" || true).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-[var(--duration-fast)] ease-[var(--ease)] ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]"
                      : "text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat === "All" ? "All" : cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus-ring outline-none"
              />
            </div>
          </div>
          <div aria-live="polite" className="sr-only">
            Showing {filtered.length} {activeCategory === "All" ? "" : activeCategory} projects
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="pb-32">
        <div className="container">
          {filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <ProjectGridCard key={project.slug} project={project} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-sm text-muted-foreground font-mono tracking-wider">
                No projects match your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
