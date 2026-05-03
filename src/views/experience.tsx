"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/experience";

const Experience = () => {
  return (
    <section id="experience" className="py-32 mt-10 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-2 mb-10 lg:mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
          >
            Temporal Log
          </motion.h3>
          <h2 className="text-4xl md:text-7xl font-black font-display leading-tight text-foreground uppercase tracking-tight">
            CAREER <span className="text-gradient">TRAJECTORY</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Neon Timeline Path */}
          <div className=" absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent opacity-20" />
          
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Glowing Node */}
                <div className="absolute left-[20px] md:left-1/2 top-0 w-4 h-4 -ml-2 z-20">
                  <div className="absolute inset-0 bg-neon-cyan rounded-full animate-ping opacity-50" />
                  <div className="relative w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,242,255,1)]" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'pl-10 md:pl-0   lg:pr-16 text-left md:text-right' : 'pl-10 md:pl-0  lg:pl-16 text-left'}`}>
                  <div className="glass-card p-8 rounded-2xl hover:neon-glow-purple transition-all duration-500 group border-border">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} w-full`}>
                        <span className="text-xs font-mono text-neon-cyan mb-2 tracking-widest">{exp.period}</span>
                        <h3 className="text-2xl font-bold group-hover:text-neon-cyan transition-colors text-foreground">{exp.title}</h3>
                        <p className="text-foreground/60 font-mono text-sm uppercase tracking-tight font-semibold">{exp.company}</p>
                        <p className="text-foreground/60 font-mono text-sm capitalize italic">{exp.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-foreground/50 leading-relaxed mb-8 text-sm md:text-base font-sans">
                      {exp.description}
                    </p>
                    
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      {exp.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          className="bg-foreground/5 border-border text-[10px] font-mono tracking-tighter uppercase px-3 py-1 text-foreground/40 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Empty Space for alignment */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background depth elements */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-neon-cyan/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-neon-purple/5 blur-[150px] rounded-full" />
    </section>
  );
};

export default Experience;
