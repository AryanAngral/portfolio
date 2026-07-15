"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { unlock } from "@/lib/achievements";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiListener() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let pos = 0;
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === CODE[pos]) {
        pos += 1;
        if (pos === CODE.length) {
          pos = 0;
          try {
            localStorage.setItem("arcade-secret", "1");
          } catch {
            /* ignore */
          }
          unlock("konami");
          setToast(true);
          setTimeout(() => setToast(false), 4000);
        }
      } else {
        pos = key === CODE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="no-print fixed inset-x-0 top-24 z-[85] mx-auto w-fit rounded-2xl border border-accent/50 bg-surface px-6 py-4 text-center shadow-2xl"
        >
          <p className="text-2xl">🎮✨</p>
          <p className="mt-1 font-semibold">Secret game unlocked!</p>
          <a href="/arcade" className="mt-1 inline-block font-mono text-xs text-accent hover:underline">
            play &quot;Orbit&quot; in the arcade →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
