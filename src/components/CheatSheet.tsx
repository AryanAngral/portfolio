"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["Ctrl", "K"], label: "Command palette" },
  { keys: ["Ctrl", "`"], label: "Interactive terminal" },
  { keys: ["?"], label: "This cheat sheet" },
  { keys: ["↑↑↓↓←→←→", "B", "A"], label: "Konami — unlock secret game" },
  { keys: ["Esc"], label: "Close any overlay" },
];

const TIPS = [
  "type `matrix` in the terminal",
  "find 6 flags at /ctf",
  "play 17+ games at /arcade",
  "recolor the site with the 💧 theme lab",
];

export default function CheatSheet() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement)?.isContentEditable;
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="no-print fixed inset-0 z-[92] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            role="dialog"
            aria-label="Keyboard shortcuts"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
                keyboard shortcuts
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted hover:text-accent cursor-pointer">
                <FiX size={16} />
              </button>
            </div>
            <div className="space-y-2.5">
              {SHORTCUTS.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted">{s.label}</span>
                  <span className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                also try
              </p>
              <ul className="space-y-1">
                {TIPS.map((t) => (
                  <li key={t} className="font-mono text-xs text-muted">
                    → {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
