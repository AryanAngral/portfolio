"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiAward, FiX } from "react-icons/fi";
import { ACHIEVEMENTS, STORE_KEY } from "@/lib/achievements";

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const unlockedRef = useRef<string[]>([]);

  const grant = useCallback((id: string) => {
    if (!ACHIEVEMENTS.some((a) => a.id === id)) return;
    if (unlockedRef.current.includes(id)) return;
    const next = [...unlockedRef.current, id];

    // auto-award completionist once all others are in
    const others = ACHIEVEMENTS.filter((a) => a.id !== "completionist").map((a) => a.id);
    if (others.every((o) => next.includes(o)) && !next.includes("completionist")) {
      next.push("completionist");
    }

    unlockedRef.current = next;
    setUnlocked(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* no persistence */
    }
    const meta = ACHIEVEMENTS.find((a) => a.id === id);
    setToast(meta ? `${meta.icon} ${meta.name}` : null);
    setTimeout(() => setToast(null), 3200);
  }, []);

  // hydrate + subscribe to unlock signals
  useEffect(() => {
    const initial = load();
    unlockedRef.current = initial;
    // one-shot hydrate from localStorage
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(initial);

    const onAchv = (e: Event) => grant((e as CustomEvent).detail as string);
    const onPalette = () => grant("power-user");
    const onTerminal = () => grant("terminal");
    const onMatrix = () => grant("neo");
    window.addEventListener("achv", onAchv);
    window.addEventListener("cmdk:open", onPalette);
    window.addEventListener("terminal:open", onTerminal);
    window.addEventListener("matrix:toggle", onMatrix);
    return () => {
      window.removeEventListener("achv", onAchv);
      window.removeEventListener("cmdk:open", onPalette);
      window.removeEventListener("terminal:open", onTerminal);
      window.removeEventListener("matrix:toggle", onMatrix);
    };
  }, [grant]);

  // track distinct routes visited → Wanderer
  useEffect(() => {
    try {
      const key = "visited-routes";
      const seen: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (!seen.includes(pathname)) {
        seen.push(pathname);
        localStorage.setItem(key, JSON.stringify(seen));
      }
      if (seen.length >= 4) grant("wanderer");
    } catch {
      /* ignore */
    }
  }, [pathname, grant]);

  const count = unlocked.length;
  const total = ACHIEVEMENTS.length;

  return (
    <>
      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            className="no-print fixed bottom-20 right-6 z-[80] rounded-xl border border-accent/40 bg-surface px-4 py-3 shadow-2xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              achievement unlocked
            </p>
            <p className="mt-0.5 text-sm font-semibold">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tray toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Achievements"
        title="Achievements"
        className="no-print fixed bottom-6 right-20 z-40 flex h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 text-foreground shadow-lg transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        <FiAward size={17} />
        <span className="font-mono text-xs">
          {count}/{total}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="no-print fixed bottom-20 right-6 z-40 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-border bg-surface p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Achievements · {count}/{total}
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted hover:text-accent cursor-pointer">
                <FiX size={15} />
              </button>
            </div>
            <div className="space-y-2">
              {ACHIEVEMENTS.map((a) => {
                const has = unlocked.includes(a.id);
                return (
                  <div
                    key={a.id}
                    className={`flex items-start gap-3 rounded-lg p-2 ${has ? "" : "opacity-40"}`}
                  >
                    <span className="text-xl leading-none">{a.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-[11px] text-muted">{a.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-center font-mono text-[10px] text-muted">
              progress saved in your browser
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
