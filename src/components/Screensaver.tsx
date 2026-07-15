"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_MS = 30000;

export default function Screensaver() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    function reset() {
      setActive(false);
      clearTimeout(timer);
      timer = setTimeout(() => setActive(true), IDLE_MS);
    }
    const events = ["mousemove", "keydown", "pointerdown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;
    let x = W() / 2;
    let y = H() / 2;
    let vx = 2.6;
    let vy = 2.1;
    const box = 120;
    const hues = ["#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#facc15"];
    let hue = 0;
    let raf = 0;

    function frame() {
      ctx!.fillStyle = "rgba(0,0,0,0.25)";
      ctx!.fillRect(0, 0, W(), H());
      x += vx;
      y += vy;
      if (x <= 0 || x + box >= W()) {
        vx = -vx;
        hue = (hue + 1) % hues.length;
      }
      if (y <= 0 || y + box >= H()) {
        vy = -vy;
        hue = (hue + 1) % hues.length;
      }
      ctx!.fillStyle = hues[hue];
      ctx!.beginPath();
      ctx!.roundRect(x, y, box, box, 24);
      ctx!.fill();
      ctx!.fillStyle = "#0a0a12";
      ctx!.font = "bold 64px sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("A", x + box / 2, y + box / 2 + 2);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="no-print fixed inset-0 z-[190] bg-black" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40">
        move the mouse to wake
      </p>
    </div>
  );
}
