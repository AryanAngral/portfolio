"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const N = 60;
const ALGOS = ["bubble", "insertion", "quick"] as const;
type Algo = (typeof ALGOS)[number];

type Op = { array: number[]; highlight: number[] };

function record(algo: Algo, input: number[]): Op[] {
  const a = [...input];
  const ops: Op[] = [];
  const snap = (...highlight: number[]) => ops.push({ array: [...a], highlight });

  if (algo === "bubble") {
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          snap(j, j + 1);
        }
      }
  } else if (algo === "insertion") {
    for (let i = 1; i < a.length; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
        snap(j + 1, i);
      }
      a[j + 1] = key;
      snap(j + 1);
    }
  } else {
    const stack: [number, number][] = [[0, a.length - 1]];
    while (stack.length) {
      const [lo, hi] = stack.pop()!;
      if (lo >= hi) continue;
      const pivot = a[hi];
      let p = lo;
      for (let i = lo; i < hi; i++) {
        if (a[i] < pivot) {
          [a[i], a[p]] = [a[p], a[i]];
          snap(i, p);
          p++;
        }
      }
      [a[p], a[hi]] = [a[hi], a[p]];
      snap(p, hi);
      stack.push([lo, p - 1], [p + 1, hi]);
    }
  }
  snap();
  return ops;
}

function shuffledArray(): number[] {
  const a = Array.from({ length: N }, (_, i) => i + 4);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Lane({ algo, data, running, onDone }: { algo: Algo; data: number[]; running: number; onDone: (algo: Algo, steps: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    function draw(array: number[], highlight: number[]) {
      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, 240, 120);
      const bw = 240 / N;
      array.forEach((v, i) => {
        ctx!.fillStyle = highlight.includes(i) ? "#f472b6" : "#22d3ee";
        const h = (v / (N + 4)) * 112;
        ctx!.fillRect(i * bw, 120 - h, bw - 1, h);
      });
    }

    if (!running) {
      draw(data, []);
      // reset the op counter when idle / reshuffled
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSteps(0);
      return;
    }

    const ops = record(algo, data);
    let i = 0;
    const perFrame = Math.max(1, Math.ceil(ops.length / 400));
    let raf = 0;
    function tick() {
      const op = ops[Math.min(i, ops.length - 1)];
      draw(op.array, op.highlight);
      setSteps(Math.min(i, ops.length - 1));
      i += perFrame;
      if (i < ops.length) raf = requestAnimationFrame(tick);
      else {
        setSteps(ops.length - 1);
        onDone(algo, ops.length - 1);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [algo, data, running, onDone]);

  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
        <span className="text-foreground">{algo} sort</span>
        <span className="text-muted">{steps} ops</span>
      </div>
      <canvas ref={canvasRef} width={240} height={120} className="w-full rounded-lg" />
    </div>
  );
}

export default function SortRace() {
  const [data, setData] = useState<number[]>(() => shuffledArray());
  const [running, setRunning] = useState(0);
  const [winner, setWinner] = useState("");
  const doneRef = useRef<{ algo: Algo; steps: number }[]>([]);

  const onDone = useCallback((algo: Algo, steps: number) => {
    doneRef.current.push({ algo, steps });
    if (doneRef.current.length === ALGOS.length) {
      const best = [...doneRef.current].sort((a, b) => a.steps - b.steps)[0];
      setWinner(`${best.algo} wins with ${best.steps} operations`);
    }
  }, []);

  function race() {
    doneRef.current = [];
    setWinner("");
    setRunning((r) => r + 1);
  }

  function shuffle() {
    doneRef.current = [];
    setWinner("");
    setRunning(0);
    setData(shuffledArray());
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={race}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
        >
          ▶ Race
        </button>
        <button
          onClick={shuffle}
          className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          Shuffle
        </button>
        {winner && <span className="font-mono text-sm text-accent-2">🏁 {winner}</span>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {ALGOS.map((algo) => (
          <Lane key={algo} algo={algo} data={data} running={running} onDone={onDone} />
        ))}
      </div>
      <p className="mt-3 font-mono text-xs text-muted">
        same shuffled array, three algorithms, one operation counter each — watch complexity happen.
      </p>
    </div>
  );
}
