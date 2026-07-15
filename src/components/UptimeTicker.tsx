"use client";

import { useEffect, useState } from "react";

function fmt(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function UptimeTicker() {
  const [uptime, setUptime] = useState("00:00");

  useEffect(() => {
    const start = performance.now();
    const timer = setInterval(() => setUptime(fmt(performance.now() - start)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-[11px] text-muted">
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
      session uptime {uptime}
    </span>
  );
}
