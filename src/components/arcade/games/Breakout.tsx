"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const W = 360;
const H = 420;
const COLS = 8;
const ROWS = 5;
const BW = W / COLS;
const BH = 16;
const COLORS = ["#f472b6", "#a78bfa", "#60a5fa", "#22d3ee", "#34d399"];

export default function Breakout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(() => loadBest("breakout"));

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let px = W / 2 - 32;
    let bx = W / 2;
    let by = H - 60;
    let vx = 2.6;
    let vy = -3.2;
    let points = 0;
    let lv = 3;
    let level = 1;
    let bricks: boolean[] = Array(COLS * ROWS).fill(true);
    const keys = { left: false, right: false };
    let raf = 0;

    function onKey(e: KeyboardEvent, down: boolean) {
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        keys.left = down;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        keys.right = down;
      }
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      px = Math.max(0, Math.min(W - 64, e.clientX - rect.left - 32));
    }

    function die() {
      lv -= 1;
      setLives(lv);
      if (lv <= 0) {
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, points);
          saveBest("breakout", nb);
          return nb;
        });
        return false;
      }
      bx = W / 2;
      by = H - 60;
      vx = 2.6;
      vy = -3.2;
      return true;
    }

    function loop() {
      if (keys.left) px = Math.max(0, px - 6);
      if (keys.right) px = Math.min(W - 64, px + 6);

      bx += vx;
      by += vy;
      if (bx < 5 || bx > W - 5) vx = -vx;
      if (by < 5) vy = -vy;
      if (by > H) {
        if (!die()) return;
      }

      if (by > H - 34 && by < H - 22 && bx > px - 4 && bx < px + 68 && vy > 0) {
        vy = -Math.abs(vy);
        vx = ((bx - (px + 32)) / 32) * 4;
      }

      const col = Math.floor(bx / BW);
      const row = Math.floor((by - 40) / BH);
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS && bricks[row * COLS + col]) {
        bricks[row * COLS + col] = false;
        points += 10;
        setScore(points);
        vy = -vy;
        if (bricks.every((b) => !b)) {
          level += 1;
          bricks = Array(COLS * ROWS).fill(true);
          bx = W / 2;
          by = H - 60;
          vy = -(3.2 + level * 0.4);
          vx = 2.6 + level * 0.3;
        }
      }

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!bricks[r * COLS + c]) continue;
          ctx!.fillStyle = COLORS[r];
          ctx!.fillRect(c * BW + 2, 40 + r * BH + 2, BW - 4, BH - 4);
        }
      }
      ctx!.fillStyle = "#22d3ee";
      ctx!.fillRect(px, H - 30, 64, 8);
      ctx!.fillStyle = "#f2f2f7";
      ctx!.beginPath();
      ctx!.arc(bx, by, 5, 0, Math.PI * 2);
      ctx!.fill();

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    canvas.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, [phase]);

  function start() {
    setScore(0);
    setLives(3);
    setPhase("playing");
  }

  return (
    <div>
      <ScoreRow
        items={[
          { label: "score", value: score },
          { label: "lives", value: lives },
          { label: "best", value: best },
        ]}
      />
      <Playfield>
        <canvas ref={canvasRef} width={W} height={H} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Breakout" : "Game Over"}
            subtitle={phase === "ready" ? "mouse or ←/→ to move" : `score: ${score}`}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
