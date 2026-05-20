"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  featured: boolean;
}

interface BlogListingProps {
  posts: PostMeta[];
  tags: string[];
}

export default function BlogListing({ posts, tags }: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesTag = activeTag === null || post.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <main className="bg-background min-h-screen pb-32 transition-colors duration-500">
      <section className="relative pt-48 pb-20 flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="fixed inset-0 -z-10 dark:opacity-20 opacity-5">
          <Image src="/bg.webp" fill alt="" className="object-cover scale-110 animate-pulse-slow" />
        </div>

        <div className="container text-center space-y-8 text-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase mb-4">Knowledge Base</h3>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight uppercase">
              TECHNICAL <span className="text-gradient">BRIEFS</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/40 text-sm md:text-base font-mono max-w-xl mx-auto uppercase tracking-widest leading-relaxed"
          >
            Architectural deep dives, performance patterns, and production-grade engineering insights.
          </motion.p>
        </div>
      </section>

      <section className="container relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                activeTag === null
                  ? "bg-neon-cyan text-background"
                  : "bg-card border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                  activeTag === tag
                    ? "bg-neon-cyan text-background"
                    : "bg-card border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-sm font-mono tracking-[0.3em] text-neon-cyan uppercase">Featured</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <FeaturedCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-sm font-mono tracking-[0.3em] text-foreground/30 uppercase">Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-foreground/30 font-mono tracking-widest uppercase">No articles match your criteria</p>
          </div>
        )}
      </section>

      <div className="container py-32 flex justify-center">
        <div className="w-[1px] h-32 bg-gradient-to-b from-neon-purple to-transparent opacity-20" />
      </div>
    </main>
  );
}

function FeaturedCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <div className="glass-card h-full rounded-[2rem] overflow-hidden border-border hover:neon-glow-cyan transition-all duration-500 flex flex-col p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 text-[9px] font-mono tracking-widest uppercase">
              Featured
            </Badge>
            <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">{post.category}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-neon-cyan transition-colors text-foreground uppercase tracking-tight mb-4">
            {post.title}
          </h2>

          <p className="text-foreground/50 text-sm leading-relaxed line-clamp-2 mb-6">{post.description}</p>

          <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-4 text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>
            <ArrowRight size={18} className="text-neon-cyan transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <div className="glass-card h-full rounded-[2rem] overflow-hidden border-border hover:neon-glow-cyan transition-all duration-500 flex flex-col p-8">
          <div className="flex items-center gap-2 mb-6">
            <Hash size={12} className="text-neon-purple" />
            <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">{post.category}</span>
          </div>

          <h3 className="text-xl font-bold leading-tight group-hover:text-neon-cyan transition-colors text-foreground uppercase tracking-tight mb-4">
            {post.title}
          </h3>

          <p className="text-foreground/50 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{post.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-foreground/5 text-[9px] font-mono text-foreground/40 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-4 text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>
            <ArrowRight size={18} className="text-neon-cyan transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
