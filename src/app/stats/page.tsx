import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import stats from "@/lib/stats.json";

export const metadata: Metadata = {
  title: "Stats — Aryan Angral",
  description: "Build-time engineering stats about this portfolio site itself.",
};

const TILES = [
  { label: "Lines of code", value: stats.lines.toLocaleString(), hint: "TypeScript, TSX & CSS" },
  { label: "Source files", value: stats.files, hint: `${stats.components} React components` },
  { label: "Git commits", value: stats.commits, hint: `last: ${stats.lastCommit}` },
  { label: "Arcade games", value: stats.games, hint: "built from scratch" },
  { label: "Dependencies", value: stats.deps, hint: `+ ${stats.devDeps} dev` },
  { label: "Lighthouse a11y", value: "100", hint: "best-practices & SEO: 100" },
  { label: "External APIs", value: "0", hint: "everything is self-hosted" },
  { label: "Trackers", value: "0", hint: "privacy-first analytics only" },
];

export default function StatsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          the site, measured
        </p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        This site, by the <span className="text-gradient">numbers</span>
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Computed at build time from the repository itself — no vanity metrics, just what&apos;s
        actually here. Regenerated on every deploy.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {TILES.map((tile) => (
          <div key={tile.label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-gradient text-3xl font-bold">{tile.value}</p>
            <p className="mt-2 text-xs font-medium">{tile.label}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">{tile.hint}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-muted">generated {stats.generatedAt}</p>
    </main>
  );
}
