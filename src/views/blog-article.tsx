"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
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
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.querySelector(`[data-heading-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-border">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <section className="pt-28 pb-10">
        <div className="container max-w-3xl">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)] mb-8"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to articles
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono tracking-wider">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 font-mono tracking-wider">
                <Calendar size={12} />{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 font-mono tracking-wider">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/5 border border-border text-[10px] font-mono text-muted-foreground tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container max-w-6xl">
          <div className="flex gap-12">
            {/* TOC */}
            <aside className="hidden lg:block w-48 flex-shrink-0">
              <div className="sticky top-28">
                <h3 className="text-[10px] font-mono tracking-wider text-muted-foreground mb-5">
                  Contents
                </h3>
                <nav className="space-y-1" aria-label="Table of contents">
                  {post.headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`block w-full text-left py-1.5 px-3 rounded-md text-xs transition-all duration-[var(--duration-fast)] border-l-2 ${
                        activeHeading === heading.id
                          ? "text-primary border-primary bg-primary-light font-medium"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/20"
                      }`}
                      style={{
                        paddingLeft: `${(heading.level - 2) * 12 + 12}px`,
                      }}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article className="flex-1 max-w-3xl">
              <div ref={contentRef} className="card p-6 md:p-10 lg:p-12">
                <div
                  className="prose prose-invert max-w-none text-foreground/80 leading-relaxed text-base
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                    prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-2
                    prose-p:text-foreground/80 prose-p:mb-5
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-pre:overflow-x-auto prose-pre:p-0 prose-pre:bg-transparent prose-pre:my-6
                    prose-code:text-primary prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-ul:list-disc prose-ol:list-decimal prose-li:text-foreground/80
                    prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-5 prose-blockquote:text-muted-foreground prose-blockquote:italic
                    prose-table:block prose-table:overflow-x-auto prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-border prose-th:p-3 prose-th:text-left prose-th:text-foreground prose-th:whitespace-nowrap
                    prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-foreground/80 prose-td:whitespace-nowrap
                    prose-hr:border-border"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

                <div className="mt-10 pt-8 border-t border-border flex justify-between items-center">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-[var(--duration-fast)]"
                    aria-label="Share this article"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
