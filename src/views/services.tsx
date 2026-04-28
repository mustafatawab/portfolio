"use client";
import React, { useState } from "react";
import { services } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Rocket, Zap, Server, Code, Cpu, 
  CheckCircle2, ArrowRight
} from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "bot": return <Bot size={40} />;
    case "rocket": return <Rocket size={40} />;
    case "zap": return <Zap size={40} />;
    case "server": return <Server size={40} />;
    case "code": return <Code size={40} />;
    case "cpu": return <Cpu size={40} />;
    default: return <Code size={40} />;
  }
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="pt-32 pb-16 bg-background relative min-h-[800px] flex items-center transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-24 lg:hidden">
          <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase">Specializations</h3>
          <h2 className="text-4xl md:text-7xl font-black font-display leading-tight text-foreground uppercase tracking-tight">SERVICE <span className="text-gradient">PROTOCOLS</span></h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left: Command List */}
          <div className="w-full lg:w-1/2 space-y-2">
            <div className="hidden lg:block space-y-4 mb-16">
              <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase">Specializations</h3>
              <h2 className="text-4xl md:text-7xl font-black font-display leading-tight text-foreground uppercase tracking-tight">SERVICE <span className="text-gradient">PROTOCOLS</span></h2>
            </div>
            
            {services.map((service, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative p-8 cursor-pointer rounded-2xl transition-all duration-500 group ${
                  activeIndex === index ? 'bg-foreground/5 border border-border' : 'opacity-40 hover:opacity-100'
                }`}
              >
                {activeIndex === index && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-neon-cyan rounded-full shadow-[0_0_15px_#00f2ff]"
                  />
                )}
                <div className="flex justify-between items-center">
                  <h3 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                    activeIndex === index ? 'text-neon-cyan' : 'text-foreground'
                  }`}>
                    {service.title}
                  </h3>
                  <ArrowRight className={`text-foreground transition-transform duration-300 ${
                    activeIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Data Readout */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-12 rounded-[2rem] border-border relative overflow-hidden group"
              >
                {/* Tech scanline effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/20 animate-scanline" />
                
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shadow-[0_0_30px_rgba(0,242,255,0.1)]">
                      {getIcon(services[activeIndex].icon)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neon-purple tracking-[0.3em] uppercase mb-1">Status: Operational</div>
                      <h4 className="text-3xl font-bold text-foreground uppercase tracking-tight">System Overview</h4>
                    </div>
                  </div>

                  <p className="text-foreground/60 text-lg leading-relaxed font-mono italic">
                    "{services[activeIndex].content}"
                  </p>

                  <div className="space-y-6">
                    <div className="text-xs font-mono text-foreground/20 uppercase tracking-[0.2em]">Deployment Specs</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services[activeIndex].points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <CheckCircle2 size={16} className="text-neon-cyan mt-1 flex-shrink-0" />
                          <span className="text-sm text-foreground/50 group-hover/item:text-foreground transition-colors">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-border flex justify-between items-center text-[10px] font-mono text-foreground/20 tracking-widest">
                    <span>ARCH_REF: 00{activeIndex + 1}</span>
                    <span>PROTO_TYPE: ALPHA</span>
                  </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-purple/5 rounded-full blur-[80px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
