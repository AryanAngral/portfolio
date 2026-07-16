"use client";

import { useEffect, useRef } from "react";
import { useT } from "./T";
import { skillsRadar } from "@/lib/data";

export default function SkillsRadar() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const size = 280;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim() || "#a78bfa";
    const accent2 = styles.getPropertyValue("--accent-2").trim() || "#22d3ee";
    const border = styles.getPropertyValue("--border").trim() || "#23232b";
    const muted = styles.getPropertyValue("--muted").trim() || "#9a9aa5";

    const cx = size / 2;
    const cy = size / 2;
    const R = 92;
    const n = skillsRadar.length;
    const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

    let progress = 0;
    let raf = 0;

    function draw() {
      ctx!.clearRect(0, 0, size, size);

      // rings
      ctx!.strokeStyle = border;
      ctx!.fillStyle = muted;
      ctx!.font = "10px monospace";
      for (let ring = 1; ring <= 4; ring++) {
        const r = (R * ring) / 4;
        ctx!.beginPath();
        for (let i = 0; i <= n; i++) {
          const a = angle(i % n);
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }

      // spokes + labels
      skillsRadar.forEach((s, i) => {
        const a = angle(i);
        ctx!.strokeStyle = border;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx!.stroke();
        const lx = cx + Math.cos(a) * (R + 18);
        const ly = cy + Math.sin(a) * (R + 18);
        ctx!.fillStyle = muted;
        ctx!.textAlign = Math.abs(Math.cos(a)) < 0.3 ? "center" : Math.cos(a) > 0 ? "left" : "right";
        ctx!.textBaseline = "middle";
        ctx!.fillText(s.axis, lx, ly);
      });

      // data polygon
      const grad = ctx!.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, accent);
      grad.addColorStop(1, accent2);
      ctx!.beginPath();
      skillsRadar.forEach((s, i) => {
        const a = angle(i);
        const r = R * (s.value / 100) * progress;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      });
      ctx!.closePath();
      ctx!.globalAlpha = 0.25;
      ctx!.fillStyle = grad;
      ctx!.fill();
      ctx!.globalAlpha = 1;
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 2;
      ctx!.stroke();

      // vertices
      skillsRadar.forEach((s, i) => {
        const a = angle(i);
        const r = R * (s.value / 100) * progress;
        ctx!.beginPath();
        ctx!.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3, 0, Math.PI * 2);
        ctx!.fillStyle = accent;
        ctx!.fill();
      });

      if (progress < 1) {
        progress = Math.min(1, progress + 0.05);
        raf = requestAnimationFrame(draw);
      }
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-4 self-start font-semibold">{t("about.radar")}</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
