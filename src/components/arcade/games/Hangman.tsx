"use client";

import { useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";

const WORDS = [
  "typescript", "terraform", "kubernetes", "javascript", "supabase", "nextjs",
  "docker", "python", "gradient", "compiler", "database", "algorithm",
  "encryption", "firewall", "frontend", "backend", "serverless", "pipeline",
  "recursion", "variable", "function", "network", "browser", "keyboard",
];
const MAX_WRONG = 6;

function pick(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function Hangman() {
  const [word, setWord] = useState<string>(() => pick());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);

  const wrong = [...guessed].filter((l) => !word.includes(l)).length;
  const won = word.split("").every((l) => guessed.has(l));
  const lost = wrong >= MAX_WRONG;

  function guess(letter: string) {
    if (won || lost || guessed.has(letter)) return;
    const next = new Set([...guessed, letter]);
    setGuessed(next);
    if (word.split("").every((l) => next.has(l))) setStreak((s) => s + 1);
    else if ([...next].filter((l) => !word.includes(l)).length >= MAX_WRONG) setStreak(0);
  }

  function reset() {
    setWord(pick());
    setGuessed(new Set());
  }

  return (
    <div>
      <ScoreRow items={[{ label: "misses", value: `${wrong}/${MAX_WRONG}` }, { label: "streak", value: streak }]} />
      <div className="crt relative mx-auto w-full max-w-md rounded-xl border border-border bg-[#0a0a12] p-6">
        <pre aria-hidden className="mx-auto w-fit font-mono text-sm leading-tight text-emerald-300">
{` ┌───┐
 │   ${wrong > 0 ? "😵" : " "}
 │  ${wrong > 2 ? "/" : " "}${wrong > 1 ? "│" : " "}${wrong > 3 ? "\\" : " "}
 │  ${wrong > 4 ? "/" : " "} ${wrong > 5 ? "\\" : " "}
 ┴────`}
        </pre>
        <p className="mt-4 text-center font-mono text-2xl tracking-[0.4em] text-white">
          {word.split("").map((l) => (guessed.has(l) || lost ? l : "_")).join("")}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
            const used = guessed.has(letter);
            const hit = used && word.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => guess(letter)}
                disabled={used || won || lost}
                className={`h-8 w-8 rounded font-mono text-sm uppercase transition-colors ${
                  used
                    ? hit
                      ? "bg-emerald-500/50 text-white"
                      : "bg-red-500/40 text-white/60"
                    : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
        {(won || lost) && (
          <Overlay
            title={won ? "Saved!" : "Hanged!"}
            subtitle={`the word was "${word}"`}
            actionLabel="Next word"
            onAction={reset}
          />
        )}
      </div>
    </div>
  );
}
