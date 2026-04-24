"use client";
import React from "react";
import { services } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <section id="services" className="py-32 bg-black relative">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase"
          >
            Specializations
          </motion.h3>
          <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
            SERVICE <span className="text-gradient">PROTOCOLS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, i) => (
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
      
      {/* Background visual detail */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_20%_80%,rgba(0,242,255,0.03),transparent_40%)]" />
    </section>
  );
};

export default Services;
