"use client";

import { useRef, useState } from "react";

const COLS = 25;
const ROWS = 15;
const START = 1 * COLS + 2;
const GOAL = 13 * COLS + 22;

type CellState = "empty" | "wall" | "visited" | "path";

function neighbors(i: number): number[] {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const out: number[] = [];
  if (r > 0) out.push(i - COLS);
  if (r < ROWS - 1) out.push(i + COLS);
  if (c > 0) out.push(i - 1);
  if (c < COLS - 1) out.push(i + 1);
  return out;
}

function manhattan(a: number, b: number): number {
  return (
    Math.abs(Math.floor(a / COLS) - Math.floor(b / COLS)) + Math.abs((a % COLS) - (b % COLS))
  );
}

// Returns visit order + final path, computed synchronously; animation replays it.
function solve(walls: Set<number>, useAstar: boolean): { visits: number[]; path: number[] } {
  const open = new Set([START]);
  const cameFrom = new Map<number, number>();
  const g = new Map<number, number>([[START, 0]]);
  const visits: number[] = [];

  while (open.size) {
    let current = -1;
    let bestF = Infinity;
    for (const node of open) {
      const f = (g.get(node) ?? Infinity) + (useAstar ? manhattan(node, GOAL) : 0);
      if (f < bestF) {
        bestF = f;
        current = node;
      }
    }
    open.delete(current);
    visits.push(current);
    if (current === GOAL) {
      const path: number[] = [];
      let n: number | undefined = current;
      while (n !== undefined) {
        path.unshift(n);
        n = cameFrom.get(n);
      }
      return { visits, path };
    }
    for (const nb of neighbors(current)) {
      if (walls.has(nb)) continue;
      const tentative = (g.get(current) ?? Infinity) + 1;
      if (tentative < (g.get(nb) ?? Infinity)) {
        cameFrom.set(nb, current);
        g.set(nb, tentative);
        open.add(nb);
      }
    }
  }
  return { visits, path: [] };
}

export default function Pathfinder() {
  const [walls, setWalls] = useState<Set<number>>(new Set());
  const [marks, setMarks] = useState<Map<number, CellState>>(new Map());
  const [status, setStatus] = useState("draw walls, then run a solver");
  const [busy, setBusy] = useState(false);
  const dragging = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function toggleWall(i: number) {
    if (busy || i === START || i === GOAL) return;
    setWalls((w) => {
      const next = new Set(w);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setMarks(new Map());
  }

  function run(useAstar: boolean) {
    if (busy) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const { visits, path } = solve(walls, useAstar);
    setMarks(new Map());
    setBusy(true);
    setStatus(`${useAstar ? "A*" : "Dijkstra"} exploring…`);
    let i = 0;
    timerRef.current = setInterval(() => {
      setMarks((m) => {
        const next = new Map(m);
        if (i < visits.length) {
          next.set(visits[i], "visited");
        } else {
          const pi = i - visits.length;
          if (pi < path.length) next.set(path[pi], "path");
        }
        return next;
      });
      i += 1;
      if (i >= visits.length + path.length) {
        clearInterval(timerRef.current!);
        setBusy(false);
        setStatus(
          path.length
            ? `${useAstar ? "A*" : "Dijkstra"}: explored ${visits.length} cells, path length ${path.length}`
            : "no path — the goal is walled off",
        );
      }
    }, 8);
  }

  function clearAll() {
    if (timerRef.current) clearInterval(timerRef.current);
    setBusy(false);
    setWalls(new Set());
    setMarks(new Map());
    setStatus("draw walls, then run a solver");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => run(true)}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
        >
          ▶ A*
        </button>
        <button
          onClick={() => run(false)}
          className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          ▶ Dijkstra
        </button>
        <button
          onClick={clearAll}
          className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          Clear
        </button>
      </div>

      <div
        className="crt relative mt-4 grid w-full touch-none select-none gap-px overflow-hidden rounded-xl border border-border bg-[#0a0a12] p-2"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        onPointerDown={() => (dragging.current = true)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const state: CellState = walls.has(i) ? "wall" : marks.get(i) ?? "empty";
          const bg =
            i === START
              ? "bg-emerald-400"
              : i === GOAL
                ? "bg-pink-400"
                : state === "wall"
                  ? "bg-white/70"
                  : state === "path"
                    ? "bg-amber-400"
                    : state === "visited"
                      ? "bg-violet-500/50"
                      : "bg-white/5";
          return (
            <div
              key={i}
              onPointerDown={() => toggleWall(i)}
              onPointerEnter={() => dragging.current && toggleWall(i)}
              className={`aspect-square rounded-[2px] ${bg}`}
            />
          );
        })}
      </div>
      <p className="mt-3 font-mono text-xs text-muted">
        {status} · <span className="text-emerald-400">start</span> ·{" "}
        <span className="text-pink-400">goal</span> · drag to draw walls
      </p>
    </div>
  );
}
