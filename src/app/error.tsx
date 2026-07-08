"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md text-center space-y-6">
        <div className="text-6xl font-bold text-foreground/10">500</div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] active:scale-[0.97]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
