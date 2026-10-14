"use client"
import React, { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldCheck, Layers, Cpu, MessageSquareQuote } from "lucide-react"
import portrait from "@/assets/mustafa-portrait-green.jpg"

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

const pillars = [
    {
        icon: Layers,
        title: "Architectural Discipline",
        desc: "Codebases engineered for maintainability, high concurrency, and zero tech-debt surprises.",
    },
    {
        icon: ShieldCheck,
        title: "End-to-End Ownership",
        desc: "From database schema design and intuitive UI to Dockerized CI/CD production pipelines.",
    },
    {
        icon: Cpu,
        title: "Pragmatic Engineering",
        desc: "Selecting proven, performant technologies tailored to business realities over hype.",
    },
    {
        icon: MessageSquareQuote,
        title: "Transparent Collaboration",
        desc: "Direct communication, proactive problem-solving, and clear milestones throughout.",
    },
]

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const blobX1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const blobY1 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"])

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-28 md:py-36 bg-background overflow-hidden"
        >
            {/* Luminous emerald ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[140px]"
                    style={{ left: blobX1, top: blobY1 }}
                />
            </div>

            <div className="container max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Studio Portrait with Editorial Frame */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            filter: "blur(6px)",
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="lg:col-span-5 order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Ambient glow behind frame */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl opacity-60 pointer-events-none" />

                            {/* Luxury Frame Container */}
                            <div className="relative rounded-2xl p-2.5 sm:p-3 bg-card border border-primary/25 shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
                                {/* Top corner dots (echoing LinkedIn banner) */}
                                <div className="absolute top-4 right-4 flex gap-1 z-20 pointer-events-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                                </div>

                                {/* Portrait image */}
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-background">
                                    <Image
                                        src={portrait}
                                        fill
                                        alt="Mustafa Tawab - Software Engineer in tailored charcoal suit"
                                        className="object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 450px"
                                    />
                                    {/* Subtle inner emerald gradient vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Floating Executive Credential Pill */}
                                <div className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-6 bg-card/95 backdrop-blur-xl border border-primary/30 p-3.5 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.6)] z-20">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                            </span>
                                            <span className="text-[11px] font-mono tracking-wider text-primary uppercase font-semibold">
                                                Senior Engineer & Architect
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline">
                                            Islamabad, PK
                                        </span>
                                    </div>
                                    <p className="text-xs text-foreground/85 mt-1 font-medium">
                                        Full-Stack • Systems • AI Integrations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Engineering Philosophy & Values */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        className="lg:col-span-7 order-1 lg:order-2"
                    >
                        {/* Section eyebrow */}
                        <motion.div
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-5"
                        >
                            <span>Engineering Philosophy</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
                        >
                            Reliable engineering, clean architecture, and measurable impact.
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
                        >
                            I am a full-stack engineer and product builder. Over
                            the last 3+ years, I have engineered and shipped
                            complete software solutions for startups,
                            fast-growing businesses, and enterprise teams —
                            spanning multi-tenant ERP platforms, AI-driven
                            automation systems, and high-performance web
                            applications.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-4 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
                        >
                            My core stack centers on TypeScript, Python,
                            Next.js, React, Node.js, and modern cloud
                            infrastructure. I don&apos;t just write code; I take
                            end-to-end ownership: architecting resilient data
                            layers, ensuring production reliability, and
                            shipping on schedule.
                        </motion.p>

                        {/* 4 Pillars Grid */}
                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/60"
                        >
                            {pillars.map((pillar) => (
                                <div
                                    key={pillar.title}
                                    className="p-4 rounded-xl bg-card/60 border border-border hover:border-primary/30 transition-colors duration-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
                                        <pillar.icon size={16} />
                                    </div>
                                    <h3 className="text-sm font-semibold text-foreground">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection

