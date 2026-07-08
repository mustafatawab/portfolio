"use client";
import React, { useState } from "react";
import { services } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Rocket, Zap, Server, Code, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "bot": return <Bot size={24} />;
    case "rocket": return <Rocket size={24} />;
    case "zap": return <Zap size={24} />;
    case "server": return <Server size={24} />;
    case "code": return <Code size={24} />;
    case "cpu": return <Cpu size={24} />;
    default: return <Code size={24} />;
  }
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/2 blur-[100px] rounded-full" />
      </div>

      <div className="container relative">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-display text-foreground tracking-tight">
            Service <span className="text-accent">Protocols</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 space-y-2">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
                role="button"
                aria-label={`View ${service.title} details`}
                className={`relative p-5 cursor-pointer rounded-xl transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-foreground/[0.03] border border-foreground/10 shadow-[var(--shadow-sm)]'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium transition-colors duration-300 ${
                    activeIndex === index ? 'text-accent' : 'text-foreground'
                  }`}>
                    {service.title}
                  </h3>
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                    activeIndex === index
                      ? 'translate-x-0 opacity-100 text-accent'
                      : '-translate-x-2 opacity-0 text-foreground'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="card-hover p-8"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {getIcon(services[activeIndex].icon)}
                    </div>
                    <h4 className="text-2xl font-semibold text-foreground">{services[activeIndex].title}</h4>
                  </div>

                  <p className="text-foreground/60 leading-relaxed">
                    {services[activeIndex].content}
                  </p>

                  <div className="space-y-4">
                    <div className="text-xs font-mono text-foreground/30 tracking-wider uppercase">Key capabilities</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services[activeIndex].points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={15} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/60">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
