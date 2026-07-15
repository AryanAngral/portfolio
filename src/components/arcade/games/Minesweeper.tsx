"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

const N = 9;
const MINES = 10;

type Tile = { mine: boolean; open: boolean; flag: boolean; n: number };

function build(safeIndex: number): Tile[] {
  const tiles: Tile[] = Array.from({ length: N * N }, () => ({
    mine: false,
    open: false,
    flag: false,
    n: 0,
  }));
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * N * N);
    if (i === safeIndex || tiles[i].mine) continue;
    tiles[i].mine = true;
    placed++;
  }
  for (let i = 0; i < N * N; i++) {
    tiles[i].n = neighbors(i).filter((j) => tiles[j].mine).length;
  }
  return tiles;
}

function neighbors(i: number): number[] {
  const r = Math.floor(i / N);
  const c = i % N;
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < N && nc >= 0 && nc < N) out.push(nr * N + nc);
    }
  return out;
}

const NUM_COLORS = ["", "text-cyan-300", "text-emerald-300", "text-pink-300", "text-violet-300", "text-amber-300", "text-red-300", "text-white", "text-white"];

export default function Minesweeper() {
  const [tiles, setTiles] = useState<Tile[] | null>(null);
  const [flagMode, setFlagMode] = useState(false);
  const [dead, setDead] = useState(false);

  const flags = tiles?.filter((t) => t.flag).length ?? 0;
  const won = !!tiles && tiles.every((t) => t.open || t.mine);

  function reveal(ts: Tile[], i: number) {
    if (ts[i].open || ts[i].flag) return;
    ts[i].open = true;
    if (ts[i].n === 0 && !ts[i].mine) neighbors(i).forEach((j) => reveal(ts, j));
  }

  function click(i: number) {
    if (dead || won) return;
    let ts = tiles;
    if (!ts) {
      ts = build(i);
    }
    const next = ts.map((t) => ({ ...t }));
    if (flagMode) {
      if (!next[i].open) next[i].flag = !next[i].flag;
    } else if (!next[i].flag) {
      if (next[i].mine) {
        next.forEach((t) => {
          if (t.mine) t.open = true;
        });
        setDead(true);
      } else {
        reveal(next, i);
      }
    }
    setTiles(next);
  }

  function reset() {
    setTiles(null);
    setDead(false);
    setFlagMode(false);
  }

  const display = tiles ?? Array.from({ length: N * N }, () => ({ mine: false, open: false, flag: false, n: 0 }));

  return (
    <div>
      <ScoreRow items={[{ label: "mines", value: MINES }, { label: "flags", value: flags }]} />
      <div className="crt relative mx-auto w-fit rounded-xl border border-border bg-[#0a0a12] p-4">
        <div className="grid grid-cols-9 gap-1">
          {display.map((t, i) => (
            <button
              key={i}
              onClick={() => click(i)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (tiles && !tiles[i].open) {
                  const next = tiles.map((x) => ({ ...x }));
                  next[i].flag = !next[i].flag;
                  setTiles(next);
                }
              }}
              aria-label={`tile ${i + 1}`}
              className={`grid h-8 w-8 place-items-center rounded font-mono text-xs font-bold cursor-pointer ${
                t.open
                  ? t.mine
                    ? "bg-red-500/70"
                    : "bg-white/10"
                  : "bg-white/25 hover:bg-white/35"
              }`}
            >
              {t.open ? (
                t.mine ? "💣" : t.n > 0 ? <span className={NUM_COLORS[t.n]}>{t.n}</span> : ""
              ) : t.flag ? (
                "🚩"
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
        {(dead || won) && (
          <Overlay
            title={won ? "Cleared!" : "Boom!"}
            subtitle={won ? "all safe tiles revealed" : "you hit a mine"}
            actionLabel="Play again"
            onAction={reset}
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setFlagMode((f) => !f)}
          className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            flagMode ? "border-accent text-accent" : "border-border text-muted"
          }`}
        >
          🚩 flag mode {flagMode ? "on" : "off"}
        </button>
        <span className="font-mono text-xs text-muted">or right-click to flag</span>
      </div>
    </div>
  );
}
