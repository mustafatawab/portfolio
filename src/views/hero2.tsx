"use client"
import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const roles = [
    "Full Stack Developer",
    "Software Developer",
    "Software Engineer",
    "Problem Solver",
    "SaaS MVP Developer",
    "DevOps Specialist",
    "Software Architect",
]

const typeAnimationSequence = roles.flatMap((role) => [role, 2000])

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

const codeLines = [
    { indent: 0, text: "const engineer = {" },
    { indent: 1, text: 'name: "Mustafa Tawab",' },
    { indent: 1, text: 'role: "Full Stack Engineer",' },
    { indent: 1, text: "builds: [" },
    { indent: 2, text: '"SaaS", "AI Apps", "Enterprise"' },
    { indent: 1, text: "]," },
    { indent: 1, text: "stack: [" },
    { indent: 2, text: '"Next.js", "FastAPI", "Prisma"' },
    { indent: 1, text: "]," },
    { indent: 1, text: 'focus: "production systems"' },
    { indent: 0, text: "};" },
    { indent: 0, text: "" },
    { indent: 0, text: "engineer.ship();" },
]

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
        const obj = { value: 0 }
        gsap.to(obj, {
            value: target,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                setCount(Math.round(obj.value))
            },
        })
    }, [isInView, target])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

const HeroSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-24 bg-background overflow-hidden"
        >
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]"
                    animate={{
                        x: ["-20%", "15%", "-10%", "20%", "-20%"],
                        y: ["-10%", "25%", "-15%", "10%", "-10%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ top: "-10%", right: "-5%" }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/6 blur-[100px]"
                    animate={{
                        x: ["20%", "-15%", "25%", "-10%", "20%"],
                        y: ["15%", "-20%", "10%", "25%", "15%"],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ bottom: "0%", left: "-5%" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[90px]"
                    animate={{
                        x: ["-10%", "20%", "-20%", "15%", "-10%"],
                        y: ["20%", "-10%", "15%", "-15%", "20%"],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ top: "40%", left: "30%" }}
                />
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            y: useTransform(
                                scrollYProgress,
                                [0, 1],
                                ["0%", "15%"]
                            ),
                        }}
                        className="order-2 lg:order-1"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary tracking-wider mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
                            Available to Work
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground text-balance"
                        >
                            Hi, I am
                            <div>
                                <TypeAnimation
                                    sequence={typeAnimationSequence}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </div>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
                        >
                            Building modern software that solves real business
                            problems.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-3 mt-8"
                        >
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--glow-md)] active:scale-[0.97]"
                            >
                                View Projects
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                            <Link
                                href="/#about"
                                className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-foreground/30 hover:shadow-[var(--shadow-sm)] active:scale-[0.97]"
                            >
                                More About Me
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Code Card */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            filter: "blur(8px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.3,
                        }}
                        style={{
                            y: useTransform(
                                scrollYProgress,
                                [0, 1],
                                ["0%", "25%"]
                            ),
                        }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
                            <div className="absolute inset-0 rounded-2xl bg-primary/[0.04] translate-x-3 translate-y-3" />
                            <div className="relative z-10 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-lg)] glass-card">
                                {/* Title bar */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-danger/60" />
                                        <div className="w-3 h-3 rounded-full bg-warning/60" />
                                        <div className="w-3 h-3 rounded-full bg-success/60" />
                                    </div>
                                    <span className="ml-2 text-[11px] font-mono text-muted-foreground/60">
                                        engineer.ts
                                    </span>
                                </div>

                                {/* Code content */}
                                <div className="p-5 font-mono text-[13px] leading-[1.8]">
                                    {codeLines.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.6 + i * 0.06,
                                                ease: [0.25, 0.1, 0.25, 1],
                                            }}
                                            className="flex"
                                        >
                                            <span className="select-none text-muted-foreground/30 w-6 text-right mr-4">
                                                {i + 1}
                                            </span>
                                            <span>
                                                {"  ".repeat(line.indent)}
                                                {line.text.includes('"') ? (
                                                    <>
                                                        <span className="text-muted-foreground/80">
                                                            {
                                                                line.text.split(
                                                                    /(".*?")/
                                                                )[0]
                                                            }
                                                        </span>
                                                        <span className="text-primary">
                                                            {
                                                                line.text.match(
                                                                    /".*?"/
                                                                )?.[0]
                                                            }
                                                        </span>
                                                        <span className="text-muted-foreground/80">
                                                            {line.text.split(
                                                                /(".*?")/
                                                            )[2] || ""}
                                                        </span>
                                                    </>
                                                ) : line.text.includes("[") ||
                                                  line.text.includes("]") ||
                                                  line.text.includes("{") ||
                                                  line.text.includes("}") ||
                                                  line.text.includes(";") ? (
                                                    <span className="text-muted-foreground/80">
                                                        {line.text}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground/80">
                                                        {line.text}
                                                    </span>
                                                )}
                                            </span>
                                        </motion.div>
                                    ))}
                                    {/* Blinking cursor */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 1.5,
                                            duration: 0.1,
                                        }}
                                        className="flex"
                                    >
                                        <span className="select-none text-muted-foreground/30 w-6 text-right mr-4">
                                            {codeLines.length + 1}
                                        </span>
                                        <span className="w-2 h-4 bg-primary/70 animate-pulse" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust Bar with Counter Animations */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.6,
                        ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-border"
                >
                    {[
                        { value: 3, suffix: "+", label: "Years of Experience" },
                        { value: 20, suffix: "+", label: "Projects Delivered" },
                        { value: 25, suffix: "+", label: "Happy Clients" },
                        { value: 3, suffix: "", label: "Industries Served" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-2xl font-bold text-foreground tracking-tight">
                                <AnimatedCounter
                                    target={stat.value}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <div className="text-sm text-muted-foreground mt-1.5 leading-snug">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
