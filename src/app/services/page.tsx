"use client";
import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <main className="bg-background min-h-screen">
      <section className="relative pt-40 pb-20 text-center">
        <div className="container space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold font-display text-foreground tracking-tight">
              System <span className="text-accent">Capabilities</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/50 text-base max-w-xl mx-auto leading-relaxed"
          >
            Engineering specialized AI solutions and high-performance digital environments
            tailored for international scale and measurable impact.
          </motion.p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  content={service.content}
                  points={service.points}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
