import malblogs from '@/assets/project/mal-blogs.png'
import elygance from '@/assets/project/elygance.png'
import msp from '@/assets/project/msp-tech.png'
import myscribe from '@/assets/project/myscribe.png'
import triton from '@/assets/project/triton.png'
import portfolio from '@/assets/project/portfolio.png'
import gallery from '@/assets/project/gallery.png'
import uswah from '@/assets/project/uswah-saeed.png'
import farsightsysmte from '@/assets/project/farsight.png'
import rukun from '@/assets/project/rukun.png'
import maktab from "@/assets/project/maktab-one.png"
import pharmacy from "@/assets/project/pharmacy.png"

interface Testimonial {
  quote: string;
  author: string;
}

interface ProjectType {
    image : any,
    title : string,
    slug: string,
    description : string,
    tags : string[],
    githubLink? : string,
    link : string,
    more? : string[],
    category: "Management Systems" | "Full-Stack Apps" | "Enterprise & Agency" | "Digital Experiences",
    problem?: string,
    solution?: string,
    results?: string[],
    features?: string[],
    role?: string,
    duration?: string,
    testimonial?: Testimonial
}

export const projects : ProjectType[] = [
    {
        image : maktab,
        title: "Maktab One",
        slug: "maktab-one",
        description : "Maktab One is a `School Management System` for those mid level schools who has to manage students fees and expenses easily in automatic way.",
        githubLink :"",
        tags : ["Next.js", "TanStack Query", "Node.js" , "Prisma" , "Neon DB" , "Resend" , "Mailtrap", "SMTP"],
        link : "https://maktab-one-lemon.vercel.app/",
        category: "Management Systems",
        problem: "Mid-level schools in Pakistan rely on manual fee tracking and paper-based expense management, leading to frequent accounting errors, lost records, and hours of administrative overhead each week.",
        solution: "Built a comprehensive school management platform that automates fee collection, expense tracking, and student record management with role-based access for admin, teachers, and accountants.",
        results: [
          "Eliminated manual fee tracking errors across hundreds of students",
          "Reduced weekly admin workload by 80%",
          "Real-time financial dashboards for informed decision-making",
          "Automated receipt generation and email notifications"
        ],
        features: [
          "Student fee management with auto-calculations and reminders",
          "Multi-role dashboard (admin, teacher, accountant)",
          "Expense tracking with category-wise reporting",
          "PDF receipt generation with branding",
          "Email/SMTP notifications via Resend and Mailtrap"
        ],
        role: "Full-Stack Developer",
        duration: "3 months"
    },
    {
        image : myscribe,
        title : "My Scribe",
        slug: "my-scribe",
        description : "MyScribe is a clinician-focused AI assistant designed to simplify medical documentation by automatically transcribing and summarizing patient interactions. The platform handles the minutiae of note-taking, enabling healthcare providers to prioritize patient care. It improves clinical efficiency and accuracy by reducing the administrative burden of patient note-taking. It reflects my deep interest in applying AI intelligently and ethically to solve real-world problems—especially in fast-paced, high-stakes environments like healthcare.",
        githubLink : "",
        tags : ['bootstrap' , 'vuejs' , 'laravel' , 'ai' , 'php' ,'python'],
        link : "https://www.myscribe.us/",
        category: "Full-Stack Apps",
        problem: "Clinicians spend 30-50% of their work hours on documentation, contributing directly to burnout, reduced patient face-time, and lower quality of care.",
        solution: "Developed an AI-powered medical scribe that listens to patient-clinician conversations in real-time, automatically generates SOAP-format clinical notes, and integrates into existing workflows.",
        results: [
          "Reduced documentation time by approximately 70%",
          "HIPAA-compliant architecture ensuring patient data security",
          "Adopted by multiple healthcare providers across the US"
        ],
        features: [
          "Real-time speech-to-text transcription with medical vocabulary",
          "AI-generated SOAP clinical notes",
          "Secure patient data handling with encryption",
          "Bootstrap-based responsive UI for desktop and tablet"
        ],
        role: "Full-Stack Developer",
        duration: "6 months"
    },
    {
        image : pharmacy,
        title : "Pharmacy Management System",
        slug: "pharmacy-management-system",
        description : "Pharmacy Managment System is Multi-Tenant system for Pharmacy to manage all their Inventory and perform all POS actions using this custom software.",
        githubLink : "https://github.com/mustafatawab/pharmacy_management_system",
        tags : ["Next.js" , "FastAPI" , "SQLModel" , "TanStack Query" , "Typescript"],
        link : "https://pharmacy-management-system-beta.vercel.app/login",
        category: "Management Systems",
        problem: "Pharmacies struggle with fragmented inventory management, leading to stockouts of critical medications, expired stock losses, and inefficient point-of-sale operations.",
        solution: "Built a multi-tenant pharmacy management platform with centralized inventory tracking, expiry monitoring, supplier management, and an integrated POS system.",
        results: [
          "Centralized inventory management across multiple locations",
          "Real-time stock alerts preventing stockouts and overstocking",
          "Expiry date tracking reducing medication waste"
        ],
        features: [
          "Multi-tenant architecture for independent pharmacy accounts",
          "Inventory management with batch and expiry tracking",
          "Integrated Point of Sale (POS) system",
          "Supplier and purchase order management",
          "Role-based access for pharmacists and cashiers"
        ],
        role: "Full-Stack Developer",
        duration: "4 months"
    },

    {
        image : triton,
        title : "Triton",
        slug: "triton",
        description : "TritonCG is a large-scale web ecosystem powered by a robust CMS built with Pyload CMS. The platform is designed to manage and maintain a network of client websites efficiently, offering scalability, reliability, and seamless content management. TritonCG showcases the power of building a scalable CMS-driven ecosystem where dozens of live websites can be managed and updated efficiently. This project highlights my expertise in developing enterprise-grade solutions with a strong focus on scalability, maintainability, and client satisfaction.",
        githubLink : "",
        tags : ['tailwind css' , 'nextjs' , 'Payload CMS', 'typescript' , 'node'],
        more : ["https://www.rollingvranchwcid1.com/", "https://www.rollingvranchwcid2.com/" , "https://www.rollingvranchwcid3.com/" , "https://www.rollingvranchwcid5.com/" , 'https://www.palomacreek.org/' , 'https://www.mud222.org/' ],
        link : "https://www.tritoncg.com/",
        category: "Enterprise & Agency",
        problem: "Managing a growing portfolio of client websites independently was becoming unsustainable — updates were duplicated, branding inconsistent, and maintenance costs were climbing.",
        solution: "Architected a centralized CMS ecosystem using Payload CMS that powers and manages multiple client websites from a single administration panel, enabling consistent branding and efficient updates.",
        results: [
          "Manages 6+ live client websites from a single CMS",
          "Reduced site maintenance overhead by approximately 60%",
          "Scalable architecture supporting unlimited additional sites"
        ],
        features: [
          "Centralized content management with Payload CMS",
          "Multi-site management from a single dashboard",
          "Custom page builders per client",
          "Consistent branding across all client sites"
        ],
        role: "Lead Developer",
        duration: "8 months"
    },
    {
        image: rukun,
        title: "Rukun Al Zuhab",
        slug: "rukun-al-zuhab",
        description: "Rukun Al Zuhab Trading Co is a Saudi Arabian industrial supply company specializing in high-performance components and infrastructure solutions.",
        githubLink: "",
        tags: ['tailwind css', 'nextjs', "framer motion", "shadcn",'typescript'],
        link: "https://rukun-al-zuhab.vercel.app/",
        category: "Digital Experiences",
        problem: "An established industrial supply company in Saudi Arabia lacked a modern digital presence that reflected their credibility and the quality of their infrastructure components.",
        solution: "Designed and developed a high-performance corporate showcase site with polished animations, a professional brand identity, and a seamless user experience.",
        results: [
          "Established a credible, modern digital presence",
          "Smooth, engaging experience with Framer Motion animations",
          "Responsive across all devices and screen sizes"
        ],
        features: [
          "Product catalog with categorized browsing",
          "Smooth page transitions and scroll-triggered animations",
          "Mobile-first responsive design",
          "Contact and inquiry forms"
        ],
        role: "Frontend Developer",
        duration: "2 months"
    },
    {
        image : farsightsysmte,
        title : "Farsight System",
        slug: "farsight-system",
        description : "Software Agency who provides different solutions in the software industry. From AI-powered applications to custom web development, we help businesses transform their operations and achieve their digital goals with cutting-edge technology.",
        tags : ['tailwind css' , 'css' , "html" , "javascript"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        link : "https://www.farsightsystem.com",
        category: "Enterprise & Agency",
        problem: "A growing software agency needed a website that clearly communicates their full spectrum of services — from AI and web development to custom software — to attract diverse clients.",
        solution: "Created a clean, conversion-focused agency website with clear service sections, portfolio highlights, and streamlined lead capture.",
        results: [
          "Clear communication of service offerings",
          "Improved lead generation through contact forms",
          "Professional brand identity establishment"
        ],
        features: [
          "Service showcase with detailed descriptions",
          "Project portfolio section",
          "Contact and consultation request forms",
          "Clean, professional typography and layout"
        ],
        role: "Frontend Developer",
        duration: "1.5 months"
    },
    {
        image : uswah,
        title : "Portfolio - Uswah Saeed",
        slug: "uswah-saeed-portfolio",
        description : "A landing page which is a portfolio website for a game designer  with a background in computer science and professional experience in game development and user experience and interface",
        tags : ['tailwind css' , 'css' , "html" , "javascript"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        link : "https://uswah-saeed.vercel.app/",
        category: "Digital Experiences",
        problem: "A game designer with a computer science background needed a portfolio that bridges their technical expertise with their creative game design work.",
        solution: "Built a visually rich landing page that presents game design projects alongside technical capabilities in a cohesive, engaging layout.",
        results: [
          "Effectively showcased game design portfolio",
          "Balanced technical and creative presentation",
          "Responsive across devices with smooth interactions"
        ],
        features: [
          "Project gallery with detailed descriptions",
          "Skills and expertise section",
          "Contact and social links"
        ],
        role: "Frontend Developer",
        duration: "1 month"
    },
    {
        image : malblogs,
        title : "Car Finance",
        slug: "car-finance",
        description : "MAL-Blogs is a minimalistic personal blog platform where I share my development journey, technical insights, and experiments with modern tools and frameworks. Built with a clean, distraction-free design, it allows me to focus on creating and publishing content using Markdown/MDX while providing readers with a smooth reading experience.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'Contentfull'],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/mal-blogs",
        link : "https://mal-blogs.vercel.app",
        category: "Digital Experiences",
        problem: "Blogging platforms like Medium and WordPress are cluttered with distractions, ads, and complex editors — neither the writer nor the reader gets a clean experience.",
        solution: "Built a minimalistic, distraction-free blog platform with MDX support, syntax highlighting, and a razor focus on reading experience and content creation.",
        results: [
          "Sub-second page loads with Next.js static generation",
          "Clean, typography-first reading experience",
          "Easy content creation via MDX"
        ],
        features: [
          "MDX/Markdown-based content authoring",
          "Contentful CMS integration for content management",
          "Code syntax highlighting with Shiki",
          "Fast static generation with Next.js"
        ],
        role: "Full-Stack Developer",
        duration: "2 months"
    },

    {
        image : gallery,
        title : "Gallery",
        slug: "gallery",
        description : "This gallery is not just about displaying images—it elevates visual storytelling by combining clean design, metadata richness, and fast performance. It's a testament to creating intuitive, performant experiences for creative content.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'supabase'],
        githubLink : "",
        link : "https://user-gallery-website.vercel.app/",
        category: "Full-Stack Apps",
        problem: "Most image galleries prioritize eye candy over usability — slow load times, poor metadata display, and clunky navigation frustrate users who want to browse visual content efficiently.",
        solution: "Developed a high-performance image gallery with Supabase backend, rich metadata extraction, and a clean grid layout optimized for visual storytelling.",
        results: [
          "Fast image loading with optimized Next.js images",
          "Rich metadata display enhancing each image's context",
          "Smooth, responsive grid across all devices"
        ],
        features: [
          "Image upload and management system",
          "Automatic metadata extraction (EXIF, tags)",
          "Supabase backend for scalable storage",
          "Responsive masonry grid layout"
        ],
        role: "Full-Stack Developer",
        duration: "2 months"
    },
    {
        image : msp,
        title : "MSP Tech Stack",
        slug: "msp-tech-stack",
        description : 'The app is Business to Business marketplace. It has user login system and company login system.',
        tags : ['nextjs' , 'typescript', 'mongodb' , 'nodejs' , "JWT Auth" , "Tailwind CSS"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/MSPTech_Stack",
        link : "https://msp-tech-stack.vercel.app/",
        category: "Full-Stack Apps",
        problem: "B2B marketplaces typically force all users into a single experience, ignoring the fundamentally different needs of individual buyers vs. company purchasing departments.",
        solution: "Built a dual-portal B2B marketplace with separate authentication flows and interfaces for individual users and companies, each tailored to their procurement workflows.",
        results: [
          "Separate, role-optimized portals for users and companies",
          "Secure JWT authentication with role-based access control",
          "Streamlined B2B product discovery and listing"
        ],
        features: [
          "Dual authentication system (user login / company login)",
          "JWT-based secure access control",
          "B2B product listing and advanced search",
          "Admin dashboard with analytics"
        ],
        role: "Full-Stack Developer",
        duration: "3 months"
    },

    {
        image : elygance,
        title : "Elygance",
        slug: "elygance",
        description : "A luxury e-commerce platform for premium fragrances with elegant design and seamless shopping experience.",
        tags : ['nexjts', 'postreSQL ' , 'supabase', 'tailwind css'],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/elygance",
        link : "https://elygance.vercel.app/",
        category: "Full-Stack Apps",
        problem: "A premium fragrance brand needed an e-commerce experience that reflects their luxury positioning — generic storefronts undermine the perception of exclusivity and quality.",
        solution: "Designed a luxury e-commerce platform with elegant typography, refined spacing, a sophisticated color palette, and a frictionless checkout experience.",
        results: [
          "Brand-aligned luxury shopping experience",
          "Smooth, intuitive checkout flow",
          "Premium visual design matching the brand"
        ],
        features: [
          "Product catalog with luxury presentation",
          "Shopping cart with real-time updates",
          "Supabase backend for product management",
          "Responsive design optimized for all devices"
        ],
        role: "Full-Stack Developer",
        duration: "2.5 months"
    },
    
    {
        image: portfolio,
        title : "Portfolio Website",
        slug: "portfolio-website",
        description : "A portofolio website for developers and designers to showcase their skills. It is just a landing page.",
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        tags : ['nexjts', 'typescript', 'tailwind css'],
        link : "https://mustafatawab.vercel.app",
        category: "Digital Experiences",
        problem: "Developers and designers need a professional online presence that showcases their skills, projects, and personality in a way that resonates with potential clients or employers.",
        solution: "Built a modern, minimalist portfolio landing page with a clean layout, project showcase, and clear call-to-action for contact.",
        results: [
          "Clean, professional online presence",
          "Clear demonstration of technical skills",
          "Project showcase with live links"
        ],
        features: [
          "Project showcase with live demos",
          "Skills and technologies highlight section",
          "Contact form for inquiries",
          "Responsive mobile-first design"
        ],
        role: "Developer",
        duration: "1 month"
    },

]
