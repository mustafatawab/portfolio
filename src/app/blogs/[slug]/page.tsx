"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFULL_SPACE_ID}/entries?access_token=${process.env.CONTENTFULL_API_KEY}&content_type=portfolio`,
    { cache: "no-store" }
  );
  return res.json();
}

const BlogDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [data, setData] = useState<any>(null);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then(p => setSlug(p.slug));
    getBlogs().then(setData).catch(console.error);
  }, [params]);

  if (!data || !slug) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-neon-purple font-mono animate-pulse">DECRYPTING BRIEF...</div>
      </div>
    );
  }

  const blog = data.items.find((item: any) => item.fields.slug === slug);
  if (!blog) return <div>Brief not found.</div>;

  const imageAsset = data.includes.Asset.find(
    (img: any) => blog.fields.image.sys.id === img.sys.id
  );
  const imageUrl = imageAsset ? "https:" + imageAsset.fields.file.url : null;

  return (
    <main className="bg-black min-h-screen pb-32">
      {/* Article Header */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link 
              href="/blogs" 
              className="group inline-flex items-center gap-2 text-white/40 hover:text-neon-cyan transition-colors font-mono text-[10px] tracking-widest uppercase"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Return to Feed
            </Link>
          </motion.div>

          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-6 text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em]">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.sys.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> 5 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold font-display tracking-tighter leading-tight uppercase">
                {blog.fields.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="container mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt={blog.fields.title}
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-10 md:p-16 rounded-[2.5rem] border-white/5 relative overflow-hidden"
          >
            {/* Scanline decoration */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-purple/20 animate-scanline" />
            
            <div className="prose prose-invert prose-neon max-w-none font-sans text-white/70 leading-relaxed text-lg
              prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter
              prose-h2:text-3xl prose-h2:text-neon-cyan
              prose-p:mb-8
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-neon-purple prose-a:no-underline hover:prose-a:underline
            ">
              {documentToReactComponents(blog.fields.body)}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 flex justify-between items-center">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-neon-cyan cursor-pointer transition-colors">
                    <Share2 size={18} />
                  </div>
               </div>
               <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  End of Briefing // Node_Ref: {blog.sys.id.slice(0, 8)}
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailPage;