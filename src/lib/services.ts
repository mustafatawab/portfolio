interface ServiceType {
  title: string;
  content: string;
  points: string[];
  icon: string;
}

export const services: ServiceType[] = [
  {
    title: "Full Stack Development",
    content: "End-to-end modern web applications with seamless frontend-backend integration and high performance.",
    points: [
      "Next.js (App Router) & React expertise",
      "Tailwind CSS & Shadcn UI design",
      "State management & client-side logic",
      "SEO & Core Web Vitals optimization",
      "Responsive, mobile-first architectures"
    ],
    icon: "code",
  },
  {
    title: "Software Development",
    content: "Custom software solutions tailored to solve complex business problems with clean, maintainable code.",
    points: [
      "Custom business logic implementation",
      "Third-party API integrations",
      "Legacy system modernization",
      "Scalable system architecture design",
      "Rigorous testing and QA protocols"
    ],
    icon: "cpu",
  },
  {
    title: "Backend Engineering",
    content: "Secure, scalable, and high-performance backend systems built for reliability and speed.",
    points: [
      "FastAPI & Node.js high-concurrency APIs",
      "PostgreSQL & MongoDB database design",
      "Auth guards & JWT security protocols",
      "Asynchronous task processing",
      "Microservices & Serverless architecture"
    ],
    icon: "server",
  },
  {
    title: "MVP SaaS Development",
    content: "Rapid development and deployment of SaaS MVPs to help you launch and validate your business ideas quickly.",
    points: [
      "Authentication & Billing (Stripe) setup",
      "Multi-tenant database architecture",
      "Rapid prototyping and iterative delivery",
      "Deployment to Vercel, Railway, or Fly.io",
      "Scalable infrastructure from day one"
    ],
    icon: "rocket",
  },
];
