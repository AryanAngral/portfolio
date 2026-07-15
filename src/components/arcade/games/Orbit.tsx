"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const W = 360;
const H = 420;
const PADDLE = 80;

// A bouncing-logo / pong hybrid: keep the drifting "A" logo alive by bouncing
// it off your paddle. Each bounce speeds it up. Unlocked via the Konami code.
export default function Orbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("orbit"));

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let px = W / 2 - PADDLE / 2;
    let x = W / 2;
    let y = 60;
    let vx = 2.8;
    let vy = 3;
    let hits = 0;
    const box = 34;
    const hues = ["#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#facc15"];
    let hue = 0;
    let raf = 0;

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      px = Math.max(0, Math.min(W - PADDLE, e.clientX - rect.left - PADDLE / 2));
    }
    const keys = { l: false, r: false };
    function onKey(e: KeyboardEvent, down: boolean) {
      if (e.key === "ArrowLeft" || e.key === "a") keys.l = down;
      if (e.key === "ArrowRight" || e.key === "d") keys.r = down;
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);

    function loop() {
      if (keys.l) px = Math.max(0, px - 6);
      if (keys.r) px = Math.min(W - PADDLE, px + 6);
      x += vx;
      y += vy;
      if (x <= 0 || x + box >= W) {
        vx = -vx;
        hue = (hue + 1) % hues.length;
      }
      if (y <= 0) vy = -vy;

      // paddle collision
      if (y + box >= H - 20 && y + box <= H - 6 && x + box > px && x < px + PADDLE && vy > 0) {
        vy = -Math.abs(vy) * 1.04;
        vx *= 1.02;
        hits += 1;
        setScore(hits);
      }
      if (y > H) {
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, hits);
          saveBest("orbit", nb);
          return nb;
        });
        return;
      }

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      ctx!.fillStyle = "#22d3ee";
      ctx!.fillRect(px, H - 14, PADDLE, 8);
      ctx!.fillStyle = hues[hue];
      ctx!.beginPath();
      ctx!.roundRect(x, y, box, box, 8);
      ctx!.fill();
      ctx!.fillStyle = "#0a0a12";
      ctx!.font = "bold 22px sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("A", x + box / 2, y + box / 2 + 1);

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    canvas.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [phase]);

  function start() {
    setScore(0);
    setPhase("playing");
  }

  return (
    <div>
      <ScoreRow items={[{ label: "bounces", value: score }, { label: "best", value: best }]} />
      <Playfield>
        <canvas ref={canvasRef} width={W} height={H} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Orbit 🎮" : "Dropped!"}
            subtitle={phase === "ready" ? "secret game · mouse or ←/→ to keep it alive" : `bounces: ${score}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
