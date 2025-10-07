import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export default function BlogPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Latest Articles</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Insights, tutorials, and updates on web development, design, and technology.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-xl font-semibold line-clamp-2">
                {post.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.description}
              </p>
              <Button asChild variant="outline" size="sm">
                <a href={`/blog/${post.id}`}>Read More</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
