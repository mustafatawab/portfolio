import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center transition-colors duration-500">
      <div className="container max-w-lg text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-black font-display text-gradient tracking-tighter">
            404
          </h1>
          <p className="text-foreground/40 text-[11px] font-mono tracking-[0.4em] uppercase">
            Signal Lost
          </p>
        </div>
        <p className="text-foreground/60 font-sans leading-relaxed">
          The requested resource could not be located in the archive. It may have been moved, deleted, or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-neon-cyan text-background font-bold rounded-full text-[11px] font-mono tracking-[0.3em] uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--glow-cyan-lg)]"
        >
          Return to Base
        </Link>
      </div>
    </main>
  );
}
