"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "ARYAN_OS v2.6 — bootloader",
  "CPU ......... caffeine @ 3.2GHz  [OK]",
  "MEMORY ...... 8.8 CGPA           [OK]",
  "SECURITY .... CSP+HSTS hardened  [OK]",
  "ARCADE ...... 17 titles loaded   [OK]",
  "boot complete — entering portfolio",
];

const noopSubscribe = () => () => {};

export default function BootScreen() {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [visible, setVisible] = useState<boolean | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    let alreadyBooted = true;
    try {
      alreadyBooted = sessionStorage.getItem("booted") === "1";
      sessionStorage.setItem("booted", "1");
    } catch {
      /* no storage: boot anyway */
      alreadyBooted = false;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // one-shot client init: decide visibility from sessionStorage + media query
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!alreadyBooted && !reduced);
  }, [mounted]);

  useEffect(() => {
    if (!visible) return;
    const lineTimer = setInterval(() => {
      setShown((n) => {
        if (n >= LINES.length) {
          clearInterval(lineTimer);
          return n;
        }
        return n + 1;
      });
    }, 260);
    const doneTimer = setTimeout(() => setVisible(false), LINES.length * 260 + 600);
    function skip() {
      setVisible(false);
    }
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black px-6"
          aria-hidden
        >
          <div className="w-full max-w-md font-mono text-sm leading-7 text-emerald-400">
            {LINES.slice(0, shown).map((line) => (
              <p key={line}>{line}</p>
            ))}
            <span className="inline-block h-4 w-2.5 animate-pulse bg-emerald-400" />
            <p className="mt-4 text-xs text-emerald-700">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
