"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

const EMOJIS = ["🚀", "🎮", "🔥", "⚡", "🌙", "💎", "🎯", "🐍"];

function shuffled(): string[] {
  const deck = [...EMOJIS, ...EMOJIS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function Memory() {
  const [deck, setDeck] = useState<string[]>(() => shuffled());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const won = matched.size === deck.length;

  function flip(i: number) {
    if (matched.has(i) || flipped.includes(i) || flipped.length === 2) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        setMatched((s) => new Set([...s, a, b]));
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  }

  function reset() {
    setDeck(shuffled());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  }

  return (
    <div>
      <ScoreRow items={[{ label: "moves", value: moves }, { label: "pairs", value: `${matched.size / 2}/${EMOJIS.length}` }]} />
      <div className="crt relative mx-auto grid w-fit grid-cols-4 gap-2 rounded-xl border border-border bg-[#0a0a12] p-4">
        {deck.map((emoji, i) => {
          const up = matched.has(i) || flipped.includes(i);
          return (
            <button
              key={i}
              onClick={() => flip(i)}
              aria-label={`card ${i + 1}`}
              className={`grid h-16 w-16 place-items-center rounded-lg text-2xl transition-all duration-200 cursor-pointer sm:h-[72px] sm:w-[72px] ${
                up ? "bg-white/15" : "bg-violet-500/30 hover:bg-violet-500/40"
              } ${matched.has(i) ? "opacity-60" : ""}`}
            >
              {up ? emoji : "?"}
            </button>
          );
        })}
        {won && (
          <Overlay title="Cleared!" subtitle={`${moves} moves`} actionLabel="Play again" onAction={reset} />
        )}
      </div>
    </div>
  );
}
