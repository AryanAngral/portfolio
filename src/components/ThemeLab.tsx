"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiDroplet, FiRotateCcw, FiShuffle, FiX } from "react-icons/fi";

type Preset = { name: string; a: string; b: string; c: string };

const PRESETS: Preset[] = [
  { name: "Nebula", a: "#a78bfa", b: "#22d3ee", c: "#0a0a0f" },
  { name: "Sunset", a: "#fb7185", b: "#fbbf24", c: "#0a0a0f" },
  { name: "Matrix", a: "#4ade80", b: "#22d3ee", c: "#04120a" },
  { name: "Mono", a: "#e5e5ec", b: "#a1a1aa", c: "#0a0a0f" },
  { name: "Cyberpunk", a: "#f472b6", b: "#facc15", c: "#0a0a0f" },
  { name: "Ocean", a: "#38bdf8", b: "#2dd4bf", c: "#04121a" },
];

function apply(a: string, b: string, c: string) {
  const root = document.documentElement;
  root.style.setProperty("--accent", a);
  root.style.setProperty("--accent-2", b);
  root.style.setProperty("--accent-contrast", c);
  try {
    localStorage.setItem("accent-theme", JSON.stringify({ a, b, c }));
  } catch {
    /* no persistence */
  }
}

function reset() {
  const root = document.documentElement;
  root.style.removeProperty("--accent");
  root.style.removeProperty("--accent-2");
  root.style.removeProperty("--accent-contrast");
  try {
    localStorage.removeItem("accent-theme");
  } catch {
    /* ignore */
  }
}

function randomHex(): string {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h} 80% 68%)`;
}

export default function ThemeLab() {
  const [open, setOpen] = useState(false);
  const [a, setA] = useState("#a78bfa");
  const [b, setB] = useState("#22d3ee");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("accent-theme");
      if (saved) {
        const t = JSON.parse(saved);
        // one-shot client init from localStorage
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (t?.a) setA(t.a);
        if (t?.b) setB(t.b);
      }
    } catch {
      /* ignore */
    }
  }, []);

  function setCustom(na: string, nb: string) {
    setA(na);
    setB(nb);
    apply(na, nb, "#0a0a0f");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open theme lab"
        title="Theme lab"
        className="no-print flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        <FiDroplet size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-16 z-[60] w-72 rounded-2xl border border-border bg-surface p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Theme lab</p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted hover:text-accent cursor-pointer">
                <FiX size={15} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setCustom(preset.a, preset.b)}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-2 transition-colors hover:border-accent cursor-pointer"
                >
                  <span
                    className="h-6 w-full rounded"
                    style={{ background: `linear-gradient(120deg, ${preset.a}, ${preset.b})` }}
                  />
                  <span className="font-mono text-[10px] text-muted">{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <input
                  type="color"
                  value={a}
                  onChange={(e) => setCustom(e.target.value, b)}
                  className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
                />
                accent
              </label>
              <label className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <input
                  type="color"
                  value={b}
                  onChange={(e) => setCustom(a, e.target.value)}
                  className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
                />
                accent 2
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setCustom(randomHex(), randomHex())}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 font-mono text-xs text-accent-contrast cursor-pointer"
              >
                <FiShuffle size={13} /> Randomize
              </button>
              <button
                onClick={() => {
                  reset();
                  setA("#a78bfa");
                  setB("#22d3ee");
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-accent cursor-pointer"
              >
                <FiRotateCcw size={13} /> Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
