import Link from "next/link";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* ctf flag #4 — lost pages have source too */}
      <div
        hidden
        dangerouslySetInnerHTML={{
          __html: "<!-- being lost pays off: FLAG{lost_pages_hold_secrets} -->",
        }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        error / page_not_found
      </p>
      <h1 className="text-gradient mt-4 text-7xl font-bold sm:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-muted">
        This page doesn&apos;t exist — but everything worth seeing is one click away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast shadow-lg shadow-accent/20 transition-transform hover:scale-105"
        >
          Back home
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Report a broken link
        </a>
      </div>
      <p className="mt-10 font-mono text-xs text-muted">
        tip: press <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">Ctrl</kbd>{" "}
        <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">K</kbd> to jump
        anywhere
      </p>
    </main>
  );
}
