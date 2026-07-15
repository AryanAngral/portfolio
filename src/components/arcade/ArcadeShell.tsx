"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type GameMeta = {
  id: string;
  name: string;
  icon: string;
  mode: "solo" | "vs cpu";
  controls: string;
};

export const GAMES: GameMeta[] = [
  { id: "snake", name: "Snake", icon: "🐍", mode: "solo", controls: "arrows / WASD" },
  { id: "pong", name: "Pong", icon: "🏓", mode: "vs cpu", controls: "mouse or ↑/↓" },
  { id: "breakout", name: "Breakout", icon: "🧱", mode: "solo", controls: "mouse or ←/→" },
  { id: "blocks", name: "Blocks", icon: "🟪", mode: "solo", controls: "arrows + space" },
  { id: "invaders", name: "Invaders", icon: "👾", mode: "vs cpu", controls: "←/→ + space" },
  { id: "flappy", name: "Flappy Dot", icon: "🐤", mode: "solo", controls: "space / click" },
  { id: "dino", name: "Runner", icon: "🦖", mode: "solo", controls: "space / click" },
  { id: "tictactoe", name: "Tic-Tac-Toe", icon: "❌", mode: "vs cpu", controls: "click a cell" },
  { id: "connect4", name: "Connect Four", icon: "🔵", mode: "vs cpu", controls: "click a column" },
  { id: "2048", name: "2048", icon: "🔢", mode: "solo", controls: "arrows / WASD" },
  { id: "minesweeper", name: "Minesweeper", icon: "💣", mode: "solo", controls: "click · right-click flags" },
  { id: "memory", name: "Memory", icon: "🃏", mode: "solo", controls: "click to flip" },
  { id: "simon", name: "Simon", icon: "🎨", mode: "vs cpu", controls: "repeat the pattern" },
  { id: "rps", name: "Rock Paper Scissors", icon: "✂️", mode: "vs cpu", controls: "pick a move" },
  { id: "hangman", name: "Hangman", icon: "🪢", mode: "solo", controls: "guess letters" },
];

const COMPONENTS: Record<string, ComponentType> = {
  snake: dynamic(() => import("./games/Snake"), { ssr: false }),
  pong: dynamic(() => import("./games/Pong"), { ssr: false }),
  breakout: dynamic(() => import("./games/Breakout"), { ssr: false }),
  blocks: dynamic(() => import("./games/Blocks"), { ssr: false }),
  invaders: dynamic(() => import("./games/Invaders"), { ssr: false }),
  flappy: dynamic(() => import("./games/Flappy"), { ssr: false }),
  dino: dynamic(() => import("./games/DinoRun"), { ssr: false }),
  tictactoe: dynamic(() => import("./games/TicTacToe"), { ssr: false }),
  connect4: dynamic(() => import("./games/ConnectFour"), { ssr: false }),
  "2048": dynamic(() => import("./games/Game2048"), { ssr: false }),
  minesweeper: dynamic(() => import("./games/Minesweeper"), { ssr: false }),
  memory: dynamic(() => import("./games/Memory"), { ssr: false }),
  simon: dynamic(() => import("./games/Simon"), { ssr: false }),
  rps: dynamic(() => import("./games/RockPaperScissors"), { ssr: false }),
  hangman: dynamic(() => import("./games/Hangman"), { ssr: false }),
};

export default function ArcadeShell() {
  const [selected, setSelected] = useState<GameMeta>(GAMES[0]);
  const Game = COMPONENTS[selected.id];

  return (
    <div>
      {/* game bar */}
      <div
        role="tablist"
        aria-label="Game picker"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-surface p-2"
      >
        {GAMES.map((game) => {
          const active = game.id === selected.id;
          return (
            <button
              key={game.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(game)}
              className={`flex shrink-0 flex-col items-center gap-1 rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                active ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <span className="text-xl leading-none">{game.icon}</span>
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide">
                {game.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* player */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <span className="text-2xl">{selected.icon}</span> {selected.name}
          </h2>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span
              className={`rounded-full px-2.5 py-1 ${
                selected.mode === "vs cpu"
                  ? "bg-accent/15 text-accent"
                  : "bg-accent-2/15 text-accent-2"
              }`}
            >
              {selected.mode}
            </span>
            <span className="text-muted">{selected.controls}</span>
          </div>
        </div>
        <Game />
      </div>
    </div>
  );
}
