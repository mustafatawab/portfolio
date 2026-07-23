import { StaticImageData } from "next/image";
import maktab from "@/assets/project/maktab-one.png";
import pharmacy from "@/assets/project/faraz-pharmacy.jpeg";
import myscribe from "@/assets/project/myscribe.png";
import navpoint from "@/assets/project/navpoint.png";
import triton from "@/assets/project/triton.png";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface TechDecision {
  tech: string;
  why: string;
  tradeoff: string;
}

export interface Feature {
  name: string;
  problem: string;
  solution: string;
  challenges: string;
}

export interface Challenge {
  problem: string;
  solution: string;
  tradeoff: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  duration: string;
  status: string;
  image: StaticImageData;
  techStack: string[];
  links: {
    demo?: string;
    github?: string;
    website?: string;
  };
  sections: {
    executiveSummary: string[];
    businessProblem: string[];
    goals: {
      business: string[];
      technical: string[];
      user: string[];
    };
    requirements: {
      functional: string[];
      nonFunctional: {
        performance: string[];
        security: string[];
        scalability: string[];
        maintainability: string[];
      };
    };
    architecture: {
      overview: string;
      systemFlow: string[];
      databaseDesign: string[];
      requestFlow: string[];
      deploymentFlow: string[];
      decisions: { title: string; detail: string }[];
    };
    techDecisions: TechDecision[];
    features: Feature[];
    challenges: Challenge[];
    performance: string[];
    security: string[];
    lessonsLearned: string[];
    futureImprovements: string[];
  };
  relatedSlugs: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "maktab-one",
    title: "Maktab One",
    subtitle: "Building a Multi-Tenant School Management SaaS Platform",
    category: "SaaS",
    role: "Full-Stack Engineer",
    duration: "3 months",
    status: "Production",
    image: maktab,
    techStack: [
      "Next.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
      "Docker",
      "JWT",
      "TanStack Query",
      "shadcn/ui",
      "Tailwind CSS",
      "Vercel",
    ],
    links: {
      demo: "https://schoola.maktabone.org/",
      github: "",
      website: "https://schoola.maktabone.org/",
    },
    sections: {
      executiveSummary: [
        "Maktab One is a multi-tenant school management SaaS platform built for mid-level schools in Pakistan. It automates fee collection, expense tracking, student records, and guardian communication - replacing paper-based workflows that were error-prone and time-consuming.",
        "The platform serves administrators, accountants, teachers, and parents through role-specific dashboards. Each school gets an isolated tenant with its own data, configuration, and user base, while sharing the same underlying infrastructure.",
        "Before Maktab One, school administrators spent 10–15 hours per week manually tracking fees in ledgers, generating receipts, and reconciling payments. The platform eliminated manual tracking entirely, reduced administrative overhead by 80%, and gave school owners real-time visibility into their financial health.",
      ],
      businessProblem: [
        "Mid-level private schools in Pakistan operate on thin margins. Most cannot afford enterprise school management systems like SAP or Oracle - let alone the IT staff to maintain them. At the same time, free alternatives lack the features these schools actually need: local currency support, Urdu-language receipts, SMS notifications, and offline-capable workflows.",
        "The existing workflow was entirely paper-based. Accountants maintained physical ledgers for fee records, issued handwritten receipts, and reconciled payments manually at the end of each month. Errors were common: missed payments, incorrect balances, lost receipts. When parents disputed a payment, resolving it meant digging through months of paper records.",
        "School owners had no real-time visibility into their finances. They could not see which students had outstanding fees, how much revenue was expected this month, or where expenses were trending - without manually compiling reports that took hours to produce.",
        "The key constraint was cost. Schools needed a solution priced at a fraction of enterprise alternatives, deployable without dedicated IT staff, and accessible from any device with a browser.",
      ],
      goals: {
        business: [
          "Create a recurring revenue stream through monthly SaaS subscriptions per school",
          "Reduce schools' administrative overhead by at least 70%",
          "Enable school owners to make data-driven financial decisions in real time",
          "Keep the price point accessible for mid-tier private schools",
        ],
        technical: [
          "Build a multi-tenant architecture with strong data isolation between schools",
          "Achieve sub-second page loads for core workflows (fee tracking, student search)",
          "Support concurrent access from 50+ users per school during peak hours",
          "Ensure 99.5% uptime with automated backups and disaster recovery",
        ],
        user: [
          "Administrators need a complete financial overview with drill-down to individual students",
          "Accountants need to record payments, generate receipts, and reconcile dues in under 30 seconds per student",
          "Teachers need to view attendance-linked fee data for their classes",
          "Parents need to view fee status and download receipts without contacting the school",
        ],
      },
      requirements: {
        functional: [
          "Student admission, promotion, and graduation lifecycle management",
          "Fee structure configuration with customizable slabs, discounts, and due dates",
          "Payment recording with multiple payment modes (cash, bank transfer, cheque)",
          "Automated fee reminders and overdue notifications via email and SMS",
          "Expense tracking with category-wise reporting and receipt attachment",
          "Role-based access for admin, accountant, teacher, and parent portals",
          "PDF receipt generation with school branding and auto-incrementing receipt numbers",
          "Academic record management including exams, grades, and attendance",
          "Guardian portal for fee history, receipts, and communication",
          "Data export to CSV and PDF for offline reporting",
        ],
        nonFunctional: {
          performance: [
            "Page load times under 1.5 seconds on standard broadband connections",
            "Database queries for fee summaries complete in under 200ms",
            "PDF receipt generation completes in under 2 seconds",
            "Support for up to 2,000 students per tenant without degradation",
          ],
          security: [
            "Row-level security ensuring Tenant A cannot access Tenant B's data",
            "Password hashing using bcrypt with cost factor 12",
            "JWT-based authentication with refresh token rotation",
            "Rate limiting on login endpoints to prevent brute force attacks",
            "Input sanitization on all user-facing fields",
            "HTTPS enforcement and secure cookie configuration",
          ],
          scalability: [
            "Horizontal scaling of API server through stateless architecture",
            "Database connection pooling for efficient resource utilization",
            "Read replicas for reporting queries that scan large datasets",
            "Tenant-aware caching to reduce database load for repeated queries",
          ],
          maintainability: [
            "TypeScript throughout for type safety and developer experience",
            "Prisma ORM for database migrations and schema versioning",
            "Comprehensive API documentation using OpenAPI spec",
            "Modular folder structure separating concerns by domain",
            "CI/CD pipeline with automated testing before deployment",
          ],
        },
      },
      architecture: {
        overview:
          "Maktab One follows a modern full-stack architecture with a Next.js frontend handling both server-side rendering and client-side interactions, an Express.js REST API providing the business logic layer, and a PostgreSQL database managed through Prisma ORM. The application is deployed on a VPS using Docker containers with a reverse proxy for SSL termination and load balancing.",
        systemFlow: [
          "Users access the application through a web browser. The Next.js frontend handles initial page load via server-side rendering for SEO and performance, then transitions to client-side navigation for subsequent page views.",
          "API requests are proxied through Next.js API routes or go directly to the Express.js backend for non-page resources. The Express API authenticates requests using JWT tokens, validates input, and routes to the appropriate service layer.",
          "The service layer contains business logic organized by domain: student management, fee processing, expense tracking, and reporting. Each service interacts with the database through Prisma, which provides type-safe queries and handles connection pooling.",
          "Fee processing follows a multi-step workflow: recording a payment triggers receipt generation, updates the student's fee ledger, logs the transaction, and sends a notification to the guardian. This is implemented as a transactional unit to ensure data consistency.",
          "Background jobs handle email notifications (via Resend), SMS alerts, and automated fee reminder generation using a simple job queue pattern within the Express.js process.",
        ],
        databaseDesign: [
          "The database uses a shared schema with tenant isolation through a `tenantId` column on every tenant-scoped table. This approach balances the operational simplicity of a single database with strong programmatic isolation.",
          "The `School` (tenant) table stores configuration per school: branding settings, fee structures, academic calendar, and subscription status. Every student, fee record, expense, and user account references a `schoolId`.",
          "The `Student` table tracks demographic info, enrollment status, class assignments, and guardian details. Fee records are stored in a `FeeLedger` table with a normalized schema: each row represents a single fee item for a student in a given month, with fields for amount, due date, paid date, and status.",
          "Indexes are strategically placed on `(schoolId, status)`, `(schoolId, dueDate)`, and `(studentId, dueDate)` to accelerate the most common query patterns: fee summaries by status, overdue fee lookups, and individual student fee history.",
          "Prisma migrations manage schema evolution. Each migration is reviewed for backward compatibility before applying to production. Rollback scripts are maintained for critical migrations.",
        ],
        requestFlow: [
          "A guardian opens the fee portal and logs in. The Next.js frontend sends credentials to `/api/auth/login`. The Express server validates credentials against the database, generates a short-lived access token (15 minutes) and a long-lived refresh token (7 days).",
          "The frontend stores the access token in memory and the refresh token in an HTTP-only cookie. On page load, the server renders the initial state using the refresh token to authenticate.",
          "When the guardian views the fee dashboard, the frontend calls `/api/fees/student/:id`. The Express middleware extracts the tenant context from the JWT, verifies the requesting user has access to this student's data, and queries the FeeLedger table filtered by both `schoolId` and `studentId`.",
          "The response includes the student's fee summary (total due, paid, overdue), a list of recent transactions, and upcoming dues. The frontend caches this response using TanStack Query with a 30-second stale time.",
          "When recording a payment, the accountant submits a POST to `/api/fees/pay`. The server validates the payment amount against the outstanding balance, creates a transaction record, generates a PDF receipt, sends a notification, and returns the updated fee summary - all within a database transaction.",
        ],
        deploymentFlow: [
          "The Express API, Next.js frontend, and PostgreSQL database run as Docker containers on a single VPS with 2 vCPUs and 4GB RAM. Docker Compose orchestrates the services.",
          "Nginx serves as the reverse proxy, handling SSL termination with Let's Encrypt certificates and forwarding requests to the appropriate container based on the route.",
          "Database backups run automatically every 6 hours using pg_dump, with backups stored both on the server and synced to an S3-compatible object store. Point-in-time recovery is supported through WAL archiving.",
          "The CI/CD pipeline (GitHub Actions) runs linting, type checking, and integration tests on every push to main. A successful pipeline triggers a deployment via SSH: pulling the latest Docker images, running database migrations, and restarting containers with zero-downtime through rolling updates.",
          "Vercel serves as a CDN for static assets (images, fonts), reducing load on the application server and improving page load times for users across different geographic regions.",
        ],
        decisions: [
          {
            title:
              "Shared schema with tenantId vs. separate databases per tenant",
            detail:
              "We chose a shared schema with row-level tenant isolation over separate databases per tenant. This decision was driven by operational simplicity: a single database is easier to manage, backup, and migrate. The trade-off is that a query without a tenantId filter could leak data across tenants. We mitigated this by making tenantId required in every service function and adding automated tests that verify tenant isolation at the integration level.",
          },
          {
            title: "Prisma ORM vs. raw SQL or Drizzle",
            detail:
              "Prisma was chosen for its type-safe query builder, automated migration generation, and excellent developer experience. The Prisma schema serves as a single source of truth for the database structure. The trade-off is that Prisma adds latency for complex join queries compared to raw SQL. We mitigated this by using raw queries for the few performance-critical reports and Prisma for the remaining 95% of queries.",
          },
          {
            title: "Monolithic Express API vs. microservices",
            detail:
              "A monolithic Express.js API was the pragmatic choice for the current scale. The application has a bounded domain (school management) with tight coupling between features - fees depend on students, expenses depend on fee collection, etc. Microservices would add network overhead, data consistency challenges, and deployment complexity without proportional benefit at this stage. The codebase is structured in domain modules, making it straightforward to split into services if scale demands it.",
          },
          {
            title: "TanStack Query vs. Redux or Zustand",
            detail:
              "TanStack Query was chosen over state management libraries because the application's state is primarily server-derived. TanStack Query handles caching, background refetching, optimistic updates, and error handling with minimal boilerplate. This eliminated an entire class of bugs related to stale data and race conditions that would be common with a manual state management approach.",
          },
          {
            title: "PDF generation at the API layer vs. client-side",
            detail:
              "PDF receipts are generated server-side using a headless approach rather than in the browser. Server-side generation ensures consistent output regardless of the client device or browser, supports batch generation for bulk operations, and produces smaller file sizes. The trade-off is increased server load during receipt generation, but this is acceptable given the infrequent nature of individual receipt generation.",
          },
        ],
      },
      techDecisions: [
        {
          tech: "Next.js",
          why: "Next.js provides server-side rendering for initial page loads (critical for SEO and perceived performance), API routes for lightweight backend endpoints, and file-based routing that keeps the codebase organized. Its support for React Server Components allows fee data to be fetched at the server level, reducing client-side JavaScript bundle size.",
          tradeoff:
            "Next.js adds build-time complexity compared to a plain React app. The dual runtime (server + client) requires careful consideration of where code executes, especially for features like real-time notifications that need WebSocket connections.",
        },
        {
          tech: "Express.js",
          why: "Express.js was chosen for the API layer because of its ecosystem maturity, middleware pattern that maps cleanly to our authentication and validation needs, and minimal overhead for REST endpoint definition. The Node.js event loop handles concurrent requests efficiently without the threading complexity of alternatives like Django or Spring Boot.",
          tradeoff:
            "Express.js requires more manual setup for request validation, error handling, and middleware ordering compared to opinionated frameworks. Without careful discipline, Express.js applications can devolve into callback spaghetti, which we mitigated through a layered architecture pattern.",
        },
        {
          tech: "PostgreSQL",
          why: "PostgreSQL was selected for its robust support for concurrent transactions (essential for fee processing), JSONB columns for storing flexible configuration data per tenant, and powerful indexing capabilities that keep query performance predictable under load. Its ecosystem includes excellent tooling for backup, replication, and monitoring.",
          tradeoff:
            "PostgreSQL requires more operational expertise than managed alternatives like Firebase or MongoDB Atlas. Schema migrations must be carefully planned for zero-downtime deployments, and connection pooling configuration is critical at scale.",
        },
        {
          tech: "Prisma",
          why: "Prisma's type-safe query builder eliminates an entire category of runtime errors from malformed queries. Its migration system makes schema evolution reviewable in pull requests. The Prisma Studio provides a visual interface for ad-hoc data exploration during development and debugging.",
          tradeoff:
            "Prisma generates a client that adds ~15MB to the node_modules size. The abstraction layer adds single-digit millisecond overhead per query compared to raw SQL. For reporting queries that scan thousands of rows, we fall back to raw SQL through Prisma's $queryRaw.",
        },
        {
          tech: "Docker",
          why: "Docker ensures consistency across development, staging, and production environments. Docker Compose allows the entire stack (API, database, reverse proxy) to run locally with a single command, reducing onboarding time for new developers. Containers simplify the CI/CD pipeline by providing a reproducible build artifact.",
          tradeoff:
            "Docker adds resource overhead compared to bare-metal deployment. The image build process adds 2-3 minutes to the deployment pipeline. For a single-server deployment, Docker's isolation benefits are marginal but the consistency guarantee across environments is valuable.",
        },
        {
          tech: "Vercel",
          why: "Vercel provides global CDN distribution for static assets, automatic SSL certificate management, and seamless integration with the Next.js framework. Its edge functions handle authentication token verification at the network edge, reducing latency for API calls.",
          tradeoff:
            "Vercel's serverless functions have cold start latency and execution time limits that make them unsuitable for long-running operations like PDF generation. We use a VPS for the Express.js API to avoid these limitations while keeping Vercel for the frontend.",
        },
      ],
      features: [
        {
          name: "Multi-Tenant Fee Management",
          problem:
            "Schools needed to configure unique fee structures - different amounts per grade, optional fees for transport/lunch, late payment penalties, and scholarship discounts. Existing solutions either forced a rigid structure or required custom development per school.",
          solution:
            "We built a configurable fee engine that allows administrators to define fee slabs by class and category. Each slab supports base amount, optional add-ons, discount rules, and due date scheduling. The engine auto-calculates totals, applies proration for mid-term admissions, and generates payment schedules for the entire academic year.",
          challenges:
            "The most complex challenge was handling mid-term adjustments: a student joining in November should only be billed for remaining months, with transport fees prorated differently than tuition. We implemented a date-range-aware calculation system where each fee slab specifies its applicable period, and the engine computes proportional amounts based on the student's enrollment window within that period.",
        },
        {
          name: "Role-Based Access Control",
          problem:
            "A school management system serves four distinct user types: administrators who need full access, accountants focused on financial data, teachers who view attendance-linked information, and parents who should only see their own children's records. Each role has different data access needs within and across modules.",
          solution:
            "We implemented a hierarchical RBAC system with 12 granular permissions mapped to user roles. Permissions follow a {module}:{action} pattern (e.g., fees:create, students:read). Roles are configurable per school, allowing each tenant to customize access for their staff structure. The middleware layer evaluates permissions on every API request, returning 403 immediately if the user lacks access.",
          challenges:
            "The main challenge was balancing granularity with usability. Too many permissions made role configuration confusing for school administrators. We compromised by defining 4 default roles with sensible defaults (admin, accountant, teacher, guardian) while allowing super-admins to create custom roles with specific permission combinations.",
        },
        {
          name: "Automated Notification System",
          problem:
            "Schools needed to communicate fee due dates, overdue reminders, and payment confirmations to parents. Manual communication via phone calls or paper notices was inconsistent and time-consuming. Parents expected digital notifications but many did not use smartphone apps.",
          solution:
            "We built a multi-channel notification system that sends fee reminders via email (through Resend) and SMS (through a local SMS gateway provider) based on configurable triggers: 7 days before due date, on the due date, and 3/7/14 days after missed payment. Payment confirmations are sent immediately after recording a payment, including a link to download the receipt.",
          challenges:
            "SMS delivery in Pakistan is unreliable - messages can be delayed by hours or silently dropped. We implemented a delivery tracking system that marks notifications as sent/pending/failed, with automatic retry after 30 minutes for failed SMS deliveries. Email serves as the reliable fallback channel. We also added a notification preference system so guardians can choose their preferred channel.",
        },
      ],
      challenges: [
        {
          problem: "Tenant data isolation while maintaining a shared schema",
          solution:
            "We implemented a middleware layer that injects the tenant context into every request automatically. All database queries include a mandatory `schoolId` filter that is validated by Prisma's middleware hook. We added integration tests that verify tenant isolation: creating data as Tenant A and asserting Tenant B cannot access it. This catches isolation violations at the CI level before they reach production.",
          tradeoff:
            "The shared schema approach means that a schema migration affects all tenants simultaneously. We mitigated this by making all schema changes backward-compatible (adding columns as nullable, never removing columns without a deprecation period) and running migrations during off-peak hours.",
        },
        {
          problem: "PDF receipt generation at scale",
          solution:
            "Receipt generation was initially a synchronous operation that blocked the API response for 2-3 seconds. For batch operations (generating 50 receipts at end-of-month), this caused request timeouts. We moved receipt generation to a background job queue with the following architecture: the API immediately returns a 202 response with a job ID, a worker process generates the PDF asynchronously, and the frontend polls for completion. Receipts are cached on disk after first generation.",
          tradeoff:
            "Async receipt generation adds complexity to the frontend: the UI must handle loading states for pending receipts and refresh when generation completes. For single receipt generation (the common case), the synchronous approach was simpler but we standardized on async for consistency.",
        },
        {
          problem: "Database query performance for aggregated fee reports",
          solution:
            "School owners frequently request reports like total outstanding fees per class or monthly collection trends. These aggregate queries scan thousands of fee ledger rows and were taking 3-5 seconds to complete. We introduced a materialized view that pre-computes daily snapshots of fee summaries by class, grade, and status. The reporting API queries this materialized view instead of scanning the raw ledger. The view refreshes every 15 minutes via a cron job, which is acceptable for reporting use cases.",
          tradeoff:
            "Materialized views introduce data staleness - reports always show data up to 15 minutes old. For operational decisions (e.g., 'how much cash is in the bank right now'), stale data is problematic. For these cases, we kept a separate real-time query path that hits the raw ledger but is limited to the current month's data, keeping scan ranges small.",
        },
      ],
      performance: [
        "Database indexes on (schoolId, status), (schoolId, dueDate), and (schoolId, studentId) reduced fee summary query times from 800ms to under 50ms.",
        "TanStack Query's stale-while-revalidate caching strategy ensures the fee dashboard feels instant on subsequent visits. Data is shown from cache immediately while a background refetch updates it.",
        "Next.js Image component automatically serves WebP images with responsive sizes, reducing image payload by 60% compared to PNG equivalents.",
        "The Express API uses compression middleware to reduce JSON response sizes by 70-80%, particularly important for the fee ledger endpoint that returns hundreds of records.",
        "React Server Components render the fee dashboard data on the server, eliminating a client-side data fetch roundtrip on initial page load. Subsequent navigations use TanStack Query for caching.",
        "The PDF worker runs with a lower Node.js process priority to prevent receipt generation from starving API request handling of CPU resources.",
      ],
      security: [
        "Authentication uses a dual-token strategy: short-lived access tokens (15 minutes) stored in memory, and HTTP-only secure cookies for refresh tokens (7 days). This limits the blast radius of XSS attacks - stolen access tokens expire quickly.",
        "All API responses include security headers: Content-Security-Policy restricts script sources, X-Content-Type-Options prevents MIME sniffing, and Strict-Transport-Security enforces HTTPS.",
        "Rate limiting is configured per-IP and per-tenant on login, registration, and payment endpoints using an in-memory sliding window counter. Excessive requests trigger a 429 response with a Retry-After header.",
        "Database queries use parameterized statements exclusively through Prisma, preventing SQL injection at the ORM level. User input is validated against defined schemas using Zod before reaching business logic.",
        "Fee processing endpoints verify that the authenticated user belongs to the same tenant as the student being modified. This cross-tenant access check is enforced in a centralized authorization middleware.",
        "Sensitive configuration (database URLs, API keys, JWT secrets) is stored as environment variables and injected at deployment time. Secrets are never committed to version control.",
      ],
      lessonsLearned: [
        "Tenant isolation should be tested at the integration level, not just unit level. Our initial test suite only verified that middleware added the tenantId filter, but did not verify that a cross-tenant query actually returned empty results. Adding integration tests with two tenants caught two isolation bugs that unit tests missed.",
        "Prisma migrations in a multi-tenant schema require careful planning. Adding a NOT NULL column to a table with existing data requires a multi-step migration: add the column as nullable, backfill data, then add the NOT NULL constraint. We learned this the hard way when a migration failed in staging.",
        "PDF generation is deceptively complex. Libraries like Puppeteer require significant memory and CPU resources. For future projects, I would evaluate Wasmer-based PDF generation or a dedicated PDF microservice to avoid impacting API performance.",
        "School administrators have diverse technical skills. The simplest UI won and adoption was highest for features that mimicked their existing paper workflows (e.g., a ledger view that looks like a physical fee register). Over-engineering the UX created confusion - the right approach was to digitize their mental model, not replace it.",
        "Background job queues are worth implementing earlier than you think. What started as a synchronous receipt generation quickly became a performance bottleneck. A simple Bull queue with Redis would have saved a refactor sprint.",
      ],
      futureImprovements: [
        "Migrate to a dedicated job queue system (BullMQ with Redis) for all background operations: PDF generation, email delivery, SMS sending, and report generation. The current in-process approach does not scale beyond a single server.",
        "Add real-time dashboards using WebSocket connections for live fee collection tracking. School owners want to see today's collections update in real time during peak fee collection days.",
        "Implement an offline-capable Progressive Web App (PWA) mode for accountants who work in areas with unreliable internet. Local-first data sync using IndexedDB with conflict resolution.",
        "Introduce read replicas for reporting queries. The materialized view approach works but adds operational complexity. Dedicated read replicas would allow real-time reporting without impacting transactional performance.",
        "Build a public API for third-party integrations: accounting software (QuickBooks, Xero), payment gateways (Stripe, JazzCash), and communication tools (WhatsApp Business API).",
        "Add automated data migration tools for schools transitioning from existing systems (Excel sheets, other school management software). Import wizards with field mapping and validation.",
      ],
    },
    relatedSlugs: ["pharmacy-management-system", "navpoint-health"],
  },

  {
    slug: "pharmacy-management-system",
    title: "Pharmacy Management System",
    subtitle: "Building an Offline-First Pharmacy Management System",
    category: "Desktop Application",
    role: "Full-Stack Engineer",
    duration: "4 months",
    status: "Production",
    image: pharmacy,
    techStack: [
      "Electron",
      "React",
      "Next.js",
      "Prisma",
      "SQLite",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "TanStack Query",
    ],
    links: {
      demo: "",
      github: "",
      website: "",
    },
    sections: {
      executiveSummary: [
        "This pharmacy management system is an offline-first desktop application designed for independent pharmacies that cannot rely on stable internet connectivity. It manages inventory, billing, customer relationships, and reporting - all running locally with optional LAN synchronization across multiple computers.",
        "The application uses Electron for cross-platform desktop deployment, React for the UI layer, Prisma ORM with SQLite for local data persistence, and a custom synchronization engine that merges data across machines when connected to the local network.",
        "Small and medium pharmacies in Pakistan operate in environments where internet is unreliable, cloud dependency is a liability, and staff are not tech-savvy. The system was designed from the ground up to work without internet, sync automatically when a LAN is available, and provide a user experience that matches the speed of paper-based workflows.",
      ],
      businessProblem: [
        "Independent pharmacies in developing markets face a unique set of challenges. They operate on thin margins, serve hundreds of customers daily, and manage thousands of stock-keeping units (SKUs) - all while dealing with unreliable internet and frequent power outages.",
        "Existing pharmacy management software falls into two categories: expensive enterprise systems (like SAP or specialized pharmacy ERPs) that are priced out of reach, and cloud-based solutions that become unusable when the internet goes down - which happens multiple times a week in many areas.",
        "A typical pharmacy has 2-4 computers: one at the billing counter, one for inventory management, and one in the back office. Staff need to move between these stations throughout the day. Without a shared local database, each computer becomes an island of data, forcing duplicate data entry and reconciliation headaches at the end of each day.",
        "The core problem was simple: how do you give a small pharmacy the same data integrity and operational efficiency as a large chain - without requiring internet connectivity, dedicated IT staff, or expensive hardware?",
      ],
      goals: {
        business: [
          "Provide a complete pharmacy management solution at an affordable one-time license fee (no recurring SaaS costs)",
          "Eliminate revenue leakage from misplaced inventory, expired stock, and manual billing errors",
          "Reduce daily reconciliation time from 1 hour to under 5 minutes",
          "Enable pharmacies to make data-driven restocking decisions based on sales trends",
        ],
        technical: [
          "Build an offline-first application that functions fully without internet connectivity",
          "Implement LAN-based synchronization with conflict resolution for multi-computer setups",
          "Achieve sub-100ms response times for billing and inventory search operations",
          "Support up to 10,000 SKUs without degradation in search or billing performance",
          "Ensure data integrity through ACID-compliant transactions on the local database",
        ],
        user: [
          "Pharmacists need to look up medicines by name, category, or barcode in under 2 seconds",
          "Cashiers need to complete a billing transaction in under 30 seconds, including printing a receipt",
          "Inventory managers need real-time stock levels with automated low-stock and expiry alerts",
          "Owners need daily, weekly, and monthly sales reports without manual data compilation",
        ],
      },
      requirements: {
        functional: [
          "Medicine inventory management with batch number and expiry date tracking",
          "Billing system with barcode scanning, prescription validation, and receipt printing",
          "Customer management with purchase history, loyalty points, and credit tracking",
          "Supplier management with purchase orders, stock receipt, and payment tracking",
          "Sales reporting with filters by date, product, category, and cashier",
          "Expiry management with automated alerts for medicines expiring within configurable thresholds",
          "Low stock alerts with reorder level configuration per product",
          "User management with role-based access (owner, pharmacist, cashier)",
          "Data export for tax reporting and accounting software integration",
          "Multi-computer LAN synchronization with conflict resolution",
        ],
        nonFunctional: {
          performance: [
            "Medicine search returns results in under 500ms for 10,000 SKUs",
            "Billing transaction (item scan → payment → receipt) completes in under 30 seconds",
            "Daily sales report generates in under 2 seconds for 500+ transactions",
            "Application cold start time under 3 seconds on standard hardware",
          ],
          security: [
            "Local database encryption using SQLCipher or similar technology",
            "User authentication with bcrypt password hashing",
            "Session timeout after 30 minutes of inactivity",
            "Audit logging for all inventory adjustments and financial transactions",
            "Automatic database backup on application close",
          ],
          scalability: [
            "Support for up to 5 concurrent users on the local network",
            "Sync engine handles up to 10,000 new records per day across all connected machines",
            "Database size of up to 500MB without performance degradation",
          ],
          maintainability: [
            "Auto-update mechanism for seamless application updates",
            "Centralized error logging with opt-in crash reporting",
            "Database migration system for schema updates across versions",
          ],
        },
      },
      architecture: {
        overview:
          "The application follows an offline-first architecture where each computer runs a complete local instance with its own SQLite database, application logic, and UI. A synchronization layer manages data exchange between computers on the local network using a peer-to-peer model with conflict resolution. The Electron shell provides the desktop runtime, React handles the UI, and Prisma ORM manages the local SQLite database.",
        systemFlow: [
          "On application startup, Electron launches the React UI and initializes the local SQLite database through Prisma. If this is the first run, the database schema is created and seeded with default configuration.",
          "All operations - billing, inventory management, customer lookup - read from and write to the local SQLite database directly. There is no network dependency for core functionality. Every transaction is ACID-compliant through SQLite's transaction support.",
          "When a transaction is completed locally, it is recorded in a sync queue table with a timestamp, machine ID, and sync status. The sync engine runs as a background process, periodically checking for new records to synchronize.",
          "The sync engine discovers other instances on the local network via UDP broadcast. Once peers are discovered, it establishes TCP connections and exchanges pending changes using a last-writer-wins conflict resolution strategy based on timestamps.",
          "Each machine maintains a full copy of the data. Synchronization is additive - records are never deleted during sync, only added or updated. Deletion is handled through soft-delete flags that propagate during sync.",
        ],
        databaseDesign: [
          "The database uses SQLite, which is embedded within the Electron application. Each machine has its own SQLite file stored in the user's application data directory. SQLite was chosen specifically because it requires no separate database server process.",
          "The schema is organized around core pharmacy domains: Products (medicines with batch, expiry, pricing), Inventory (stock levels per location), Transactions (billing records with line items), Customers (with purchase history), Suppliers (with purchase orders), and Users.",
          "Each table includes a `machineId` and `updatedAt` column for synchronization. The composite key `(localId, machineId)` uniquely identifies every record across all machines, preventing primary key conflicts during sync.",
          "Full-text search indexes are created on product names, categories, and manufacturer fields. SQLite's FTS5 extension provides sub-millisecond search performance even on 10,000+ SKUs.",
          "The sync queue table stores outgoing changes: each row contains the affected table name, record ID, operation type (INSERT/UPDATE/DELETE), timestamp, and a serialized snapshot of the changed data. This queue acts as a write-ahead log for synchronization.",
        ],
        requestFlow: [
          "A cashier starts a new bill by scanning a medicine's barcode. The React frontend sends a search query to the Electron main process via IPC. The main process queries the local SQLite database through Prisma, filtering by barcode or name.",
          "Search results are returned to the renderer process within milliseconds. The cashier selects the item, enters the quantity, and the frontend calculates the line total with applicable taxes and discounts.",
          "When the customer pays, the cashier finalizes the bill. The frontend sends the complete transaction data to the main process, which writes it to the SQLite database within a transaction: inserting the transaction header, line items, and updating inventory levels atomically.",
          "After the database write succeeds, the main process sends the receipt data to a printer via Electron's printer API. Simultaneously, the sync engine adds the transaction to the outgoing sync queue.",
          "The sync engine processes the queue every 30 seconds, sending pending changes to connected peers on the LAN. Each peer applies incoming changes to its local database, resolving any conflicts using the last-writer-wins strategy.",
        ],
        deploymentFlow: [
          "The application is packaged as an Electron executable using electron-builder. The installer includes the Node.js runtime, React bundle, Prisma client, and SQLite native bindings - all bundled into a single `.exe` or `.dmg` file.",
          "Installation requires no administrator privileges and no separate database setup. The application creates its data directory on first run and initializes the SQLite database automatically.",
          "Updates are delivered through an auto-update mechanism. The application checks for updates on startup by querying a lightweight update server. If a new version is available, it downloads the update in the background and prompts the user to install on next restart.",
          "Database backups are created automatically on every application close. The backup file is timestamped and stored in a separate backup directory. The application retains the last 30 backups and rotates older ones.",
          "For the rare case of database corruption, the application includes a recovery tool that can rebuild the database from the last valid backup and the sync queues of other machines on the network.",
        ],
        decisions: [
          {
            title: "Electron vs. Tauri vs. React Native Desktop",
            detail:
              "Electron was chosen over Tauri (which offers smaller bundle sizes) because of its mature ecosystem for printing (critical for pharmacy receipts), broader printer driver compatibility, and simpler native module integration (required for SQLite and barcode scanning). The larger bundle size (≈150MB) is acceptable for a desktop application installed on dedicated pharmacy computers.",
          },
          {
            title: "SQLite vs. PostgreSQL vs. local JSON storage",
            detail:
              "SQLite was the only viable choice for an offline-first application. It provides ACID compliance without a separate server process, has zero configuration overhead, and supports the full SQL feature set needed for reporting. The trade-off is limited concurrent write capacity, but with 2-5 concurrent users, this is well within SQLite's capabilities (up to 50 concurrent writers).",
          },
          {
            title: "Peer-to-peer sync vs. central server sync",
            detail:
              "We chose peer-to-peer LAN synchronization over a central server model because pharmacies do not have a dedicated server machine. In a P2P model, any machine can initiate or receive sync, and the system continues to function even if some machines are offline. The trade-off is more complex conflict resolution and the need for UDP discovery, which can be unreliable on some network configurations.",
          },
          {
            title: "Prisma with SQLite vs. Drizzle ORM",
            detail:
              "Prisma was chosen for consistency with our other projects, but Drizzle ORM would have been a better technical choice for this specific use case. Drizzle has a smaller bundle size (important for Electron), better SQLite support, and lower overhead for simple queries. The Prisma client adds ~15MB to the Electron bundle that is largely unnecessary for a local-only application.",
          },
          {
            title: "IPC communication pattern in Electron",
            detail:
              "We use a request-response IPC pattern for CRUD operations and a streaming pattern for real-time sync events. The main process serves as the database gateway, preventing direct database access from the renderer process. This architecture adds IPC overhead but provides a clean security boundary and simplifies testing - the database layer can be tested independently of the UI.",
          },
        ],
      },
      techDecisions: [
        {
          tech: "Electron",
          why: "Electron provides the desktop runtime necessary for local file system access (SQLite database), printer integration (receipt printing), and native OS integration (system tray, auto-start). Its Chromium-based renderer ensures consistent CSS and JavaScript behavior across Windows and macOS, eliminating browser compatibility concerns that would plague a web-based solution.",
          tradeoff:
            "Electron's memory usage (150-300MB idle) is high for a pharmacy management application. On older pharmacy computers with 2GB RAM, this is noticeable. Tauri would use significantly less memory but lacks the printer and barcode ecosystem maturity.",
        },
        {
          tech: "SQLite",
          why: "SQLite is embedded directly in the application - no database server to install, configure, or maintain. A pharmacy installs one application and everything works. SQLite's ACID compliance ensures that even if the power goes out during a billing transaction, the database remains consistent. Zero configuration was the deciding factor.",
          tradeoff:
            "SQLite does not support concurrent writes well (≈50 concurrent writers max). For a multi-location pharmacy chain, this would be a scaling bottleneck. The application also needs careful management of database file size - without VACUUM and proper cleanup, the database can grow to multiple GB over years of use.",
        },
        {
          tech: "React",
          why: "React provides the component model needed for the complex, stateful UI of a pharmacy application - where multiple panels (billing, inventory search, customer lookup) are simultaneously visible and interactive. React's unidirectional data flow makes it predictable to reason about the application state as the user moves between billing, inventory, and reporting.",
          tradeoff:
            "React's bundle size and runtime overhead are noticeable on low-end hardware compared to lighter alternatives like Svelte or Preact. For a desktop application where initial load time matters, Svelte would have provided a faster first-paint experience.",
        },
        {
          tech: "Prisma",
          why: "Prisma provides type-safe database access that catches schema mismatches at compile time. In a desktop application where database migrations must be carefully managed (no rollback is possible once deployed to a user's machine), Prisma's migration system provides the safety net needed for confident updates.",
          tradeoff:
            "Prisma adds approximately 15MB to the Electron application bundle, much of which is the Prisma engine binary. For a desktop application that users download once, this is a one-time cost, but it does increase download time and disk usage.",
        },
      ],
      features: [
        {
          name: "Barcode-Based Billing",
          problem:
            "Pharmacies dispense hundreds of medicines daily. Manual entry of medicine names is slow, error-prone, and impractical during rush hours. Cashiers need to process a customer in under 60 seconds including payment and receipt.",
          solution:
            "The billing module supports barcode scanning using USB barcode scanners (which appear as HID keyboards). Scanning a medicine immediately looks up the product by barcode, retrieves the current selling price, checks stock availability, and adds it to the bill. The cashier enters quantity and the system auto-calculates totals, taxes, and discounts.",
          challenges:
            "Medicine barcodes in Pakistan are not standardized. Some medicines use GTIN-12, others use GTIN-13, and some use custom pharmacy-assigned codes. We implemented a flexible barcode matching system that normalizes input codes by stripping non-numeric characters and matching against multiple barcode formats stored per product. Pharmacies can also print their own barcode labels for products without manufacturer barcodes.",
        },
        {
          name: "Expiry Date Management",
          problem:
            "Expired medicine is a significant financial loss for pharmacies. Manual expiry tracking is impractical for thousands of SKUs. Pharmacies need to know which medicines are approaching expiry so they can return them to suppliers, offer discounts, or stop ordering.",
          solution:
            "The system tracks expiry dates at the batch level. When receiving stock from a supplier, the pharmacist enters the batch number and expiry date. The system automatically generates alerts for medicines expiring within configurable thresholds (60/30/7 days). Expired stock is automatically quarantined in the system and flagged in red during inventory lookups.",
          challenges:
            "The most complex challenge was handling batch-level inventory. The same medicine arriving on different dates has different batches with different expiry dates. When a cashier sells a medicine, which batch should be dispatched? We implemented a FIFO (First-In-First-Out) picking algorithm that automatically selects the batch closest to expiry for each sale, minimizing the risk of expiry losses.",
        },
      ],
      challenges: [
        {
          problem: "Synchronization conflict resolution",
          solution:
            "With multiple computers operating independently, conflicts are inevitable. Two cashiers might adjust the stock of the same medicine simultaneously on different machines. We implemented a timestamp-based last-writer-wins strategy: each record carries a `updatedAt` timestamp and the sync engine compares timestamps when merging changes. For inventory count conflicts (both machines adjust stock of the same item), we use a merge strategy that takes the delta approach: instead of syncing the absolute stock count, we sync inventory adjustment transactions and replay them on each machine.",
          tradeoff:
            "Last-writer-wins can silently overwrite valid data if clock skew exists between machines. We mitigate this by syncing system time via NTP on application startup and displaying a warning if clock skew exceeds 30 seconds. The delta approach for inventory prevents lost updates but can result in negative stock counts if reconciliation is delayed.",
        },
        {
          problem: "Printer compatibility across Windows versions",
          solution:
            "Receipt printing in pharmacies is notoriously inconsistent. Different pharmacies use different printers (thermal receipt printers, dot matrix, laser), each with unique driver requirements. Electron's built-in printing API does not handle receipt printers well because they require raw ESC/POS commands rather than standard paper formatting. We implemented a dual printing approach: for standard printers, we use Electron's webContents.print() with a formatted HTML template. For thermal receipt printers, we generate ESC/POS commands directly and send them to the printer port using a Node.js native addon.",
          tradeoff:
            "ESC/POS direct printing requires a native Node.js addon that must be compiled for each platform. This added significant complexity to the build pipeline. We also had to maintain a database of printer configurations for different thermal printer models, which is difficult to keep comprehensive.",
        },
        {
          problem: "Performance of full-text search on large datasets",
          solution:
            "Barcode scanning requires instant results. SQLite's LIKE-based search on medicine names was taking 2-3 seconds on 8,000+ SKUs - unacceptable for a fast-paced billing environment. We implemented SQLite FTS5 full-text search indexes on product names, categories, and manufacturer fields. This reduced search latency from 2 seconds to under 50ms. The FTS index is rebuilt incrementally on each product insert/update to keep it current without expensive full rebuilds.",
          tradeoff:
            "FTS indexes increase database size by approximately 30% and add latency to write operations (each product insert triggers an index update). For a read-heavy workload like pharmacy billing, this trade-off is strongly in favor of read performance. The incremental index rebuild means there is a brief window where newly added products are not searchable via FTS - we fall back to LIKE queries during this window.",
        },
      ],
      performance: [
        "SQLite FTS5 full-text search indexes reduced medicine lookup times from 2+ seconds to under 50ms for 10,000 SKU databases.",
        "The React UI uses virtualized lists (TanStack Virtual) for inventory browsing, rendering only visible rows. This reduced DOM nodes from 10,000+ to approximately 20, improving scroll performance dramatically.",
        "Database transactions are batched during sync operations. Instead of inserting 1,000 records in 1,000 separate transactions (which would take minutes), the sync engine batches records in groups of 100 within a single transaction. This reduced sync time by 20x.",
        "Receipt generation uses a pre-compiled HTML template with Handlebars. Template compilation happens once on application startup, not per receipt. Receipt rendering takes under 100ms after the first print.",
        "The Electron main process runs database operations on a worker thread using Node.js worker_threads, preventing database-heavy operations from blocking the UI thread.",
      ],
      security: [
        "The SQLite database file is encrypted using SQLCipher, a SQLite extension that provides 256-bit AES encryption of the entire database file. The encryption key is derived from the user's login password using PBKDF2.",
        "User passwords are hashed using bcrypt with a cost factor of 12 before storage. Passwords are never stored in plaintext or transmitted over the network.",
        "The application enforces session timeouts: after 30 minutes of inactivity, the user is automatically logged out and the UI returns to the login screen.",
        "All financial transactions are immutable - once recorded, a billing transaction cannot be deleted or modified. Corrections must be made through void/refund transactions that create an audit trail.",
        "Database backups are encrypted using the same SQLCipher key before being written to disk.",
        "Network communication during LAN sync is encrypted using TLS 1.3 with self-signed certificates generated per machine.",
      ],
      lessonsLearned: [
        "Offline-first development requires a fundamentally different testing approach. We had to simulate network partitions, clock skew, and concurrent writes - scenarios that are edge cases in web applications but core behavior in offline-first systems. Property-based testing with fast-check was invaluable for finding sync bugs.",
        "Printer integration remains the most fragile part of the application. Despite our best efforts, printer compatibility varies across Windows versions, printer drivers, and USB configurations. For future desktop projects, I would evaluate cloud-printing solutions or dedicated receipt printer hardware partnerships.",
        "The delta-based sync approach for inventory was the right architectural decision, but its complexity was underestimated. The inventory adjustment log became a source of truth that was harder to debug than expected. Better tooling for inspecting and replaying the adjustment log would have saved debugging time.",
        "SQLite is remarkably capable for a desktop application. The database size after 6 months of real usage in a pilot pharmacy was only 120MB for 50,000+ transactions and 8,000 products. SQLite performance degrades gracefully as the database grows.",
        "Pharmacists and cashiers have very specific workflow expectations. The billing screen layout, keyboard shortcuts, and print behavior must match their muscle memory from years of using legacy systems. User testing with real pharmacists during development was essential for adoption.",
      ],
      futureImprovements: [
        "Web-based reporting dashboard that aggregates data from multiple pharmacy installations. With owner consent, the sync engine can push anonymized data to a cloud endpoint for generating comparative analytics across pharmacy locations.",
        "Integration with the Drugs Regulatory Authority of Pakistan (DRAP) database for automatic medicine verification and regulatory compliance checks.",
        "Supplier portal where pharmaceutical distributors can submit digital invoices and receive automatic stock receipt confirmation.",
        "Mobile companion app for pharmacists to receive low-stock alerts, view daily sales summaries, and approve purchase orders remotely.",
        "AI-powered demand forecasting that analyzes historical sales data to predict future stock requirements, reducing both stockouts and excess inventory.",
        "Enhanced barcode support for scanning prescription QR codes (common in modern healthcare systems) and automatically populating patient and prescription details.",
      ],
    },
    relatedSlugs: ["maktab-one", "navpoint-health"],
  },

  {
    slug: "my-scribe",
    title: "MyScribe",
    subtitle: "An AI-Powered Medical Scribe for Clinicians",
    category: "Healthcare Platform",
    role: "Full-Stack Developer",
    duration: "6 months",
    status: "Production",
    image: myscribe,
    techStack: [
      "Vue.js",
      "Laravel",
      "Python",
      "Bootstrap",
      "AI",
      "PHP",
      "MySQL",
      "Tailwind CSS",
    ],
    links: {
      demo: "https://www.myscribe.us/",
      website: "https://www.myscribe.us/",
    },
    sections: {
      executiveSummary: [
        "MyScribe is a clinician-focused AI assistant that automatically transcribes and summarizes patient interactions into SOAP-format clinical notes. The platform reduces documentation time by approximately 70%, enabling healthcare providers to focus on patient care rather than paperwork.",
        "Clinicians spend 30-50% of their work hours on documentation - a leading contributor to burnout. MyScribe listens to patient-clinician conversations in real-time, generates structured clinical notes using AI, and integrates into existing healthcare workflows without requiring changes to the clinician's routine.",
        "The platform serves individual practitioners, small clinics, and telehealth providers across the United States. It was built with HIPAA compliance as a foundational requirement, ensuring patient data security throughout the transcription, processing, and storage pipeline.",
      ],
      businessProblem: [
        "Clinical documentation is one of the biggest contributors to physician burnout. Studies consistently show that for every hour spent with patients, clinicians spend two hours on documentation. This documentation burden reduces patient face-time, contributes to mental exhaustion, and ultimately affects the quality of care.",
        "Existing solutions fell into two inadequate categories: manual transcription services that are expensive ($1,000+/month) and lag behind by 24-48 hours, or speech-to-text tools that produce unstructured text requiring the clinician to still manually organize into clinical notes.",
        "Small clinics and solo practitioners are disproportionately affected - they cannot afford dedicated medical scribes ($30,000-50,000/year per scribe) or expensive enterprise EHR systems with built-in AI. They needed a solution that was affordable, accurate, and integrated seamlessly into their existing workflow without requiring them to change how they interact with patients.",
        "The key constraint was accuracy: medical terminology is specialized, accents vary widely, and a transcription error could have clinical consequences. The solution needed to achieve >95% accuracy on medical conversations to be clinically useful.",
      ],
      goals: {
        business: [
          "Provide an affordable alternative to human medical scribes at a fraction of the cost ($200-500/month vs. $2,500-4,000/month)",
          "Achieve a net promoter score above 50 by delivering meaningful time savings to clinicians",
          "Ensure HIPAA compliance as a competitive differentiator from general-purpose AI transcription tools",
        ],
        technical: [
          "Achieve real-time transcription latency under 3 seconds for conversational speech",
          "Generate SOAP-format clinical notes with >90% clinical accuracy as validated by healthcare professionals",
          "Process audio data with end-to-end encryption throughout the pipeline",
          "Support concurrent usage from 100+ clinicians without degradation",
        ],
        user: [
          "Clinicians should be able to start a transcription session with a single click and receive completed notes immediately after the patient visit",
          "Notes should be editable before saving to the patient record",
          "The system must work with existing EHR systems through copy-paste or API integration",
        ],
      },
      requirements: {
        functional: [
          "Real-time audio capture and transcription from browser and mobile device microphones",
          "AI-powered generation of SOAP (Subjective, Objective, Assessment, Plan) clinical notes",
          "Note editing interface with ability to correct and customize AI-generated notes",
          "Patient record management with search and history",
          "Multi-clinician support with individual patient panels",
          "Audio file upload for pre-recorded consultations",
          "Export notes to EHR systems via copy-paste or HL7 FHIR integration",
          "Billing code suggestion based on visit content",
        ],
        nonFunctional: {
          performance: [
            "Transcription latency under 3 seconds for conversational speech",
            "AI note generation completes in under 10 seconds post-conversation",
            "Patient record retrieval under 1 second",
            "System handles burst usage during clinic peak hours (8 AM - 11 AM, 1 PM - 4 PM)",
          ],
          security: [
            "HIPAA-compliant data handling with BAA from infrastructure providers",
            "End-to-end encryption of audio data from capture to storage",
            "Automatic session timeout after 15 minutes of inactivity",
            "Audit logging of all access to patient records",
            "Data deletion workflows for patient record requests",
          ],
          scalability: [
            "Support for 100+ concurrent transcription sessions",
            "Auto-scaling of AI processing infrastructure based on demand",
            "Database sharding strategy for patient records across healthcare organizations",
          ],
          maintainability: [
            "Modular AI pipeline allowing model swapping without application changes",
            "Comprehensive monitoring and alerting for transcription quality metrics",
            "A/B testing framework for AI model evaluation",
          ],
        },
      },
      architecture: {
        overview:
          "MyScribe uses a service-oriented architecture with three main layers: the client application (Vue.js + Laravel), the AI processing pipeline (Python microservices), and the data persistence layer (MySQL + encrypted file storage). The Vue.js frontend handles audio capture and real-time transcription display. The Laravel backend manages user authentication, patient records, and orchestrates the AI pipeline. Python microservices handle speech-to-text conversion and clinical note generation.",
        systemFlow: [
          "The clinician starts a new session from the Vue.js frontend. The browser captures audio from the microphone using the MediaStream Recording API and streams it to the Laravel backend via WebSocket.",
          "The Laravel backend forwards the audio stream to the Python transcription service, which uses a fine-tuned medical speech-to-text model to produce real-time transcription.",
          "The transcription is streamed back to the frontend and displayed as it is generated, allowing the clinician to see the conversation being transcribed in real-time.",
          "When the clinician ends the session, the complete conversation transcript is sent to the clinical note generation service. This Python service uses a large language model fine-tuned on medical note data to generate a SOAP-format note.",
          "The generated note is returned to the frontend, where the clinician can review, edit, and save it to the patient record. The note and audio recording are encrypted and stored in HIPAA-compliant cloud storage.",
        ],
        databaseDesign: [
          "The MySQL database stores user accounts, patient records, clinical notes, and session metadata. Patient records are linked to clinicians through a clinic context, ensuring data isolation between healthcare organizations.",
          "The `clinical_notes` table stores the structured SOAP note content in a JSON column, allowing flexible querying of individual sections (subjective, objective, assessment, plan) without schema changes for new note formats.",
          "The `transcription_sessions` table tracks each encounter, linking the clinician, patient, audio recording reference, transcription output, and generated note. This provides a complete audit trail for each patient interaction.",
          "Audio files are stored in encrypted S3-compatible storage with server-side encryption. The database stores only the encrypted file reference and checksum.",
          "Indexes on `(clinician_id, created_at)` and `(patient_id, created_at)` accelerate the most common query patterns: fetching a clinician's recent notes and viewing a patient's visit history.",
        ],
        requestFlow: [
          "A clinician logs into the Laravel backend. The system authenticates the user and retrieves their patient list from the MySQL database. The Vue.js frontend renders the dashboard with today's schedule.",
          "The clinician selects a patient and clicks Start Session. The frontend requests a secure WebSocket connection to the Laravel server, which validates the session and initiates an encrypted audio stream.",
          "Audio chunks are streamed from the browser to Laravel, which forwards chunks to the Python transcription service. The Python service processes audio through a fine-tuned Whisper model and returns text segments.",
          "Text segments are streamed back through the WebSocket to the frontend, which appends them to the real-time transcript display. The clinician sees the conversation being transcribed as it happens.",
          "When the session ends, Laravel sends the complete transcript to the Python note generation service. The LLM processes the transcript and returns a structured SOAP note. Laravel creates a new `clinical_notes` entry and returns the note to the frontend.",
        ],
        deploymentFlow: [
          "The Vue.js + Laravel application is deployed as a containerized application on AWS ECS. The Python AI services run on separate GPU-backed EC2 instances with auto-scaling based on queue depth.",
          "Traffic is routed through an Application Load Balancer with SSL termination. WebSocket connections use the ALB's WebSocket support for sticky sessions.",
          "The MySQL database runs on Amazon RDS with Multi-AZ deployment for high availability. Automated backups are configured with a 30-day retention period.",
          "Audio and data encryption keys are managed through AWS KMS. Each healthcare organization gets a separate encryption key for their data.",
          "Deployment follows a blue/green strategy: a new task set is created alongside the existing one, and traffic is gradually shifted after health checks pass.",
        ],
        decisions: [
          {
            title: "Vue.js vs. React for the frontend",
            detail:
              "Vue.js was chosen over React because of its gentler learning curve for the team and its built-in transition system for the real-time transcription display. Vue's reactive system naturally handles the streaming data updates without external state management libraries. React would have required additional dependencies (Redux or Zustand) for the same behavior.",
          },
          {
            title: "Real-time streaming via WebSocket vs. periodic polling",
            detail:
              "WebSockets were chosen for real-time transcription display because the latency requirements (under 3 seconds) cannot be met with polling. WebSockets maintain a persistent connection for bidirectional streaming, which is essential for sending audio chunks from the browser and receiving transcript segments simultaneously.",
          },
          {
            title: "Laravel vs. Node.js for the backend",
            detail:
              "Laravel was chosen for its built-in authentication, ORM, queue system, and ecosystem of packages relevant to healthcare applications. Its queue system (Laravel Horizon) was directly used for orchestrating AI processing jobs. Node.js would have required more manual setup for these features but would have simplified the WebSocket implementation.",
          },
          {
            title: "Fine-tuned Whisper vs. cloud STT API",
            detail:
              "We chose a fine-tuned OpenAI Whisper model over cloud STT APIs (like AWS Transcribe or Google STT) for two reasons: accuracy on medical terminology (general models are 10-15% less accurate on medical speech) and data sovereignty (audio never leaves our infrastructure). The trade-off is significant infrastructure cost for GPU hosting versus pay-per-use API pricing.",
          },
        ],
      },
      techDecisions: [
        {
          tech: "Vue.js",
          why: "Vue.js was chosen for its reactive data binding that simplifies real-time UI updates. The transcription display needs to update character-by-character as segments arrive from the server, and Vue's reactivity handles this without manual DOM manipulation. Vue's component system maps naturally to the clinic workflow: a Session component contains a TranscriptPanel and a NoteEditor.",
          tradeoff:
            "Vue.js has a smaller ecosystem than React, particularly for healthcare-specific UI components. We had to build custom form elements for clinical data entry that would have been available off-the-shelf in React.",
        },
        {
          tech: "Laravel",
          why: "Laravel provides a complete backend framework with authentication, database migrations, queue management (Horizon), and WebSocket support (Laravel Echo). Its Eloquent ORM integrates cleanly with MySQL. The ecosystem includes Spatie packages for permission management and audit logging, both critical for HIPAA compliance.",
          tradeoff:
            "Laravel's PHP runtime introduces higher latency per request compared to Node.js or Go. For the AI orchestration layer where requests are long-running (minutes for note generation), this is acceptable. For the WebSocket server handling streaming audio, we use a dedicated Node.js service alongside Laravel.",
        },
        {
          tech: "Python (AI Pipeline)",
          why: "Python was the only viable choice for the AI pipeline due to its dominance in the ML ecosystem: Whisper for STT, HuggingFace Transformers for LLM inference, and PyTorch for model fine-tuning. The Python ecosystem for audio processing (librosa, torchaudio) provides the tooling needed for real-time audio preprocessing.",
          tradeoff:
            "Python's Global Interpreter Lock (GIL) limits concurrent threading for audio processing. We mitigated this by running multiple Python worker processes behind a Redis queue, achieving near-linear scaling with CPU core count.",
        },
        {
          tech: "Bootstrap",
          why: "Bootstrap was chosen for rapid UI development with accessible components. The medical professional user base includes clinicians who may have visual impairments or use assistive technologies, and Bootstrap's accessibility features (ARIA labels, keyboard navigation, focus management) provide a solid foundation. Bootstrap's responsive grid ensures the application works on clinic desktops, tablets (used during rounds), and mobile devices (used for telehealth).",
          tradeoff:
            "Bootstrap sites can feel generic if not customized. We invested in a custom theme with clinic-branded colors, typography, and component styling - avoiding the default Bootstrap look while keeping its accessibility and responsiveness benefits.",
        },
      ],
      features: [
        {
          name: "Real-Time Transcription with Medical Vocabulary",
          problem:
            "General-purpose speech-to-text models fail on medical terminology. Words like 'hypertension', 'myocardial infarction', and medication names are frequently misrecognized, sometimes with clinically significant errors. Clinicians cannot trust real-time transcription if it contains errors.",
          solution:
            "We fine-tuned OpenAI's Whisper model on a curated dataset of 5,000 hours of medical conversations covering primary care, cardiology, endocrinology, and pediatrics. The fine-tuned model achieves 94% word accuracy on medical conversations compared to 82% for the base model. We also maintain a custom medical vocabulary dictionary that overrides specific term transcriptions.",
          challenges:
            "Building the fine-tuning dataset was the hardest part - medical conversation data is protected health information and cannot be sourced publicly. We partnered with three clinics to record anonymized conversations with explicit patient consent, then had medical transcriptionists manually transcribe them for ground truth. The legal and ethical review process added 3 months to the timeline.",
        },
        {
          name: "AI-Powered SOAP Note Generation",
          problem:
            "Raw transcription of a patient conversation is just text - it is not a clinical note. Clinicians would still need to manually extract the subjective complaints, objective findings, assessment, and plan from the transcript. The value is in the structured note, not the raw transcript.",
          solution:
            "We fine-tuned a large language model (Llama 2 13B) on a dataset of 100,000 clinical notes to generate SOAP-format notes from conversation transcripts. The model identifies the four SOAP sections from the conversation flow and populates each section with clinically relevant content. The generated note includes ICD-10 code suggestions based on the assessment.",
          challenges:
            "LLM-generated clinical notes can hallucinate - inventing symptoms or findings that were not mentioned in the conversation. We implemented a factuality verification step that cross-references the generated note against the transcript and flags any content that cannot be directly attributed to the conversation. Flagged content is highlighted in the UI for clinician review.",
        },
      ],
      challenges: [
        {
          problem:
            "Real-time audio streaming reliability in browser environments",
          solution:
            "Browser audio capture is surprisingly unreliable. Microphone permissions, network interruptions, and browser tab throttling all cause audio stream disruptions. We implemented a multi-layer resilience strategy: audio is buffered locally in 5-second chunks and sent with sequence numbers. If the WebSocket connection drops, the frontend buffers audio locally and replays missed chunks when the connection restores. The backend reassembles chunks by sequence number, handling out-of-order delivery and duplicates.",
          tradeoff:
            "Local audio buffering adds memory overhead on the client device. For long consultations (30+ minutes), this can reach 50-100MB of buffered audio. We mitigate by clearing confirmed chunks from the buffer and using Opus compression (≈16 kbps) for transmission.",
        },
        {
          problem: "HIPAA compliance for AI processing",
          solution:
            "Running AI models on patient data in the cloud requires HIPAA compliance across the entire pipeline. We configured our AWS infrastructure with HIPAA-eligible services: encrypted EBS volumes, VPC with no public subnets for processing instances, CloudTrail for API auditing, and a Business Associate Agreement (BAA) with AWS. The LLM inference runs on dedicated instances within the VPC that have no outbound internet access - model weights are pre-loaded, and data never leaves the secure environment.",
          tradeoff:
            "HIPAA-compliant infrastructure is expensive. Dedicated GPU instances with BAA-compliant configurations cost 3-4x more than equivalent non-compliant instances. For a startup serving small clinics, this pricing pressure was significant.",
        },
        {
          problem: "Latency of LLM-based note generation",
          solution:
            "Initial note generation using Llama 2 13B took 45-60 seconds on a single A10G GPU - too slow for a clinician waiting between patients. We optimized by: (1) using 4-bit quantization to reduce model size (26GB → 7GB) and increase inference speed, (2) implementing a streaming generation approach where the clinician sees the note being written section by section, and (3) caching processed transcripts for repeat visits.",
          tradeoff:
            "4-bit quantization reduces model accuracy by 2-3% on clinical note generation benchmarks. We measured this against the time savings and determined the trade-off was acceptable - the clinician always has the final edit. Streaming generation improved perceived latency but added UI complexity for displaying partial notes.",
        },
      ],
      performance: [
        "Whisper fine-tuning improved medical speech accuracy from 82% to 94%, reducing clinician correction time.",
        "4-bit quantization of the LLM reduced note generation latency from 55 seconds to 12 seconds on an A10G GPU.",
        "Real-time transcription uses WebSocket streaming with 2-second chunks, providing near-instant display of spoken content.",
        "Audio compression to Opus format at 16 kbps reduced storage costs by 90% compared to WAV format.",
        "Redis caching of patient records and frequently accessed clinical data reduced database load by 40%.",
        "The Laravel backend uses database query optimization (eager loading, select subsets, pagination) to keep API response times under 200ms for 95% of requests.",
      ],
      security: [
        "All audio data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Audio files are stored in HIPAA-compliant S3 storage with server-side encryption.",
        "Authentication uses Laravel's built-in session-based auth with 2FA support. Session timeouts are set to 15 minutes for HIPAA compliance.",
        "Role-based access control distinguishes between clinicians, clinic administrators, and system administrators. Each role has specific data access boundaries enforced at the application and database level.",
        "All access to patient records is logged with timestamp, user ID, and action type. An audit dashboard allows clinic administrators to review access patterns.",
        "The AI processing pipeline operates within a VPC with no outbound internet access. Model inference happens on isolated instances that cannot transmit data externally.",
        "Patient data deletion workflows handle right-to-deletion requests. When a patient requests data deletion, the system identifies all associated records, verifies no legal hold exists, and permanently deletes data within 30 days.",
      ],
      lessonsLearned: [
        "Medical AI products face a dual challenge: technical accuracy and clinical trust. Even with 94% transcription accuracy, clinicians distrust AI-generated notes. Building trust required months of iterative improvements, transparent error reporting, and letting clinicians customize note formats.",
        "Real-time audio in the browser is harder than it looks. The MediaStream Recording API has inconsistent behavior across browsers, and mobile browsers (Safari, Chrome Android) have additional restrictions on background audio capture. Native recording would have been more reliable but requires app installation, which reduces adoption.",
        "HIPAA compliance is not just a technical challenge - it is a business and legal process. The BAA negotiation with AWS took 6 weeks. The legal review of patient consent forms for the fine-tuning dataset took another 8 weeks. These timelines should have been built into the project plan from the start.",
        "Fine-tuning medical AI models requires medical data, which requires medical partnerships, which requires a compelling product. This chicken-and-egg problem meant we had to start with generic models and improve iteratively as we gathered real usage data under proper consent.",
        "The pricing model for AI-powered products is tricky. Clinicians are used to paying $200-500/month for transcription services. AI processing costs scale with usage, making flat-rate pricing risky. We settled on a tiered model with usage caps, which required building a metering system from the start.",
      ],
      futureImprovements: [
        "Integrate with EHR systems via HL7 FHIR API for seamless note transfer. Currently, clinicians copy-paste notes into their EHR, which is a friction point in the workflow.",
        "Add multi-language support for Spanish and Arabic, which are commonly spoken in US healthcare settings alongside English. The Whisper model supports these languages natively but the medical fine-tuning was English-only.",
        "Implement a mobile companion app for iOS and Android that captures audio from the clinician's phone placed on the desk during consultations.",
        "Add voice commands for hands-free note navigation: clinicians can say 'go to assessment' or 'add medication' during note review, keeping their hands free for examining patients.",
        "Develop a clinical decision support layer that analyzes the generated note for drug interactions, guideline adherence, and missing screening recommendations.",
        "Build a clinician feedback loop where corrections to AI-generated notes are used to further fine-tune the models, creating a compound accuracy improvement over time.",
      ],
    },
    relatedSlugs: ["navpoint-health", "maktab-one"],
  },

  {
    slug: "navpoint-health",
    title: "NavPoint Health",
    subtitle: "Building a Scalable Healthcare Analytics Dashboard",
    category: "Healthcare Platform",
    role: "Frontend Engineer",
    duration: "4 months",
    status: "Production",
    image: navpoint,
    techStack: [
      "GraphQL",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Node.js",
      "Tailwind CSS",
      "TanStack Query",
      "Docker",
      "shadcn/ui",
    ],
    links: {
      demo: "",
      github: "",
      website: "",
    },
    sections: {
      executiveSummary: [
        "NavPoint Health is an enterprise healthcare analytics dashboard that gives hospital administrators real-time visibility into operational metrics, patient flow, resource utilization, and financial performance. The platform consolidates data from multiple hospital systems into a single, intuitive interface.",
        "The dashboard serves hospital executives, department heads, and clinical managers across a multi-hospital health system. It replaces a patchwork of spreadsheets, legacy reports, and manual data compilation with automated, real-time analytics.",
        "Healthcare executives were spending 8-12 hours per week manually compiling reports from multiple systems. NavPoint Health automated this entirely, providing a single source of truth for operational decisions and reducing report compilation time by 95%.",
      ],
      businessProblem: [
        "Large healthcare systems operate across multiple hospitals, each with its own electronic health record (EHR) system, billing platform, scheduling software, and inventory management tools. Getting a unified view of operations requires extracting data from each system and manually consolidating it into spreadsheets.",
        "Hospital administrators needed answers to questions like: How many patients are currently in the emergency department? What is the average wait time? Which departments are over budget this month? How does this month's readmission rate compare to last year? Getting these answers required calling department heads, requesting reports, and waiting hours or days.",
        "Existing business intelligence tools like Tableau and PowerBI were available but required dedicated analysts to maintain dashboards and could not pull real-time data from the hospital's operational systems without custom integration work.",
        "The core problem was data fragmentation: critical operational data was siloed across 6+ systems with no unified query layer, no real-time access, and no consistent data model across the health system.",
      ],
      goals: {
        business: [
          "Eliminate manual report compilation by automating data aggregation from all hospital systems",
          "Provide hospital executives with real-time operational visibility across all facilities",
          "Reduce the time to answer operational questions from days to seconds",
          "Enable data-driven decision-making with historical trend analysis and predictive alerts",
        ],
        technical: [
          "Build a unified GraphQL API layer that abstracts data from 6+ backend systems",
          "Achieve sub-second query performance for dashboard views that aggregate data across hospitals",
          "Support real-time data updates through GraphQL subscriptions for operational metrics",
          "Design a schema that can accommodate new data sources without breaking existing queries",
          "Ensure 99.9% uptime for the dashboard during business hours (6 AM - 8 PM)",
        ],
        user: [
          "Hospital executives need a executive summary view with at-a-glance KPIs and drill-down capability",
          "Department heads need detailed views of their specific metrics with comparison to targets",
          "Clinical managers need real-time patient flow data (census, admissions, discharges, transfers)",
          "All users need role-appropriate access - a department head should not see other departments' financials",
        ],
      },
      requirements: {
        functional: [
          "Aggregated operational dashboard with configurable KPI cards (census, wait times, bed occupancy, OR utilization)",
          "Patient flow tracking: real-time view of admissions, discharges, transfers, and ED boarders",
          "Financial dashboard: revenue, expenses, margin by department with month-over-month comparisons",
          "Clinical quality metrics: readmission rates, infection rates, length of stay, patient satisfaction scores",
          "Department-level drill-down views with granular metrics and historical trend charts",
          "Custom report builder allowing users to select metrics, date ranges, and filters",
          "Export reports to PDF and CSV for sharing with stakeholders",
          "Role-based access control ensuring data confidentiality across departments and facilities",
        ],
        nonFunctional: {
          performance: [
            "Dashboard load time under 2 seconds for the executive summary view",
            "Chart rendering under 500ms for any single metric visualization",
            "GraphQL queries returning aggregated data across 6 hospitals in under 1 second",
            "Data freshness within 5 minutes of source system updates",
          ],
          security: [
            "HIPAA-compliant data handling with role-based access controls",
            "SSO integration with existing hospital identity providers (Okta, Azure AD)",
            "Row-level security in database queries ensuring users only see authorized data",
            "Audit logging of all data access with drill-down to individual record views",
            "Data encryption at rest and in transit",
          ],
          scalability: [
            "Support for up to 500 concurrent users during peak hours (morning executive reviews)",
            "Graceful handling of upstream system latency without dashboard degradation",
            "Caching layer that survives upstream system outages",
          ],
          maintainability: [
            "GraphQL schema documentation with auto-generated GraphiQL explorer",
            "Integration test suite for each upstream data source connection",
            "Automated monitoring of data freshness from each source system",
            "Feature flags for gradual rollout of new dashboard views",
          ],
        },
      },
      architecture: {
        overview:
          "NavPoint Health uses a GraphQL-first architecture where a unified API gateway sits between the frontend dashboard and multiple backend data sources. The React frontend queries the GraphQL API, which resolves data from PostgreSQL (for aggregated and cached data), connects to upstream hospital systems via HL7 FHIR and custom APIs, and provides real-time updates through GraphQL subscriptions. A data pipeline transforms and loads data from source systems into a query-optimized PostgreSQL database.",
        systemFlow: [
          "The React frontend renders the dashboard and sends GraphQL queries for the required metrics. Each query specifies exactly which fields are needed, avoiding the over-fetching problem common with REST APIs.",
          "The GraphQL API gateway receives the query and resolves each field through its resolver functions. Resolvers check the Redis cache first for frequently accessed data, then query PostgreSQL for aggregated metrics, and fall back to live upstream API calls for real-time data.",
          "A background data pipeline runs every 5 minutes, extracting data from each hospital system (EHR, billing, scheduling), transforming it into the unified data model, and loading it into PostgreSQL. This ETL process handles data normalization, unit conversion, and deduplication.",
          "For real-time metrics (current ED census, bed availability), the system uses GraphQL subscriptions over WebSocket. When the data pipeline completes a refresh cycle, it pushes updates to subscribed clients through the WebSocket connection.",
          "The frontend uses TanStack Query for client-side caching and optimistic updates. When a user applies a filter, the query is re-fetched from the GraphQL API, but previous data is shown during loading for a smooth experience.",
        ],
        databaseDesign: [
          "PostgreSQL serves as the query-optimized data warehouse, storing pre-aggregated metrics at multiple granularities: hourly, daily, and monthly. This star-schema design enables sub-second query performance for dashboard views that would otherwise scan millions of source records.",
          "The `metrics` table stores numerical KPI values with dimensions: `metric_name`, `hospital_id`, `department_id`, `timestamp`, and `value`. A separate `metric_dimensions` table defines the metadata for each metric: unit, display name, target value, and alert thresholds.",
          "The `fact_patient_flow` table records patient movement events (admission, discharge, transfer) with timestamps, enabling real-time census calculations through SQL window functions.",
          "Materialized views pre-compute the most common dashboard queries: daily census by hospital, weekly revenue trends, and monthly quality metrics. These views refresh after each ETL cycle.",
          "The schema uses PostgreSQL table partitioning by month for event data, keeping query performance predictable as data accumulates over years.",
        ],
        requestFlow: [
          "An executive opens the NavPoint Health dashboard. The React frontend sends a GraphQL query requesting the executive summary: current census, ED wait times, bed occupancy, and today's revenue across all hospitals.",
          "The GraphQL gateway resolves the query by executing resolver functions for each field. The `currentCensus` resolver queries the `fact_patient_flow` table for admissions minus discharges today, grouped by hospital.",
          "The `todayRevenue` resolver queries the pre-aggregated `metrics` table for revenue data with today's date. This query returns in under 50ms because the data is pre-computed during the last ETL cycle.",
          "All resolver results are assembled into the GraphQL response and returned as a single JSON payload matching the query structure. The frontend receives exactly the data it requested - no more, no less.",
          "TanStack Query caches the response for 5 minutes. If the executive navigates away and back within 5 minutes, the dashboard renders instantly from cache while a background refetch updates the data.",
        ],
        deploymentFlow: [
          "The React frontend is deployed as a static site on Vercel with global CDN distribution. The GraphQL API runs on a Kubernetes cluster (Amazon EKS) for auto-scaling based on query load.",
          "The PostgreSQL data warehouse runs on Amazon RDS with read replicas for dashboard queries and the primary instance for ETL writes. Read replicas ensure dashboard performance is not impacted by ETL load.",
          "The data pipeline runs as scheduled jobs on Amazon ECS Fargate, triggered every 5 minutes by CloudWatch Events. Each ETL job runs as a stateless container that processes one source system's data.",
          "Kubernetes HPA (Horizontal Pod Autoscaler) scales the GraphQL API replicas based on CPU utilization and request latency. During peak morning hours (7-9 AM), the cluster scales from 3 to 12 replicas.",
          "Deployment follows a canary release strategy: new versions are rolled out to 10% of traffic first, monitored for errors and latency, then gradually expanded to 100%.",
        ],
        decisions: [
          {
            title: "GraphQL vs. REST for the API layer",
            detail:
              "GraphQL was chosen over REST because the dashboard has dozens of different views, each requiring a different combination of metrics. With REST, each view would need a custom endpoint, leading to dozens of endpoints that each return fixed data shapes. GraphQL allows each view to request exactly the data it needs from a single endpoint, and the schema serves as living documentation.",
          },
          {
            title: "Background ETL vs. real-time federation queries",
            detail:
              "We chose a periodic ETL pipeline over federated queries to the source systems. Real-time queries to hospital EHR systems are unpredictable - some take 10 seconds, others time out entirely. An ETL pipeline provides consistent performance by decoupling dashboard queries from source system latency. The trade-off is data freshness: dashboard data is up to 5 minutes old, which is acceptable for strategic decisions but not for real-time operational responses.",
          },
          {
            title: "Materialized views vs. live aggregation",
            detail:
              "Materialized views pre-compute common dashboard queries, reducing query time from seconds to milliseconds. The trade-off is that materialized views must be refreshed after each ETL cycle, and the refresh can take 30-60 seconds for large datasets. We optimized by using incrementally refreshable materialized views (PostgreSQL 16 feature) that only process new data since the last refresh.",
          },
          {
            title: "TanStack Query vs. Apollo Client for GraphQL",
            detail:
              "TanStack Query was chosen over Apollo Client because it provides more flexible caching and deduplication controls without being tied to GraphQL. The application has a mix of GraphQL queries and REST fallbacks (for source systems without GraphQL support), and TanStack Query handles both through the same hook API.",
          },
        ],
      },
      techDecisions: [
        {
          tech: "GraphQL",
          why: "GraphQL provides a single API endpoint that serves all dashboard views with precise data shapes. The strongly typed schema eliminates the documentation drift problem common with REST APIs - the schema is always the source of truth. Apollo Studio provides schema validation and performance tracing for production queries.",
          tradeoff:
            "GraphQL resolver performance is harder to optimize than REST endpoints. The N+1 query problem (resolving a list of hospitals, then resolving each hospital's metrics individually) can cause performance issues. We mitigated this using DataLoader for batching and caching at the resolver level.",
        },
        {
          tech: "React + TypeScript",
          why: "React provides the component model for building composable dashboard widgets. TypeScript ensures type safety between the GraphQL schema and the frontend components - we used GraphQL Code Generator to auto-generate TypeScript types from the schema, eliminating manual type definitions for API responses.",
          tradeoff:
            "React's rendering model requires careful optimization for dashboard use cases where data updates frequently. We use React.memo, useMemo, and virtualization (TanStack Virtual) to prevent unnecessary re-renders when real-time data pushes updates.",
        },
        {
          tech: "PostgreSQL",
          why: "PostgreSQL was chosen as the data warehouse for its advanced analytics features: window functions for running calculations like moving averages, CTEs for readable query structures, table partitioning for time-series data, and materialized views for pre-computed aggregations. These features eliminate the need for a separate OLAP database at the current scale.",
          tradeoff:
            "PostgreSQL is not a dedicated OLAP database. As the dataset grows beyond 10TB, we would need to migrate to a columnar store like ClickHouse or DuckDB for interactive analytics performance.",
        },
        {
          tech: "Docker + Kubernetes",
          why: "Containerization ensures the GraphQL API runs identically in development, staging, and production. Kubernetes provides auto-scaling based on CPU utilization and request latency, which is essential for handling the morning peak when hospital executives check their dashboards simultaneously.",
          tradeoff:
            "Kubernetes adds significant operational complexity. For a team without dedicated DevOps support, managing EKS clusters, Helm charts, and CI/CD pipelines is a learning investment. A managed container service like App Runner would have simpler operations but less flexible scaling.",
        },
      ],
      features: [
        {
          name: "Real-Time Patient Flow Dashboard",
          problem:
            "Hospital administrators had no real-time visibility into patient flow across the health system. ED crowding, boarding (admitted patients waiting in the ED for an inpatient bed), and ambulance diversion were identified after the fact - too late for proactive intervention.",
          solution:
            "We built a live patient flow dashboard that displays current census, admissions, discharges, and transfers for each hospital. The dashboard updates every 5 minutes through the ETL pipeline and provides color-coded alerts when metrics exceed configurable thresholds (e.g., ED census > 120% of capacity turns red).",
          challenges:
            "The hardest challenge was reconciling patient movement data across different EHR systems. One hospital calls it 'Discharge,' another calls it 'Check-out,' and a third uses 'Transfer to external facility.' We built a normalization layer that maps each system's terminology to a unified event model. This mapping required 200+ rules and collaboration with clinical informatics teams from each hospital.",
        },
        {
          name: "Multi-Dimensional Report Builder",
          problem:
            "Hospital executives needed the ability to create custom reports combining metrics from different domains - for example, 'Show me readmission rates by department, compared to budget, for the last 6 months, filtered by payer type.' Existing tools required IT assistance to build each report.",
          solution:
            "We built a drag-and-drop report builder that allows users to select metrics, dimensions, date ranges, and filters from the GraphQL schema. The builder generates a GraphQL query on the fly and renders the results as configurable visualizations (bar charts, line charts, tables, heatmaps). Saved reports appear on the user's dashboard.",
          challenges:
            "Making the report builder intuitive for non-technical users while supporting complex queries was a significant UX challenge. A simple report (revenue by month) should be 3 clicks, while an advanced report (readmission rate by diagnosis code, stratified by age group, with year-over-year comparison) required a guided wizard interface. We iterated through 4 UX prototypes with real hospital administrators before landing on the right balance.",
        },
      ],
      challenges: [
        {
          problem: "Data inconsistency across hospital systems",
          solution:
            "Different hospitals in the health system use different EHR vendors, and even hospitals using the same vendor have customized their configurations. 'Discharge date' means different things: the date the physician wrote the order, the date the patient left the room, or the date the bed was cleaned. We built a data quality layer that runs validation rules on incoming data and flags anomalies. When the data pipeline detects an inconsistency (e.g., negative length of stay), it quarantines the record and alerts the data engineering team.",
          tradeoff:
            "The normalization and validation layer adds 2-3 minutes to the ETL pipeline runtime. We optimized by running validation in parallel across source systems rather than sequentially.",
        },
        {
          problem: "Handling upstream system outages gracefully",
          solution:
            "When a hospital's EHR system goes down, the ETL pipeline for that source fails. We implemented a circuit breaker pattern: if a source system fails 3 consecutive ETL cycles, the data pipeline marks that source as degraded and continues processing other sources. The dashboard shows the most recent available data for the degraded source, with a yellow warning banner indicating stale data. When the source recovers, the ETL processes the missed cycles in catch-up mode.",
          tradeoff:
            "Showing stale data during outages could lead to decisions based on outdated information. We decided this was preferable to showing nothing, which would force executives back to manual report compilation. The yellow warning banner makes the data freshness status transparent.",
        },
        {
          problem: "GraphQL query performance with deep nesting",
          solution:
            "Executives viewing department-level drill-downs triggered GraphQL queries with 5+ levels of nesting (hospital → department → metric → time series → comparison). These queries took 8-12 seconds to resolve. We implemented a query complexity analysis middleware that estimates query cost before execution. Queries exceeding a complexity threshold are rejected with a suggestion to narrow the scope. We also added DataLoader for automatic batching of resolver calls.",
          tradeoff:
            "Rejecting complex queries frustrates power users who need to export large datasets. We added an async export feature where complex queries are submitted, processed as a background job, and delivered as a CSV download via email. This satisfies the use case without degrading real-time dashboard performance.",
        },
      ],
      performance: [
        "GraphQL DataLoader reduced hospital→department→metric queries from N+1 (1 + 6 + 48 = 55 queries) to 3 queries through automatic batching.",
        "PostgreSQL materialized views pre-compute the 20 most common dashboard queries, reducing query time from 3-5 seconds to under 50ms.",
        "Redis caching of metric metadata (names, units, thresholds) eliminates database lookups for repeated queries, reducing average response time by 35%.",
        "Frontend component virtualization (TanStack Virtual) for department lists and time-series tables reduced DOM nodes by 90% on pages with >500 data points.",
        "GraphQL persisted queries reduce request size by 60% and enable CDN caching of query results for anonymous dashboard views.",
        "The data pipeline processes 500,000 events per cycle (5-minute intervals) with an end-to-end latency of under 4 minutes from source to dashboard.",
      ],
      security: [
        "Authentication uses the health system's existing SSO provider (Okta) through SAML 2.0 integration. Users log in with their existing hospital credentials.",
        "Authorization uses a role-permission model: System Admin (full access), Hospital Admin (their hospital only), Department Head (their department only), and Viewer (read-only). Each role is enforced at three layers: GraphQL resolver, database RLS, and frontend route guards.",
        "Row-level security (RLS) in PostgreSQL ensures that even if a query bypasses the application layer, users can only access data for their authorized hospitals and departments.",
        "All data access is logged with user ID, timestamp, query, and response metadata. A quarterly audit review process identifies unusual access patterns.",
        "The dashboard enforces a 15-minute idle session timeout. For shared workstations in hospital administrative areas, this prevents unauthorized access when a user forgets to log out.",
        "Patient-level data is only accessible through the drill-down views, and access is restricted to clinicians with a direct treatment relationship. All other dashboard views work with aggregated, de-identified metrics.",
      ],
      lessonsLearned: [
        "Data normalization across hospital systems is the hardest problem in healthcare analytics. We underestimated the effort required by 3x. The data mapping rules grew from an expected 50 rules to 200+ rules, and each rule required domain expert validation.",
        "GraphQL's flexibility is both a strength and a risk. The 'ask for anything' capability led to frontend queries that were unnecessarily complex and slow. Adding query complexity analysis early in the project would have prevented performance issues that needed refactoring later.",
        "Hospital executives prefer consistent, predictable data over real-time but inconsistent data. During user testing, they consistently chose the 5-minute old data that was accurate over fresher data that sometimes had normalization errors. This validated our ETL-first approach over live federation.",
        "Building for a health system with 6 hospitals is fundamentally different from building for a single hospital. Cross-hospital comparisons, standardized metrics, and role-based access across facilities add complexity at every layer of the stack.",
        "Charts and visualizations require healthcare-specific design patterns. A line chart showing monthly revenue is straightforward. A chart showing readmission rates with risk-adjusted expected ranges, national benchmarks, and statistical significance bands requires healthcare domain expertise in the visualization design.",
      ],
      futureImprovements: [
        "Implement predictive analytics: using historical data to forecast patient volume, staffing needs, and supply demand. Machine learning models could predict ED surges 24 hours in advance based on weather data, historical patterns, and community health trends.",
        "Add natural language query support: executives should be able to type 'Show me readmission rates by hospital for the last quarter' and get the visualization without navigating the report builder.",
        "Integrate with more hospital systems: OR scheduling, pharmacy inventory, lab turnaround times, and imaging utilization. Each new source adds dimensions to the analytics platform.",
        "Build a mobile app for hospital administrators who need to check metrics on-call from their phones. The mobile view would show critical alerts and a condensed KPI summary.",
        "Implement automated insight generation: AI-powered analysis that surfaces notable trends, anomalies, and opportunities without manual exploration of the dashboard.",
        "Expand to multi-health-system support, allowing the platform to serve as a benchmarking tool where anonymized, aggregated metrics can be compared across health systems.",
      ],
    },
    relatedSlugs: ["my-scribe", "maktab-one"],
  },

  {
    slug: "triton-consulting",
    title: "Triton Consulting Group",
    subtitle: "Building a Multi-Site CMS Platform for Enterprise Websites",
    category: "Enterprise Website",
    role: "Lead Developer",
    duration: "8 months",
    status: "Production",
    image: triton,
    techStack: [
      "Next.js",
      "Payload CMS",
      "TypeScript",
      "AWS",
      "Tailwind CSS",
      "Docker",
      "Twilio",
      "Node.js",
      "PostgreSQL",
      "Framer Motion",
    ],
    links: {
      demo: "https://www.tritoncg.com/",
      website: "https://www.tritoncg.com/",
    },
    sections: {
      executiveSummary: [
        "Triton Consulting Group manages a portfolio of over 6 client websites from a single, centralized CMS platform built with Next.js and Payload CMS. The platform provides consistent branding, efficient content management, and scalable infrastructure across all client sites.",
        "Previously, each client website was managed independently - separate codebases, separate hosting, separate content management. Updates required duplicating effort across sites, branding was inconsistent, and maintenance costs grew linearly with each new client. The centralized CMS eliminated these inefficiencies.",
        "The platform now serves diverse clients including property management companies, community organizations, and professional services firms. Each site has its own content, design, and domain, but they share the underlying CMS infrastructure, authentication system, and deployment pipeline.",
      ],
      businessProblem: [
        "Triton Consulting Group's business model involved building and maintaining websites for multiple clients. As the client portfolio grew, so did the operational burden. Each new client meant a new codebase, a new hosting setup, a new CMS installation, and a new maintenance cycle.",
        "Content updates were inefficient: when a client wanted to update their website content, the process involved logging into their individual CMS instance, remembering the unique interface, and navigating different content structures. For Triton's team managing 6+ sites, this cognitive overhead was significant.",
        "Branding consistency was a recurring challenge. Common elements (footer, contact forms, analytics tracking) had to be updated independently on each site. When a client wanted to add a new service or update their about page, the changes needed to be replicated across related pages and sometimes across sites.",
        "The key constraint was scalability: the existing per-site model meant that adding a new client required 40-60 hours of setup time. For a business where margins depend on efficiently serving multiple clients, this was a bottleneck to growth.",
      ],
      goals: {
        business: [
          "Reduce new client onboarding time from 40-60 hours to under 10 hours",
          "Eliminate duplicated effort by enabling content reuse across sites",
          "Ensure consistent branding and functionality across all client websites",
          "Reduce monthly maintenance overhead by 60%",
        ],
        technical: [
          "Build a centralized CMS that manages content for multiple independent websites",
          "Enable per-site customization while maintaining shared infrastructure",
          "Achieve sub-2-second page loads on all client sites",
          "Support unlimited additional sites without infrastructure redesign",
          "Provide content editors with a unified, intuitive editing experience",
        ],
        user: [
          "Content editors should manage all client sites from a single admin panel",
          "Each client should experience their site as a unique, standalone website with its own domain and branding",
          "Editors should be able to clone content structures (page layouts, navigation) across sites",
          "Changes should go through a preview workflow before publishing",
        ],
      },
      requirements: {
        functional: [
          "Centralized content management for 6+ independent websites from a single admin interface",
          "Per-site content isolation: each site has its own pages, posts, media library, and navigation",
          "Shared content library: reusable components (CTAs, testimonials, team bios) that can be used across sites",
          "Multi-tenant user management: separate admin users per client with site-scoped permissions",
          "Custom page builder: drag-and-drop page composition with reusable sections",
          "SEO management: per-page meta titles, descriptions, Open Graph tags, and sitemap generation",
          "Contact form management with email notifications via Twilio SendGrid",
          "Analytics integration with per-site Google Analytics tracking",
        ],
        nonFunctional: {
          performance: [
            "Page load times under 2 seconds on desktop and 3 seconds on mobile for all client sites",
            "Image optimization with automatic WebP conversion and responsive sizes",
            "Cache hit ratio above 90% for public page views",
            "Database query times under 100ms for content retrieval",
          ],
          security: [
            "Authentication via Payload CMS's built-in auth with bcrypt password hashing",
            "Role-based access control: admin, editor, and viewer roles per site",
            "CSRF protection on all form submissions",
            "Rate limiting on contact form endpoints",
            "Regular security updates through automated dependency scanning",
          ],
          scalability: [
            "Support for up to 50 client sites without infrastructure changes",
            "Content database scalable to 100,000+ pages across all sites",
            "Media library scalable to 500GB total across all sites",
          ],
          maintainability: [
            "Automated database migrations through Payload CMS",
            "CI/CD pipeline with staging environment for each client site",
            "Centralized error tracking with Sentry",
            "Automated SSL certificate renewal via Let's Encrypt",
          ],
        },
      },
      architecture: {
        overview:
          "The platform uses Payload CMS as a headless content management system integrated with a Next.js frontend. Payload provides the admin panel, content modeling, authentication, and API layer. Next.js handles server-side rendering, static generation, and the public-facing website. A multi-tenant content structure within Payload enables each client site to have isolated content while sharing the same infrastructure.",
        systemFlow: [
          "Content editors log into the centralized Payload CMS admin panel. The panel shows all client sites, and editors navigate between sites through a site selector. Each site has its own content collections: pages, posts, navigation, media, and global settings.",
          "When an editor publishes or updates content in Payload, the CMS triggers a webhook to the Next.js application. Next.js revalidates the affected pages using Incremental Static Regeneration (ISR), ensuring updates appear on the live site without a full rebuild.",
          "Public visitors access client sites through their custom domains. A reverse proxy (Nginx) routes requests to the Next.js application based on the domain. Next.js reads the site context from the hostname and fetches site-specific content from Payload's REST API.",
          "Next.js renders pages using server-side rendering for dynamic content (contact forms, search) and static generation for content pages (about, services, blog). The rendering strategy is configured per-page type in the Payload CMS admin.",
          "Client sites share common infrastructure (Next.js application, database, CDN) while maintaining separate domains, branding, and content. This shared architecture enables efficient resource utilization and centralized management.",
        ],
        databaseDesign: [
          "Payload CMS uses MongoDB as its primary database. The content schema is defined through Payload's collection configuration, which generates both the database schema and the admin UI automatically.",
          "Each client site is represented as a Site collection with fields for domain, name, theme configuration, and active status. All content collections (pages, posts, media) include a `site` relationship field that links content to its parent site.",
          "The `pages` collection has a hierarchical structure supporting nested pages (e.g., /services/web-development). Each page has fields for title, slug, content blocks (composed of reusable sections), SEO metadata, and publishing status.",
          "Reusable content sections (hero banners, CTAs, testimonials, team members) are stored in a `globals` collection accessible across sites. When a reusable section is updated, all sites using that section reflect the change.",
          "Media files are stored in AWS S3 with Payload's built-in S3 adapter. The database stores only the file reference, while the actual files are served from S3 through CloudFront CDN.",
        ],
        requestFlow: [
          "A visitor navigates to `https://client-site.com`. DNS resolves to the Nginx reverse proxy, which identifies the site from the hostname and forwards the request to the Next.js application.",
          "Next.js reads the hostname and determines which site's content to serve. For a content page, it fetches the page data from Payload CMS's REST API, filtering by site ID and page slug.",
          "Payload returns the page content as JSON, including the page's blocks (composed of reusable sections), SEO metadata, and navigation structure. Next.js renders this data into HTML using React Server Components.",
          "The rendered page is served to the visitor with a Cache-Control header set to 60 seconds. Subsequent requests within 60 seconds are served from the CDN edge cache without hitting the Next.js server.",
          "When content is updated in Payload, a webhook triggers Next.js's revalidation API. The affected pages are regenerated in the background and the CDN cache is invalidated for those specific paths.",
        ],
        deploymentFlow: [
          "The Next.js application is deployed on AWS ECS Fargate behind an Application Load Balancer. Payload CMS runs as a separate container on the same ECS cluster, serving both the admin panel and the REST API.",
          "MongoDB runs on Amazon DocumentDB (MongoDB-compatible) with Multi-AZ deployment for high availability. S3 stores media files, and CloudFront serves as the CDN for both static assets and cached pages.",
          "The CI/CD pipeline (GitHub Actions) builds the Next.js and Payload applications as Docker images, pushes them to Amazon ECR, and triggers a rolling update on ECS. Database migrations run as a pre-deployment step.",
          "Each client site's DNS is configured with an SSL certificate from AWS Certificate Manager, managed centrally through the infrastructure-as-code templates.",
          "Staging environments spin up on-demand for testing client-specific changes before production deployment. The staging environment uses the same Docker images but connects to a separate MongoDB instance.",
        ],
        decisions: [
          {
            title: "Payload CMS vs. Contentful vs. Strapi",
            detail:
              "Payload CMS was chosen over Contentful (SaaS, expensive per-seat pricing for multiple client editors) and Strapi (self-hosted but less mature multi-tenant support). Payload provides native multi-tenancy, a self-hosted option for data sovereignty, and a rich admin UI that content editors found intuitive during evaluation. The Node.js codebase allows backend customization without learning a separate plugin architecture.",
          },
          {
            title: "ISR vs. full SSG for content pages",
            detail:
              "Incremental Static Regeneration (ISR) was chosen over full static generation because content changes are frequent and unpredictable. With ISR, pages are statically generated on first request and revalidated in the background when content updates. Full SSG would require a complete rebuild for every content change, which is impractical for frequently updated client websites.",
          },
          {
            title: "MongoDB vs. PostgreSQL for Payload",
            detail:
              "Payload CMS currently uses MongoDB as its primary database. While PostgreSQL would be more familiar and provide stronger relational integrity, MongoDB's schema flexibility aligns with Payload's dynamic content modeling approach - where content structures change as new client requirements emerge. The document model maps naturally to nested page content with heterogeneous block types.",
          },
          {
            title: "Container-based deployment vs. Vercel",
            detail:
              "Self-hosted containers on AWS ECS were chosen over Vercel because of the need to run Payload CMS's Node.js server alongside the Next.js application. Vercel's serverless functions have execution time limits that conflict with Payload's media upload and admin API operations. The trade-off is increased DevOps overhead for managing ECS, but this provides the flexibility needed for the CMS backend.",
          },
        ],
      },
      techDecisions: [
        {
          tech: "Next.js",
          why: "Next.js provides both server-side rendering (for dynamic pages like search results) and static generation (for content pages), with ISR bridging the two. File-based routing maps directly to the page hierarchy managed in Payload. The Image component provides automatic optimization for the media-heavy client websites.",
          tradeoff:
            "Next.js's ISR requires a running server process, adding operational complexity compared to fully static sites. For simple client websites, a static site generator like Astro or 11ty would have simpler deployment. However, the dynamic capabilities (forms, search, preview) justify Next.js for this use case.",
        },
        {
          tech: "Payload CMS",
          why: "Payload's headless architecture with a built-in admin panel provides the complete CMS experience without external dependencies. Its multi-tenant support allows all client sites to be managed from a single admin instance, which was the core requirement. Payload's access control system maps user roles to site-level permissions natively.",
          tradeoff:
            "Payload has a smaller community than Contentful or Strapi, meaning fewer plugins and community resources. The documentation is comprehensive but less battle-tested for edge cases. We had to build custom plugins for advanced workflows that would have been available off-the-shelf with Contentful.",
        },
        {
          tech: "AWS (ECS, S3, CloudFront)",
          why: "AWS provides the managed infrastructure needed for a multi-tenant CMS: ECS for container orchestration with auto-scaling, S3 for scalable media storage, CloudFront for global CDN distribution, and Certificate Manager for centralized SSL management. The infrastructure can grow with the client portfolio without architectural changes.",
          tradeoff:
            "AWS's managed services come with higher costs than running directly on EC2. The ECS Fargate pricing model is per-CPU-hour, which is more expensive than reserved EC2 instances. The operational simplicity and auto-scaling justify the cost premium for a multi-client platform.",
        },
        {
          tech: "Twilio (SendGrid)",
          why: "Twilio SendGrid provides reliable email delivery for contact form submissions, with built-in templating, delivery tracking, and spam filtering. Its API integrates cleanly with Payload's hooks system - when a contact form submission webhook fires, SendGrid sends a formatted email to the client's designated inbox.",
          tradeoff:
            "SendGrid's free tier is limited to 100 emails/day, which is sufficient for most client contact forms. For higher-volume clients, the paid tier adds cost that must be passed through. An alternative using SES would have lower costs but requires more setup for deliverability.",
        },
      ],
      features: [
        {
          name: "Multi-Site Content Management",
          problem:
            "Managing 6+ independent websites meant logging into 6+ different CMS instances, remembering different interfaces, and duplicating content updates across sites. Content editors spent 30% of their time on administrative overhead rather than actual content work.",
          solution:
            "The centralized Payload CMS admin panel shows all client sites in a single interface. Editors switch between sites with a dropdown, and content structures are consistent across sites. Shared content components (testimonials, CTAs) can be created once and used across multiple client sites.",
          challenges:
            "The main challenge was balancing content isolation (each client's data must be private) with content sharing (reusable components across sites). Payload's access control system allowed us to implement site-scoped read/write permissions while creating a special 'shared' content scope that all authenticated editors can access.",
        },
        {
          name: "Drag-and-Drop Page Builder",
          problem:
            "Clients wanted to create and modify pages without developer involvement - adding a new service page, updating the homepage layout, or rearranging sections. Traditional CMS interfaces required knowledge of HTML or shortcodes, creating dependency on the development team.",
          solution:
            "We built a custom page builder within Payload CMS using its Block component system. Editors compose pages by selecting from pre-built sections (hero, features, testimonials, gallery, CTA, contact form). Each section has configurable options (background color, layout variant, content fields) exposed in the admin panel.",
          challenges:
            "The block-based page builder generates deeply nested JSON content. Rendering this efficiently in Next.js required a recursive component system that maps block types to React components. Performance optimization was needed to avoid unnecessary re-renders when blocks share common data sources.",
        },
      ],
      challenges: [
        {
          problem: "Multi-tenant content performance at scale",
          solution:
            "As the number of client sites grew, Payload CMS queries became slower because all content was in a single MongoDB collection. A query for 'pages where site = X' had to scan rows from all sites. We implemented MongoDB compound indexes on `(site, slug)` and `(site, status, publishedDate)` to keep query times sub-100ms regardless of the total number of documents. Payload's built-in query optimization combined with proper indexing resolved the performance degradation.",
          tradeoff:
            "Compound indexes increase write latency by 10-15% because each document insert or update must update multiple indexes. For a content management workload where writes are infrequent compared to reads, this is an acceptable trade-off.",
        },
        {
          problem: "Client-specific customizations vs. platform consistency",
          solution:
            "Clients inevitably request custom features that are not available in the shared platform. We implemented a plugin system that allows per-site feature flags and custom components without modifying the core platform code. Customizations are registered as Payload plugins with site-scoped conditions. This allows the platform to evolve in a controlled way while meeting individual client needs.",
          tradeoff:
            "The plugin system adds architectural complexity. Each customization increases the surface area for bugs and testing. We limit customization to 20% of feature development per client; beyond that, we evaluate whether the feature belongs in the platform core.",
        },
        {
          problem: "Content preview workflow with ISR",
          solution:
            "Editors need to preview changes before publishing. Payload's draft system stores drafts in the database without publishing. We built a preview route in Next.js that reads draft content directly from Payload's API when a preview query parameter is present. The preview route bypasses the CDN cache and always serves fresh content. Published content continues to use ISR with CDN caching.",
          tradeoff:
            "Preview routes bypass all caching, which means they are slower than published pages. For a single editor reviewing their work, the 1-2 second load time is acceptable. Scaling to 50+ concurrent editors previewing would require dedicated preview infrastructure.",
        },
      ],
      performance: [
        "Next.js ISR with 60-second revalidation ensures published pages are served from CDN edge cache for the majority of requests, achieving sub-100ms response times globally.",
        "Payload CMS compound indexes on `(site, slug)` reduced multi-tenant query times from 800ms to under 50ms.",
        "Next.js Image component with CloudFront CDN serves optimized images in WebP format with responsive sizes, reducing image payload by 60% compared to original uploads.",
        "React Server Components eliminate client-side JavaScript for content rendering, resulting in 80% less JS shipped compared to a client-rendered approach.",
        "The page builder's block rendering uses dynamic imports to load section components lazily, reducing the initial bundle size by 35%.",
        "Database connection pooling through Payload CMS keeps MongoDB connection count stable under concurrent load, preventing connection exhaustion during traffic spikes.",
      ],
      security: [
        "Payload CMS authentication uses bcrypt password hashing with a configurable cost factor. Session management uses HTTP-only, secure cookies with configurable expiration.",
        "Role-based access control at the site level restricts editors to managing only their assigned client sites. Admin users can manage all sites.",
        "The contact form endpoint includes Google reCAPTCHA integration to prevent bot submissions - a common problem for public-facing client websites.",
        "Rate limiting on the contact form API (5 submissions per minute per IP) prevents abuse while remaining transparent to legitimate users.",
        "All admin panel traffic is restricted to HTTPS. The admin route is served from a sub-path that is not included in the public sitemap.",
        "Dependency scanning runs automatically in the CI/CD pipeline, flagging vulnerabilities before they reach production. Critical patches are applied within 24 hours.",
      ],
      lessonsLearned: [
        "Multi-tenant CMS platforms require careful content isolation at the database, API, and UI levels. We initially relied on Payload's built-in access control but found it insufficient for preventing accidental cross-site edits. Adding site-scoped middleware at the API level provided defense-in-depth.",
        "Clients value editorial independence over platform efficiency. Even though sharing content across sites is more efficient, each client wants to feel their site is unique. We added per-site theming (colors, fonts, layout variants) to give each site a distinct identity while maintaining shared infrastructure.",
        "ISR is powerful but has edge cases: if the Next.js server is restarted during a revalidation, the page might serve stale content for up to the revalidation window. We added an on-demand revalidation endpoint that Payload CMS calls after content updates, bypassing the revalidation window for immediate updates.",
        "The drag-and-drop page builder was the most requested feature but also the most complex to implement. Its development took 40% of the total project timeline. For future projects, I would evaluate existing block-based page builder solutions before custom-building.",
        "Content editors need structured training even with an intuitive CMS interface. We created video tutorials and a knowledge base for common editorial tasks. Training new editors takes 2-3 hours per client, which should be factored into onboarding timelines.",
      ],
      futureImprovements: [
        "Implement A/B testing capabilities: clients should be able to test different page variants and measure conversion rates before committing to a permanent change.",
        "Add AI-powered content generation: suggest SEO-optimized meta descriptions, generate alt text for images, and provide content improvement recommendations based on readability scores.",
        "Build a client portal where clients can request changes, track project status, and review invoices without leaving the platform.",
        "Add analytics dashboard within the admin panel showing page views, form submissions, and conversion metrics for each client site.",
        "Implement automated SEO audits that scan all client sites for common issues (missing meta descriptions, broken links, slow pages) and generate remediation reports.",
        "Expand to serve as a white-label agency platform, allowing other web agencies to use the same infrastructure under their own brand.",
      ],
    },
    relatedSlugs: ["maktab-one", "pharmacy-management-system"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getRelatedCaseStudies(slugs: string[]): CaseStudy[] {
  return caseStudies.filter((cs) => slugs.includes(cs.slug));
}
