import { StaticImageData } from "next/image";
import maktab from "@/assets/project/maktab-one.png";
import myscribe from "@/assets/project/myscribe.png";
import triton from "@/assets/project/triton.png";
import rukun from "@/assets/project/rukun.png";
import elygance from "@/assets/project/elygance.png";
import msp from "@/assets/project/msp-tech.png";
import farazPharmacy from "@/assets/project/faraz-pharmacy.jpeg";

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface ProjectTechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  tools: string[];
}

export const PROJECT_CATEGORIES = [
  "All", "SaaS Platforms", "Business Applications", "Desktop Software",
  "Enterprise Solutions", "Healthcare", "Education",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface ProjectShowcase {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  image: StaticImageData;
  category: string;
  categories: string[];
  featured?: boolean;
  status: string;
  role: string;
  timeline: string;
  teamSize: string;
  platform: string;
  industry: string;
  links: {
    demo?: string;
    github?: string;
    caseStudy: string;
  };
  techStack: ProjectTechStack;
  overview: {
    what: string;
    who: string;
    businessValue: string;
    primaryUsers: string;
  };
  businessProblem: string;
  features: ProjectFeature[];
  architecturePreview: {
    explanation: string;
  };
  challengesSolved: ProjectChallenge[];
  results: string[];
  lessonsLearned: string[];
  metrics?: { label: string; value: string }[];
  relatedSlugs: string[];
}

export const projectShowcases: ProjectShowcase[] = [
  {
    slug: "maktab-one",
    title: "Maktab One",
    tagline: "School management SaaS for mid-tier private schools",
    summary:
      "A multi-tenant school management platform that automates fee collection, expense tracking, student records, and guardian communication. Designed for schools that outgrew spreadsheets but cannot afford enterprise ERP systems.",
    image: maktab,
    category: "SaaS Platform",
    categories: ["SaaS Platforms", "Education", "Business Applications"],
    featured: true,
    status: "Production",
    role: "Full-Stack Engineer",
    timeline: "3 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Education Technology",
    links: {
      demo: "https://schoola.maktabone.org/",
      caseStudy: "/case-studies/maktab-one",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "shadcn/ui"],
      backend: ["Express.js", "Node.js", "Prisma", "JWT"],
      database: ["PostgreSQL"],
      infrastructure: ["Docker", "VPS", "Nginx", "Vercel"],
      tools: ["GitHub Actions", "Resend", "SMTP"],
    },
    overview: {
      what: "A cloud-based school management system that handles fee management, student records, expense tracking, and parent communication from a single dashboard.",
      who: "Mid-tier private schools in developing markets that need affordable, reliable school management software without dedicated IT staff.",
      businessValue: "Reduces administrative overhead by 80%, eliminates fee tracking errors, and gives school owners real-time financial visibility across their institution.",
      primaryUsers: "School administrators, accountants, teachers, and parents/guardians.",
    },
    businessProblem:
      "Mid-level private schools in Pakistan operate on thin margins and cannot afford enterprise systems like SAP or Oracle. They rely on paper ledgers for fee tracking, which causes errors, lost records, and hours of manual reconciliation each week. School owners have no real-time view of their financial health.",
    features: [
      {
        icon: "Banknote",
        title: "Configurable Fee Engine",
        description: "Multi-tier fee structures with support for grade-based slabs, transport fees, late penalties, and scholarship discounts. Auto-calculates totals and prorates for mid-term admissions.",
      },
      {
        icon: "Users",
        title: "Multi-Role Portal",
        description: "Role-specific dashboards for administrators, accountants, teachers, and parents. Each role sees exactly the data and actions they need, secured by hierarchical RBAC.",
      },
      {
        icon: "Receipt",
        title: "Automated Receipt Generation",
        description: "One-click PDF receipt generation with school branding. Receipts are auto-numbered, stored permanently, and accessible to parents through the guardian portal.",
      },
      {
        icon: "Bell",
        title: "Multi-Channel Notifications",
        description: "Automated fee reminders via email and SMS. Payment confirmations are sent immediately. Configurable reminder schedules ensure parents never miss a due date.",
      },
    ],
    architecturePreview: {
      explanation:
        "A monolithic Express.js API serves the business logic layer, with Prisma ORM providing type-safe database access to a shared PostgreSQL schema. Tenant isolation is enforced through a middleware layer that injects school-scoped filters into every query. The Next.js frontend uses server-side rendering for initial page loads and TanStack Query for client-side caching.",
    },
    challengesSolved: [
      {
        problem: "Ensuring tenant A can never access tenant B's data in a shared database schema.",
        solution: "Built middleware that injects schoolId into every query automatically. Prisma middleware hooks validate the filter exists. Integration tests verify isolation at the CI level.",
      },
      {
        problem: "PDF receipt generation blocking API responses for 2-3 seconds per request.",
        solution: "Moved receipt generation to a background job queue. The API returns immediately with a job ID, a worker generates the PDF asynchronously, and the frontend polls for completion.",
      },
      {
        problem: "Aggregated fee reports scanning thousands of records, taking 3-5 seconds to complete.",
        solution: "Introduced materialized views that pre-compute daily fee summaries. Reports query the pre-computed view instead of raw ledger data, reducing query time to under 100ms.",
      },
    ],
    results: [
      "Eliminated manual fee tracking across hundreds of students per school",
      "Reduced weekly administrative workload by 80%",
      "Real-time financial dashboards replacing end-of-month manual reports",
      "Automated receipt generation and multi-channel fee reminders",
      "Handles 2,000+ students per tenant without performance degradation",
    ],
    lessonsLearned: [
      "Tenant isolation must be tested at the integration level, not just unit level. Our initial approach missed cross-tenant access bugs that only appeared with multiple tenants in the test database.",
      "Prisma migrations in a shared schema require backward-compatible changes. Adding a NOT NULL column needs a multi-step migration: add as nullable, backfill, then add the constraint.",
      "School administrators have diverse technical skills. The simplest UI won adoption fastest. Features that mimicked their existing paper workflows were adopted more quickly than novel interfaces.",
    ],
    metrics: [
      { label: "Admin time saved", value: "80%" },
      { label: "Students per tenant", value: "2,000+" },
      { label: "Receipt generation", value: "<2s" },
    ],
    relatedSlugs: ["faraz-pharmacy", "triton-consulting"],
  },
  {
    slug: "my-scribe",
    title: "MyScribe",
    tagline: "AI-powered medical transcription for clinicians",
    summary:
      "A clinician-focused AI assistant that automatically transcribes patient conversations and generates SOAP-format clinical notes. Reduces documentation time by 70%, letting doctors focus on patients instead of paperwork.",
    image: myscribe,
    category: "Healthcare Platform",
    categories: ["Healthcare", "SaaS Platforms"],
    status: "Production",
    role: "Full-Stack Developer",
    timeline: "6 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Healthcare Technology",
    links: {
      demo: "https://www.app.myscribe.us/",
      caseStudy: "/case-studies/my-scribe",
    },
    techStack: {
      frontend: ["Vue.js", "Quasar.js", "Bootstrap", "JavaScript"],
      backend: ["Laravel", "GraphQL", "Python", "PHP", "MySQL"],
      database: ["MySQL"],
      infrastructure: ["AWS ECS", "Docker", "Redis"],
      tools: ["OpenAI Whisper", "Llama 2", "AWS KMS"],
    },
    overview: {
      what: "An AI-powered medical scribe that listens to patient-clinician conversations in real-time, automatically generates structured SOAP clinical notes, and integrates into existing healthcare workflows.",
      who: "Independent clinicians, small clinics, and telehealth providers who cannot afford human medical scribes but need accurate, HIPAA-compliant documentation.",
      businessValue: "Reduces documentation time by 70%, allowing clinicians to see more patients and reduce burnout. Costs a fraction of human scribe services.",
      primaryUsers: "Physicians, nurse practitioners, physician assistants, and telehealth providers.",
    },
    businessProblem:
      "Clinicians spend 30-50% of their work hours on documentation. Existing solutions are either expensive transcription services with 24-hour lag or general speech-to-text tools that fail on medical terminology. Small clinics cannot afford $30,000/year for human scribes.",
    features: [
      {
        icon: "Mic",
        title: "Real-Time Medical Transcription",
        description: "Fine-tuned Whisper model achieves 94% accuracy on medical conversations. Captures terminology, medication names, and clinical context that general STT models miss.",
      },
      {
        icon: "FileText",
        title: "AI-Generated SOAP Notes",
        description: "Automatically structures conversation transcripts into Subjective, Objective, Assessment, and Plan format. Includes ICD-10 code suggestions based on the clinical assessment.",
      },
      {
        icon: "Shield",
        title: "HIPAA-Compliant Architecture",
        description: "End-to-end encryption for all audio data. AI processing runs on dedicated instances within a VPC with no outbound internet access. BAA-compliant infrastructure.",
      },
      {
        icon: "Pencil",
        title: "Editable Notes with Audit Trail",
        description: "Clinicians can review and edit AI-generated notes before saving. All changes are tracked with version history for compliance and quality assurance.",
      },
    ],
    architecturePreview: {
      explanation:
        "Real-time audio is captured in the browser via WebSocket and streamed to a Laravel backend that orchestrates the AI pipeline. A fine-tuned Whisper model handles speech-to-text, while a quantized Llama 2 13B model generates SOAP notes. The Vue.js frontend displays live transcription and provides the note editing interface.",
    },
    challengesSolved: [
      {
        problem: "General speech-to-text models fail on medical terminology, causing clinically significant errors.",
        solution: "Fine-tuned Whisper on 5,000 hours of medical conversations. Built a custom medical vocabulary dictionary for term override. Achieved 94% accuracy vs 82% baseline.",
      },
      {
        problem: "LLM-based note generation took 45-60 seconds per patient visit, too slow for clinical workflow.",
        solution: "Applied 4-bit quantization reducing model size from 26GB to 7GB. Implemented streaming generation where clinicians see notes written section by section.",
      },
      {
        problem: "HIPAA compliance for cloud AI processing required data never leaving secure infrastructure.",
        solution: "Deployed dedicated GPU instances within a VPC with no outbound internet. Pre-loaded model weights. All processing stays within the secure environment.",
      },
    ],
    results: [
      "Reduced clinical documentation time by approximately 70%",
      "HIPAA-compliant architecture with BAA from AWS",
      "Adopted by multiple healthcare providers across the United States",
      "94% medical speech transcription accuracy",
      "Note generation latency reduced from 55s to 12s through optimization",
    ],
    lessonsLearned: [
      "Medical AI products face a dual challenge: technical accuracy and clinical trust. Building trust required months of iterative improvements and transparent error reporting.",
      "Browser audio capture is surprisingly unreliable across different browsers and devices. Local audio buffering with sequence-numbered chunks was essential for reliability.",
      "HIPAA compliance is as much a legal and business process as a technical one. BAA negotiation and legal review of patient consent took 3+ months.",
    ],
    metrics: [
      { label: "Doc time saved", value: "70%" },
      { label: "Transcription accuracy", value: "94%" },
      { label: "Note generation", value: "12s" },
    ],
    relatedSlugs: ["maktab-one", "faraz-pharmacy"],
  },
  {
    slug: "faraz-pharmacy",
    title: "Faraz Pharmacy",
    tagline: "Modern pharmacy management with inventory and POS",
    summary:
      "A full-featured pharmacy management system handling inventory tracking, billing, customer management, and supplier operations. Designed for independent pharmacies that need enterprise-grade tools without enterprise pricing.",
    image: farazPharmacy,
    category: "Custom Software",
    categories: ["Business Applications", "Healthcare", "Desktop Software"],
    status: "Production",
    role: "Software Developer",
    timeline: "2 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Healthcare / Retail",
    links: {
      demo: "https://faraz-pharmacy.vercel.app",
      caseStudy: "/case-studies/pharmacy-management-system",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
      backend: ["FastAPI", "Python", "SQLModel", "Node.js"],
      database: ["PostgreSQL"],
      infrastructure: ["Docker", "Vercel"],
      tools: ["Git", "GitHub"],
    },
    overview: {
      what: "A pharmacy management platform that centralizes inventory control, sales tracking, customer relationships, and supplier management into a single interface.",
      who: "Independent pharmacies and small pharmacy chains that need to manage inventory, billing, and customer data without expensive enterprise software.",
      businessValue: "Centralizes inventory management across locations, prevents stockouts of critical medications, and reduces losses from expired stock.",
      primaryUsers: "Pharmacists, pharmacy technicians, cashiers, and inventory managers.",
    },
    businessProblem:
      "Pharmacies juggle fragmented inventory management, leading to stockouts of critical medications, expired stock waste, and inefficient point-of-sale operations. Staff often duplicate data entry across separate systems for inventory, billing, and customer management.",
    features: [
      {
        icon: "Pill",
        title: "Inventory with Batch Tracking",
        description: "Track medicines by batch number and expiry date. Receive automated alerts for approaching expiry. FIFO picking algorithm automatically selects the batch closest to expiry at sale time.",
      },
      {
        icon: "ShoppingCart",
        title: "Integrated Point of Sale",
        description: "Barcode-based billing with instant product lookup. Auto-calculates totals, taxes, and discounts. Prints formatted receipts with medicine details and dosage instructions.",
      },
      {
        icon: "BarChart3",
        title: "Sales Analytics",
        description: "Daily, weekly, and monthly sales reports with filters by product, category, and cashier. Identify top-selling medicines, slow-moving stock, and peak hours.",
      },
      {
        icon: "Truck",
        title: "Supplier Management",
        description: "Digital purchase orders with automatic stock receipt. Track supplier performance, payment terms, and order history. Reorder suggestions based on sales velocity.",
      },
    ],
    architecturePreview: {
      explanation:
        "A Next.js frontend communicates with a FastAPI Python backend through REST endpoints. PostgreSQL stores all transactional data with Prisma-like type safety through SQLModel. The architecture is designed for future offline capability with a sync engine for multi-location deployments.",
    },
    challengesSolved: [
      {
        problem: "Medicine names and barcodes are not standardized in local markets, causing lookup failures.",
        solution: "Implemented flexible barcode matching that normalizes input codes and supports multiple barcode formats per product. Pharmacies can print custom barcode labels.",
      },
      {
        problem: "Pharmacy staff need sub-second search across thousands of SKUs during busy hours.",
        solution: "PostgreSQL full-text search indexes on product names and categories reduced lookup time from 2 seconds to under 50ms.",
      },
    ],
    results: [
      "Centralized inventory management with real-time stock visibility",
      "Expiry date tracking reducing medication waste",
      "Supplier and purchase order management streamlining restocking",
      "Role-based access for pharmacists, cashiers, and managers",
    ],
    lessonsLearned: [
      "Pharmacists have very specific workflow expectations. The billing screen layout and keyboard shortcuts must match their muscle memory from years of using legacy systems.",
      "Search performance is the most critical UX factor in pharmacy software. Sub-100ms search is table stakes for adoption.",
      "Multi-tenant architecture from day one would have simplified adding new pharmacy locations.",
    ],
    metrics: [
      { label: "SKU capacity", value: "10,000+" },
      { label: "Search latency", value: "<50ms" },
      { label: "Invoice time", value: "<30s" },
    ],
    relatedSlugs: ["maktab-one", "my-scribe"],
  },
  {
    slug: "triton-consulting",
    title: "Triton Consulting Group",
    tagline: "Enterprise multi-site CMS platform",
    summary:
      "A centralized content management platform powering 6+ client websites from a single admin interface. Each site is an independent brand with its own domain, content, and design, while sharing unified infrastructure and editorial workflow.",
    image: triton,
    category: "Enterprise Platform",
    categories: ["Enterprise Solutions", "Business Applications"],
    status: "Production",
    role: "Lead Developer",
    timeline: "8 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Enterprise Software / Web Development",
    links: {
      demo: "https://www.tritoncg.com/",
      caseStudy: "/case-studies/triton-consulting",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Payload CMS", "Node.js", "Express.js"],
      database: ["MongoDB"],
      infrastructure: ["AWS ECS", "Docker", "CloudFront", "S3"],
      tools: ["Twilio SendGrid", "GitHub Actions", "Sentry"],
    },
    overview: {
      what: "A multi-tenant CMS platform that manages content for multiple client websites through a single admin panel. Each site operates independently with its own domain, branding, and content structure.",
      who: "Web agencies and consulting firms that manage websites for multiple clients and need to eliminate duplicate maintenance while preserving each client's brand identity.",
      businessValue: "Reduces new client onboarding from 40 hours to under 10 hours. Eliminates duplicated content management effort across sites. Ensures consistent functionality across the portfolio.",
      primaryUsers: "Content editors managing multiple client sites, client stakeholders reviewing their site, and site visitors.",
    },
    businessProblem:
      "Managing 6+ client websites independently meant separate codebases, separate hosting, and separate CMS installations. Updates required duplicated effort, branding was inconsistent, and adding a new client required 40-60 hours of setup.",
    features: [
      {
        icon: "LayoutDashboard",
        title: "Centralized Admin Panel",
        description: "Manage all client sites from a single dashboard. Switch between sites with a dropdown. Consistent content structures across sites reduce cognitive overhead for editors.",
      },
      {
        icon: "Blocks",
        title: "Drag-and-Drop Page Builder",
        description: "Compose pages from pre-built sections: hero, features, testimonials, galleries, CTAs, and contact forms. Each section has configurable options for layout and content.",
      },
      {
        icon: "Palette",
        title: "Per-Site Theming",
        description: "Each site has independent branding: colors, typography, and layout variants. Shared infrastructure with unique identity. Clients feel their site is exclusively theirs.",
      },
      {
        icon: "Zap",
        title: "Instant Content Publishing",
        description: "Content updates go live in seconds through Next.js ISR. Editors see changes immediately after saving. Preview workflow allows reviewing before publishing to production.",
      },
    ],
    architecturePreview: {
      explanation:
        "Payload CMS runs as a headless content backend with multi-tenant content isolation. Next.js uses Incremental Static Regeneration to serve pages from CDN edge cache with 60-second revalidation. A reverse proxy routes requests to the correct site based on domain. Content updates trigger webhooks that revalidate affected pages immediately.",
    },
    challengesSolved: [
      {
        problem: "Manually setting up a new client site required 40-60 hours of infrastructure and CMS configuration.",
        solution: "Built a multi-tenant architecture where adding a new site is a configuration change, not a new deployment. New client onboarding reduced to under 10 hours.",
      },
      {
        problem: "Multi-tenant MongoDB queries slowed as the number of sites grew beyond 4.",
        solution: "Added compound indexes on (site, slug) and (site, status). Query times stayed under 100ms regardless of total document count across all sites.",
      },
      {
        problem: "Content editors needed to preview changes before publishing, but ISR caches published pages.",
        solution: "Built a preview route that bypasses CDN cache and reads draft content directly from Payload API. Editors review the preview URL before publishing.",
      },
    ],
    results: [
      "Reduced new client onboarding from 40-60 hours to under 10 hours",
      "Manages 6+ live client websites from a single CMS",
      "Reduced monthly maintenance overhead by approximately 60%",
      "Sub-second page loads through CDN edge caching with ISR",
      "Scalable architecture supporting unlimited additional sites",
    ],
    lessonsLearned: [
      "Clients value editorial independence over platform efficiency. Even though sharing content is more efficient, each client wants unique branding. Per-site theming was essential for adoption.",
      "The drag-and-drop page builder was the most requested feature and the most complex to build. It took 40% of the total project timeline.",
      "Content editors need structured training even with an intuitive CMS. Investing in video tutorials and documentation reduced support requests significantly.",
    ],
    metrics: [
      { label: "Sites managed", value: "6+" },
      { label: "Onboarding time", value: "<10 hrs" },
      { label: "Maintenance reduction", value: "60%" },
    ],
    relatedSlugs: ["maktab-one", "rukun-al-zuhab"],
  },
  {
    slug: "rukun-al-zuhab",
    title: "Rukun Al Zuhab",
    tagline: "Industrial supply company showcase",
    summary:
      "A high-performance corporate website for a Saudi Arabian industrial supply company. Features polished animations, a professional brand identity, and a seamless user experience across all devices.",
    image: rukun,
    category: "Corporate Website",
    categories: ["Business Applications", "Enterprise Solutions"],
    status: "Production",
    role: "Frontend Developer",
    timeline: "2 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Industrial / Manufacturing",
    links: {
      demo: "https://rukun-al-zuhab.vercel.app/",
      caseStudy: "",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      backend: [],
      database: [],
      infrastructure: ["Vercel"],
      tools: ["Git", "GitHub"],
    },
    overview: {
      what: "A corporate showcase website for an industrial supply company, designed to establish credibility and communicate their product catalog and infrastructure capabilities.",
      who: "An established Saudi Arabian industrial supply company needing a modern digital presence that reflects their quality and reliability.",
      businessValue: "Establishes a credible, modern digital presence that builds trust with potential clients. Showcases product catalog and infrastructure capabilities.",
      primaryUsers: "Procurement managers, engineers, and decision-makers in the industrial sector.",
    },
    businessProblem:
      "An established industrial supply company lacked a modern digital presence. Their existing website did not reflect the quality of their products or the scale of their operations, hindering trust with potential corporate clients.",
    features: [
      {
        icon: "LayoutGrid",
        title: "Product Catalog",
        description: "Categorized product browsing with detailed specifications. Filtering and search help procurement managers find exactly what they need.",
      },
      {
        icon: "Sparkles",
        title: "Polished Animations",
        description: "Smooth page transitions and scroll-triggered animations using Framer Motion. Creates an engaging, premium feel without overwhelming the content.",
      },
      {
        icon: "Smartphone",
        title: "Responsive Design",
        description: "Mobile-first responsive layout ensures the site works flawlessly on all devices. Critical for decision-makers browsing on the go.",
      },
      {
        icon: "Mail",
        title: "Inquiry Forms",
        description: "Streamlined contact and inquiry forms with validation. Direct routing of inquiries to the appropriate sales team.",
      },
    ],
    architecturePreview: {
      explanation:
        "A static Next.js site deployed on Vercel with global CDN distribution. Framer Motion handles page transitions and scroll-triggered animations. The site is fully statically generated for maximum performance.",
    },
    challengesSolved: [
      {
        problem: "Needed a premium feel with animations while maintaining sub-second page loads on mobile networks in the region.",
        solution: "Used Framer Motion with reduced motion preferences respected. Static generation with CDN distribution ensures fast loads regardless of network conditions.",
      },
    ],
    results: [
      "Established a credible, modern digital presence for the company",
      "Smooth, engaging experience with polished animations",
      "Responsive across all devices and screen sizes",
      "Clean product catalog improving procurement workflows",
    ],
    lessonsLearned: [
      "Corporate clients value performance and polish equally. A slow site undermines the trust a good design builds.",
      "Arabic language support would have been valuable for the local market. Right-to-left layout support should be planned from the start for Middle Eastern clients.",
    ],
    relatedSlugs: ["triton-consulting", "maktab-one"],
  },
  {
    slug: "elygance",
    title: "Elygance",
    tagline: "Luxury e-commerce for premium fragrances",
    summary:
      "A luxury e-commerce platform for premium fragrances with elegant design, refined typography, and a seamless checkout experience. Built to reflect the exclusivity and quality of the brand.",
    image: elygance,
    category: "E-Commerce",
    categories: ["Business Applications"],
    status: "Production",
    role: "Full-Stack Developer",
    timeline: "2.5 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "Retail / E-Commerce",
    links: {
      demo: "https://elygance.vercel.app/",
      caseStudy: "",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["PostgreSQL", "Supabase"],
      infrastructure: ["Vercel"],
      tools: ["Git", "GitHub"],
    },
    overview: {
      what: "A luxury fragrance e-commerce platform with elegant product presentation, shopping cart functionality, and a streamlined checkout experience.",
      who: "A premium fragrance brand needing an online store that reflects their luxury positioning and provides a shopping experience worthy of their products.",
      businessValue: "Establishes a brand-aligned online sales channel. Provides customers with a luxury shopping experience that matches the premium product quality.",
      primaryUsers: "Fragrance enthusiasts, luxury shoppers, and gift buyers.",
    },
    businessProblem:
      "Generic e-commerce storefronts undermine luxury brand perception. A premium fragrance brand needed an online shopping experience that matched the quality and exclusivity of their products.",
    features: [
      {
        icon: "ShoppingBag",
        title: "Luxury Product Catalog",
        description: "High-resolution product imagery with elegant zoom. Detailed fragrance notes, concentration levels, and sizing options presented in a clean layout.",
      },
      {
        icon: "CreditCard",
        title: "Streamlined Checkout",
        description: "Minimal-step checkout process with real-time cart updates. Guest checkout option for first-time buyers. Order confirmation with tracking.",
      },
      {
        icon: "Search",
        title: "Product Discovery",
        description: "Categorized browsing by fragrance family, concentration, and price range. Search with autocomplete helps customers find their perfect scent.",
      },
    ],
    architecturePreview: {
      explanation:
        "Next.js frontend with Supabase backend for product management and order processing. Static generation for product pages with ISR for inventory updates. PostgreSQL handles transactional data with real-time synchronization.",
    },
    challengesSolved: [
      {
        problem: "Luxury brands require pixel-perfect design across all devices. A single spacing inconsistency undermines brand perception.",
        solution: "Implemented a strict design token system with consistent spacing, typography, and color scales. All components reference the design system, ensuring visual consistency.",
      },
    ],
    results: [
      "Brand-aligned luxury shopping experience",
      "Smooth, intuitive checkout flow",
      "Responsive design optimized for all devices",
      "Supabase backend for scalable product management",
    ],
    lessonsLearned: [
      "E-commerce UX has high stakes. A single friction point in checkout can lose a sale. Every click between product view and order confirmation should be justified.",
      "Product photography quality matters more than any UI decision for e-commerce. The platform should showcase images, not compete with them.",
    ],
    relatedSlugs: ["rukun-al-zuhab", "triton-consulting"],
  },
  {
    slug: "msp-tech-stack",
    title: "MSP Tech Stack",
    tagline: "B2B marketplace with dual-portal architecture",
    summary:
      "A B2B marketplace featuring separate portals for individual buyers and company purchasing departments. Each portal has tailored authentication, workflows, and procurement tools.",
    image: msp,
    category: "Full-Stack Application",
    categories: ["Enterprise Solutions", "Business Applications"],
    status: "Production",
    role: "Full-Stack Developer",
    timeline: "3 months",
    teamSize: "Solo",
    platform: "Web",
    industry: "B2B / Marketplace",
    links: {
      demo: "https://msp-tech-stack.vercel.app/",
      github: "https://github.com/mustafatawab/Nextjs_projects/tree/main/MSPTech_Stack",
      caseStudy: "",
    },
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "JWT"],
      database: ["MongoDB"],
      infrastructure: ["Vercel"],
      tools: ["Git", "GitHub"],
    },
    overview: {
      what: "A dual-portal B2B marketplace where individual buyers and company purchasing departments have separate authentication flows, interfaces, and procurement tools tailored to their needs.",
      who: "B2B companies that need to serve both individual professionals and organizational buyers through a unified marketplace platform.",
      businessValue: "Serves two distinct user types through a single platform. Company buyers get procurement workflows, while individual buyers get a streamlined shopping experience.",
      primaryUsers: "Individual professionals making purchases, and company purchasing departments managing organizational procurement.",
    },
    businessProblem:
      "B2B marketplaces typically force all users into a single experience, ignoring the fundamentally different needs of individual buyers versus company purchasing departments with approval workflows, budget tracking, and multi-user accounts.",
    features: [
      {
        icon: "DoorOpen",
        title: "Dual Authentication Portals",
        description: "Separate login flows for individuals and organizations. JWT-based authentication with role-specific session management and permission controls.",
      },
      {
        icon: "Building2",
        title: "Company Dashboard",
        description: "Organizational buyers get procurement dashboards with budget tracking, multi-user account management, purchase order history, and approval workflows.",
      },
      {
        icon: "User",
        title: "Individual Buyer Portal",
        description: "Streamlined single-user experience with quick checkout, order history, and personalized recommendations based on past purchases.",
      },
      {
        icon: "Shield",
        title: "Role-Based Access Control",
        description: "Granular permissions for company accounts: purchasing managers can set budgets, team members can request purchases, and admins can approve orders.",
      },
    ],
    architecturePreview: {
      explanation:
        "Next.js frontend with dual authentication flows routed through a shared Express.js API. JWT tokens encode user type and role, which the middleware uses to apply different business logic for individual versus company users.",
    },
    challengesSolved: [
      {
        problem: "Individual and company users have fundamentally different workflows but share the same product catalog and marketplace infrastructure.",
        solution: "Built a shared API with role-aware middleware. User type is encoded in the JWT, and all business logic branches based on user type. The frontend renders different interfaces from the same component library.",
      },
    ],
    results: [
      "Separate, role-optimized portals for users and companies",
      "Secure JWT authentication with role-based access control",
      "Streamlined B2B product discovery and procurement",
      "Admin dashboard with usage analytics",
    ],
    lessonsLearned: [
      "Dual-portal architecture adds significant complexity. A shared codebase with branching logic works at small scale but would benefit from a micro-frontend approach as the feature sets diverge.",
      "Company purchasing workflows are surprisingly varied. Building in configurability from the start would have reduced per-client customization work.",
    ],
    relatedSlugs: ["elygance", "maktab-one"],
  },
];

export function getProjectShowcase(slug: string): ProjectShowcase | undefined {
  return projectShowcases.find((p) => p.slug === slug);
}

export function getAllProjectShowcases(): ProjectShowcase[] {
  return projectShowcases;
}

export function getRelatedProjects(slugs: string[]): ProjectShowcase[] {
  return projectShowcases.filter((p) => slugs.includes(p.slug));
}

export function getPrevNext(
  slug: string,
): { prev: ProjectShowcase | null; next: ProjectShowcase | null } {
  const idx = projectShowcases.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projectShowcases[idx - 1] : null,
    next: idx < projectShowcases.length - 1 ? projectShowcases[idx + 1] : null,
  };
}
