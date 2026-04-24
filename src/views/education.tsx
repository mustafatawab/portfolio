"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/edu";

const Education = () => {
  return (
    <section id="education" className="py-32 relative bg-black overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
          >
            Academic Nodes
          </motion.h3>
          <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
            KNOWLEDGE <span className="text-gradient">BASE</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => {
            const Icon = edu.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl group hover:neon-glow-cyan transition-all duration-500 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors" />
                
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 rounded-2xl bg-white/5 text-neon-cyan group-hover:scale-110 group-hover:bg-neon-cyan/10 transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-[10px] font-mono tracking-widest text-neon-purple uppercase">
                      {edu.period}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-neon-cyan transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-white/60 font-mono text-sm tracking-tight italic">
                      {edu.institution}
                    </p>
                  </div>
                </div>
                
                <p className="text-white/40 text-sm mb-8 leading-relaxed font-sans">
                  {edu.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {edu.achievements.map((achievement, i) => (
                    <Badge
                      key={i}
                      className="bg-white/5 border-white/10 text-[10px] font-mono tracking-tighter uppercase px-3 py-1 text-white/40 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                    >
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background depth detail */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-neon-cyan/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-neon-purple/5 blur-[150px] rounded-full" />
    </section>
  );
};

export default Education;
