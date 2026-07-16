"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = 8;
const TRACKS = [
  { name: "kick", freq: 60, type: "sine" as OscillatorType, dur: 0.18 },
  { name: "snare", freq: 220, type: "triangle" as OscillatorType, dur: 0.12 },
  { name: "hat", freq: 900, type: "square" as OscillatorType, dur: 0.05 },
  { name: "bass", freq: 130, type: "sawtooth" as OscillatorType, dur: 0.2 },
];

const PRESET: boolean[][] = [
  [true, false, false, false, true, false, false, false],
  [false, false, true, false, false, false, true, false],
  [true, true, true, true, true, true, true, true],
  [true, false, false, true, false, true, false, false],
];

export default function Beats() {
  const [grid, setGrid] = useState<boolean[][]>(() =>
    TRACKS.map(() => Array(STEPS).fill(false)),
  );
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const vizRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef(grid);
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // frequency-bar visualizer, driven by the analyser while playing
  useEffect(() => {
    if (!playing) return;
    const canvas = vizRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const analyser = analyserRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!analyser) return;
      const bins = analyser.frequencyBinCount;
      const data = new Uint8Array(bins);
      analyser.getByteFrequencyData(data);
      const bars = 48;
      const step = Math.floor(bins / bars);
      const bw = canvas.width / bars;
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#a78bfa";
      const accent2 = styles.getPropertyValue("--accent-2").trim() || "#22d3ee";
      for (let i = 0; i < bars; i++) {
        const v = data[i * step] / 255;
        const h = v * canvas.height;
        ctx.fillStyle = i % 2 ? accent : accent2;
        ctx.fillRect(i * bw, canvas.height - h, bw - 1, h);
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const interval = (60 / bpm / 2) * 1000;
    let s = 0;
    const timer = setInterval(() => {
      setStep(s);
      const ctx = ctxRef.current;
      if (ctx) {
        TRACKS.forEach((track, t) => {
          if (!gridRef.current[t][s]) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = track.type;
          osc.frequency.value = track.freq;
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + track.dur);
          const sink = analyserRef.current ?? ctx.destination;
          osc.connect(gain).connect(sink);
          osc.start();
          osc.stop(ctx.currentTime + track.dur);
        });
      }
      s = (s + 1) % STEPS;
    }, interval);
    return () => clearInterval(timer);
  }, [playing, bpm]);

  function toggle() {
    if (!playing && !ctxRef.current) {
      try {
        ctxRef.current = new AudioContext();
        const analyser = ctxRef.current.createAnalyser();
        analyser.fftSize = 128;
        analyser.connect(ctxRef.current.destination);
        analyserRef.current = analyser;
      } catch {
        /* no audio */
      }
    }
    ctxRef.current?.resume();
    setPlaying((p) => {
      if (p) setStep(-1);
      return !p;
    });
  }

  function toggleCell(t: number, s: number) {
    setGrid((g) => g.map((row, ti) => (ti === t ? row.map((v, si) => (si === s ? !v : v)) : row)));
  }

  function loadPreset() {
    setGrid(PRESET.map((r) => [...r]));
  }
  function clear() {
    setGrid(TRACKS.map(() => Array(STEPS).fill(false)));
  }

  const COLORS = ["#22d3ee", "#f472b6", "#facc15", "#a78bfa"];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={toggle}
          className="rounded-full bg-accent px-5 py-2 font-mono text-sm font-semibold uppercase tracking-wider text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
        >
          {playing ? "⏸ stop" : "▶ play"}
        </button>
        <button
          onClick={loadPreset}
          className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          straatix beat
        </button>
        <button
          onClick={clear}
          className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          clear
        </button>
        <label className="flex items-center gap-2 font-mono text-xs text-muted">
          {bpm} bpm
          <input
            type="range"
            min={60}
            max={200}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="accent-[var(--accent)]"
          />
        </label>
      </div>

      <div className="crt mx-auto w-fit rounded-xl border border-border bg-[#0a0a12] p-4">
        {TRACKS.map((track, t) => (
          <div key={track.name} className="mb-2 flex items-center gap-2 last:mb-0">
            <span className="w-12 shrink-0 font-mono text-[11px] uppercase text-muted">
              {track.name}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: STEPS }, (_, s) => (
                <button
                  key={s}
                  onClick={() => toggleCell(t, s)}
                  aria-label={`${track.name} step ${s + 1}`}
                  className={`h-8 w-8 rounded-md transition-all ${
                    grid[t][s] ? "" : "bg-white/8 hover:bg-white/15"
                  } ${step === s ? "ring-2 ring-white/40" : ""} cursor-pointer`}
                  style={grid[t][s] ? { background: COLORS[t] } : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <canvas
        ref={vizRef}
        width={320}
        height={48}
        className="mx-auto mt-3 block w-full max-w-[320px] rounded-lg border border-border bg-[#0a0a12]"
      />
      <p className="mt-3 text-center font-mono text-xs text-muted">
        click cells to build a loop · pure WebAudio, no samples
      </p>
    </div>
  );
}
