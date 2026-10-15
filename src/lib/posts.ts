import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import html from "remark-html"
import { createHighlighter, type Highlighter } from "shiki"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface AuthorMeta {
    name: string
    role?: string
    avatar?: string
    url?: string
}

export interface PostMeta {
    slug: string
    title: string
    description: string
    date: string
    updatedDate?: string
    author: AuthorMeta
    tags: string[]
    category: string
    readTime: string
    featured: boolean
    coverImage?: string
    draft?: boolean
}

export interface HeadingItem {
    level: number
    text: string
    id: string
}

export interface Post extends PostMeta {
    contentHtml: string
    headings: HeadingItem[]
    wordCount: number
    prevPost?: PostMeta | null
    nextPost?: PostMeta | null
    relatedPosts: PostMeta[]
}

const DEFAULT_AUTHOR: AuthorMeta = {
    name: "Mustafa Tawab",
    role: "Software Engineer & Product Builder",
    avatar: "/assets/mustafa-portrait-green.jpg",
    url: "https://www.linkedin.com/in/mustafa-tawab-330278293/",
}

/**
 * Validate frontmatter metadata at build time.
 * Throws actionable errors if required fields are missing or malformed.
 */
function validatePostMeta(data: Record<string, any>, fileName: string): void {
    if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
        throw new Error(
            `[Blog Metadata Error] File "${fileName}" is missing a valid 'title' string.`
        )
    }
    if (
        !data.description ||
        typeof data.description !== "string" ||
        !data.description.trim()
    ) {
        throw new Error(
            `[Blog Metadata Error] File "${fileName}" is missing a valid 'description' string.`
        )
    }
    if (!data.date || isNaN(Date.parse(String(data.date)))) {
        throw new Error(
            `[Blog Metadata Error] File "${fileName}" is missing a valid 'date' string (YYYY-MM-DD). Found: ${data.date}`
        )
    }
    if (
        !data.category ||
        typeof data.category !== "string" ||
        !data.category.trim()
    ) {
        throw new Error(
            `[Blog Metadata Error] File "${fileName}" is missing a valid 'category' string.`
        )
    }
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
        throw new Error(
            `[Blog Metadata Error] File "${fileName}" must have a non-empty 'tags' array.`
        )
    }
}

/**
 * Calculate estimated reading time based on word count.
 */
function calculateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
}

/**
 * Slugify heading text to anchor id.
 */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

// Singleton Shiki highlighter promise for fast build-time highlighting
let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ["github-dark", "github-light"],
            langs: [
                "bash",
                "typescript",
                "javascript",
                "json",
                "yaml",
                "dockerfile",
                "markdown",
                "html",
                "css",
                "ini",
                "sql",
            ],
        })
    }
    return highlighterPromise
}

function getNodeText(node: any): string {
    if (node.value) return node.value
    if (node.children && Array.isArray(node.children)) {
        return node.children.map(getNodeText).join("")
    }
    return ""
}

/**
 * Unified plugin that:
 * 1. Collects and IDs headings (h2, h3, h4) with permalink anchors
 * 2. Highlights code fences using Shiki with dual themes, language badges, and copy buttons
 */
