"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const budgetOptions = [
  "Less than $2,000",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "$10,000+",
  "Not sure yet",
];

const ContactSection = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const newErrors: Record<string, string> = {};
    if (!name?.trim()) newErrors.name = "Name is required";
    if (!email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const formUrl = form.getAttribute("action");
    if (formUrl) {
      const formBody = new URLSearchParams();
      Array.from(formData.entries()).forEach(([key, value]) => {
        formBody.append(key, value.toString());
      });
      fetch(formUrl, {
        method: "POST",
        body: formBody,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }).then(() => {
        form.reset();
        alert("Message sent! I will get back to you soon.");
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.span variants={fadeUp} className="section-label">
            Contact
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Let&apos;s work together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground leading-relaxed mb-10 max-w-lg"
          >
            Tell me a little about your project. I will respond within 1–2
            business days.
          </motion.p>

          <motion.form
            variants={fadeUp}
            action="https://formspree.io/f/xkgnlbqg"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`w-full px-4 py-2.5 rounded-lg bg-muted border text-foreground text-sm focus-ring outline-none ${
                    errors.name
                      ? "border-danger/50 focus-ring-error"
                      : "border-border focus-ring"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-danger">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`w-full px-4 py-2.5 rounded-lg bg-muted border text-foreground text-sm focus-ring outline-none ${
                    errors.email
                      ? "border-danger/50 focus-ring-error"
                      : "border-border focus-ring"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-danger">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="project"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Tell me about your project
              </label>
              <textarea
                id="project"
                name="message"
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus-ring outline-none resize-y"
                placeholder="What are you looking to build?"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Estimated budget
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus-ring outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
              >
                <option value="" disabled>
                  Select budget range
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] active:scale-[0.97]"
            >
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
