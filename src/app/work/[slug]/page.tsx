import { projects } from "@/lib/project";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <main className="bg-background min-h-screen">
      <div className="pt-28 pb-8">
        <div className="container">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to projects
          </Link>
        </div>
      </div>

      <article>
        <div className="container max-w-4xl">
          {/* Hero */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-[var(--shadow-md)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-primary/20 text-[10px] font-mono tracking-wider text-primary">
                    {project.category}
                  </span>
                  {project.role && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border text-[10px] font-mono tracking-wider text-muted-foreground">
                      {project.role}
                    </span>
                  )}
                  {project.duration && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border text-[10px] font-mono tracking-wider text-muted-foreground">
                      {project.duration}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Content sections */}
          <div className="mt-12 space-y-16">
            {/* Problem */}
            {project.problem && (
              <section className="max-w-3xl">
                <h2 className="text-xs font-mono tracking-wider text-primary mb-4">
                  The Problem
                </h2>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  {project.problem}
                </p>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="max-w-3xl">
                <h2 className="text-xs font-mono tracking-wider text-primary mb-4">
                  The Solution
                </h2>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  {project.solution}
                </p>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-xs font-mono tracking-wider text-primary mb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="card flex items-start gap-2.5 p-4"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-foreground/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <section>
                <h2 className="text-xs font-mono tracking-wider text-primary mb-4">
                  Results & Impact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.results.map((result, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-lg border border-primary/10 bg-primary-light"
                    >
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <section className="max-w-3xl">
                <div className="p-8 md:p-10 rounded-xl border border-border bg-card relative">
                  <div className="text-5xl text-primary/10 font-serif absolute top-3 left-4 leading-none">
                    &ldquo;
                  </div>
                  <blockquote className="relative z-10">
                    <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-5">
                      {project.testimonial.quote}
                    </p>
                    <footer className="text-xs font-mono tracking-wider text-muted-foreground">
                      - {project.testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section>
              <h2 className="text-xs font-mono tracking-wider text-primary mb-4">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    className="bg-foreground/5 border-border text-xs font-mono tracking-wider px-3 py-1 text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Links */}
            <section className="flex flex-wrap gap-3 pb-16">
              <Link
                href={project.link}
                target="_blank"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] active:scale-[0.97]"
              >
                Visit Live Site <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground/70 rounded-xl text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-primary/20 hover:text-foreground active:scale-[0.97]"
                >
                  Watch Demo <Play size={14} fill="currentColor" className="transition-transform group-hover:scale-110" />
                </Link>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground/70 rounded-xl text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:border-primary/20 hover:text-foreground active:scale-[0.97]"
                >
                  View Source <Github size={14} className="transition-transform group-hover:scale-110" />
                </Link>
              )}
            </section>
          </div>
        </div>
      </article>

      {/* Prev / Next */}
      <div className="border-t border-border">
        <div className="container py-8">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group"
              >
                <div className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  Previous
                </div>
                <div className="text-sm text-foreground/60 group-hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {prevProject.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group text-right"
              >
                <div className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                  Next
                </div>
                <div className="text-sm text-foreground/60 group-hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {nextProject.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
