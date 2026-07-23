"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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

const testimonials = [
  {
    quote:
      "Mustafa delivered an MVP in under 5 weeks and then stayed on to build the full product. His technical judgment saved us from several architectural mistakes that would have been expensive to undo. He operates more like a partner than a contractor.",
    author: "Dr. Ahmed Al-Saleh",
    role: "CEO, Hekma Health",
  },
  {
    quote:
      "We had a complex offline-first requirement that most developers ran from. Mustafa not only embraced it but shipped a system that works flawlessly in low-connectivity environments. Our operations team calls it rock solid.",
    author: "Omar Faraz",
    role: "Founder, Al Faraz Pharmacy",
  },
  {
    quote:
      "Working with Mustafa felt like having a technical co-founder. He challenged our assumptions, proposed better approaches, and delivered code that our internal team could actually maintain after handoff. That never happens with contractors.",
    author: "Sarah Hassan",
    role: "CTO, Rukun Education",
  },
  {
    quote:
      "The architecture review alone was worth the engagement. Mustafa identified bottlenecks in our database design that would have crippled us at 10x scale. His redesign cut query times by 80% with zero downtime migration.",
    author: "Yasir Hayat",
    role: "Engineering Lead, Portfolio",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">
            Testimonials
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 mb-14"
          >
            What clients say.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card-hover rounded-xl border border-border/50 p-6 sm:p-7 flex flex-col"
            >
              <Quote size={18} className="text-primary/30 mb-4 flex-shrink-0" />
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground">
                  {t.author}
                </p>
                <p className="text-xs text-muted-foreground/60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
