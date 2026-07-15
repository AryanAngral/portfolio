"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

const COLS = 7;
const ROWS = 6;
type Cell = 1 | 2 | null; // 1 = you, 2 = cpu

function checkWin(b: Cell[][], p: Cell): boolean {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (b[r][c] !== p) continue;
      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
      ]) {
        let n = 1;
        while (
          n < 4 &&
          r + dr * n >= 0 &&
          r + dr * n < ROWS &&
          c + dc * n >= 0 &&
          c + dc * n < COLS &&
          b[r + dr * n][c + dc * n] === p
        )
          n++;
        if (n >= 4) return true;
      }
    }
  return false;
}

function drop(b: Cell[][], col: number, p: Cell): number {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!b[r][col]) {
      b[r][col] = p;
      return r;
    }
  }
  return -1;
}

function cpuMove(b: Cell[][]): number {
  const open = Array.from({ length: COLS }, (_, c) => c).filter((c) => !b[0][c]);
  // win if possible, block if needed, else prefer center
  for (const p of [2, 1] as const) {
    for (const c of open) {
      const copy = b.map((row) => [...row]);
      drop(copy, c, p);
      if (checkWin(copy, p)) return c;
    }
  }
  const weighted = open.sort((a, z) => Math.abs(a - 3) - Math.abs(z - 3));
  return weighted[Math.floor(Math.random() * Math.min(3, weighted.length))];
}

export default function ConnectFour() {
  const [board, setBoard] = useState<Cell[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
  );
  const [result, setResult] = useState<"" | "you" | "cpu" | "draw">("");
  const [tally, setTally] = useState({ you: 0, cpu: 0 });

  function play(col: number) {
    if (result || board[0][col]) return;
    const next = board.map((row) => [...row]);
    drop(next, col, 1);
    if (checkWin(next, 1)) {
      setBoard(next);
      setResult("you");
      setTally((t) => ({ ...t, you: t.you + 1 }));
      return;
    }
    if (next.every((row) => row.every(Boolean))) {
      setBoard(next);
      setResult("draw");
      return;
    }
    drop(next, cpuMove(next), 2);
    setBoard(next);
    if (checkWin(next, 2)) {
      setResult("cpu");
      setTally((t) => ({ ...t, cpu: t.cpu + 1 }));
    } else if (next.every((row) => row.every(Boolean))) {
      setResult("draw");
    }
  }

  function reset() {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setResult("");
  }

  return (
    <div>
      <ScoreRow items={[{ label: "you", value: tally.you }, { label: "cpu", value: tally.cpu }]} />
      <div className="crt relative mx-auto w-fit rounded-xl border border-border bg-[#0a0a12] p-4">
        <div className="grid grid-cols-7 gap-1.5">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => play(c)}
                aria-label={`column ${c + 1}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition-colors hover:bg-white/10 cursor-pointer sm:h-11 sm:w-11"
              >
                {cell && (
                  <span
                    className={`h-7 w-7 rounded-full sm:h-8 sm:w-8 ${
                      cell === 1 ? "bg-cyan-400" : "bg-violet-400"
                    }`}
                  />
                )}
              </button>
            )),
          )}
        </div>
        {result && (
          <Overlay
            title={result === "draw" ? "Draw" : result === "you" ? "You win!" : "CPU wins"}
            subtitle="you are cyan · cpu is violet"
            actionLabel="Play again"
            onAction={reset}
          />
        )}
      </div>
    </div>
  );
}
