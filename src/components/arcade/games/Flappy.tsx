"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const W = 360;
const H = 420;
const GAP = 120;

export default function Flappy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("flappy"));

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let y = H / 2;
    let vy = 0;
    let pipes: { x: number; top: number; passed: boolean }[] = [{ x: W + 40, top: 140, passed: false }];
    let points = 0;
    let raf = 0;

    function flap() {
      vy = -6.2;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        flap();
      }
    }
    function onPointer() {
      flap();
    }

    function end() {
      setPhase("over");
      setBest((b) => {
        const nb = Math.max(b, points);
        saveBest("flappy", nb);
        return nb;
      });
    }

    function loop() {
      vy += 0.34;
      y += vy;

      pipes.forEach((p) => (p.x -= 2.4));
      if (pipes[pipes.length - 1].x < W - 170) {
        pipes.push({ x: W + 20, top: 60 + Math.random() * (H - GAP - 140), passed: false });
      }
      pipes = pipes.filter((p) => p.x > -60);

      for (const p of pipes) {
        if (!p.passed && p.x + 24 < 70) {
          p.passed = true;
          points += 1;
          setScore(points);
        }
        if (70 + 12 > p.x && 70 - 12 < p.x + 48 && (y - 10 < p.top || y + 10 > p.top + GAP)) {
          return end();
        }
      }
      if (y > H - 10 || y < 0) return end();

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      ctx!.fillStyle = "#34d399";
      pipes.forEach((p) => {
        ctx!.fillRect(p.x, 0, 48, p.top);
        ctx!.fillRect(p.x, p.top + GAP, 48, H - p.top - GAP);
      });
      ctx!.fillStyle = "#facc15";
      ctx!.beginPath();
      ctx!.arc(70, y, 10, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(74, y - 4, 5, 3);

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, [phase]);

  function start() {
    setScore(0);
    setPhase("playing");
  }

  return (
    <div>
      <ScoreRow items={[{ label: "score", value: score }, { label: "best", value: best }]} />
      <Playfield>
        <canvas ref={canvasRef} width={W} height={H} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Flappy Dot" : "Game Over"}
            subtitle={phase === "ready" ? "space / click to flap" : `score: ${score}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
