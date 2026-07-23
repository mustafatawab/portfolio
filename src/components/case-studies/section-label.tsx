import React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="group flex items-center gap-3 mb-6 scroll-mt-24"
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined
      }
    >
      <span className="text-xs font-mono tracking-wider text-primary uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </h2>
  );
}