function blogContentPlugin(headings: HeadingItem[], highlighter: Highlighter) {
    const usedIds = new Set<string>()

    return () => async (tree: any) => {
        async function visit(node: any) {
            if (
                node.type === "heading" &&
                (node.depth === 2 || node.depth === 3 || node.depth === 4)
            ) {
                const text = getNodeText(node)
                let baseId = slugify(text) || `heading-${headings.length + 1}`
                let id = baseId
                let counter = 1
                while (usedIds.has(id)) {
                    id = `${baseId}-${counter++}`
                }
                usedIds.add(id)

                headings.push({ level: node.depth, text, id })

                node.type = "html"
                const tag = `h${node.depth}`
                node.value = `<${tag} id="${id}" data-heading-id="${id}" class="group scroll-mt-28 flex items-center justify-between gap-2"><span>${text}</span><a href="#${id}" class="opacity-0 group-hover:opacity-100 text-primary/70 hover:text-primary text-base font-normal transition-opacity" aria-label="Permalink to ${text}">#</a></${tag}>`
                return
            }

            if (node.type === "code") {
                const rawLang = (node.lang || "text").toLowerCase()
                const langMap: Record<string, string> = {
                    sh: "bash",
                    zsh: "bash",
                    shell: "bash",
                    ts: "typescript",
                    js: "javascript",
                    yml: "yaml",
                    docker: "dockerfile",
                    gitignore: "ini",
                }
                const lang = langMap[rawLang] || rawLang
                const code = node.value || ""
                let highlighted = ""

                try {
                    const loaded = highlighter.getLoadedLanguages()
                    const targetLang = loaded.includes(lang) ? lang : "text"
                    highlighted = highlighter.codeToHtml(code, {
                        lang: targetLang,
                        themes: {
                            light: "github-light",
                            dark: "github-dark",
                        },
                    })
                } catch {
                    highlighted = `<pre><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
                }

                node.type = "html"
                node.value = `<div class="code-block-wrapper my-6 rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm" data-code-block>
  <div class="code-block-header flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50 text-xs font-mono text-muted-foreground select-none">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-primary/60 inline-block"></span>
      <span class="font-semibold uppercase tracking-wider text-[11px] text-foreground/85">${node.lang || "code"}</span>
    </div>
    <button class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-transparent hover:border-border cursor-pointer" aria-label="Copy code">
      <svg class="copy-icon w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      <span class="copy-label">Copy</span>
    </button>
  </div>
  <div class="code-content overflow-x-auto text-[13.5px] p-4 leading-relaxed font-mono">
    ${highlighted}
  </div>
</div>`
                return
            }

            if (node.children && Array.isArray(node.children)) {
                for (const child of node.children) {
                    await visit(child)
                }
            }
        }
        await visit(tree)
    }
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return []
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""))
}

export function getAllPostsMeta(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) return []
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "")
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, "utf8")
            const { data, content } = matter(fileContents)

            // Validate metadata
            validatePostMeta(data, fileName)

            const author: AuthorMeta = {
                name: data.author?.name || DEFAULT_AUTHOR.name,
                role: data.author?.role || DEFAULT_AUTHOR.role,
                avatar: data.author?.avatar || DEFAULT_AUTHOR.avatar,
                url: data.author?.url || DEFAULT_AUTHOR.url,
            }

            const readTime = data.readTime || calculateReadingTime(content)

            return {
                slug,
                title: String(data.title).trim(),
                description: String(data.description).trim(),
                date: String(data.date).trim(),
                updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
                author,
                tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
                category: String(data.category).trim(),
                readTime,
                featured: Boolean(data.featured),
                coverImage: data.coverImage ? String(data.coverImage) : undefined,
                draft: Boolean(data.draft),
            }
        })
        // In production, optionally filter out drafts if needed
        .filter((post) => (process.env.NODE_ENV === "production" ? !post.draft : true))

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Validate metadata
    validatePostMeta(data, `${slug}.md`)

    const headings: HeadingItem[] = []
    const highlighter = await getHighlighter()

    const processedContent = await remark()
        .use(remarkGfm)
        .use(blogContentPlugin(headings, highlighter))
        .use(html, { sanitize: false })
        .process(content)

    // Wrap any generated table in an accessible, responsive container
    let contentHtml = processedContent.toString()
    contentHtml = contentHtml.replace(
        /<table>/g,
        '<div class="table-responsive my-6 overflow-x-auto rounded-xl border border-border/70"><table class="w-full">'
    )
    contentHtml = contentHtml.replace(/<\/table>/g, "</table></div>")

    const author: AuthorMeta = {
        name: data.author?.name || DEFAULT_AUTHOR.name,
        role: data.author?.role || DEFAULT_AUTHOR.role,
        avatar: data.author?.avatar || DEFAULT_AUTHOR.avatar,
        url: data.author?.url || DEFAULT_AUTHOR.url,
    }

    const readTime = data.readTime || calculateReadingTime(content)
    const wordCount = content.trim().split(/\s+/).length

    // Navigation and related posts
    const allPosts = getAllPostsMeta()
    const currentIndex = allPosts.findIndex((p) => p.slug === slug)
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const nextPost =
        currentIndex >= 0 && currentIndex < allPosts.length - 1
            ? allPosts[currentIndex + 1]
            : null

    const currentPostTags = new Set(data.tags || [])
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug)
        .map((p) => {
            const overlap = p.tags.filter((t) => currentPostTags.has(t)).length
            const categoryMatch = p.category === data.category ? 2 : 0
            return { post: p, score: overlap + categoryMatch }
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((item) => item.post)

    return {
        slug,
        title: String(data.title).trim(),
        description: String(data.description).trim(),
        date: String(data.date).trim(),
        updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
        author,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        category: String(data.category).trim(),
        readTime,
        featured: Boolean(data.featured),
        coverImage: data.coverImage ? String(data.coverImage) : undefined,
        draft: Boolean(data.draft),
        contentHtml,
        headings,
        wordCount,
        prevPost,
        nextPost,
        relatedPosts,
    }
}

export function getAllTags(): string[] {
    const posts = getAllPostsMeta()
    const tags = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
    const posts = getAllPostsMeta()
    const categories = new Set<string>()
    posts.forEach((post) => categories.add(post.category))
    return Array.from(categories).sort()
}
