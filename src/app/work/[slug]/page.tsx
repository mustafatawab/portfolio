import { projects } from "@/lib/project";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="bg-background min-h-screen transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.02),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Back Navigation */}
        <div className="container pt-32 pb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-foreground/40 hover:text-neon-cyan transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </Link>
        </div>

        {/* Hero */}
        <section className="container pb-16">
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-neon-cyan bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-neon-cyan/20">
                    {project.category}
                  </span>
                  {project.role && (
                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/60 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
                      {project.role}
                    </span>
                  )}
                  {project.duration && (
                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/60 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
                      {project.duration}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-7xl font-bold font-display tracking-tighter leading-tight text-foreground">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container max-w-4xl">
          {/* Problem */}
          {project.problem && (
            <section className="pb-16">
              <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
                The Problem
              </h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans">
                {project.problem}
              </p>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="pb-16">
              <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
                The Solution
              </h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans">
                {project.solution}
              </p>
            </section>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section className="pb-16">
              <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-foreground/5"
                  >
                    <CheckCircle2 size={16} className="text-neon-cyan mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base text-foreground/70 font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section className="pb-16">
              <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
                Results & Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.map((result, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-neon-cyan/10 bg-neon-cyan/5 backdrop-blur-sm"
                  >
                    <p className="text-sm md:text-base text-foreground/80 font-sans leading-relaxed">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <section className="pb-16">
              <div className="p-8 md:p-12 rounded-[2rem] border border-border bg-foreground/5 relative">
                <div className="text-6xl text-neon-cyan/10 font-display absolute top-4 left-6 leading-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10">
                  <p className="text-xl md:text-2xl text-foreground/80 font-sans italic leading-relaxed mb-6">
                    {project.testimonial.quote}
                  </p>
                  <footer className="text-sm font-mono tracking-wider text-foreground/40">
                    — {project.testimonial.author}
                  </footer>
                </blockquote>
              </div>
            </section>
          )}

          {/* Tech Stack */}
          <section className="pb-16">
            <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge
                  key={i}
                  className="bg-foreground/5 border-border text-[10px] font-mono tracking-widest uppercase px-4 py-1.5 text-foreground/60"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </section>

          {/* CTA Links */}
          <section className="pb-16 flex flex-wrap gap-4">
            <Link
              href={project.link}
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-neon-cyan text-background font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] active:scale-95 text-[10px] font-mono tracking-[0.3em] uppercase"
            >
              Visit Live Site <ExternalLink size={14} />
            </Link>
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground/60 rounded-full transition-all duration-300 hover:border-neon-cyan/20 hover:text-foreground text-[10px] font-mono tracking-[0.3em] uppercase"
              >
                View Source <Github size={14} />
              </Link>
            )}
          </section>

          {/* More Sites (Triton case) */}
          {project.more && project.more.length > 0 && (
            <section className="pb-16">
              <h2 className="text-[10px] font-mono tracking-[0.4em] uppercase text-neon-cyan mb-6">
                Additional Sites
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.more.map((url, i) => (
                  <Link
                    key={i}
                    href={url}
                    target="_blank"
                    className="text-xs font-mono text-foreground/40 hover:text-neon-cyan transition-colors underline underline-offset-4 decoration-foreground/10"
                  >
                    {new URL(url).hostname}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Prev / Next Navigation */}
        <div className="container border-t border-border py-12">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex flex-col items-start gap-1"
              >
                <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-foreground/30">
                  Previous
                </span>
                <span className="text-sm font-mono text-foreground/60 group-hover:text-neon-cyan transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1 text-right"
              >
                <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-foreground/30">
                  Next
                </span>
                <span className="text-sm font-mono text-foreground/60 group-hover:text-neon-cyan transition-colors">
                  {nextProject.title}
                </span>
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
