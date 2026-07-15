"use client";

import { useCallback, useEffect, useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

type Grid = number[][];

function empty(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function addTile(g: Grid): Grid {
  const spots: [number, number][] = [];
  g.forEach((row, r) => row.forEach((v, c) => !v && spots.push([r, c])));
  if (!spots.length) return g;
  const [r, c] = spots[Math.floor(Math.random() * spots.length)];
  g[r][c] = Math.random() < 0.9 ? 2 : 4;
  return g;
}

function slideRow(row: number[]): { row: number[]; gained: number } {
  const vals = row.filter(Boolean);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === vals[i + 1]) {
      out.push(vals[i] * 2);
      gained += vals[i] * 2;
      i++;
    } else {
      out.push(vals[i]);
    }
  }
  while (out.length < 4) out.push(0);
  return { row: out, gained };
}

function transpose(g: Grid): Grid {
  return g[0].map((_, c) => g.map((row) => row[c]));
}

function move(g: Grid, dir: "left" | "right" | "up" | "down"): { grid: Grid; gained: number; moved: boolean } {
  let work = dir === "up" || dir === "down" ? transpose(g) : g.map((r) => [...r]);
  let gained = 0;
  work = work.map((row) => {
    const input = dir === "right" || dir === "down" ? [...row].reverse() : row;
    const { row: slid, gained: got } = slideRow(input);
    gained += got;
    return dir === "right" || dir === "down" ? slid.reverse() : slid;
  });
  const grid = dir === "up" || dir === "down" ? transpose(work) : work;
  const moved = JSON.stringify(grid) !== JSON.stringify(g);
  return { grid, gained, moved };
}

function canMove(g: Grid): boolean {
  return (["left", "right", "up", "down"] as const).some((d) => move(g, d).moved);
}

const TILE_STYLE: Record<number, string> = {
  2: "bg-white/10 text-white",
  4: "bg-white/20 text-white",
  8: "bg-cyan-500/60 text-white",
  16: "bg-cyan-500/80 text-white",
  32: "bg-violet-500/60 text-white",
  64: "bg-violet-500/80 text-white",
  128: "bg-fuchsia-500/70 text-white",
  256: "bg-pink-500/70 text-white",
  512: "bg-amber-500/70 text-white",
  1024: "bg-orange-500/80 text-white",
  2048: "bg-emerald-400 text-black",
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(() => addTile(addTile(empty())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("2048"));
  const over = !canMove(grid);
  const won = grid.some((row) => row.some((v) => v >= 2048));

  const doMove = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      setGrid((g) => {
        const { grid: ng, gained, moved } = move(g, dir);
        if (!moved) return g;
        setScore((s) => {
          const ns = s + gained;
          setBest((b) => {
            const nb = Math.max(b, ns);
            saveBest("2048", nb);
            return nb;
          });
          return ns;
        });
        return addTile(ng);
      });
    },
    [],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        a: "left",
        d: "right",
        w: "up",
        s: "down",
      };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      doMove(dir);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doMove]);

  function reset() {
    setGrid(addTile(addTile(empty())));
    setScore(0);
  }

  return (
    <div>
      <ScoreRow items={[{ label: "score", value: score }, { label: "best", value: best }]} />
      <div className="crt relative mx-auto grid w-fit grid-cols-4 gap-2 rounded-xl border border-border bg-[#0a0a12] p-4">
        {grid.flat().map((v, i) => (
          <div
            key={i}
            className={`grid h-16 w-16 place-items-center rounded-lg font-mono text-lg font-bold sm:h-[72px] sm:w-[72px] ${
              v ? TILE_STYLE[v] ?? "bg-emerald-500 text-black" : "bg-white/5"
            }`}
          >
            {v || ""}
          </div>
        ))}
        {(over || won) && (
          <Overlay
            title={won ? "2048!" : "No moves left"}
            subtitle={`score: ${score}`}
            actionLabel="Play again"
            onAction={reset}
          />
        )}
      </div>
      <p className="mt-3 text-center font-mono text-xs text-muted">arrows / WASD to slide</p>
    </div>
  );
}
