"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useSpring } from "framer-motion"
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Clock,
    Share2,
    Check,
    List,
    ChevronDown,
    Github,
    Linkedin,
    Tag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/posts"

export default function BlogArticle({ post }: { post: Post }) {
    const [activeHeading, setActiveHeading] = useState("")
    const [copiedLink, setCopiedLink] = useState(false)
    const [mobileTocOpen, setMobileTocOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    // Accessible, high-performance scroll progress
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const [progressPercent, setProgressPercent] = useState(0)

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setProgressPercent(Math.round(latest * 100))
        })
    }, [scrollYProgress])

    // Scrollspy for TOC
    useEffect(() => {
        const handleScroll = () => {
            const headingElements =
                document.querySelectorAll<HTMLElement>("[data-heading-id]")
            let current = ""
            headingElements.forEach((el) => {
                const rect = el.getBoundingClientRect()
                if (rect.top <= 140) {
                    current = el.getAttribute("data-heading-id") || ""
                }
            })
            if (current) {
                setActiveHeading(current)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Event delegation for code copy buttons
    useEffect(() => {
        const contentEl = contentRef.current
        if (!contentEl) return

        const copyTextToClipboard = async (text: string) => {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text)
                    return true
                }
            } catch {
                // fall through to fallback
            }
            try {
                const textarea = document.createElement("textarea")
                textarea.value = text
                textarea.style.position = "fixed"
                textarea.style.left = "-9999px"
                textarea.style.top = "0"
                textarea.setAttribute("readonly", "")
                document.body.appendChild(textarea)
                textarea.select()
                const success = document.execCommand("copy")
                document.body.removeChild(textarea)
                return success
            } catch {
                return false
            }
        }

        const handleCopyClick = async (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const button = target.closest(
                ".copy-code-btn"
            ) as HTMLButtonElement | null
            if (!button) return

            const wrapper = button.closest("[data-code-block]")
            if (!wrapper) return

            const codeEl = wrapper.querySelector("pre code")
            if (!codeEl) return

            const text = codeEl.textContent || ""
            const copied = await copyTextToClipboard(text)
            if (copied) {
                const label = button.querySelector(".copy-label")

                if (label) label.textContent = "Copied!"
                button.classList.add(
                    "text-primary",
                    "border-primary/40",
                    "bg-primary/10"
                )

                setTimeout(() => {
                    if (label) label.textContent = "Copy"
                    button.classList.remove(
                        "text-primary",
                        "border-primary/40",
                        "bg-primary/10"
                    )
                }, 2000)
            }
        }

        contentEl.addEventListener("click", handleCopyClick)
        return () => contentEl.removeEventListener("click", handleCopyClick)
    }, [])

    const scrollToHeading = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            setMobileTocOpen(false)
        }
    }

    const handleShare = async () => {
        if (typeof window === "undefined") return

        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href,
                })
                return
            } catch {
                // user cancelled or share failed, continue to clipboard
            }
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(window.location.href)
                setCopiedLink(true)
                setTimeout(() => setCopiedLink(false), 2000)
                return
            }
        } catch {
            // fallback below
        }

        try {
            const textarea = document.createElement("textarea")
            textarea.value = window.location.href
            textarea.style.position = "fixed"
            textarea.style.left = "-9999px"
            textarea.style.top = "0"
            textarea.setAttribute("readonly", "")
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand("copy")
            document.body.removeChild(textarea)
            setCopiedLink(true)
            setTimeout(() => setCopiedLink(false), 2000)
        } catch {
            // ignore
        }
    }

    return (
        <main className="bg-background min-h-screen text-foreground">
            {/* Top Reading Progress Bar (Accessible) */}
            <div
                className="fixed top-0 left-0 w-full h-[3px] z-[var(--z-overlay)] bg-border/40 pointer-events-none"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Article reading progress"
            >
                <motion.div
                    className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(0,214,160,0.5)]"
                    style={{ scaleX }}
                />
            </div>

            {/* Article Header & Metadata */}
            <header className="pt-28 pb-12 border-b border-border/40 bg-gradient-to-b from-card/30 via-background to-background">
                <div className="container max-w-4xl">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
                        <Link
                            href="/blogs"
                            className="group inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                            <ArrowLeft
                                size={13}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            <span>Articles</span>
                        </Link>
                        <span>/</span>
                        <span className="text-primary">{post.category}</span>
                    </div>

                    <div className="space-y-6">
                        {/* Eyebrow & Badges */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-medium px-3 py-0.5 rounded-full">
                                {post.category}
                            </Badge>
                            {post.featured && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/20 text-primary border border-primary/30">
                                    Featured Analysis
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar
                                    size={13}
                                    className="text-muted-foreground/80"
                                />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </time>
                            </span>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock
                                    size={13}
                                    className="text-muted-foreground/80"
                                />
                                <span>{post.readTime}</span>
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-[1.15] text-balance">
                            {post.title}
                        </h1>

                        {/* Excerpt / Lead */}
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            {post.description}
                        </p>

                        {/* Author info pill */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/40 gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/30 bg-card">
                                    <Image
                                        src={
                                            post.author.avatar ||
                                            "/assets/mustafa-portrait-green.jpg"
                                        }
                                        alt={post.author.name}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-foreground">
                                        {post.author.name}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">
                                        {post.author.role ||
                                            "Software Engineer & Product Builder"}
                                    </p>
                                </div>
                            </div>

                            {/* Share button */}
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground bg-card border border-border hover:border-primary/40 transition-colors shadow-xs"
                                aria-label="Share article link"
                            >
                                {copiedLink ? (
                                    <>
                                        <Check
                                            size={13}
                                            className="text-primary"
                                        />
                                        <span className="text-primary">
                                            Link Copied!
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 size={13} />
                                        <span>Share Article</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Reading Experience Layout */}
            <section className="py-12 sm:py-16">
                <div className="container max-w-6xl">
                    {/* Mobile Table of Contents Accordion */}
                    {post.headings.length > 2 && (
                        <div className="lg:hidden mb-10 glass-card p-4 rounded-xl border border-border shadow-xs">
                            <button
                                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                                className="flex items-center justify-between w-full text-xs font-semibold text-foreground"
                                aria-expanded={mobileTocOpen}
                            >
                                <span className="flex items-center gap-2">
                                    <List size={14} className="text-primary" />
                                    <span>
                                        Table of Contents (
                                        {post.headings.length} sections)
                                    </span>
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${
                                        mobileTocOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {mobileTocOpen && (
                                <nav
                                    className="mt-3 pt-3 border-t border-border/50 space-y-1 max-h-64 overflow-y-auto"
                                    aria-label="Mobile table of contents"
                                >
                                    {post.headings.map((heading) => (
                                        <button
                                            key={heading.id}
                                            onClick={() =>
                                                scrollToHeading(heading.id)
                                            }
                                            className={`block w-full text-left py-1.5 px-3 rounded-md text-xs transition-colors ${
                                                activeHeading === heading.id
                                                    ? "text-primary font-semibold bg-primary/10"
                                                    : "text-muted-foreground hover:text-foreground"
                                            }`}
                                            style={{
                                                paddingLeft: `${
                                                    (heading.level - 2) * 12 +
                                                    12
                                                }px`,
                                            }}
                                        >
                                            {heading.text}
                                        </button>
                                    ))}
                                </nav>
                            )}
                        </div>
                    )}

                    <div className="flex gap-12 items-start">
                        {/* Desktop Sticky Table of Contents */}
                        {post.headings.length > 0 && (
                            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
                                <div className="glass-card p-5 rounded-2xl border border-border shadow-xs max-h-[calc(100vh-8rem)] overflow-y-auto">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/60">
                                        <List
                                            size={13}
                                            className="text-primary"
                                        />
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Table of Contents
                                        </h3>
                                    </div>
                                    <nav
                                        className="space-y-1 text-xs"
                                        aria-label="Article outline"
                                    >
                                        {post.headings.map((heading) => (
                                            <button
                                                key={heading.id}
                                                onClick={() =>
                                                    scrollToHeading(heading.id)
                                                }
                                                className={`block w-full text-left py-1.5 px-3 rounded-lg transition-all duration-150 border-l-2 cursor-pointer ${
                                                    activeHeading === heading.id
                                                        ? "text-primary border-primary bg-primary/10 font-medium"
                                                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-foreground/[0.03]"
                                                }`}
                                                style={{
                                                    paddingLeft: `${
                                                        (heading.level - 2) *
                                                            10 +
                                                        10
                                                    }px`,
                                                }}
                                            >
                                                <span className="line-clamp-2">
                                                    {heading.text}
                                                </span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </aside>
                        )}

                        {/* Article Prose Content Column */}
                        <article className="flex-1 max-w-3xl min-w-0">
                            <div
                                ref={contentRef}
                                className="glass-card p-6 sm:p-10 lg:p-12 rounded-2xl border border-border shadow-xs"
                            >
                                <div
                                    className="prose dark:prose-invert max-w-none text-foreground/85 leading-relaxed text-[15.5px] sm:text-base
                    prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pt-4 prose-h2:border-t prose-h2:border-border/40
                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-9 prose-h3:mb-4
                    prose-h4:text-lg prose-h4:mt-7 prose-h4:mb-3
                    prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-5
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-ul:list-disc prose-ul:my-5 prose-ul:pl-6
                    prose-ol:list-decimal prose-ol:my-5 prose-ol:pl-6
                    prose-li:my-1.5 prose-li:text-foreground/80
                    prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:bg-primary/[0.04] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-foreground/85 prose-blockquote:my-6
                    prose-hr:border-border/60 prose-hr:my-10"
                                    dangerouslySetInnerHTML={{
                                        __html: post.contentHtml,
                                    }}
                                />

                                {/* Tags Pill List */}
                                <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-2">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 mr-2 font-mono">
                                        <Tag size={12} /> Tags:
                                    </span>
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-foreground/[0.04] border border-border text-xs text-muted-foreground font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Author Bio Card */}
                                <div className="mt-10 p-6 sm:p-7 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-primary/40 flex-shrink-0">
                                        <Image
                                            src={
                                                post.author.avatar ||
                                                "/assets/mustafa-portrait-green.jpg"
                                            }
                                            alt={post.author.name}
                                            fill
                                            sizes="56px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-center sm:text-left flex-1">
                                        <p className="text-[11px] font-mono text-primary uppercase tracking-wider">
                                            Author
                                        </p>
                                        <h3 className="text-base font-bold text-foreground mt-0.5">
                                            {post.author.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                            Software Engineer & Product Builder
                                            focused on scalable SaaS
                                            architectures, clean systems
                                            engineering, and AI-driven
                                            workflows.
                                        </p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                                            <a
                                                href="https://github.com/waseem-mustafa-tawab"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono transition-colors"
                                            >
                                                <Github size={12} /> GitHub
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/mustafa-tawab-330278293/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono transition-colors"
                                            >
                                                <Linkedin size={12} /> LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Previous / Next Article Navigation */}
                                {(post.prevPost || post.nextPost) && (
                                    <nav
                                        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
                                        aria-label="Previous or next article"
                                    >
                                        {post.prevPost ? (
                                            <Link
                                                href={`/blogs/${post.prevPost.slug}`}
                                                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors block"
                                            >
                                                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                                                    <ArrowLeft
                                                        size={12}
                                                        className="transition-transform group-hover:-translate-x-1"
                                                    />
                                                    <span>
                                                        Previous Article
                                                    </span>
                                                </span>
                                                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-2 line-clamp-1">
                                                    {post.prevPost.title}
                                                </p>
                                            </Link>
                                        ) : (
                                            <div />
                                        )}

                                        {post.nextPost && (
                                            <Link
                                                href={`/blogs/${post.nextPost.slug}`}
                                                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors block text-right"
                                            >
                                                <span className="text-[11px] font-mono text-muted-foreground flex items-center justify-end gap-1.5">
                                                    <span>Next Article</span>
                                                    <ArrowRight
                                                        size={12}
                                                        className="transition-transform group-hover:translate-x-1"
                                                    />
                                                </span>
                                                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-2 line-clamp-1">
                                                    {post.nextPost.title}
                                                </p>
                                            </Link>
                                        )}
                                    </nav>
                                )}
                            </div>

                            {/* Related Articles Showcase */}
                            {post.relatedPosts &&
                                post.relatedPosts.length > 0 && (
                                    <div className="mt-14 pt-10 border-t border-border">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-heading font-bold text-xl text-foreground tracking-tight">
                                                Related Articles
                                            </h3>
                                            <Link
                                                href="/blogs"
                                                className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                                            >
                                                <span>All articles</span>
                                                <ArrowRight size={12} />
                                            </Link>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {post.relatedPosts.map(
                                                (related) => (
                                                    <Link
                                                        key={related.slug}
                                                        href={`/blogs/${related.slug}`}
                                                        className="group block h-full"
                                                    >
                                                        <div className="glass-card p-5 rounded-xl border border-border hover:border-primary/40 transition-all h-full flex flex-col">
                                                            <span className="text-[10px] font-mono text-primary mb-2">
                                                                {
                                                                    related.category
                                                                }
                                                            </span>
                                                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                                                                {related.title}
                                                            </h4>
                                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-auto pt-2">
                                                                {
                                                                    related.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
}
