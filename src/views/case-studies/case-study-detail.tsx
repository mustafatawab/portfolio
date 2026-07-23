"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Clock,
    User,
    CheckCircle2,
    ChevronRight,
} from "lucide-react"
import {
    CaseStudy,
    Feature,
    Challenge,
    TechDecision,
    getRelatedCaseStudies,
} from "@/lib/case-studies"
import { Callout } from "@/components/case-studies/callout"
import { TechStack } from "@/components/case-studies/tech-stack"

// ─── Section registry for TOC ───
interface TocItem {
    id: string
    label: string
}

function buildToc(study: CaseStudy): TocItem[] {
    const items: TocItem[] = []
    if (study.sections.executiveSummary.length)
        items.push({ id: "executive-summary", label: "Executive Summary" })
    if (study.sections.businessProblem.length)
        items.push({ id: "business-problem", label: "Business Problem" })
    if (study.sections.goals.business.length)
        items.push({ id: "goals", label: "Goals" })
    if (study.sections.requirements.functional.length)
        items.push({ id: "requirements", label: "Requirements" })
    if (study.sections.architecture.overview)
        items.push({ id: "architecture", label: "Architecture" })
    if (study.sections.techDecisions.length)
        items.push({
            id: "technology-decisions",
            label: "Technology Decisions",
        })
    if (study.sections.features.length)
        items.push({ id: "features", label: "Features" })
    if (study.sections.challenges.length)
        items.push({ id: "challenges", label: "Challenges" })
    if (study.sections.performance.length)
        items.push({ id: "performance", label: "Performance" })
    if (study.sections.security.length)
        items.push({ id: "security", label: "Security" })
    if (study.sections.lessonsLearned.length)
        items.push({ id: "lessons-learned", label: "Lessons Learned" })
    if (study.sections.futureImprovements.length)
        items.push({ id: "future-improvements", label: "Future Improvements" })
    return items
}

// ─── Progress bar ───
function ReadingProgress() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const handleScroll = () => {
            const total =
                document.documentElement.scrollHeight - window.innerHeight
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-border">
            <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
        </div>
    )
}

// ─── Section wrapper ───
function Section({
    id,
    children,
    className = "",
}: {
    id: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <section id={id} className={`scroll-mt-24 mb-16 ${className}`}>
            {children}
        </section>
    )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-wider text-primary uppercase">
                {children}
            </span>
            <span className="h-px flex-1 bg-border" />
        </div>
    )
}

function SectionBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-[15.5px] text-foreground/80 leading-relaxed space-y-4">
            {children}
        </div>
    )
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                        size={15}
                        className="text-primary/70 mt-0.5 shrink-0"
                    />
                    <span className="text-[15.5px] text-foreground/70 leading-relaxed">
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    )
}

function GridList({ items }: { items: string[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-border bg-card"
                >
                    <CheckCircle2
                        size={14}
                        className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-foreground/70">{item}</span>
                </div>
            ))}
        </div>
    )
}

// ─── Feature card ───
function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">
                    {feature.name}
                </h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1.5 uppercase">
                            Problem
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            {feature.problem}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1.5 uppercase">
                            Solution
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            {feature.solution}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1.5 uppercase">
                            Engineering Challenges
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            {feature.challenges}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Challenge card ───
function ChallengeCard({ challenge }: { challenge: Challenge }) {
    return (
        <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">
                {challenge.problem}
            </h3>
            <div className="space-y-3">
                <p className="text-sm text-foreground/70 leading-relaxed">
                    {challenge.solution}
                </p>
                <Callout variant="caution" title="Trade-off">
                    {challenge.tradeoff}
                </Callout>
            </div>
        </div>
    )
}

// ─── Tech decision card ───
function TechDecisionCard({ decision }: { decision: TechDecision }) {
    return (
        <div className="border border-border rounded-xl bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-foreground/5 text-xs font-mono text-foreground tracking-tight border border-border">
                    {decision.tech}
                </span>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                {decision.why}
            </p>
            <Callout variant="warning" title="Trade-off">
                {decision.tradeoff}
            </Callout>
        </div>
    )
}

// ─── Architecture decision ───
function ArchDecisionCard({
    title,
    detail,
}: {
    title: string
    detail: string
}) {
    return (
        <div className="border border-border rounded-xl bg-card p-6">
            <h4 className="text-sm font-semibold text-foreground mb-2">
                {title}
            </h4>
            <p className="text-sm text-foreground/70 leading-relaxed">
                {detail}
            </p>
        </div>
    )
}

