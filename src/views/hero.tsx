"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import me from "@/assets/mustafa.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary tracking-wider mb-6"
            >
              Software Engineer
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground text-balance"
            >
              Building modern <span className="text-primary">software</span>{" "}
              that <span className="text-primary">solves</span> real business
              problems.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              I design and build custom web applications, SaaS platforms, and
              backend systems - from concept to production.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] active:scale-[0.97]"
              >
                View Projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/#about"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-foreground/30 active:scale-[0.97]"
              >
                More About Me
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mt-8 text-sm text-muted-foreground"
            >
              <MapPin size={14} />
              Islamabad, Pakistan
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:ml-auto">
              <div className="absolute inset-0 rounded-2xl bg-primary/[0.04] translate-x-3 translate-y-3" />
              <Image
                src={me}
                fill
                alt="Mustafa Tawab"
                className="rounded-2xl object-cover relative z-10"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Trust Bar */}
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
            { value: "3+", label: "Years of Experience" },
            { value: "20+", label: "Projects Delivered" },
            { value: "25+", label: "Happy Clients" },
            { value: "3", label: "Industries Served" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1.5 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
