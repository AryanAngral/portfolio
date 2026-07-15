"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソ0123456789ABCDEF{}[]<>/=+*ARYAN".split("");

export default function MatrixRain() {
  const [on, setOn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function toggle() {
      setOn((o) => !o);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOn(false);
    }
    window.addEventListener("matrix:toggle", toggle);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("matrix:toggle", toggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1);
    let raf = 0;
    let last = 0;

    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      if (t - last < 55) return;
      last = t;
      cols = Math.floor(canvas!.width / fontSize);
      if (drops.length !== cols) drops = Array(cols).fill(1);

      ctx!.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = "#4ade80";
      ctx!.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx!.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas!.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [on]);

  if (!on) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
      <button
        onClick={() => setOn(false)}
        className="absolute right-5 top-5 rounded-full border border-emerald-500/50 bg-black/60 px-4 py-1.5 font-mono text-xs text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
      >
        exit matrix [esc]
      </button>
    </div>
  );
}
