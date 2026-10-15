import { getAllPostsMeta, getAllTags, getAllCategories } from "@/lib/posts"
import type { Metadata } from "next"
import BlogListing from "@/views/blog-listing"

const SITE_URL = "https://mustafatawab.com"

export const metadata: Metadata = {
    title: "Engineering Journal & Articles",
    description:
        "Deep dives into software architecture, DevOps pipelines, Docker containers, Next.js, and scalable production systems.",
    alternates: {
        canonical: `${SITE_URL}/blogs`,
    },
    openGraph: {
        title: "Engineering Journal & Articles | Mustafa Tawab",
        description:
            "Deep dives into software architecture, DevOps pipelines, Docker containers, Next.js, and scalable production systems.",
        url: `${SITE_URL}/blogs`,
        siteName: "Mustafa Tawab — Engineering Portfolio",
        type: "website",
        images: [
            {
                url: `${SITE_URL}/assets/mustafa-portrait-green.jpg`,
                width: 1200,
                height: 630,
                alt: "Mustafa Tawab — Engineering Journal",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Engineering Journal & Articles | Mustafa Tawab",
        description:
            "Deep dives into software architecture, DevOps pipelines, Docker containers, Next.js, and scalable production systems.",
        images: [`${SITE_URL}/assets/mustafa-portrait-green.jpg`],
    },
}

export default function BlogPage() {
    const posts = getAllPostsMeta()
    const tags = getAllTags()
    const categories = getAllCategories()

    return <BlogListing posts={posts} tags={tags} categories={categories} />
}
