"use client"
import React, { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle } from "lucide-react"
import me from "@/assets/mustafa.png"

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

const values = [
    "Reliability & trust over hype and buzzwords",
    "Quality code that scales with your business",
    "Clear communication throughout the process",
    "Solutions tailored to real business needs",
]

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const blobX1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
    const blobY1 = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"])
    const blobX2 = useTransform(scrollYProgress, [0, 1], ["20%", "-15%"])
    const blobY2 = useTransform(scrollYProgress, [0, 1], ["15%", "-20%"])

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 md:py-32 bg-background overflow-hidden"
        >
            {/* Scroll-linked animated gradient blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px]"
                    style={{ left: blobX1, top: blobY1 }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[80px]"
                    style={{ right: blobX2, bottom: blobY2 }}
                />
            </div>

            <div className="container max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Photo */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            filter: "blur(8px)",
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
                        className="order-2 lg:order-1"
                    >
                        <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
                            {/* Outer glow ring */}
                            <div className="absolute inset-[-20px] rounded-full bg-primary/[0.04] blur-xl" />

                            {/* Rotating dashed ring */}
                            <div
                                className="absolute inset-[-16px] rounded-full border-[1.5px] border-dashed border-primary/30"
                                style={{
                                    animation: "pulse-ring 25s linear infinite",
                                }}
                            />

                            {/* Second counter-rotating ring */}
                            <div
                                className="absolute inset-[-6px] rounded-full border border-primary/15"
                                style={{
                                    animation:
                                        "pulse-ring 40s linear infinite reverse",
                                }}
                            />

                            {/* Accent dots */}
                            {[
                                {
                                    top: "5%",
                                    left: "50%",
                                    size: 8,
                                    delay: 0,
                                    dur: 2.5,
                                },
                                {
                                    top: "92%",
                                    left: "15%",
                                    size: 6,
                                    delay: 0.8,
                                    dur: 3,
                                },
                                {
                                    top: "20%",
                                    left: "95%",
                                    size: 7,
                                    delay: 1.4,
                                    dur: 2.8,
                                },
                                {
                                    top: "70%",
                                    left: "98%",
                                    size: 5,
                                    delay: 0.3,
                                    dur: 3.2,
                                },
                                {
                                    top: "85%",
                                    left: "80%",
                                    size: 6,
                                    delay: 1.8,
                                    dur: 2.6,
                                },
                                {
                                    top: "10%",
                                    left: "10%",
                                    size: 5,
                                    delay: 2.1,
                                    dur: 3.5,
                                },
                            ].map((dot, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-primary/50"
                                    style={{
                                        top: dot.top,
                                        left: dot.left,
                                        width: dot.size,
                                        height: dot.size,
                                        animation: `float ${dot.dur}s ease-in-out ${dot.delay}s infinite`,
                                    }}
                                />
                            ))}

                            {/* Main image */}
                            <div className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3" />
                            <Image
                                src={me}
                                fill
                                alt="Portrait of Mustafa Tawab, Software Engineer"
                                className="rounded-2xl object-cover relative z-10"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        className="order-1 lg:order-2"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
                        >
                            I believe in reliable engineering and clear
                            communication.
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
                        >
                            I am a full-stack engineer with a product-minded
                            approach. Over the last 3+ years, I have helped
                            startups and SMBs design, build, and scale custom
                            software - from internal tools and dashboards to
                            customer-facing SaaS platforms.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-5 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
                        >
                            My typical stack includes TypeScript, Python, React,
                            Next.js, and Node.js, but I pick the right tool for
                            each job. Beyond code, I care about user experience,
                            system reliability, and shipping on time.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-8">
                            <div className="space-y-2.5">
                                {values.map((v, i) => (
                                    <motion.div
                                        key={v}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.4 + i * 0.08,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="flex items-start gap-2.5"
                                    >
                                        <CheckCircle
                                            size={16}
                                            className="text-primary shrink-0 mt-0.5"
                                        />
                                        <span className="text-sm text-muted-foreground leading-relaxed">
                                            {v}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
