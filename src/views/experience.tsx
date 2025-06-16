"use client";
import React from "react";
import ExpericeCard from "@/components/ExperienceCard";
import { experiences } from "@/lib/experience";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 container  mx-auto">
        <main className="">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold px-5 text-center">Experience</h2>
            <div className="mx-auto md:2/3 xl:w-1/2 space-y-5">
              {experiences.map((experience, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full"
                  key={index}
                >
                  <ExpericeCard experience={experience} />
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Experience;
