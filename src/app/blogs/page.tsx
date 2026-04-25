"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFULL_SPACE_ID}/entries?access_token=${process.env.CONTENTFULL_API_KEY}&content_type=portfolio`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any>(null);

  useEffect(() => {
    getBlogs().then(setBlogs).catch(console.error);
  }, []);

  if (!blogs) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-neon-cyan font-mono animate-pulse">SYNCHRONIZING FEED...</div>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen pb-32">
      {/* Cinematic Header */}
      <section className="relative pt-48 pb-20 flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="fixed inset-0 -z-10 opacity-20">
          <Image src="/bg.webp" fill alt="" className="object-cover scale-110 animate-pulse-slow" />
        </div>
        
        <div className="container text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase mb-4">Knowledge Repository</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight">
              INTELLIGENCE <span className="text-gradient">FEED</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm md:text-base font-mono max-w-xl mx-auto uppercase tracking-widest leading-relaxed"
          >
            A high-integrity log of technical explorations, architectural breakthroughs, and AI research.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.items.map((blog: any, index: number) => {
            const imageAsset = blogs.includes.Asset.find(
              (asset: any) => blog.fields.image.sys.id === asset.sys.id
            );
            const imageUrl = imageAsset
              ? "https:" + imageAsset.fields.file.url
              : null;

            return (
              <motion.div
                key={blog.sys.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blogs/${blog.fields.slug}`} className="group block h-full">
                  <div className="glass-card h-full rounded-[2rem] overflow-hidden border-white/5 hover:neon-glow-cyan transition-all duration-500 flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={blog.fields.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-black/50 backdrop-blur-md border-white/10 text-[9px] font-mono tracking-widest text-neon-cyan">
                          SEGMENT 0{index + 1}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 space-y-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.sys.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> 5 MIN READ</span>
                        </div>
                        <h2 className="text-2xl font-bold leading-tight group-hover:text-neon-cyan transition-colors">
                          {blog.fields.title}
                        </h2>
                        <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                          {blog.fields.description || "Dive deep into the architectural nuances and technical implementation of modern full-stack systems."}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-widest text-neon-purple uppercase">Read Protocol</span>
                        <ArrowRight size={18} className="text-neon-cyan transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Decoration */}
      <div className="container py-32 flex justify-center">
         <div className="w-[1px] h-32 bg-gradient-to-b from-neon-purple to-transparent opacity-20" />
      </div>
    </main>
  );
}
