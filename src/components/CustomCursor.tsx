"use client";

import { useEffect, useRef } from "react";

// Custom cursor: accent dot follows the pointer 1:1, ring trails with a lerp
// and grows over interactive elements. Enabled only for fine pointers with
// motion allowed — the html class gates both visibility and `cursor: none`.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let down = false;
    let raf = 0;

    function isInteractive(target: EventTarget | null) {
      return (
        target instanceof Element &&
        !!target.closest("a, button, [role='button'], input, textarea, select, label")
      );
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      targetScale = isInteractive(e.target) ? 2.2 : 1;
    }
    function onDown() {
      down = true;
    }
    function onUp() {
      down = false;
    }
    function onLeave() {
      mx = my = -100;
    }

    function frame() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += ((down ? targetScale * 0.75 : targetScale) - scale) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div id="custom-cursor" aria-hidden className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border-2 border-white mix-blend-difference will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white mix-blend-difference will-change-transform"
      />
    </div>
  );
}
