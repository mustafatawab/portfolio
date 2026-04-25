"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import me from "@/assets/mustafa.png";

const stats = [
  { label: "Neural Projects", value: "20+", suffix: "" },
  { label: "Industry Cycles", value: "3+", suffix: "Years" },
  { label: "Global Nodes", value: "25+", suffix: "Clients" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group w-full lg:w-1/3 aspect-[4/5]"
          >
            <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            <div className="absolute inset-0 bg-neon-cyan/20 rounded-2xl mix-blend-overlay z-10" />
            <Image
              src={me}
              fill
              alt="Mustafa Tawab"
              className="rounded-2xl object-cover transition-all duration-700"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-neon-purple rounded-br-2xl" />
          </motion.div>

          <div className="flex-1 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase">Core Identity</h3>
              <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
                MERGING <span className="text-gradient">INTELLIGENCE</span><br />
                WITH ARCHITECTURE
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                I'm a dedicated <span className="text-white font-semibold italic text-mono">Senior Full Stack Engineer</span> with over 
                3 years of industrial experience building production-ready applications. 
                My expertise lies in architecting scalable systems using 
                <span className="text-white font-semibold italic text-mono"> Vue.js, Next.js, and FastAPI</span>. 
                I combine traditional software excellence with a specialization in AI-driven 
                development tools and context engineering.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl group hover:neon-glow-cyan transition-all duration-500"
                >
                  <div className="text-4xl font-bold text-white mb-2 font-display">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-neon-cyan transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/40 italic font-mono text-sm border-l-2 border-neon-purple pl-6 py-2"
            >
              "My mission is to help businesses integrate AI into real-world products — 
              from internal automation tools to production-ready AI dashboards."
            </motion.p>
          </div>
        </div>
      </div>

      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent -z-10" />
    </section>
  );
};

export default AboutSection;
