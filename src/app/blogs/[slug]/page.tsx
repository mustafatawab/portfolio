import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import BlogArticle from "@/views/blog-article";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/json-ld";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://mustafatawab.com" },
          { name: "Blog", url: "https://mustafatawab.com/blogs" },
          { name: post.title, url: `https://mustafatawab.com/blogs/${post.slug}` },
        ])}
      />
      <BlogArticle post={post} />
    </>
  );
}
