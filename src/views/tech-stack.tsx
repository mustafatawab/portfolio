"use client";
import React from "react";
import { motion } from "framer-motion";

const TechStack = () => {
  const technologies = [
    { name: "OpenAI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  return (
    <section id="tech-stack" className="py-32 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="container relative z-10 text-foreground">
        <div className="text-center space-y-4 mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
          >
            Core Infrastructure
          </motion.h3>
          <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight uppercase tracking-tight">
            TECHNICAL <span className="text-gradient">NETWORK</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col items-center justify-center gap-4 group hover:neon-glow-cyan transition-all duration-500 rounded-3xl"
            >
              <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/30 group-hover:text-neon-cyan transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background depth detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(188,19,254,0.02),transparent_70%)]" />
    </section>
  );
};

export default TechStack;
