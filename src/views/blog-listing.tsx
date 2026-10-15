"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, Search, X, BookOpen, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PostMeta } from "@/lib/posts"

interface BlogListingProps {
    posts: PostMeta[]
    tags: string[]
    categories?: string[]
}

export default function BlogListing({
    posts,
    tags,
    categories = [],
}: BlogListingProps) {
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Derived unique categories if not provided
    const allCategories = useMemo(() => {
        if (categories && categories.length > 0) return categories
        const set = new Set(posts.map((p) => p.category))
        return Array.from(set).sort()
    }, [categories, posts])

    // Filter logic combining search, category, and tag
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                search === "" ||
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.description.toLowerCase().includes(search.toLowerCase()) ||
                post.tags.some((t) =>
                    t.toLowerCase().includes(search.toLowerCase())
                )

            const matchesCategory =
                activeCategory === null || post.category === activeCategory

            const matchesTag =
                activeTag === null || post.tags.includes(activeTag)

            return matchesSearch && matchesCategory && matchesTag
        })
    }, [posts, search, activeCategory, activeTag])

    const featuredPosts = filteredPosts.filter((p) => p.featured)
    const regularPosts = filteredPosts.filter((p) => !p.featured)

    const handleResetFilters = () => {
        setSearch("")
        setActiveCategory(null)
        setActiveTag(null)
    }

    const hasActiveFilters = search !== "" || activeCategory !== null || activeTag !== null

    return (
        <main className="bg-background min-h-screen pb-32 text-foreground">
            {/* Header Section */}
            <section className="pt-32 pb-14 border-b border-border/40 bg-gradient-to-b from-card/30 via-background to-background">
                <div className="container max-w-4xl text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4">
                            <BookOpen size={13} />
                            <span>Engineering Journal</span>
                        </div>
                        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight text-balance">
                            Technical insights & systems architecture.
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
                    >
                        Practical architectural blueprints, containerized deployments, modern
                        frontend systems, and production engineering lessons from real products.
                    </motion.p>
                </div>
            </section>

            {/* Filter and Content Controls */}
            <section className="container max-w-6xl mt-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search bar */}
                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search by topic, keyword, or technology..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus-ring outline-none shadow-xs"
                            aria-label="Search articles"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                                aria-label="Clear search"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                                activeCategory === null
                                    ? "bg-primary text-primary-foreground shadow-xs"
                                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                            }`}
                        >
                            All Categories
                        </button>
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() =>
                                    setActiveCategory(activeCategory === cat ? null : cat)
                                }
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                                    activeCategory === cat
                                        ? "bg-primary text-primary-foreground shadow-xs"
                                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tag Pills Filter */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70">
                        <Filter size={12} />
                        <span>Filter by tag:</span>
                        {activeTag && (
                            <button
                                onClick={() => setActiveTag(null)}
                                className="text-primary hover:underline flex items-center gap-1 cursor-pointer ml-2"
                            >
                                <span>Clear tag filter ({activeTag})</span>
                                <X size={11} />
                            </button>
                        )}
                    </div>
                    <div
                        ref={scrollRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-2 px-2"
                    >
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() =>
                                    setActiveTag(activeTag === tag ? null : tag)
                                }
                                className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                                    activeTag === tag
                                        ? "bg-primary/20 text-primary border border-primary/40 font-semibold"
                                        : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Article Counter */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-3 pt-2">
                    <span>
                        Showing {filteredPosts.length} of {posts.length} articles
                    </span>
                    {hasActiveFilters && (
                        <button
                            onClick={handleResetFilters}
                            className="text-primary hover:underline cursor-pointer flex items-center gap-1 text-xs font-mono"
                        >
                            <span>Reset all filters</span>
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* Featured Posts Section */}
                {featuredPosts.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Featured Analyses
                            </span>
                            <div className="h-px flex-1 bg-border/60" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {featuredPosts.map((post, index) => (
                                <FeaturedCard
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                    <div className="space-y-4">
                        {featuredPosts.length > 0 && (
                            <div className="flex items-center gap-3 pt-6">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    All Technical Articles
                                </span>
                                <div className="h-px flex-1 bg-border/60" />
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularPosts.map((post, index) => (
                                <ArticleCard
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-24 glass-card rounded-2xl border border-border/70 p-8 space-y-4">
                        <p className="text-foreground font-semibold text-base">
                            No articles match your current criteria
                        </p>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Try adjusting your search terms, clearing selected tags, or browsing all
                            categories.
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </section>
        </main>
    )
}

function FeaturedCard({ post, index }: { post: PostMeta; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <div className="glass-card h-full p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden">
                    {/* Ambient subtle glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[11px] font-medium">
                                Featured
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                                {post.category}
                            </span>
                        </div>
                        <ArrowUpRight
                            size={16}
                            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                    </div>

                    <h2 className="font-heading font-bold text-xl sm:text-2xl leading-snug text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {post.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-border/50 text-[11px] font-mono text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            <span>{post.readTime}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

function ArticleCard({ post, index }: { post: PostMeta; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <div className="glass-card h-full p-6 rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-medium text-primary">
                            {post.category}
                        </span>
                        <ArrowUpRight
                            size={14}
                            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                    </div>

                    <h3 className="font-heading font-semibold text-base sm:text-lg leading-snug text-foreground tracking-tight mb-2.5 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-border/50 text-[10px] font-mono text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
