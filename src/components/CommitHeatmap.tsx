"use client";

import { useEffect, useRef } from "react";
import { useT } from "./T";
import heatmap from "@/lib/heatmap.json";

const CELL = 11;
const GAP = 3;
const ROWS = 7;

export default function CommitHeatmap() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const counts = heatmap.counts as number[];
    const start = new Date(heatmap.start + "T00:00:00");
    const startDow = start.getDay(); // 0=Sun
    const cols = Math.ceil((counts.length + startDow) / ROWS);

    const width = cols * (CELL + GAP);
    const height = ROWS * (CELL + GAP);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim() || "#a78bfa";
    const empty = styles.getPropertyValue("--surface-2").trim() || "#17171d";

    const max = Math.max(1, ...counts);
    function color(count: number): string {
      if (count === 0) return empty;
      const t = count / max;
      const alpha = 0.35 + t * 0.65;
      return `color-mix(in srgb, ${accent} ${Math.round(alpha * 100)}%, transparent)`;
    }

    ctx.clearRect(0, 0, width, height);
    counts.forEach((count, i) => {
      const cellIndex = i + startDow;
      const col = Math.floor(cellIndex / ROWS);
      const row = cellIndex % ROWS;
      ctx.fillStyle = color(count);
      const x = col * (CELL + GAP);
      const y = row * (CELL + GAP);
      ctx.beginPath();
      ctx.roundRect(x, y, CELL, CELL, 2);
      ctx.fill();
    });
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
{t("gh.heatmap")}
        </p>
        <p className="font-mono text-xs text-accent-2">{heatmap.total} commits</p>
      </div>
      <div className="overflow-x-auto">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted">
        less
        <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-surface-2" />
        <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-accent/40" />
        <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-accent/70" />
        <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-accent" />
        more
      </div>
    </div>
  );
}
