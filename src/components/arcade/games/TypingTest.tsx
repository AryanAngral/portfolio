"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const POOL = [
  "terraform", "kubernetes", "typescript", "supabase", "vertex", "docker",
  "pipeline", "serverless", "gemini", "postgres", "nextjs", "react",
  "workload", "identity", "federation", "cloud", "run", "deploy",
  "compiler", "recursion", "buffer", "async", "await", "closure",
  "gradient", "canvas", "vector", "matrix", "cipher", "firewall",
];

function makeWords(n: number): string[] {
  return Array.from({ length: n }, () => POOL[Math.floor(Math.random() * POOL.length)]);
}

export default function TypingTest() {
  const [words, setWords] = useState<string[]>(() => makeWords(30));
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(() => loadBest("wpm"));
  const [wpm, setWpm] = useState(0);
  const startRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const accuracy = useMemo(() => {
    if (idx === 0) return 100;
    return Math.round((correct / idx) * 100);
  }, [correct, idx]);

  function onChange(value: string) {
    if (done) return;
    if (startRef.current === null) {
      // event handler, not render — timestamp the first keystroke
      // eslint-disable-next-line react-hooks/purity
      startRef.current = performance.now();
    }
    if (value.endsWith(" ")) {
      const attempt = value.trim();
      const hit = attempt === words[idx];
      if (hit) setCorrect((c) => c + 1);
      const nextIdx = idx + 1;
      setIdx(nextIdx);
      setTyped("");
      if (nextIdx >= words.length) finish(correct + (hit ? 1 : 0));
      return;
    }
    setTyped(value);
  }

  function finish(finalCorrect: number) {
    setDone(true);
    const secs = startRef.current ? (performance.now() - startRef.current) / 1000 : 1;
    const finalWpm = Math.max(0, Math.round((finalCorrect / 5 / secs) * 60));
    setWpm(finalWpm);
    setBest((b) => {
      const nb = Math.max(b, finalWpm);
      saveBest("wpm", nb);
      return nb;
    });
  }

  function restart() {
    setWords(makeWords(30));
    setTyped("");
    setIdx(0);
    startRef.current = null;
    setCorrect(0);
    setWpm(0);
    setDone(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div>
      <ScoreRow
        items={[
          { label: "wpm", value: done ? wpm : "—" },
          { label: "acc", value: `${accuracy}%` },
          { label: "best", value: best },
        ]}
      />
      <div
        className="crt relative min-h-[220px] rounded-xl border border-border bg-[#0a0a12] p-6"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="font-mono text-lg leading-relaxed">
          {words.map((word, i) => (
            <span
              key={i}
              className={
                i < idx
                  ? "text-emerald-400"
                  : i === idx
                    ? "rounded bg-accent/20 text-accent"
                    : "text-muted"
              }
            >
              {word}{" "}
            </span>
          ))}
        </p>

        {!done ? (
          <input
            ref={inputRef}
            value={typed}
            onChange={(e) => onChange(e.target.value)}
            className="mt-6 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 font-mono text-sm outline-none focus:border-accent"
            placeholder="start typing — space to advance"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
          />
        ) : (
          <div className="mt-6 text-center">
            <p className="font-mono text-4xl font-bold text-gradient">{wpm} WPM</p>
            <p className="mt-1 font-mono text-sm text-muted">{accuracy}% accuracy</p>
            <button
              onClick={restart}
              className="mt-4 rounded-full bg-accent px-6 py-2.5 font-mono text-sm font-semibold uppercase tracking-wider text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
            >
              Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
