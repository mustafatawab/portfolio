"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const certificationFiles = [
  {
    title: "Agentic AI Mastery",
    fileUrl: new URL("../assets/Mustafa_Tawab_agentic_ai.pdf", import.meta.url).href,
  },
  {
    title: "Prompt Engineering Excellence",
    fileUrl: new URL("../assets/Mustafa_Tawab_prompt-eng.pdf", import.meta.url).href,
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-2 mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-cyan uppercase"
          >
            Credential Vault
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black font-display tracking-tight leading-tight text-foreground uppercase"
          >
            CERTIFICATIONS <span className="text-gradient">SHOWCASE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-3xl text-foreground/70 text-base md:text-lg leading-relaxed"
          >
            Browse the exact PDF documents directly in the page. Swipe or use the controls to move between certificates.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Carousel className="relative overflow-visible">
            <CarouselContent className="gap-6">
              {certificationFiles.map((cert) => (
                <CarouselItem key={cert.title} className="min-w-full">
                  <div className="rounded-[2rem] overflow-hidden border border-border bg-[#0b0d12] shadow-lg">
                    <iframe
                      src={cert.fileUrl}
                      className="h-[80vh] w-full"
                      title={cert.title}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-6 md:-left-10" />
            <CarouselNext className="-right-6 md:-right-10" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
