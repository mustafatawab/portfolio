"use client"
import React, { useRef, useEffect, useState } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    animate,
} from "framer-motion"
import Link from "next/link"
import {
    ArrowUpRight,
    ArrowRight,
    Layers,
    Cpu,
    Server,
    ShieldCheck,
    Sparkles,
} from "lucide-react"

function AnimatedCounter({
    target,
    suffix = "",
}: {
    target: number
    suffix?: string
}) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        const controls = animate(0, target, {
            duration: 1.5,
            ease: "easeOut",
            onUpdate: (value) => setCount(Math.round(value)),
        })
        return controls.stop
    }, [isInView, target])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

const architecturalPillars = [
    {
        icon: Layers,
        title: "Full-Stack SaaS & Web Platforms",
        stack: "Next.js 15 • TypeScript • TanStack • Tailwind v4",
        detail: "Multi-tenant platforms, complex workflows & responsive client portals",
    },
    {
        icon: Server,
        title: "Production Backend & Systems",
        stack: "Node.js • Python / FastAPI • Prisma ORM • PostgreSQL",
        detail: "Sub-50ms query optimization, secure authentication & REST/GraphQL APIs",
    },
    {
        icon: Cpu,
        title: "AI Integration & Automation",
        stack: "LLM Agents • Speech Pipelines • Vector Search • Real-time Scribes",
        detail: "Practical AI embedded directly into clinical and operational workflows",
    },
    {
        icon: ShieldCheck,
        title: "DevOps, VPS & Resilient Architecture",
        stack: "Docker • Nginx Reverse Proxy • CI/CD • VPS Automation",
        detail: "Zero-downtime deployments, hardened SSL & offline-first capability",
    },
]

const HeroSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[92vh] flex items-center pt-32 pb-20 md:pt-36 md:pb-24 bg-background overflow-hidden"
        >
            {/* --- Ambient Background Glows & Abstract Emerald Arcs (LinkedIn Banner DNA) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {/* Emerald ambient auras */}
                <div className="absolute -top-36 right-0 w-[650px] h-[650px] rounded-full bg-radial from-primary/18 via-primary/5 to-transparent blur-[130px]" />
                <div className="absolute top-1/2 -left-28 w-[500px] h-[500px] rounded-full bg-radial from-accent/12 via-transparent to-transparent blur-[110px]" />

                {/* Subtle technical background grid */}
                <div className="absolute inset-0 bg-grid opacity-15" />

                {/* Sweeping Luminous Concentric Arcs inspired by the LinkedIn Banner */}
                <svg
                    className="absolute top-0 right-0 w-[800px] lg:w-[1050px] h-full opacity-40 dark:opacity-30 pointer-events-none"
                    viewBox="0 0 1000 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient
                            id="emeraldArcGrad1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--primary)"
                                stopOpacity="0.8"
                            />
                            <stop
                                offset="50%"
                                stopColor="var(--accent)"
                                stopOpacity="0.4"
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--border)"
                                stopOpacity="0.05"
                            />
                        </linearGradient>
                        <linearGradient
                            id="emeraldArcGrad2"
                            x1="100%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--primary)"
                                stopOpacity="0.5"
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--primary)"
                                stopOpacity="0.02"
                            />
                        </linearGradient>
                        <linearGradient
                            id="glassRibbonFill"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="80%"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--primary)"
                                stopOpacity="0.08"
                            />
                            <stop
                                offset="60%"
                                stopColor="var(--card)"
                                stopOpacity="0.02"
                            />
                            <stop
                                offset="100%"
                                stopColor="transparent"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>

                    {/* Concentric crescent arcs */}
                    <path
                        d="M 950 -100 C 650 150, 450 500, 600 950"
                        stroke="url(#emeraldArcGrad1)"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M 1050 -50 C 750 200, 520 550, 700 980"
                        stroke="url(#emeraldArcGrad2)"
                        strokeWidth="1.2"
                    />
                    <path
                        d="M 850 -150 C 580 100, 380 440, 500 900"
                        stroke="var(--border-strong)"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                    />
                    {/* Glassy crescent ribbon fill */}
                    <path
                        d="M 950 -100 C 650 150, 450 500, 600 950 L 750 980 C 580 520, 780 180, 1050 -50 Z"
                        fill="url(#glassRibbonFill)"
                    />
                </svg>

                {/* 4x6 Technical dot grids from the banner */}
                <div className="hidden lg:grid grid-cols-6 gap-2.5 absolute top-28 right-16 opacity-25">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span
                            key={i}
                            className="w-1 h-1 rounded-full bg-primary"
                        />
                    ))}
                </div>
                <div className="hidden lg:grid grid-cols-6 gap-2.5 absolute bottom-28 left-12 opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span
                            key={i}
                            className="w-1 h-1 rounded-full bg-primary"
                        />
                    ))}
                </div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                    {/* Left Column: Positioning & Narrative (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="lg:col-span-7 flex flex-col items-start"
                    >
                        {/* Status eyebrow */}
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/30 backdrop-blur-md shadow-[var(--shadow-xs)] mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-xs font-medium text-foreground/90">
                                Available for Q2 / Q3 Projects
                            </span>
                        </div>

                        {/* Confident Headline with Dual-Tone Typography */}
                        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-[4.2rem] leading-[1.08] tracking-tight text-foreground">
                            <span>MUSTAFA </span>
                            <span className="text-primary drop-shadow-[0_0_25px_rgba(0,214,160,0.3)]">
                                TAWAB
                            </span>
                        </h1>

                        {/* Title & Role */}
                        <p className="mt-2 text-lg sm:text-2xl font-heading font-semibold text-foreground/90 tracking-tight flex items-center gap-2">
                            <span>Software Engineer</span>
                            <span className="text-primary">•</span>
                            <span>Product Builder</span>
                        </p>

                        {/* Value proposition paragraph */}
                        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Building scalable software, SaaS architectures, and
                            AI-powered production systems. I take products from
                            architectural design to high-throughput cloud
                            deployment.
                        </p>

                        {/* Strategic CTAs */}
                        <div className="flex flex-wrap items-center gap-4 mt-8 w-full sm:w-auto">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-full shadow-[var(--shadow-sm)] hover:shadow-[var(--glow-md)] hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
                            >
                                <span>Explore Selected Work</span>
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="/case-studies"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border-strong bg-card/70 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/50 hover:bg-card hover:text-primary active:scale-[0.98] transition-all duration-200"
                            >
                                <span>Read Case Studies</span>
                                <ArrowUpRight
                                    size={16}
                                    className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </div>

                        {/* Highlights row */}
                        <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-border/80 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                                <Sparkles size={13} className="text-primary" />
                                <span>Fintech & School ERPs</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Sparkles size={13} className="text-primary" />
                                <span>Real-Time AI Scribes</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Sparkles size={13} className="text-primary" />
                                <span>Multi-Tenant Architecture</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Right Column: Architectural Capability Showcase (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="lg:col-span-5"
                    >
                        <div className="relative">
                            {/* Ambient edge glow */}
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-transparent blur-lg opacity-70 pointer-events-none" />

                            <div className="relative glass-card p-6 sm:p-7 rounded-2xl border border-border-strong shadow-[var(--shadow-xl)] backdrop-blur-xl">
                                {/* Card Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                            Core Architecture Stack
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                        Production Grade
                                    </span>
                                </div>

                                {/* Architectural Pillars Grid */}
                                <div className="space-y-4">
                                    {architecturalPillars.map(
                                        (pillar, index) => (
                                            <div
                                                key={pillar.title}
                                                className="group p-3.5 rounded-xl border border-border/60 bg-secondary-surface/40 hover:border-primary/40 hover:bg-secondary-surface transition-all duration-200"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:scale-105 transition-transform">
                                                        <pillar.icon
                                                            size={16}
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                            {pillar.title}
                                                        </h3>
                                                        <p className="text-xs font-mono text-primary/90 mt-0.5 truncate">
                                                            {pillar.stack}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1 leading-normal">
                                                            {pillar.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Card Footer Trust Callout */}
                                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Engineering philosophy</span>
                                    <span className="text-foreground font-medium">
                                        Reliability over hype
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust & Impact Bar with Smooth Counters */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-16 pt-10 border-t border-border/80"
                >
                    {[
                        {
                            value: 3,
                            suffix: "+",
                            label: "Years of Production Experience",
                            description:
                                "Designing, building, and deploying real-world platforms",
                        },
                        {
                            value: 20,
                            suffix: "+",
                            label: "Projects & Platforms Shipped",
                            description:
                                "From custom ERPs to AI medical scribe integrations",
                        },
                        {
                            value: 100,
                            suffix: "%",
                            label: "End-to-End Ownership",
                            description:
                                "From database modeling to cloud VPS infrastructure",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="p-4 rounded-xl bg-card/40 border border-border/40"
                        >
                            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-baseline gap-1">
                                <AnimatedCounter
                                    target={stat.value}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <div className="text-sm font-semibold text-foreground/90 mt-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
