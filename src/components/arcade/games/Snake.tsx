"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";
import { loadBest, saveBest } from "../util";

const N = 20;
const CELL = 18;
const SIZE = N * CELL;

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest("snake"));

  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const snake = [{ x: 10, y: 10 }];
    let dir = { x: 1, y: 0 };
    let nextDir = dir;
    let food = { x: 15, y: 10 };
    let points = 0;

    function placeFood() {
      do {
        food = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) };
      } while (snake.some((c) => c.x === food.x && c.y === food.y));
    }

    function draw() {
      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, SIZE, SIZE);
      ctx!.fillStyle = "#a78bfa";
      ctx!.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);
      snake.forEach((c, i) => {
        ctx!.fillStyle = i === 0 ? "#67e8f9" : "#22d3ee";
        ctx!.fillRect(c.x * CELL + 1, c.y * CELL + 1, CELL - 2, CELL - 2);
      });
    }

    function onKey(e: KeyboardEvent) {
      const map: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const nd = map[e.key];
      if (!nd) return;
      e.preventDefault();
      if (nd.x !== -dir.x || nd.y !== -dir.y) nextDir = nd;
    }

    window.addEventListener("keydown", onKey);
    const timer = setInterval(() => {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= N ||
        head.y >= N ||
        snake.some((c) => c.x === head.x && c.y === head.y)
      ) {
        clearInterval(timer);
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, points);
          saveBest("snake", nb);
          return nb;
        });
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        points += 1;
        setScore(points);
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }, 110);
    draw();

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", onKey);
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
        <canvas ref={canvasRef} width={SIZE} height={SIZE} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Snake" : "Game Over"}
            subtitle={phase === "over" ? `score: ${score}` : "arrows / WASD to steer"}
            actionLabel={phase === "ready" ? "Start" : "Play again"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
