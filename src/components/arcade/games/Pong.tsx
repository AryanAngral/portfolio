"use client";

import { useEffect, useRef, useState } from "react";
import { Overlay, Playfield, ScoreRow } from "../GamePanel";

const W = 360;
const H = 420;
const PADDLE = 70;
const WIN = 7;

export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState({ you: 0, cpu: 0 });

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let py = H / 2 - PADDLE / 2;
    let cy = py;
    let bx = W / 2;
    let by = H / 2;
    let vx = 3.4;
    let vy = 2.2;
    let you = 0;
    let cpu = 0;
    const keys = { up: false, down: false };
    let raf = 0;

    function resetBall(towardYou: boolean) {
      bx = W / 2;
      by = H / 2;
      vx = (towardYou ? -1 : 1) * 3.4;
      vy = (Math.random() - 0.5) * 5;
    }

    function onKey(e: KeyboardEvent, down: boolean) {
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        keys.up = down;
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        keys.down = down;
      }
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      py = Math.max(0, Math.min(H - PADDLE, e.clientY - rect.top - PADDLE / 2));
    }

    function loop() {
      if (keys.up) py = Math.max(0, py - 6);
      if (keys.down) py = Math.min(H - PADDLE, py + 6);

      const target = by - PADDLE / 2 + (Math.random() - 0.5) * 12;
      cy += Math.max(-4.2, Math.min(4.2, target - cy));
      cy = Math.max(0, Math.min(H - PADDLE, cy));

      bx += vx;
      by += vy;
      if (by < 6 || by > H - 6) vy = -vy;

      if (bx < 20 && by > py - 6 && by < py + PADDLE + 6 && vx < 0) {
        vx = -vx * 1.04;
        vy += ((by - (py + PADDLE / 2)) / PADDLE) * 5;
      }
      if (bx > W - 20 && by > cy - 6 && by < cy + PADDLE + 6 && vx > 0) {
        vx = -vx * 1.04;
        vy += ((by - (cy + PADDLE / 2)) / PADDLE) * 5;
      }

      if (bx < 0) {
        cpu += 1;
        setScore({ you, cpu });
        resetBall(false);
      }
      if (bx > W) {
        you += 1;
        setScore({ you, cpu });
        resetBall(true);
      }
      if (you >= WIN || cpu >= WIN) {
        setPhase("over");
        return;
      }

      ctx!.fillStyle = "#0a0a12";
      ctx!.fillRect(0, 0, W, H);
      ctx!.strokeStyle = "#2a2a3a";
      ctx!.setLineDash([6, 8]);
      ctx!.beginPath();
      ctx!.moveTo(W / 2, 0);
      ctx!.lineTo(W / 2, H);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.fillStyle = "#22d3ee";
      ctx!.fillRect(12, py, 8, PADDLE);
      ctx!.fillStyle = "#a78bfa";
      ctx!.fillRect(W - 20, cy, 8, PADDLE);
      ctx!.fillStyle = "#f2f2f7";
      ctx!.fillRect(bx - 5, by - 5, 10, 10);

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
    setScore({ you: 0, cpu: 0 });
    setPhase("playing");
  }

  return (
    <div>
      <ScoreRow items={[{ label: "you", value: score.you }, { label: "cpu", value: score.cpu }]} />
      <Playfield>
        <canvas ref={canvasRef} width={W} height={H} className="block max-w-full" />
        {phase !== "playing" && (
          <Overlay
            title={phase === "ready" ? "Pong" : score.you > score.cpu ? "You win!" : "CPU wins"}
            subtitle={phase === "ready" ? `first to ${WIN} — mouse or ↑/↓` : `${score.you} : ${score.cpu}`}
            actionLabel={phase === "ready" ? "Start" : "Rematch"}
            onAction={start}
          />
        )}
      </Playfield>
    </div>
  );
}
