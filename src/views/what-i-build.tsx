"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
    ArrowUpRight,
    LayoutDashboard,
    Globe,
    Cloud,
    Monitor,
    Server,
    RefreshCw,
} from "lucide-react"

const ease = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease },
    },
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

const offerings = [
    {
        icon: LayoutDashboard,
        title: "Custom Software Development",
        description:
            "Tailored software solutions designed around unique business workflows - from internal platforms to full operational systems that scale with your growth.",
        useCases: [
            "Internal Platforms",
            "CRM & ERP",
            "Workflow Automation",
            "Operations Software",
        ],
        links: [
            { label: "Triton Consulting", href: "/projects/triton-consulting" },
            { label: "MSP Tech Stack", href: "/projects/msp-tech-stack" },
        ],
    },
    {
        icon: Globe,
        title: "Web Application Development",
        description:
            "Modern, secure, and scalable web applications built with clean architecture - dashboards, customer portals, booking platforms, and business systems.",
        useCases: [
            "Dashboards",
            "Customer Portals",
            "Booking Platforms",
            "Admin Panels",
        ],
        links: [
            { label: "Rukun Al Zuhab", href: "/projects/rukun-al-zuhab" },
            { label: "Elygance", href: "/projects/elygance" },
        ],
    },
    {
        icon: Cloud,
        title: "SaaS Product Development",
        description:
            "Scalable SaaS platforms with multi-tenancy, secure authentication, subscription billing, and cloud-ready architecture deployed on modern infrastructure.",
        useCases: [
            "Multi-Tenant Platforms",
            "Subscription Billing",
            "Role-Based Access",
            "Cloud Deployment",
        ],
        links: [
            { label: "Maktab One", href: "/projects/maktab-one" },
            { label: "Case Study", href: "/case-studies/maktab-one" },
        ],
    },
    {
        icon: Monitor,
        title: "Desktop Application Development",
        description:
            "Offline-first desktop applications using Electron - ideal for environments where connectivity is unreliable and performance on local hardware matters.",
        useCases: [
            "Pharmacy Systems",
            "Inventory Management",
            "POS Systems",
            "Billing & Reporting",
        ],
        links: [
            { label: "Pharmacy System", href: "/projects/faraz-pharmacy" },
            {
                label: "Case Study",
                href: "/case-studies/pharmacy-management-system",
            },
        ],
    },
    {
        icon: Server,
        title: "Backend & API Engineering",
        description:
            "Robust backend systems and APIs that power your applications - designed for reliability, security, and performance under real-world traffic.",
        useCases: [
            "REST & GraphQL APIs",
            "Authentication & Authorization",
            "Third-Party Integrations",
            "Database Design",
        ],
        links: [
            { label: "MyScribe", href: "/projects/my-scribe" },
            { label: "Case Study", href: "/case-studies/my-scribe" },
        ],
    },
    {
        icon: RefreshCw,
        title: "Software Modernization",
        description:
            "Upgrade legacy systems into modern, maintainable applications - reduce tech debt, improve security, and unlock new capabilities without rebuilding from scratch.",
        useCases: [
            "Legacy Migration",
            "Tech Debt Reduction",
            "Performance Optimization",
            "Security Hardening",
        ],
        links: [
            { label: "NavPoint Health", href: "/projects/navpoint-health" },
            { label: "Case Study", href: "/case-studies/navpoint-health" },
        ],
    },
]

function GridCard({ offering }: { offering: (typeof offerings)[number] }) {
    return (
        <motion.div variants={fadeUp} className="h-full">
            <div className="glass-card p-6 sm:p-7 flex flex-col h-full hover:border-primary/40 hover:shadow-[var(--shadow-lg)] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5 border border-primary/20">
                    <offering.icon size={20} />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {offering.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-6">
                    {offering.description}
                </p>

                <div className="border-t border-border/50 pt-4 mb-6 mt-auto">
                    <p className="text-[11px] font-mono tracking-wider text-muted-foreground/60 uppercase mb-3">
                        Common Applications
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {offering.useCases.map((uc) => (
                            <span
                                key={uc}
                                className="inline-flex items-center px-2 py-0.5 rounded-md border border-border/50 bg-foreground/[0.04] text-[11px] font-mono text-muted-foreground tracking-tight"
                            >
                                {uc}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border/40">
                    {offering.links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group/link inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline underline-offset-2"
                        >
                            {link.label}
                            <ArrowUpRight
                                size={11}
                                className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function WhatIBuild() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

    return (
        <section
            ref={sectionRef}
            id="what-i-build"
            className="relative py-24 md:py-32 bg-muted/40 overflow-hidden"
        >
            {/* Parallax background shift */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-background/50 to-muted/40 pointer-events-none"
                style={{ y: bgY }}
            />

            <div className="container relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
                    >
                        Software solutions built for real business problems.
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="mt-4 text-[15.5px] md:text-base text-muted-foreground leading-relaxed max-w-2xl"
                    >
                        I design and develop modern software that helps
                        businesses streamline operations, improve customer
                        experiences, and scale with confidence.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
                >
                    {offerings.map((offering) => (
                        <GridCard key={offering.title} offering={offering} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
