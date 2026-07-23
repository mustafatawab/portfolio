"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <main className="bg-background min-h-screen pb-28">
      <section className="pt-32 pb-12 text-center">
        <div className="container space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-center">
              Engineering Journal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Technical Articles
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm max-w-xl mx-auto"
          >
            Architecture deep dives, engineering patterns, and production
            insights.
          </motion.p>
        </div>
      </section>

      <section className="container space-y-10">
        <div className="space-y-4">
          <div className="relative w-full md:w-72 lg:w-80 mx-auto md:mx-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
              size={15}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus-ring outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2 pb-1 flex-1"
            >
              <button
                onClick={() => setActiveTag(null)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-[var(--duration-fast)] ease-[var(--ease)] ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-[var(--duration-fast)] ease-[var(--ease)] ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-xs)]"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-wider text-primary">
                Featured
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <FeaturedCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-wider text-muted-foreground">
                All Articles
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-muted-foreground font-mono tracking-wider text-xs">
              No articles match your criteria
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function FeaturedCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <div className="card-hover h-full p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono tracking-wider">
              Featured
            </Badge>
            <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
              {post.category}
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-semibold leading-tight text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-[var(--duration-fast)]">
            {post.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">
            {post.description}
          </p>

          <div className="mt-auto pt-5 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/60 tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar size={12} />{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-muted-foreground transition-all duration-[var(--duration-fast)] group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <div className="card-hover h-full p-6 flex flex-col">
          <div className="mb-3">
            <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
              {post.category}
            </span>
          </div>

          <h3 className="text-base font-semibold leading-tight text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-[var(--duration-fast)]">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[10px] font-mono text-muted-foreground tracking-tight"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/60 tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar size={12} />{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>
            <ArrowUpRight
              size={12}
              className="text-muted-foreground transition-all duration-[var(--duration-fast)] group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
