"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-foreground/5 border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-[var(--duration-fast)] opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
