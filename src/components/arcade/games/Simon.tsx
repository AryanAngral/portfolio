"use client";

import { useRef, useState } from "react";
import { Overlay, ScoreRow } from "../GamePanel";
import { beep, loadBest, saveBest } from "../util";

const PADS = [
  { color: "bg-emerald-500", active: "bg-emerald-300", freq: 330 },
  { color: "bg-red-500", active: "bg-red-300", freq: 392 },
  { color: "bg-amber-500", active: "bg-amber-300", freq: 440 },
  { color: "bg-cyan-500", active: "bg-cyan-300", freq: 523 },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function randomPad(): number {
  return Math.floor(Math.random() * 4);
}

export default function Simon() {
  const [phase, setPhase] = useState<"ready" | "watch" | "repeat" | "over">("ready");
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => loadBest("simon"));
  const [lit, setLit] = useState(-1);
  const seq = useRef<number[]>([]);
  const pos = useRef(0);
  const alive = useRef(true);

  async function playback() {
    setPhase("watch");
    await wait(600);
    for (const pad of seq.current) {
      if (!alive.current) return;
      setLit(pad);
      beep(PADS[pad].freq, 260, "sine");
      await wait(420);
      setLit(-1);
      await wait(140);
    }
    pos.current = 0;
    setPhase("repeat");
  }

  async function nextRound() {
    seq.current.push(randomPad());
    setRound(seq.current.length);
    await playback();
  }

  function start() {
    alive.current = true;
    seq.current = [];
    setRound(0);
    nextRound();
  }

  async function press(i: number) {
    if (phase !== "repeat") return;
    setLit(i);
    beep(PADS[i].freq, 200, "sine");
    setTimeout(() => setLit(-1), 200);
    if (seq.current[pos.current] !== i) {
      beep(110, 500, "sawtooth");
      setPhase("over");
      setBest((b) => {
        const nb = Math.max(b, seq.current.length - 1);
        saveBest("simon", nb);
        return nb;
      });
      return;
    }
    pos.current += 1;
    if (pos.current === seq.current.length) {
      await wait(500);
      nextRound();
    }
  }

  return (
    <div>
      <ScoreRow items={[{ label: "round", value: round }, { label: "best", value: best }]} />
      <div className="crt relative mx-auto grid w-fit grid-cols-2 gap-3 rounded-xl border border-border bg-[#0a0a12] p-6">
        {PADS.map((pad, i) => (
          <button
            key={i}
            onClick={() => press(i)}
            aria-label={`pad ${i + 1}`}
            disabled={phase !== "repeat"}
            className={`h-24 w-24 rounded-2xl transition-all duration-150 sm:h-28 sm:w-28 ${
              lit === i ? `${pad.active} scale-95` : pad.color
            } ${phase === "repeat" ? "cursor-pointer hover:brightness-110" : "opacity-90"}`}
          />
        ))}
        {(phase === "ready" || phase === "over") && (
          <Overlay
            title={phase === "ready" ? "Simon" : "Wrong pad!"}
            subtitle={phase === "ready" ? "watch the sequence, then repeat it" : `you reached round ${round}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </div>
      <p className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-muted">
        {phase === "watch" ? "watch…" : phase === "repeat" ? "your turn" : " "}
      </p>
    </div>
  );
}
