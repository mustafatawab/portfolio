"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const values = [
  "Reliability & trust over hype and buzzwords",
  "Quality code that scales with your business",
  "Clear communication throughout the process",
  "Solutions tailored to real business needs",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.span variants={fadeUp} className="section-label">
            About
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
          >
            I believe in reliable engineering and clear communication.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
          >
            I am a full-stack engineer with a product-minded approach. Over the
            last 3+ years, I have helped startups and SMBs design, build, and
            scale custom software - from internal tools and dashboards to
            customer-facing SaaS platforms.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[15.5px] md:text-base text-muted-foreground leading-relaxed"
          >
            My typical stack includes TypeScript, Python, React, Next.js, and
            Node.js, but I pick the right tool for each job. Beyond code, I
            care about user experience, system reliability, and shipping on
            time.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
          >
            <div className="space-y-2.5">
              {values.map((v) => (
                <div key={v} className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
