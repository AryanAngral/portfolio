import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import SortRace from "@/components/algorithms/SortRace";
import Pathfinder from "@/components/algorithms/Pathfinder";

export const metadata: Metadata = {
  title: "Algorithms — Aryan Angral",
  description:
    "Live algorithm visualizers: sorting races and A* vs Dijkstra pathfinding, running in your browser.",
};

export default function AlgorithmsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          algorithms, running live
        </p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Watch <span className="text-gradient">algorithms</span> think
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Everything here executes in your browser — the same data structures &amp; algorithms
        fundamentals from my C++ practice repos, animated.
      </p>

      <section className="mt-10">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          01 / sorting race
        </h2>
        <SortRace />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          02 / pathfinding — a* vs dijkstra
        </h2>
        <Pathfinder />
      </section>
    </main>
  );
}
