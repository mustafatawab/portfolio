import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
const posts = [
  {
    id: 1,
    title: "Building a Modern Portfolio with Next.js & Tailwind CSS",
    date: "October 5, 2025",
    description:
      "Learn how to create a fast, responsive portfolio website using Next.js, Tailwind CSS, and shadcn/ui components.",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Mastering API Routes in Next.js 15",
    date: "September 28, 2025",
    description:
      "A complete guide to understanding and building secure, scalable API routes in the latest version of Next.js.",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Enhancing Security in Your Web Apps",
    date: "September 15, 2025",
    description:
      "Best practices to keep your web applications secure, including authentication, HTTPS, and data validation.",
    image: "/images/blog3.jpg",
  },
  {
    id: 4,
    title: "Using shadcn/ui for Beautiful Interfaces",
    date: "August 30, 2025",
    description:
      "How to use shadcn/ui components to build elegant, consistent, and accessible UI experiences effortlessly.",
    image: "/images/blog4.jpg",
  },
];

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFULL_SPACE_ID}/entries?access_token=${process.env.CONTENTFULL_API_KEY}&content_type=portfolio`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Latest Articles</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Insights, tutorials, and updates on web development, design, and
          technology.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.items.map((blog: any) => {
          const imageAsset = blogs.includes.Asset.find(
            (asset: any) => blog.fields.image.sys.id === asset.sys.id
          );
          const imageUrl = imageAsset
            ? "https:" + imageAsset.fields.file.url
            : null;

          return (
            <div
              key={blog.sys.id}
              className="  overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={blog.fields.title}
                  width={500}
                  height={500}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105 h-[70%] w-full object-cover"
                />
              )}

              <div className=" p-4">
                <h2 className="text-xl font-bold text-black transition-colors duration-300 group-hover:text-blue-600">
                  {blog.fields.title}
                </h2>
                <Link href={`/blogs/${blog.fields.slug}`}>
                  <Button>Read More</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
