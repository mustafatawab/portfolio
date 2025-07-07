"use client";
import React from "react";
import ExpericeCard from "@/components/ExperienceCard";
import EduCard from "@/components/EduCard";
import { experiences } from "@/lib/experience";
import { education } from "@/lib/edu";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 container  mx-auto">
        <main className="flex flex-col justify-center lg:flex-row   lg:justify-between  items-center gap-5">
          <div className="space-y-2 mx-auto lg:mx-0 max-w-4/5">
            <h2 className="text-4xl font-bold px-5 text-center">
              Industry Experience
            </h2>
            <div className=" space-y-5">
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

          <div className="space-y-2 mx-auto lg:mx-0 max-w-4/5">
            <h2 className="text-4xl font-bold px-5 text-center">Education</h2>
            <div className=" space-y-5">
              {education.map((edu, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full"
                  key={index}
                >
                  <EduCard edu={edu} />
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
