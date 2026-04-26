import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { codeToHtml } from 'shiki';

// Component to render highlighted code
const CodeBlock = async ({ code, language = 'typescript' }: { code: string, language?: string }) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'tokyo-night'
  });

  return (
    <div 
      className="my-8 rounded-2xl overflow-hidden border border-border shadow-2xl shiki-block"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFULL_SPACE_ID}/entries?access_token=${process.env.CONTENTFULL_API_KEY}&content_type=portfolio`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getBlogs();
  
  const blog = data.items.find((item: any) => item.fields.slug === slug);
  if (!blog) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Brief not found.</div>;

  const imageAsset = data.includes.Asset.find(
    (img: any) => blog.fields.image.sys.id === img.sys.id
  );
  const imageUrl = imageAsset ? "https:" + imageAsset.fields.file.url : null;

  // Custom renderers for Contentful Rich Text
  const options = {
    renderMark: {
      [MARKS.CODE]: (text: any) => {
        if (text.includes('\n')) {
          return <CodeBlock code={text} />;
        }
        return <code className="px-1.5 py-0.5 rounded bg-foreground/10 text-neon-cyan font-mono text-sm">{text}</code>;
      },
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        if (node.content.length === 1 && node.content[0].marks?.some((m: any) => m.type === 'code') && node.content[0].value.includes('\n')) {
            return <>{children}</>;
        }
        return <p className="mb-8">{children}</p>;
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-3xl font-display uppercase tracking-tighter text-neon-cyan mt-16 mb-6">{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-2xl font-display uppercase tracking-tighter text-foreground mt-12 mb-4">{children}</h3>,
    }
  };

  return (
    <main className="bg-background min-h-screen pb-32 transition-colors duration-500">
      {/* Article Header */}
      <section className="relative pt-48 pb-20 overflow-hidden">
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
            <div className="space-y-4">
              <div className="flex items-center gap-6 text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em]">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.sys.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> 5 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold font-display tracking-tighter leading-tight uppercase">
                {blog.fields.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="container mb-20">
        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt={blog.fields.title}
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* Content */}
      <section className="container">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-16 rounded-[2.5rem] border-border relative overflow-hidden">
            {/* Scanline decoration */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-purple/20 animate-scanline" />
            
            <div className="prose prose-invert prose-neon max-w-none font-sans text-foreground/70 leading-relaxed text-lg
              prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter
              prose-p:text-foreground/70
              prose-strong:text-foreground prose-strong:font-bold
              prose-a:text-neon-purple prose-a:no-underline hover:prose-a:underline
              prose-pre:p-0 prose-pre:bg-transparent
            ">
              {documentToReactComponents(blog.fields.body, options)}
            </div>

            <div className="mt-16 pt-12 border-t border-border flex justify-between items-center text-foreground">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/40 hover:text-neon-cyan cursor-pointer transition-colors">
                    <Share2 size={18} />
                  </div>
               </div>
               <div className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">
                  End of Briefing // Node_Ref: {blog.sys.id.slice(0, 8)}
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Styles for Shiki */}
      <style dangerouslySetInnerHTML={{ __html: `
        .shiki-block pre {
          padding: 1.5rem !important;
          margin: 0 !important;
          background-color: #1a1b26 !important;
          font-family: var(--font-geist-mono), monospace !important;
          font-size: 0.875rem !important;
          line-height: 1.7 !important;
          overflow-x: auto !important;
        }
        .prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::before,
        .prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::after {
          content: "" !important;
        }
      `}} />
    </main>
  );
};

export default BlogDetailPage;
