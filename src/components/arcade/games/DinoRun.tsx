"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const W = 360;
const H = 240;
const GROUND = H - 40;

export default function DinoRun() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("dino"));

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let y = GROUND;
    let vy = 0;
    let speed = 4.2;
    let dist = 0;
    let obstacles: { x: number; w: number; h: number }[] = [{ x: W + 60, w: 14, h: 30 }];
    let raf = 0;

    function jump() {
      if (y >= GROUND - 0.5) vy = -9.4;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    }
    function onPointer() {
      jump();
    }

    function loop() {
      vy += 0.52;
      y = Math.min(GROUND, y + vy);
      speed += 0.0016;
      dist += speed;
      const points = Math.floor(dist / 10);
      setScore(points);

      obstacles.forEach((o) => (o.x -= speed));
      if (obstacles[obstacles.length - 1].x < W - 160 - Math.random() * 160) {
        obstacles.push({ x: W + 20, w: 12 + Math.random() * 16, h: 22 + Math.random() * 26 });
      }
      obstacles = obstacles.filter((o) => o.x > -40);

      const hit = obstacles.some(
        (o) => 46 + 18 > o.x && 46 < o.x + o.w && y > GROUND - o.h,
      );
      if (hit) {
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, points);
          saveBest("dino", nb);
          return nb;
        });
        return;
      }

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      ctx!.strokeStyle = "#2a2a3a";
      ctx!.beginPath();
      ctx!.moveTo(0, GROUND + 20);
      ctx!.lineTo(W, GROUND + 20);
      ctx!.stroke();
      ctx!.fillStyle = "#22d3ee";
      ctx!.fillRect(46, y - 20, 18, 20);
      ctx!.fillRect(58, y - 28, 10, 10);
      ctx!.fillStyle = "#34d399";
      obstacles.forEach((o) => ctx!.fillRect(o.x, GROUND + 20 - o.h, o.w, o.h));

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
            title={phase === "ready" ? "Runner" : "Game Over"}
            subtitle={phase === "ready" ? "space / click to jump" : `score: ${score}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
