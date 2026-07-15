"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

const MOVES = [
  { name: "rock", emoji: "🪨" },
  { name: "paper", emoji: "📄" },
  { name: "scissors", emoji: "✂️" },
];
const WIN = 5;

function cpuPick(): number {
  return Math.floor(Math.random() * 3);
}

export default function RockPaperScissors() {
  const [you, setYou] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [last, setLast] = useState<{ you: number; cpu: number; result: string } | null>(null);
  const over = you >= WIN || cpu >= WIN;

  function play(i: number) {
    if (over) return;
    const c = cpuPick();
    let result = "draw";
    if ((i + 2) % 3 === c) {
      result = "you win the round";
      setYou((s) => s + 1);
    } else if ((c + 2) % 3 === i) {
      result = "cpu wins the round";
      setCpu((s) => s + 1);
    }
    setLast({ you: i, cpu: c, result });
  }

  function reset() {
    setYou(0);
    setCpu(0);
    setLast(null);
  }

  return (
    <div>
      <ScoreRow items={[{ label: "you", value: you }, { label: "cpu", value: cpu }, { label: "first to", value: WIN }]} />
      <div className="crt relative mx-auto w-full max-w-sm rounded-xl border border-border bg-[#0a0a12] p-6">
        <div className="flex items-center justify-center gap-8 text-5xl">
          <span>{last ? MOVES[last.you].emoji : "❔"}</span>
          <span className="font-mono text-lg text-muted">vs</span>
          <span>{last ? MOVES[last.cpu].emoji : "❔"}</span>
        </div>
        <p className="mt-4 h-5 text-center font-mono text-sm text-accent-2">{last?.result ?? "pick your move"}</p>
        <div className="mt-5 flex justify-center gap-3">
          {MOVES.map((move, i) => (
            <button
              key={move.name}
              onClick={() => play(i)}
              aria-label={move.name}
              className="grid h-16 w-16 place-items-center rounded-xl bg-white/10 text-3xl transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
            >
              {move.emoji}
            </button>
          ))}
        </div>
        {over && (
          <Overlay
            title={you > cpu ? "You win!" : "CPU wins"}
            subtitle={`${you} : ${cpu}`}
            actionLabel="Rematch"
            onAction={reset}
          />
        )}
      </div>
    </div>
  );
}
