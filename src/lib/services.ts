interface ServiceType {
  title: string;
  content: string;
  points: string[];
  icon: string;
}

export const services: ServiceType[] = [
  {
    title: "AI Agent Development",
    content:
      "Build intelligent AI agents and multi-agent systems using OpenAI Agents SDK and LangChain.",
    points: [
      "Autonomous AI workflows",
      "Task-specific and multi-agent systems",
      "Memory and context-aware agents",
      "Agent orchestration with CrewAI / AgentOps",
      "Custom AI tools for business use cases",
    ],
    icon: "bot",
  },
  {
    title: "AI SaaS MVP Development",
    content:
      "Launch AI-powered SaaS MVPs fast using modern web technologies and scalable backend architecture.",
    points: [
      "Authentication, billing, and dashboard setup",
      "AI feature integration (chat, summarization, etc.)",
      "FastAPI + Supabase backend",
      "Next.js frontend with Tailwind & shadcn/ui",
      "Full deployment to Vercel / Railway / Fly.io",
    ],
    icon: "rocket",
  },
  {
    title: "Custom AI Tool Integration",
    content:
      "Integrate AI features into your existing or new web applications to boost efficiency and automate tasks.",
    points: [
      "OpenAI API integration",
      "Document Q&A and knowledge bots",
      "Generative AI features (text, code, summaries)",
      "Data processing & automation tools",
      "Fine-tuned AI behavior for business needs",
    ],
    icon: "zap",
  },
  {
    title: "Fullstack Web Development",
    content:
      "End-to-end modern web applications with seamless frontend-backend integration.",
    points: [
      "Next.js (App Router) + Tailwind + shadcn/ui",
      "FastAPI + Supabase backend",
      "RESTful and async API integration",
      "Database modeling and querying",
      "Deployment and version control with Git",
    ],
    icon: "code",
  },
  {
    title: "Frontend Development",
    content:
      "Responsive and accessible UI design using modern component libraries and best practices.",
    points: [
      "Next.js with App Router",
      "Tailwind CSS & shadcn/ui",
      "State management (Zustand, context, hooks)",
      "SEO & performance optimization",
      "Component-driven design",
    ],
    icon: "monitor",
  },
  {
    title: "API & Backend Development",
    content:
      "Secure and scalable backend systems built with FastAPI and Supabase.",
    points: [
      "FastAPI with async endpoints",
      "Supabase auth, database, and storage",
      "RESTful & webhook integrations",
      "Auth guards and JWT management",
      "Database schema & migrations",
    ],
    icon: "server",
  },

  {
    title: "Containerization & Deployment",
    content:
      "Deploy and scale applications reliably using Docker, Kubernetes, and modern DevOps tools.",
    points: [
      "Dockerfile and containerized app setup",
      "Multi-service orchestration with Docker Compose",
      "Kubernetes (K8s) deployment and scaling",
      "CI/CD integration for automated deployments",
      "Production-ready architecture setup",
    ],
    icon: "server", // You already have this in your icon set
  },
];
