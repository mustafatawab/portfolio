import React from "react";
import { AlertTriangle, Info, Lightbulb, AlertCircle } from "lucide-react";

type CalloutVariant = "info" | "warning" | "tip" | "caution";

const config: Record<
  CalloutVariant,
  { icon: React.ReactNode; bg: string; border: string; iconColor: string }
> = {
  info: {
    icon: <Info size={16} />,
    bg: "bg-primary/5",
    border: "border-primary/15",
    iconColor: "text-primary",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: <Lightbulb size={16} />,
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  caution: {
    icon: <AlertCircle size={16} />,
    bg: "bg-red-500/5",
    border: "border-red-500/20",
    iconColor: "text-red-500",
  },
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const c = config[variant];
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border} my-6`}
    >
      <span className={`shrink-0 mt-0.5 ${c.iconColor}`}>{c.icon}</span>
      <div className="min-w-0">
        {title && (
          <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
        )}
        <div className="text-sm text-foreground/70 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
