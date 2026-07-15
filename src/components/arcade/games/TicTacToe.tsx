"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

type Cell = "X" | "O" | null;
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b: Cell[]): Cell | "draw" {
  for (const [a, m, z] of LINES) {
    if (b[a] && b[a] === b[m] && b[a] === b[z]) return b[a];
  }
  return b.every(Boolean) ? "draw" : null;
}

function minimax(b: Cell[], isCpu: boolean): { score: number; move: number } {
  const w = winner(b);
  if (w === "O") return { score: 1, move: -1 };
  if (w === "X") return { score: -1, move: -1 };
  if (w === "draw") return { score: 0, move: -1 };
  let bestScore = isCpu ? -2 : 2;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = isCpu ? "O" : "X";
    const { score } = minimax(b, !isCpu);
    b[i] = null;
    if (isCpu ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return { score: bestScore, move: bestMove };
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [tally, setTally] = useState({ you: 0, cpu: 0, draws: 0 });
  const result = winner(board);

  function play(i: number) {
    if (board[i] || result) return;
    const next = [...board];
    next[i] = "X";
    if (!winner(next)) {
      const { move } = minimax([...next], true);
      if (move >= 0) next[move] = "O";
    }
    const w = winner(next);
    if (w === "X") setTally((t) => ({ ...t, you: t.you + 1 }));
    else if (w === "O") setTally((t) => ({ ...t, cpu: t.cpu + 1 }));
    else if (w === "draw") setTally((t) => ({ ...t, draws: t.draws + 1 }));
    setBoard(next);
  }

  return (
    <div>
      <ScoreRow
        items={[
          { label: "you", value: tally.you },
          { label: "cpu", value: tally.cpu },
          { label: "draws", value: tally.draws },
        ]}
      />
      <div className="crt relative mx-auto grid w-fit grid-cols-3 gap-2 rounded-xl border border-border bg-[#0a0a12] p-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            aria-label={`cell ${i + 1}`}
            className="grid h-20 w-20 place-items-center rounded-lg bg-white/5 font-mono text-3xl font-bold transition-colors hover:bg-white/10 cursor-pointer"
          >
            <span className={cell === "X" ? "text-cyan-300" : "text-violet-300"}>{cell}</span>
          </button>
        ))}
        {result && (
          <Overlay
            title={result === "draw" ? "Draw" : result === "X" ? "You win!" : "CPU wins"}
            subtitle={
              tally.draws >= 3
                ? "three perfect games. FLAG{you_cannot_beat_minimax}"
                : "the computer plays perfect minimax — a draw is a win"
            }
            actionLabel="Play again"
            onAction={() => setBoard(Array(9).fill(null))}
          />
        )}
      </div>
    </div>
  );
}
