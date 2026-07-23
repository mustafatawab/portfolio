"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

const faqs = [
  {
    q: "What kind of projects do you typically build?",
    a: "I build custom web applications, SaaS platforms, desktop software, and backend systems for businesses across healthcare, education, enterprise, and e-commerce. Recent examples include a multi-tenant school management platform, an AI-powered medical scribe, and an offline-first pharmacy management system.",
  },
  {
    q: "What technologies do you work with?",
    a: "I primarily work with TypeScript, Python, Next.js, React, FastAPI, Node.js, PostgreSQL, Prisma, Docker, and Electron. I select the stack based on the project's specific requirements rather than forcing a one-size-fits-all approach.",
  },
  {
    q: "Can you work with my existing team or codebase?",
    a: "Yes. I can integrate with your team as an individual contributor, lead development on a specific track, or take full ownership of a project. I have experience collaborating across time zones and communication styles.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused MVP can ship in 4-6 weeks. Full product development typically runs 2-4 months depending on scope and complexity. I provide a clear timeline during the discovery phase before any work begins.",
  },
  {
    q: "How do you price projects?",
    a: "Pricing depends on scope and complexity. I offer fixed pricing for well-defined projects and retainer-based partnerships for ongoing development. The discovery phase helps us determine the right model for your situation.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">
            FAQs
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 mb-14"
          >
            Common questions.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <motion.div key={i} variants={fadeUp}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left focus:outline-none group"
                >
                  <div className="flex items-center justify-between gap-4 py-5">
                    <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground/30 flex-shrink-0 transition-transform duration-300 ease-[var(--ease)] ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i < faqs.length - 1 && <div className="h-px bg-border" />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
