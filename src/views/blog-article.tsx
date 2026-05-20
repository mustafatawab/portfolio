"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  featured: boolean;
  contentHtml: string;
  headings: { level: number; text: string; id: string }[];
}

export default function BlogArticle({ post }: { post: Post }) {
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress((scrollPosition / totalHeight) * 100);

      const headingElements = document.querySelectorAll("[data-heading-id]");
      let current = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          current = el.getAttribute("data-heading-id") || "";
        }
      });
      setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.querySelector(`[data-heading-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-background min-h-screen transition-colors duration-500">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-foreground/5">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero Header */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="container relative z-10 text-foreground">
          <div className="mb-12">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-foreground/40 hover:text-neon-cyan transition-colors font-mono text-[10px] tracking-widest uppercase"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Return to Feed
            </Link>
          </div>

          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em]">
                <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 text-[9px] font-mono tracking-widest uppercase">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />{" "}
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter leading-tight uppercase">
                {post.title}
              </h1>

              <p className="text-foreground/50 text-lg md:text-xl leading-relaxed max-w-3xl">{post.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-foreground/5 text-[10px] font-mono text-foreground/40 uppercase tracking-wider border border-border"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content + TOC Layout */}
      <section className="container pb-32">
        <div className="flex gap-16 max-w-7xl mx-auto">
          {/* Table of Contents - Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 uppercase mb-6">Contents</h3>
              <nav className="space-y-1">
                {post.headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-xs transition-all border-l-2 ${
                      activeHeading === heading.id
                        ? "text-neon-cyan border-neon-cyan bg-neon-cyan/5"
                        : "text-foreground/40 border-transparent hover:text-foreground/70 hover:border-foreground/20"
                    }`}
                    style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1 max-w-3xl">
            <div
              ref={contentRef}
              className="glass-card p-8 md:p-12 lg:p-16 rounded-[2.5rem] border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan animate-scanline" />

              <div
                className="article-content prose prose-invert max-w-none font-sans text-foreground/70 leading-relaxed text-lg
                  prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-foreground
                  prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-neon-cyan
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
                  prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-3
                  prose-p:text-foreground/70 prose-p:mb-6
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline
                  prose-pre:p-0 prose-pre:bg-transparent prose-pre:my-8
                  prose-code:text-neon-cyan prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-ul:list-disc prose-ol:list-decimal prose-li:text-foreground/70
                  prose-blockquote:border-l-neon-cyan prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:text-foreground/50 prose-blockquote:italic
                  prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-border prose-th:p-3 prose-th:text-left prose-th:text-foreground
                  prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-foreground/70
                  prose-hr:border-border"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              <div className="mt-16 pt-12 border-t border-border flex justify-between items-center">
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/40 hover:text-neon-cyan hover:bg-foreground/10 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
                <div className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">
                  End of Brief // {post.slug}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="container py-16 flex justify-center">
        <div className="w-[1px] h-32 bg-gradient-to-b from-neon-purple to-transparent opacity-20" />
      </div>
    </main>
  );
}
