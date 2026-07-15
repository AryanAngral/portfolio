"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const COLS = 10;
const ROWS = 20;
const CELL = 20;
const W = COLS * CELL + 100;
const H = ROWS * CELL;

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
];
const COLORS = ["#22d3ee", "#facc15", "#a78bfa", "#60a5fa", "#fb923c", "#f472b6", "#34d399"];
const LINE_SCORES = [0, 100, 300, 500, 800];

function rotate(shape: number[][]): number[][] {
  return shape[0].map((_, c) => shape.map((row) => row[c]).reverse());
}

export default function Blocks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [best, setBest] = useState(() => loadBest("blocks"));

  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const grid: (number | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    let points = 0;
    let cleared = 0;
    let dropMs = 700;
    let pieceId = Math.floor(Math.random() * 7);
    let nextId = Math.floor(Math.random() * 7);
    let shape = SHAPES[pieceId].map((r) => [...r]);
    let px = 3;
    let py = 0;
    let over = false;
    let timer: ReturnType<typeof setInterval>;

    function collides(s: number[][], x: number, y: number) {
      return s.some((row, r) =>
        row.some((v, c) => {
          if (!v) return false;
          const gx = x + c;
          const gy = y + r;
          return gx < 0 || gx >= COLS || gy >= ROWS || (gy >= 0 && grid[gy][gx] !== null);
        }),
      );
    }

    function spawn() {
      pieceId = nextId;
      nextId = Math.floor(Math.random() * 7);
      shape = SHAPES[pieceId].map((r) => [...r]);
      px = 3;
      py = -1;
      if (collides(shape, px, py + 1)) {
        over = true;
        clearInterval(timer);
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, points);
          saveBest("blocks", nb);
          return nb;
        });
      }
    }

    function lock() {
      shape.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v && py + r >= 0) grid[py + r][px + c] = pieceId;
        }),
      );
      let n = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r].every((v) => v !== null)) {
          grid.splice(r, 1);
          grid.unshift(Array(COLS).fill(null));
          n += 1;
          r += 1;
        }
      }
      if (n) {
        cleared += n;
        points += LINE_SCORES[n];
        setLines(cleared);
        setScore(points);
        const newMs = Math.max(140, 700 - Math.floor(cleared / 8) * 90);
        if (newMs !== dropMs) {
          dropMs = newMs;
          clearInterval(timer);
          timer = setInterval(tick, dropMs);
        }
      }
      spawn();
    }

    function tick() {
      if (over) return;
      if (!collides(shape, px, py + 1)) py += 1;
      else lock();
      draw();
    }

    function draw() {
      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          const v = grid[r][c];
          if (v !== null) {
            ctx!.fillStyle = COLORS[v];
            ctx!.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      ctx!.fillStyle = COLORS[pieceId];
      shape.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v && py + r >= 0)
            ctx!.fillRect((px + c) * CELL + 1, (py + r) * CELL + 1, CELL - 2, CELL - 2);
        }),
      );
      ctx!.strokeStyle = "#2a2a3a";
      ctx!.strokeRect(COLS * CELL + 0.5, 0.5, 99, H - 1);
      ctx!.fillStyle = "#9a9aa5";
      ctx!.font = "11px monospace";
      ctx!.fillText("NEXT", COLS * CELL + 34, 24);
      ctx!.fillStyle = COLORS[nextId];
      SHAPES[nextId].forEach((row, r) =>
        row.forEach((v, c) => {
          if (v) ctx!.fillRect(COLS * CELL + 26 + c * 14, 40 + r * 14, 12, 12);
        }),
      );
    }

    function onKey(e: KeyboardEvent) {
      if (over) return;
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        if (!collides(shape, px - 1, py)) px -= 1;
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        if (!collides(shape, px + 1, py)) px += 1;
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        if (!collides(shape, px, py + 1)) py += 1;
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        const rotated = rotate(shape);
        for (const kick of [0, -1, 1, -2, 2]) {
          if (!collides(rotated, px + kick, py)) {
            shape = rotated;
            px += kick;
            break;
          }
        }
      } else if (e.key === " ") {
        e.preventDefault();
        while (!collides(shape, px, py + 1)) py += 1;
        lock();
      }
      draw();
    }

    timer = setInterval(tick, dropMs);
    window.addEventListener("keydown", onKey);
    spawn();
    draw();

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  function start() {
    setScore(0);
    setLines(0);
    setPhase("playing");
  }

  return (
    <div>
      <ScoreRow
        items={[
          { label: "score", value: score },
          { label: "lines", value: lines },
          { label: "best", value: best },
        ]}
      />
      <Playfield>
        <canvas ref={canvasRef} width={W} height={H} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Blocks" : "Game Over"}
            subtitle={
              phase === "ready" ? "←/→ move · ↑ rotate · ↓ soft · space hard drop" : `score: ${score}`
            }
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
