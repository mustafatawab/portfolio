"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const certificationFiles = [
    {
        title: "Agentic AI Mastery",
        fileUrl: new URL(
            "../assets/Mustafa_Tawab_agentic_ai.pdf",
            import.meta.url
        ).href,
    },
    {
        title: "Prompt Engineering Excellence",
        fileUrl: new URL(
            "../assets/Mustafa_Tawab_prompt-eng.pdf",
            import.meta.url
        ).href,
    },
]

const Certifications = () => {
    return (
        <section id="certifications" className="py-32 bg-background">
            <div className="container">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold font-display text-foreground tracking-tight">
                        <span className="text-accent">Certifications</span>
                    </h2>
                    <p className="text-foreground/60 text-base max-w-2xl mx-auto">
                        Browse my professional certifications directly in the
                        page.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Carousel className="relative overflow-visible">
                        <CarouselContent className="gap-6">
                            {certificationFiles.map((cert) => (
                                <CarouselItem
                                    key={cert.title}
                                    className="min-w-full"
                                >
                                    <div className="card-base overflow-hidden">
                                        <iframe
                                            src={cert.fileUrl}
                                            className="h-[60vh] md:h-[80vh] w-full"
                                            title={cert.title}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-2 md:-left-10" />
                        <CarouselNext className="right-2 md:-right-10" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    )
}

export default Certifications
