import { getPostBySlug, getAllPostSlugs } from "@/lib/posts"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogArticle from "@/views/blog-article"
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/json-ld"

const SITE_URL = "https://mustafatawab.com"

export async function generateStaticParams() {
    const slugs = getAllPostSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return { title: "Article Not Found | Mustafa Tawab" }
    }

    const canonicalUrl = `${SITE_URL}/blogs/${post.slug}`
    const imageUrl = post.coverImage
        ? `${SITE_URL}${post.coverImage}`
        : `${SITE_URL}/assets/mustafa-portrait-green.jpg`

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${post.title} | Mustafa Tawab`,
            description: post.description,
            url: canonicalUrl,
            siteName: "Mustafa Tawab — Engineering Portfolio",
            type: "article",
            publishedTime: post.date,
            modifiedTime: post.updatedDate || post.date,
            authors: [post.author.name],
            tags: post.tags,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} | Mustafa Tawab`,
            description: post.description,
            images: [imageUrl],
        },
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <JsonLd data={articleSchema(post)} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Home", url: SITE_URL },
                    { name: "Blog", url: `${SITE_URL}/blogs` },
                    {
                        name: post.title,
                        url: `${SITE_URL}/blogs/${post.slug}`,
                    },
                ])}
            />
            <BlogArticle post={post} />
        </>
    )
}
