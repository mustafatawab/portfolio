"use client"
import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Search } from "lucide-react"
import { CaseStudy } from "@/lib/case-studies"

const ease = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease },
    },
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
}

function estimateReadTime(study: CaseStudy): number {
    const textParts: string[] = []
    const s = study.sections
    textParts.push(...s.executiveSummary)
    textParts.push(...s.businessProblem)
    textParts.push(s.architecture.overview)
    textParts.push(...s.architecture.systemFlow)
    textParts.push(...s.performance)
    textParts.push(...s.security)
    textParts.push(...s.lessonsLearned)
    textParts.push(...s.architecture.decisions.map((d) => d.detail))
    textParts.push(...s.challenges.map((c) => c.solution))
    textParts.push(...s.features.map((f) => f.solution))
    const wordCount = textParts.join(" ").split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / 200))
}

function deriveTopics(study: CaseStudy): string[] {
    const topics = new Set<string>()
    const cat = study.category.toLowerCase()
    if (cat.includes("saas")) topics.add("SaaS")
    if (cat.includes("desktop")) topics.add("Desktop")
    if (cat.includes("healthcare")) topics.add("Healthcare")
    if (cat.includes("enterprise")) topics.add("Enterprise")
    if (study.sections.performance.length > 0) topics.add("Performance")
    if (study.sections.security.length > 0) topics.add("Security")
    if (
        study.sections.architecture.decisions.some((d) =>
            /database|mongo|postgres|sql/.test(d.detail.toLowerCase())
        )
    )
        topics.add("Database")
    if (
        study.sections.architecture.decisions.some((d) =>
            /auth|jwt|session|oauth/.test(d.detail.toLowerCase())
        )
    )
        topics.add("Authentication")
    if (
        study.techStack.some((t) =>
            /next|vercel|docker|ci\/cd|deploy/.test(t.toLowerCase())
        ) ||
        study.sections.architecture.deploymentFlow.length > 0
    )
        topics.add("Deployment")
    return Array.from(topics).slice(0, 4)
}

function CaseStudyArticleCard({ study }: { study: CaseStudy }) {
    const readTime = estimateReadTime(study)
    const topics = deriveTopics(study)

    return (
        <motion.div variants={fadeUp}>
            <Link
                href={`/case-studies/${study.slug}`}
                className="group block rounded-xl border border-border bg-card p-6 transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
            >
                <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/[0.04] border border-border text-[10px] font-mono tracking-wider text-muted-foreground">
                        {study.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono tracking-wider text-muted-foreground/50">
                        <Clock size={10} />
                        {readTime} min read
                    </span>
                </div>

                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {study.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1 mb-3">
                    {study.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {topics.map((topic) => (
                        <span
                            key={topic}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/5 text-[10px] font-mono tracking-wider text-primary/70"
                        >
                            {topic}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2 mb-4 font-[var(--font-body)]">
                    {study.sections.executiveSummary[0]}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                        <span>{study.role}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{study.duration}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-[var(--duration-fast)]">
                        Read Case Study <ArrowUpRight size={12} />
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}

function FeaturedArticle({ study }: { study: CaseStudy }) {
    const readTime = estimateReadTime(study)
    const topics = deriveTopics(study)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
        >
            <Link
                href={`/case-studies/${study.slug}`}
                className="group block relative rounded-2xl overflow-hidden border border-border bg-card"
            >
                <div className="p-8 md:p-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-wider text-primary mb-4">
                        Featured Article
                    </span>

                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {study.title}: {study.subtitle}
                    </h2>

                    <p className="text-sm text-foreground/60 leading-relaxed mt-3 max-w-2xl">
                        {study.sections.executiveSummary[0]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {topics.map((topic) => (
                            <span
                                key={topic}
                                className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/[0.04] border border-border text-[10px] font-mono tracking-wider text-muted-foreground"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground/60">
                        <span>{study.role}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {readTime} min read
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{study.duration}</span>
                    </div>

                    <div className="mt-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium transition-all group-hover:bg-primary/90">
                            Read Full Case Study <ArrowUpRight size={12} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export function CaseStudyListing({ studies }: { studies: CaseStudy[] }) {
    const [activeTopic, setActiveTopic] = useState("All")
    const [search, setSearch] = useState("")

    const allTopics = useMemo(() => {
        const set = new Set<string>()
        studies.forEach((s) => deriveTopics(s).forEach((t) => set.add(t)))
        return ["All", ...Array.from(set).sort()]
    }, [studies])

    const featured = studies.find((s) => s.slug === "maktab-one")
    const nonFeatured = studies.filter((s) => s.slug !== "maktab-one")

    const filtered = useMemo(() => {
        let list =
            activeTopic === "All"
                ? nonFeatured
                : nonFeatured.filter((s) =>
                      deriveTopics(s).includes(activeTopic)
                  )
        if (search.trim()) {
            const q = search.toLowerCase()
            list = list.filter(
                (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.subtitle.toLowerCase().includes(q) ||
                    s.sections.executiveSummary.some((e) =>
                        e.toLowerCase().includes(q)
                    ) ||
                    s.techStack.some((t) => t.toLowerCase().includes(q))
            )
        }
        return list
    }, [activeTopic, search, nonFeatured])

    return (
        <main className="bg-background min-h-screen">
            <section className="pt-32 pb-12">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="max-w-3xl"
                    >
                        <span className="section-label">Case Studies</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mt-2">
                            Engineering deep dives
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                            Detailed technical case studies on architecture,
                            design decisions, trade-offs, and lessons learned
                            from production systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Featured Article ── */}
            {featured && (
                <section className="pb-12">
                    <div className="container">
                        <FeaturedArticle study={featured} />
                    </div>
                </section>
            )}

            {/* ── Filters & Search ── */}
            <section className="pb-8">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {allTopics.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => setActiveTopic(topic)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-[var(--duration-fast)] ease-[var(--ease)] ${
                                        activeTopic === topic
                                            ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]"
                                            : "text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                                    }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-56">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                            />
                            <input
                                type="text"
                                placeholder="Search case studies..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus-ring outline-none"
                            />
                        </div>
                    </div>
                    <div aria-live="polite" className="sr-only">
                        Showing {filtered.length}{" "}
                        {activeTopic === "All" ? "" : activeTopic} case studies
                    </div>
                </div>
            </section>

            {/* ── Article Grid ── */}
            <section className="pb-32">
                <div className="container">
                    {filtered.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {filtered.map((study) => (
                                <CaseStudyArticleCard
                                    key={study.slug}
                                    study={study}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-sm text-muted-foreground font-mono tracking-wider">
                                No case studies match your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
