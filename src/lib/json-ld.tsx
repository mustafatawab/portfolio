import type { ProjectShowcase } from "@/lib/projects-data"
import type { CaseStudy } from "@/lib/case-studies"
import type { Post } from "@/lib/posts"

const SITE_URL = "https://mustafatawab.com"
const AUTHOR_NAME = "Mustafa Tawab"

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    givenName: "Mustafa",
    familyName: "Tawab",
    jobTitle: "Software Engineer",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://github.com/mustafatawab",
      "https://www.linkedin.com/in/mustafa-tawab/",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "System Design",
      "Frontend Development",
      "Backend Development",
      "Artificial Intelligence",
      "Cloud Infrastructure",
      "DevOps",
      "SaaS Architecture",
    ],
    skills: [
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Laravel",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Generative AI",
      "Langchain",
      "Tailwind CSS",
      "TanStack Query",
      "Prisma",
    ],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "Mustafa Tawab — Software Engineer",
    description:
      "Building modern custom software and web applications that solve real business problems. Specializing in full-stack development, system design, and SaaS architecture.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://www.google.com/search?q=site%3Amustafatawab.com+{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function softwareSourceCodeSchema(project: ProjectShowcase) {
  const allTech = [
    ...project.techStack.frontend,
    ...project.techStack.backend,
    ...project.techStack.database,
    ...project.techStack.infrastructure,
    ...project.techStack.tools,
  ]

  const programmingLanguages = [...new Set(
    allTech.filter((t) =>
      ["TypeScript", "JavaScript", "Python", "PHP", "SQL"].includes(t),
    ),
  )]

  const runtimePlatforms = [...new Set(
    allTech.filter((t) =>
      ["Node.js", "Next.js", "Express.js", "FastAPI", "Laravel", "Docker", "Vercel"].includes(t),
    ),
  )]

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    programmingLanguage: programmingLanguages,
    runtimePlatform: runtimePlatforms,
    operatingSystem: project.platform,
    applicationCategory: project.category,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    codeRepository: project.links.github || undefined,
    softwareVersion: project.status,
    targetProduct: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: "WebApplication",
      operatingSystem: project.platform,
    },
  }
}

export function techArticleSchema(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.subtitle,
    name: study.title,
    description: study.sections.executiveSummary[0] ?? "",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    about: study.category,
    keywords: study.techStack.join(", "),
    proficiencyLevel: "Expert",
    dependencies: study.techStack.join(", "),
  }
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    about: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).length,
    timeRequired: post.readTime,
  }
}
