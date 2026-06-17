"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center transition-colors duration-500">
      <div className="container max-w-lg text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-black font-display text-gradient tracking-tighter">
            ERROR
          </h1>
          <p className="text-foreground/40 text-[10px] font-mono tracking-[0.4em] uppercase">
            System Malfunction
          </p>
        </div>
        <p className="text-foreground/60 font-sans leading-relaxed">
          An unexpected error occurred in the system. Our engineers have been notified.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-neon-cyan text-background font-bold rounded-full text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)]"
          >
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground/60 rounded-full text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-300 hover:border-neon-cyan/20 hover:text-foreground"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </main>
  );
}
