import React from "react";

const techColors: Record<string, string> = {
  "Next.js": "bg-black dark:bg-white text-white dark:text-black",
  React: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Express.js": "bg-neutral-800/10 text-neutral-700 dark:text-neutral-300",
  PostgreSQL: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Prisma: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Docker: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  TypeScript: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Python: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Payload CMS": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  AWS: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Twilio: "bg-red-500/10 text-red-600 dark:text-red-400",
  GraphQL: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Electron: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  SQLite: "bg-blue-400/10 text-blue-500 dark:text-blue-400",
  "Tailwind CSS": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "Framer Motion": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Node: "bg-green-500/10 text-green-600 dark:text-green-400",
  "Node.js": "bg-green-500/10 text-green-600 dark:text-green-400",
  JWT: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "TanStack Query": "bg-red-500/10 text-red-600 dark:text-red-400",
  "Vue.js": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Laravel: "bg-red-500/10 text-red-600 dark:text-red-400",
  "Neon DB": "bg-green-500/10 text-green-600 dark:text-green-400",
  "shadcn/ui": "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  Linux: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  PM2: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Nginx: "bg-green-500/10 text-green-600 dark:text-green-400",
  Vercel: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  Resend: "bg-black/5 text-black dark:text-white dark:bg-white/10",
};

export function TechStack({
  items,
  size = "sm",
}: {
  items: string[];
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => {
        const color =
          techColors[tech] || "bg-foreground/5 text-muted-foreground";
        return (
          <span
            key={tech}
            className={`inline-flex items-center rounded-md font-mono tracking-tight border border-border ${color} ${
              size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
            }`}
          >
            {tech}
          </span>
        );
      })}
    </div>
  );
}
