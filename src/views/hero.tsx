"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, DownloadIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen w-full relative flex items-center justify-center overflow-hidden py-20 bg-background transition-colors duration-500">
      
      {/* Background with cinematic depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
        <Image 
          src="/bg.webp" 
          fill
          priority
          alt="" 
          className="object-cover scale-110 animate-pulse-slow dark:opacity-40 opacity-10"
        />
        {/* Neural blur orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
      </div>

      <div className="container relative z-20">
        <div className="flex flex-col justify-center items-center text-center gap-8 max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              Ready for high-impact collaboration
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black font-display tracking-tighter leading-tight text-foreground">
              ADVANCED <span className="text-gradient">SYSTEMS</span><br />
              ARCHITECT
            </h1>
            <div className="text-xl md:text-3xl font-mono text-foreground/80 h-12">
              <TypeAnimation
                sequence={[
                  "Senior Full Stack Engineer",
                  2000,
                  "Frontend Specialist (React/Vue)",
                  2000,
                  "Backend Architect (Node/FastAPI)",
                  2000,
                  "AI-Driven Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed font-sans"
          >
            Engineering production-grade digital ecosystems and high-performance full-stack 
            architectures with a focus on scalability, reliability, and modern AI integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="group relative px-10 py-4 bg-neon-cyan text-background font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] active:scale-95 flex items-center justify-center gap-2"
            >
              EXPLORE SYSTEMS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              target="_blank"
              href="https://docs.google.com/document/d/1hFqLu_I3RAWGwAgBD5rlCzXeCb2znjKzLJGglznKfaU/edit?usp=sharing"
              className="px-10 py-4 border border-border hover:border-foreground/30 bg-foreground/5 backdrop-blur-md text-foreground font-bold rounded-full transition-all duration-300 hover:bg-foreground/10 hover:scale-[1.03] flex items-center justify-center gap-2 group"
            >
              INTEL BRIEF <DownloadIcon size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-mono">Decipher Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
