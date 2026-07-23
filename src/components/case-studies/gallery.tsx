"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePrev = () => {
    setSelected((s) =>
      s !== null ? (s - 1 + images.length) % images.length : null,
    );
  };

  const handleNext = () => {
    setSelected((s) => (s !== null ? (s + 1) % images.length : null));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted group focus-visible:outline-2 focus-visible:outline-ring/60 focus-visible:outline-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-xs text-foreground/80">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 p-2 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 p-2 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected].src}
                alt={images[selected].alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
