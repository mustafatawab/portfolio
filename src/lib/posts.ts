import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface PostMeta {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    category: string
    readTime: string
    featured: boolean
}

export interface Post extends PostMeta {
    contentHtml: string
    headings: { level: number; text: string; id: string }[]
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ""))
}

export function getAllPostsMeta(): PostMeta[] {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(fileContents)

        return {
            slug,
            title: data.title || "",
            description: data.description || "",
            date: data.date || "",
            tags: data.tags || [],
            category: data.category || "",
            readTime: data.readTime || "",
            featured: data.featured || false,
        }
    })

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)

    const contentHtml = processedContent.toString()

    const headings: { level: number; text: string; id: string }[] = []
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    let match
    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2]
        headings.push({
            level,
            text,
            id: text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-"),
        })
    }

    return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        category: data.category || "",
        readTime: data.readTime || "",
        featured: data.featured || false,
        contentHtml,
        headings,
    }
}

export function getAllTags(): string[] {
    const posts = getAllPostsMeta()
    const tags = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
}
