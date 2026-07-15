"use client";

import { useEffect, useRef } from "react";

type Piece = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; color: string; size: number };

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#facc15"];

    function burst() {
      const cx = window.innerWidth / 2;
      const pieces: Piece[] = [];
      for (let i = 0; i < 140; i++) {
        const angle = (Math.PI * 2 * i) / 140;
        const speed = 4 + Math.random() * 7;
        pieces.push({
          x: cx,
          y: window.innerHeight * 0.35,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          color: colors[i % colors.length],
          size: 5 + Math.random() * 6,
        });
      }
      piecesRef.current = pieces;
      if (!rafRef.current) loop();
    }

    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      piecesRef.current.forEach((p) => {
        p.vy += 0.16;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx!.restore();
      });
      piecesRef.current = piecesRef.current.filter((p) => p.y < window.innerHeight + 20);
      if (piecesRef.current.length) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      }
    }

    function onFire() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      burst();
    }
    window.addEventListener("confetti", onFire);
    return () => {
      window.removeEventListener("confetti", onFire);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="no-print pointer-events-none fixed inset-0 z-[96]"
    />
  );
}
