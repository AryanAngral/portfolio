"use client";

import { useEffect, useRef } from "react";
import { useT } from "./T";
import github from "@/lib/github.json";

const COLORS = ["#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#facc15", "#fb923c"];

export default function LanguageDonut() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = github.langBreakdown as { name: string; count: number }[];
  const total = data.reduce((sum, d) => sum + d.count, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const size = 180;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const outer = 82;
    const inner = 52;

    let progress = 0;
    let raf = 0;

    function draw() {
      ctx!.clearRect(0, 0, size, size);
      let start = -Math.PI / 2;
      data.forEach((d, i) => {
        const slice = (d.count / total) * Math.PI * 2 * progress;
        ctx!.beginPath();
        ctx!.arc(cx, cy, outer, start, start + slice);
        ctx!.arc(cx, cy, inner, start + slice, start, true);
        ctx!.closePath();
        ctx!.fillStyle = COLORS[i % COLORS.length];
        ctx!.fill();
        start += slice;
      });
      const styles = getComputedStyle(document.documentElement);
      ctx!.fillStyle = styles.getPropertyValue("--foreground").trim() || "#fff";
      ctx!.font = "bold 22px sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(String(total), cx, cy - 6);
      ctx!.font = "10px monospace";
      ctx!.fillStyle = styles.getPropertyValue("--muted").trim() || "#999";
      ctx!.fillText("repos", cx, cy + 12);

      if (progress < 1) {
        progress = Math.min(1, progress + 0.06);
        raf = requestAnimationFrame(draw);
      }
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [data, total]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-4 font-semibold">{t("gh.donut")}</h3>
      <div className="flex items-center gap-6">
        <canvas ref={canvasRef} className="shrink-0" />
        <ul className="space-y-1.5">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-foreground">{d.name}</span>
              <span className="font-mono text-xs text-muted">{d.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
