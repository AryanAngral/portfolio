"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiDroplet, FiShuffle, FiX, FiClock } from "react-icons/fi";
import { SKINS, DEFAULT_SKIN, skinById } from "@/lib/skins";
import { applySkin } from "@/lib/applySkin";
import { unlock } from "@/lib/achievements";

// map local hour → a fitting skin for the "auto by time of day" mode
function timeSkinId(): string {
  const h = new Date().getHours();
  if (h >= 6 && h < 11) return "paper"; // morning: bright
  if (h >= 11 && h < 17) return "apple"; // day: clean light
  if (h >= 17 && h < 20) return "synthwave"; // dusk
  return "nebula"; // night
}

export default function SkinPicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(DEFAULT_SKIN);
  const [auto, setAuto] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- one-shot client hydrate */
  useEffect(() => {
    // ?skin=<id> in the URL wins on first load (shareable links)
    const urlSkin = new URLSearchParams(window.location.search).get("skin");
    if (urlSkin && skinById(urlSkin)) {
      applySkin(skinById(urlSkin)!);
      setCurrent(urlSkin);
      return;
    }
    try {
      setCurrent(localStorage.getItem("skin") || DEFAULT_SKIN);
      setAuto(localStorage.getItem("skin-auto") === "1");
    } catch {
      /* ignore */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // allow opening from the command palette / terminal
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("skins:open", openIt);
    return () => window.removeEventListener("skins:open", openIt);
  }, []);

  // auto-by-time: re-evaluate on an interval while enabled
  useEffect(() => {
    if (!auto) return;
    function tick() {
      const id = timeSkinId();
      const skin = skinById(id);
      if (skin) {
        applySkin(skin);
        setCurrent(id);
      }
    }
    tick();
    const t = setInterval(tick, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [auto]);

  function choose(id: string) {
    const skin = skinById(id);
    if (!skin) return;
    setAuto(false);
    try {
      localStorage.setItem("skin-auto", "0");
    } catch {
      /* ignore */
    }
    applySkin(skin);
    setCurrent(id);
    unlock("stylist");
  }

  function surprise() {
    const pool = SKINS.filter((s) => s.id !== current);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    choose(pick.id);
  }

  function toggleAuto() {
    const next = !auto;
    setAuto(next);
    try {
      localStorage.setItem("skin-auto", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  const groups = useMemo(() => {
    const map = new Map<string, typeof SKINS>();
    for (const s of SKINS) {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change skin"
        title="Skins — 19 themes"
        className="no-print flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        <FiDroplet size={15} />
        <span className="text-xs font-medium">Skins</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-16 z-[60] max-h-[75vh] w-80 overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Skins · {SKINS.length}
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted hover:text-accent cursor-pointer">
                <FiX size={15} />
              </button>
            </div>

            <div className="mb-3 flex gap-2">
              <button
                onClick={surprise}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 font-mono text-xs text-accent-contrast cursor-pointer"
              >
                <FiShuffle size={12} /> Surprise me
              </button>
              <button
                onClick={toggleAuto}
                className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs cursor-pointer ${
                  auto ? "border-accent text-accent" : "border-border text-muted hover:text-accent"
                }`}
              >
                <FiClock size={12} /> Auto
              </button>
            </div>

            {groups.map(([group, skins]) => (
              <div key={group} className="mb-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">{group}</p>
                <div className="grid grid-cols-2 gap-2">
                  {skins.map((s) => {
                    const on = current === s.id && !auto;
                    return (
                      <button
                        key={s.id}
                        onClick={() => choose(s.id)}
                        className={`overflow-hidden rounded-lg border text-left transition-colors cursor-pointer ${
                          on ? "border-accent" : "border-border hover:border-muted"
                        }`}
                      >
                        <span
                          className="block h-10 w-full"
                          style={{
                            background: `linear-gradient(120deg, ${s.vars.bg} 0%, ${s.vars.bg} 45%, ${s.vars.accent} 75%, ${s.vars.accent2} 100%)`,
                          }}
                        />
                        <span className="flex items-center justify-between px-2 py-1.5">
                          <span className="text-xs font-medium">{s.name}</span>
                          {on && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="text-center font-mono text-[10px] text-muted">
              saved locally · share with ?skin=id
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
