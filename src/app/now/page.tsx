import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Now — Aryan Angral",
  description: "What Aryan is focused on right now.",
};

const NOW = [
  { icon: "💼", text: "Open to full-time software engineering roles — cloud, backend, or full-stack." },
  { icon: "☁️", text: "Deepening GCP + Terraform skills and exploring platform/DevOps engineering." },
  { icon: "🤖", text: "Building small AI-powered side projects with the Gemini API." },
  { icon: "🧩", text: "Sharpening data structures & algorithms and system design." },
  { icon: "🌐", text: "Polishing this portfolio — you're looking at the latest of many iterations." },
];

// Last meaningful update — bump when the focus changes.
const UPDATED = "July 2026, from Jammu, India";

export default function NowPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">/now</p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        What I&apos;m doing <span className="text-gradient">now</span>
      </h1>
      <p className="mt-2 text-sm text-muted">
        A snapshot of my current focus — inspired by the{" "}
        <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="underline hover:text-accent">
          /now page
        </a>{" "}
        movement. Updated {UPDATED}.
      </p>

      <ul className="mt-8 space-y-4">
        {NOW.map((item) => (
          <li key={item.text} className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
            <span className="text-2xl leading-none">{item.icon}</span>
            <p className="text-sm leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ul>

      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-transform hover:scale-105"
      >
        Reach out
      </a>
    </main>
  );
}
