"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const W = 360;
const H = 420;

export default function Invaders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("invaders"));

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let px = W / 2;
    let aliens: { x: number; y: number }[] = [];
    let adx = 0.6;
    let shots: { x: number; y: number }[] = [];
    let bombs: { x: number; y: number }[] = [];
    let points = 0;
    let wave = 1;
    let cooldown = 0;
    const keys = { left: false, right: false, fire: false };
    let raf = 0;

    function spawnWave() {
      aliens = [];
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 8; c++) aliens.push({ x: 36 + c * 38, y: 50 + r * 32 });
      adx = 0.5 + wave * 0.15;
    }
    spawnWave();

    function end() {
      setPhase("over");
      setBest((b) => {
        const nb = Math.max(b, points);
        saveBest("invaders", nb);
        return nb;
      });
    }

    function onKey(e: KeyboardEvent, down: boolean) {
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        keys.left = down;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        keys.right = down;
      }
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        keys.fire = down;
      }
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);

    function loop() {
      if (keys.left) px = Math.max(16, px - 4.5);
      if (keys.right) px = Math.min(W - 16, px + 4.5);
      cooldown -= 1;
      if (keys.fire && cooldown <= 0) {
        shots.push({ x: px, y: H - 46 });
        cooldown = 18;
      }

      const edge = aliens.some((a) => (adx > 0 ? a.x > W - 24 : a.x < 24));
      if (edge) {
        adx = -adx * 1.03;
        aliens.forEach((a) => (a.y += 14));
      }
      aliens.forEach((a) => (a.x += adx));
      if (aliens.some((a) => a.y > H - 70)) return end();

      if (Math.random() < 0.012 + wave * 0.003 && aliens.length) {
        const a = aliens[Math.floor(Math.random() * aliens.length)];
        bombs.push({ x: a.x, y: a.y + 10 });
      }

      shots.forEach((s) => (s.y -= 7));
      bombs.forEach((b) => (b.y += 3.2 + wave * 0.3));
      shots = shots.filter((s) => s.y > -10);
      bombs = bombs.filter((b) => b.y < H + 10);

      shots = shots.filter((s) => {
        const hit = aliens.findIndex((a) => Math.abs(a.x - s.x) < 14 && Math.abs(a.y - s.y) < 12);
        if (hit >= 0) {
          aliens.splice(hit, 1);
          points += 20;
          setScore(points);
          return false;
        }
        return true;
      });

      if (bombs.some((b) => Math.abs(b.x - px) < 13 && b.y > H - 44 && b.y < H - 24)) return end();

      if (!aliens.length) {
        wave += 1;
        spawnWave();
        bombs = [];
      }

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      ctx!.fillStyle = "#34d399";
      aliens.forEach((a) => {
        ctx!.fillRect(a.x - 10, a.y - 7, 20, 14);
        ctx!.clearRect(a.x - 4, a.y - 3, 3, 3);
        ctx!.clearRect(a.x + 1, a.y - 3, 3, 3);
      });
      ctx!.fillStyle = "#22d3ee";
      ctx!.fillRect(px - 13, H - 40, 26, 10);
      ctx!.fillRect(px - 3, H - 47, 6, 8);
      ctx!.fillStyle = "#f2f2f7";
      shots.forEach((s) => ctx!.fillRect(s.x - 1.5, s.y - 6, 3, 10));
      ctx!.fillStyle = "#f472b6";
      bombs.forEach((b) => ctx!.fillRect(b.x - 2, b.y - 5, 4, 9));

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
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
            title={phase === "ready" ? "Invaders" : "Game Over"}
            subtitle={phase === "ready" ? "←/→ move · space to shoot" : `score: ${score}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
