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
    <section id="hero" className="min-h-screen w-full relative flex items-center justify-center overflow-hidden py-20">
      
      {/* Background with cinematic depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
        <Image 
          src="/bg.webp" 
          fill
          priority
          alt="" 
          className="object-cover opacity-40 scale-110 animate-pulse-slow"
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-display tracking-tighter leading-tight">
              NEURAL <span className="text-gradient">SYSTEMS</span><br />
              ARCHITECT
            </h1>
            <div className="text-xl md:text-3xl font-mono text-white/80 h-12">
              <TypeAnimation
                sequence={[
                  "Agentic AI Engineer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "Automation Specialist",
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
            className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Engineering autonomous AI ecosystems and sophisticated digital architectures 
            that redefine how businesses operate through intelligent automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-neon-cyan text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              EXPLORE SYSTEMS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              target="_blank"
              href="https://docs.google.com/document/d/1hFqLu_I3RAWGwAgBD5rlCzXeCb2znjKzLJGglznKfaU/edit?usp=sharing"
              className="px-8 py-4 border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md text-white font-bold rounded-full transition-all hover:bg-white/10 flex items-center justify-center gap-2 group"
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
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">Decipher Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
