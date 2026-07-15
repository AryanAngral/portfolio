import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ArcadeShell from "@/components/arcade/ArcadeShell";

export const metadata: Metadata = {
  title: "Arcade — Aryan Angral",
  description:
    "17 retro mini-games built from scratch — no APIs, no trackers, everything runs in your browser.",
};

export default function ArcadePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          insert coin · no APIs · no trackers
        </p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        The <span className="text-gradient">Arcade</span>
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        17 retro games written from scratch for this site — canvas, React, and nothing else.
        High scores live in your browser. Best played on a keyboard.
      </p>

      <div className="mt-8">
        <ArcadeShell />
      </div>
    </main>
  );
}
