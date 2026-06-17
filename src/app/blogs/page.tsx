import { getAllPostsMeta, getAllTags } from "@/lib/posts";
import BlogListing from "@/views/blog-listing";

export const metadata = {
  title: "Blog",
  description: "Deep dives into frontend architecture, AI systems, and modern web development.",
  openGraph: {
    title: "Blog | Mustafa Tawab",
    description: "Deep dives into frontend architecture, AI systems, and modern web development.",
  },
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const tags = getAllTags();

  return <BlogListing posts={posts} tags={tags} />;
}
