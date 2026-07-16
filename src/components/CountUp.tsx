"use client";

import { useEffect, useRef, useState } from "react";

const NUM_RE = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

// Animates the numeric part of a value (e.g. "24K+", "8.8", "200+", "30%")
// from 0 when scrolled into view. Non-numeric values ("C++") render as-is.
export default function CountUp({ value, className }: { value: string | number; className?: string }) {
  const raw = String(value);
  const parsed = raw.match(NUM_RE);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(parsed ? `${parsed[1]}0${parsed[3]}` : raw);

  useEffect(() => {
    const match = raw.match(NUM_RE);
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(raw);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const decimals = match[2].includes(".") ? 1 : 0;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const n = (target * eased).toFixed(decimals);
          setDisplay(`${prefix}${n}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // depend only on the stable string — never on the re-created match array
  }, [raw]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
