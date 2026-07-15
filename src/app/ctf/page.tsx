import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import CtfBoard from "@/components/CtfBoard";

export const metadata: Metadata = {
  title: "CTF — Aryan Angral",
  description: "A small capture-the-flag hunt hidden across this portfolio. Six flags. No hints cost anything.",
};

export default function CtfPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">capture the flag</p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        🚩 Hack <span className="text-gradient">me</span>
      </h1>
      <p className="mt-2 text-muted">
        Six flags are hidden across this site, each shaped like{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
          FLAG{"{"}…{"}"}
        </code>
        . Find them, paste them below. Everything is client-side — the flags are verified against
        hashes, so no, reading this page&apos;s source won&apos;t help.
      </p>

      <div className="mt-8">
        <CtfBoard />
      </div>
    </main>
  );
}
