"use client";
import React from "react";
import { services } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";
const Services = () => {
  return (
    <section id="services" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 container  mx-auto">
        <h2 className="text-4xl font-bold text-center py-5">What I offer</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-5 py-5">
            {services.map((service, i) => {
              if (i < 3) {
                return (
                  <ServiceCard
                    key={i}
                    icon={service.icon}
                    title={service.title}
                    content={service.content}
                    points={service.points}
                  />
                );
              }
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
