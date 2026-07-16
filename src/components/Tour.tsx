"use client";

/* eslint-disable react-hooks/set-state-in-effect -- tour steps advance reactively */
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = { selector: string; title: string; body: string };

const STEPS: Step[] = [
  { selector: "[aria-label='Change skin']", title: "19 skins 🎨", body: "Reskin the entire site — Terminal, Synthwave, Apple, and more." },
  { selector: "[aria-label='Open the arcade']", title: "Arcade 🕹️", body: "18 games built from scratch, plus a secret one via the Konami code." },
  { selector: "[aria-label='Open command palette']", title: "Command palette", body: "Press Ctrl+K anytime to jump anywhere or trigger actions." },
  { selector: "[aria-label='Achievements']", title: "Achievements 🏅", body: "Explore the site to unlock badges. Can you get them all?" },
];

type Rect = { top: number; left: number; width: number; height: number };

export default function Tour() {
  const [step, setStep] = useState(-1);
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback((i: number) => {
    const s = STEPS[i];
    if (!s) return null;
    const el = document.querySelector(s.selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }, []);

  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem("tour-done") === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return; // navbar targets are hidden on mobile
    const t = setTimeout(() => setStep(0), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0) return;
    // skip steps whose target isn't present
    let i = step;
    while (i < STEPS.length && !measure(i)) i += 1;
    if (i >= STEPS.length) {
      finish();
      return;
    }
    if (i !== step) {
      setStep(i);
      return;
    }
    setRect(measure(i));
  }, [step, measure]);

  function finish() {
    setStep(-1);
    setRect(null);
    try {
      localStorage.setItem("tour-done", "1");
    } catch {
      /* ignore */
    }
  }

  if (step < 0 || !rect) return null;
  const s = STEPS[step];
  const pad = 8;
  // place below the target, or flip above when it sits in the lower half
  const TOOLTIP_H = 150;
  const below = rect.top + rect.height + 14;
  const tooltipTop =
    below + TOOLTIP_H > window.innerHeight ? Math.max(12, rect.top - TOOLTIP_H - 14) : below;
  const tooltipLeft = Math.min(Math.max(12, rect.left + rect.width / 2 - 130), window.innerWidth - 272);

  return (
    <div className="no-print fixed inset-0 z-[130]">
      {/* dim with a spotlight hole via huge box-shadow */}
      <div
        className="pointer-events-auto absolute rounded-xl transition-all duration-300"
        style={{
          top: rect.top - pad,
          left: rect.left - pad,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.72)",
        }}
        onClick={() => setStep((s2) => s2 + 1)}
      />
      <AnimatePresence>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute w-64 rounded-2xl border border-border bg-surface p-4 shadow-2xl"
          style={{ top: tooltipTop, left: tooltipLeft }}
        >
          <p className="text-sm font-semibold">{s.title}</p>
          <p className="mt-1 text-xs text-muted">{s.body}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted">
              {step + 1} / {STEPS.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={finish}
                className="font-mono text-[11px] text-muted hover:text-accent cursor-pointer"
              >
                skip
              </button>
              <button
                onClick={() => (step + 1 >= STEPS.length ? finish() : setStep(step + 1))}
                className="rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-accent-contrast cursor-pointer"
              >
                {step + 1 >= STEPS.length ? "done" : "next"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