// ─── TOC sidebar ───
function TableOfContents({
    items,
    activeId,
}: {
    items: TocItem[]
    activeId: string
}) {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <nav className="space-y-0.5" aria-label="Table of contents">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-xs transition-all duration-[var(--duration-fast)] border-l-2 ${
                        activeId === item.id
                            ? "text-primary border-primary bg-primary-light font-medium"
                            : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/20"
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    )
}

// ─── Main detail view ───
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
    const [activeId, setActiveId] = useState("")
    const toc = buildToc(study)
    const related = getRelatedCaseStudies(study.relatedSlugs)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                }
            },
            { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
        )

        toc.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [toc])

    const s = study.sections

    return (
        <main className="bg-background min-h-screen">
            <ReadingProgress />

            {/* ── Back link ── */}
            <div className="pt-28 pb-4">
                <div className="container">
                    <Link
                        href="/case-studies"
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        All case studies
                    </Link>
                </div>
            </div>

            {/* ── Hero ── */}
            <section className="pb-12">
                <div className="container max-w-5xl">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-[var(--shadow-md)]">
                        <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            <div className="space-y-3 max-w-3xl">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-primary/20 text-[10px] font-mono tracking-wider text-primary">
                                        {study.category}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border text-[10px] font-mono tracking-wider text-muted-foreground">
                                        {study.status}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
                                    {study.subtitle}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-6 mt-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User size={14} />
                            <span>{study.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock size={14} />
                            <span>{study.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-auto">
                            {study.links.website && (
                                <Link
                                    href={study.links.website}
                                    target="_blank"
                                    className="group inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium transition-all duration-[var(--duration-normal)] hover:bg-primary/90 hover:shadow-[var(--shadow-sm)]"
                                >
                                    Live Demo{" "}
                                    <ExternalLink
                                        size={12}
                                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </Link>
                            )}
                            {study.links.github && (
                                <Link
                                    href={study.links.github}
                                    target="_blank"
                                    className="group inline-flex items-center gap-1.5 px-4 py-2 border border-border text-foreground rounded-lg text-xs font-medium transition-all duration-[var(--duration-normal)] hover:border-foreground/30"
                                >
                                    GitHub <Github size={12} />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Tech stack */}
                    <div className="mt-5">
                        <TechStack items={study.techStack} />
                    </div>
                </div>
            </section>

            {/* ── Content with TOC ── */}
            <div className="container max-w-6xl pb-32">
                <div className="flex gap-12">
                    {/* Sticky TOC */}
                    <aside className="hidden lg:block w-48 flex-shrink-0">
                        <div className="sticky top-28">
                            <p className="text-[10px] font-mono tracking-wider text-muted-foreground mb-4 uppercase">
                                Contents
                            </p>
                            <TableOfContents items={toc} activeId={activeId} />
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 min-w-0 max-w-3xl">
                        {/* 1. Executive Summary */}
                        {s.executiveSummary.length > 0 && (
                            <Section id="executive-summary">
                                <SectionHeading>
                                    Executive Summary
                                </SectionHeading>
                                <SectionBody>
                                    {s.executiveSummary.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </SectionBody>
                            </Section>
                        )}

                        {/* 2. Business Problem */}
                        {s.businessProblem.length > 0 && (
                            <Section id="business-problem">
                                <SectionHeading>
                                    Business Problem
                                </SectionHeading>
                                <SectionBody>
                                    {s.businessProblem.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </SectionBody>
                            </Section>
                        )}

                        {/* 3. Goals */}
                        {(s.goals.business.length > 0 ||
                            s.goals.technical.length > 0 ||
                            s.goals.user.length > 0) && (
                            <Section id="goals">
                                <SectionHeading>Goals</SectionHeading>
                                <div className="space-y-6">
                                    {s.goals.business.length > 0 && (
                                        <div>
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2 uppercase">
                                                Business Goals
                                            </p>
                                            <BulletList
                                                items={s.goals.business}
                                            />
                                        </div>
                                    )}
                                    {s.goals.technical.length > 0 && (
                                        <div>
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2 uppercase">
                                                Technical Goals
                                            </p>
                                            <BulletList
                                                items={s.goals.technical}
                                            />
                                        </div>
                                    )}
                                    {s.goals.user.length > 0 && (
                                        <div>
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2 uppercase">
                                                User Goals
                                            </p>
                                            <BulletList items={s.goals.user} />
                                        </div>
                                    )}
                                </div>
                            </Section>
                        )}

                        {/* 4. Requirements */}
                        {s.requirements.functional.length > 0 && (
                            <Section id="requirements">
                                <SectionHeading>Requirements</SectionHeading>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2 uppercase">
                                            Functional
                                        </p>
                                        <GridList
                                            items={s.requirements.functional}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 uppercase">
                                            Non‑Functional
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {s.requirements.nonFunctional
                                                .performance.length > 0 && (
                                                <div className="border border-border rounded-lg p-4 bg-card">
                                                    <p className="text-xs font-semibold text-foreground mb-2">
                                                        Performance
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {s.requirements.nonFunctional.performance.map(
                                                            (r, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-muted-foreground"
                                                                >
                                                                    • {r}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                            {s.requirements.nonFunctional
                                                .security.length > 0 && (
                                                <div className="border border-border rounded-lg p-4 bg-card">
                                                    <p className="text-xs font-semibold text-foreground mb-2">
                                                        Security
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {s.requirements.nonFunctional.security.map(
                                                            (r, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-muted-foreground"
                                                                >
                                                                    • {r}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                            {s.requirements.nonFunctional
                                                .scalability.length > 0 && (
                                                <div className="border border-border rounded-lg p-4 bg-card">
                                                    <p className="text-xs font-semibold text-foreground mb-2">
                                                        Scalability
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {s.requirements.nonFunctional.scalability.map(
                                                            (r, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-muted-foreground"
                                                                >
                                                                    • {r}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                            {s.requirements.nonFunctional
                                                .maintainability.length > 0 && (
                                                <div className="border border-border rounded-lg p-4 bg-card">
                                                    <p className="text-xs font-semibold text-foreground mb-2">
                                                        Maintainability
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {s.requirements.nonFunctional.maintainability.map(
                                                            (r, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-muted-foreground"
                                                                >
                                                                    • {r}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        )}

                        {/* 5. Architecture */}
                        {s.architecture.overview && (
                            <Section id="architecture">
                                <SectionHeading>Architecture</SectionHeading>
                                <SectionBody>
                                    <Callout variant="info">
                                        {s.architecture.overview}
                                    </Callout>

                                    {s.architecture.systemFlow.length > 0 && (
                                        <div>
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 mt-6 uppercase">
                                                System Flow
                                            </p>
                                            <ol className="space-y-3">
                                                {s.architecture.systemFlow.map(
                                                    (step, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-3 text-[15px] text-foreground/70 leading-relaxed"
                                                        >
                                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    )}

                                    {s.architecture.databaseDesign.length >
                                        0 && (
                                        <div className="mt-6">
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 uppercase">
                                                Database Design
                                            </p>
                                            <ul className="space-y-3">
                                                {s.architecture.databaseDesign.map(
                                                    (item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-[15px] text-foreground/70 leading-relaxed pl-4 border-l-2 border-primary/30"
                                                        >
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {s.architecture.requestFlow.length > 0 && (
                                        <div className="mt-6">
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 uppercase">
                                                Request Flow
                                            </p>
                                            <ol className="space-y-3">
                                                {s.architecture.requestFlow.map(
                                                    (step, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-3 text-[15px] text-foreground/70 leading-relaxed"
                                                        >
                                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    )}

                                    {s.architecture.deploymentFlow.length >
                                        0 && (
                                        <div className="mt-6">
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 uppercase">
                                                Deployment Flow
                                            </p>
                                            <ol className="space-y-3">
                                                {s.architecture.deploymentFlow.map(
                                                    (step, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-3 text-[15px] text-foreground/70 leading-relaxed"
                                                        >
                                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    )}

                                    {s.architecture.decisions.length > 0 && (
                                        <div className="mt-6">
                                            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-3 uppercase">
                                                Architectural Decisions
                                            </p>
                                            <div className="space-y-3">
                                                {s.architecture.decisions.map(
                                                    (d, i) => (
                                                        <ArchDecisionCard
                                                            key={i}
                                                            title={d.title}
                                                            detail={d.detail}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </SectionBody>
                            </Section>
                        )}

                        {/* 6. Technology Decisions */}
                        {s.techDecisions.length > 0 && (
                            <Section id="technology-decisions">
                                <SectionHeading>
                                    Technology Decisions
                                </SectionHeading>
                                <div className="space-y-4">
                                    {s.techDecisions.map((d, i) => (
                                        <TechDecisionCard
                                            key={i}
                                            decision={d}
                                        />
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* 7. Features */}
                        {s.features.length > 0 && (
                            <Section id="features">
                                <SectionHeading>Features</SectionHeading>
                                <div className="space-y-5">
                                    {s.features.map((f, i) => (
                                        <FeatureCard key={i} feature={f} />
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* 8. Challenges */}
                        {s.challenges.length > 0 && (
                            <Section id="challenges">
                                <SectionHeading>Challenges</SectionHeading>
                                <div className="space-y-5">
                                    {s.challenges.map((c, i) => (
                                        <ChallengeCard key={i} challenge={c} />
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* 9. Performance */}
                        {s.performance.length > 0 && (
                            <Section id="performance">
                                <SectionHeading>Performance</SectionHeading>
                                <SectionBody>
                                    <ul className="space-y-2">
                                        {s.performance.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-[15px] text-foreground/70 leading-relaxed flex items-start gap-2.5"
                                            >
                                                <span className="text-primary text-sm mt-0.5 shrink-0">
                                                    &#9656;
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </SectionBody>
                            </Section>
                        )}

                        {/* 10. Security */}
                        {s.security.length > 0 && (
                            <Section id="security">
                                <SectionHeading>Security</SectionHeading>
                                <SectionBody>
                                    <ul className="space-y-2">
                                        {s.security.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-[15px] text-foreground/70 leading-relaxed flex items-start gap-2.5"
                                            >
                                                <span className="text-primary text-sm mt-0.5 shrink-0">
                                                    &#9656;
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </SectionBody>
                            </Section>
                        )}

                        {/* 11. Lessons Learned */}
                        {s.lessonsLearned.length > 0 && (
                            <Section id="lessons-learned">
                                <SectionHeading>Lessons Learned</SectionHeading>
                                <SectionBody>
                                    <ul className="space-y-3">
                                        {s.lessonsLearned.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-[15px] text-foreground/70 leading-relaxed p-4 rounded-lg border border-border bg-card"
                                            >
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono shrink-0">
                                                    {i + 1}
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </SectionBody>
                            </Section>
                        )}

                        {/* 12. Future Improvements */}
                        {s.futureImprovements.length > 0 && (
                            <Section id="future-improvements">
                                <SectionHeading>
                                    Future Improvements
                                </SectionHeading>
                                <SectionBody>
                                    <Callout variant="tip" title="Roadmap">
                                        These improvements are prioritized based
                                        on user feedback and business impact.
                                    </Callout>
                                    <ul className="space-y-3 mt-4">
                                        {s.futureImprovements.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-[15px] text-foreground/70 leading-relaxed"
                                            >
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground/5 text-muted-foreground text-xs font-mono shrink-0">
                                                    {i + 1}
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </SectionBody>
                            </Section>
                        )}

                        {/* ── Related Case Studies ── */}
                        {related.length > 0 && (
                            <Section
                                id="related"
                                className="border-t border-border pt-12"
                            >
                                <SectionHeading>
                                    Related Case Studies
                                </SectionHeading>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {related.map((r) => (
                                        <Link
                                            key={r.slug}
                                            href={`/case-studies/${r.slug}`}
                                            className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-[var(--duration-fast)]"
                                        >
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                                                <Image
                                                    src={r.image}
                                                    alt={r.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {r.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {r.subtitle}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                size={14}
                                                className="text-muted-foreground shrink-0 ml-auto transition-transform group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* ── CTA ── */}
                        <Section
                            id="cta"
                            className="border-t border-border pt-12"
                        >
                            <div className="p-8 rounded-xl bg-primary-light border border-primary/20 text-center">
                                <h2 className="text-lg font-semibold text-foreground mb-2">
                                    Want to discuss this project?
                                </h2>
                                <p className="text-sm text-muted-foreground mb-5 max-w-lg mx-auto">
                                    I am always happy to talk about engineering
                                    decisions, architecture, or how I can help
                                    with your next project.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {study.links.website && (
                                        <Link
                                            href={study.links.website}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] hover:bg-primary/90 hover:shadow-[var(--shadow-sm)]"
                                        >
                                            View Project{" "}
                                            <ExternalLink size={14} />
                                        </Link>
                                    )}
                                    <Link
                                        href="/case-studies"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-xl text-sm font-medium transition-all duration-[var(--duration-normal)] hover:border-foreground/30"
                                    >
                                        Browse all studies
                                    </Link>
                                </div>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </main>
    )
}
