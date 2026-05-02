"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/edu";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Education = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="education" ref={containerRef} className="py-32 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 md:mb-32">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
          >
            Evolutionary Logic
          </motion.h3>
          <h2 className="text-4xl md:text-7xl font-black font-display tracking-tighter leading-none text-foreground uppercase">
            NEURAL <span className="text-gradient">PATH</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Neural Spine */}
          <div className=" absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-foreground/5 md:-ml-[1px]" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent md:-ml-[1px] z-20 shadow-[0_0_15px_rgba(0,242,255,0.5)]" 
          />
          
          <div className="space-y-16 md:space-y-32">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Branching Node */}
                  <div className="absolute left-[21px] md:left-1/2 top-10 md:top-1/2 w-5 h-5 -ml-[10px] md:-mt-[10px] z-30">
                    <div className="absolute inset-0 bg-neon-cyan rounded-full animate-ping opacity-20" />
                    <div className="relative w-full h-full bg-background border-2 border-neon-cyan rounded-full shadow-[0_0_10px_#00f2ff]" />
                  </div>

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-24 text-left md:text-right' : 'md:pl-12 lg:pl-24 text-left'}`}>
                    <div className="group relative">
                      <div className={`hidden md:block absolute top-1/2 ${isEven ? '-right-4' : '-left-4'} w-8 h-[2px] bg-foreground/10 group-hover:bg-neon-cyan/50 transition-colors`} />
                      
                      <div className="glass-card p-6 md:p-10 rounded-2xl md:rounded-[2rem] border-border hover:neon-glow-purple transition-all duration-500 relative overflow-hidden">
                        <div className={`flex items-center gap-4 mb-4 md:mb-6 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="p-3 rounded-xl bg-foreground/5 text-neon-cyan flex-shrink-0">
                                <Icon size={24} />
                            </div>
                            <div className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
                                {edu.period}
                            </div>
                        </div>

                        <div className="space-y-2 md:space-y-4">
                            {edu.link ? (
                                <Link 
                                    href={edu.link} 
                                    target="_blank" 
                                    className={`group/link inline-flex items-center gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-neon-cyan transition-colors text-foreground">
                                        {edu.degree}
                                    </h3>
                                    <ExternalLink size={16} className="text-foreground/20 group-hover/link:text-neon-cyan transition-colors" />
                                </Link>
                            ) : (
                                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-neon-cyan transition-colors text-foreground">
                                    {edu.degree}
                                </h3>
                            )}
                            <p className="text-neon-purple font-mono text-[10px] md:text-xs tracking-widest uppercase italic">
                                {edu.institution}
                            </p>
                        </div>
                        
                        <p className="text-foreground/60 text-sm md:text-base mt-4 md:mt-6 leading-relaxed font-sans">
                            {edu.description}
                        </p>
                        
                        <div className={`flex flex-wrap gap-2 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border ${isEven ? 'md:justify-end' : ''}`}>
                            {edu.achievements.map((achievement, i) => (
                                <Badge
                                    key={i}
                                    className="bg-foreground/5 border-border text-[9px] md:text-[10px] font-mono tracking-tighter uppercase px-3 py-1 text-foreground/50 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                                >
                                    {achievement}
                                </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for layout balance */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background depth detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(188,19,254,0.02),transparent_70%)]" />
    </section>
  );
};

export default Education;
