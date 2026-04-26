"use client";
import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import { motion } from "framer-motion";
import Image from "next/image";

const ServicesPage = () => {
  return (
    <main className="bg-background min-h-screen transition-colors duration-500">
      {/* Hero Header Section */}
      <section className="relative pt-48 pb-32 flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
          <Image
            src="/bg.webp"
            fill
            priority
            alt=""
            className="object-cover scale-105 animate-pulse-slow dark:opacity-30 opacity-10"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-20 text-center space-y-8 text-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase mb-4">Service Protocols</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight uppercase">
              SYSTEM <span className="text-gradient">CAPABILITIES</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Engineering specialized AI solutions and high-performance digital environments 
            tailored for international scale and measurable impact.
          </motion.p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
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

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_20%_80%,rgba(0,242,255,0.03),transparent_40%)] -z-10" />
      </section>
    </main>
  );
};

export default ServicesPage;
