"use client";

import { useMemo, useState } from "react";

function analyze(pw: string) {
  if (!pw) return { bits: 0, label: "—", crack: "—", pct: 0, color: "#57575f" };
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;
  const bits = Math.round(pw.length * Math.log2(pool || 1));

  // guesses at 10^10/s (offline attack), average = half the space
  const seconds = Math.pow(2, bits - 1) / 1e10;
  const crack = humanizeSeconds(seconds);

  let label = "very weak";
  let color = "#f87171";
  if (bits >= 100) {
    label = "excellent";
    color = "#34d399";
  } else if (bits >= 70) {
    label = "strong";
    color = "#4ade80";
  } else if (bits >= 50) {
    label = "fair";
    color = "#facc15";
  } else if (bits >= 30) {
    label = "weak";
    color = "#fb923c";
  }
  return { bits, label, crack, pct: Math.min(100, (bits / 120) * 100), color };
}

function humanizeSeconds(s: number): string {
  if (s < 1) return "instantly";
  const units: [number, string][] = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [365, "days"],
    [1000, "years"],
    [1000, "thousand yrs"],
    [1000, "million yrs"],
  ];
  let value = s;
  let name = "seconds";
  for (const [div, label] of units) {
    if (value < div) {
      name = label;
      break;
    }
    value /= div;
    name = label;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${name}`;
}

export default function PasswordMeter() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const result = useMemo(() => analyze(pw), [pw]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-1 font-semibold">Password strength</h3>
      <p className="mb-4 text-xs text-muted">
        Entropy is estimated locally — nothing is sent anywhere.
      </p>
      <div className="flex gap-2">
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="type a password to test"
          className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 font-mono text-sm outline-none focus:border-accent"
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="shrink-0 rounded-lg border border-border px-3 font-mono text-xs text-muted hover:text-accent cursor-pointer"
        >
          {show ? "hide" : "show"}
        </button>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${result.pct}%`, background: result.color }}
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs">
        <div>
          <span className="text-muted">strength</span>
          <p style={{ color: result.color }}>{result.label}</p>
        </div>
        <div>
          <span className="text-muted">entropy</span>
          <p className="text-foreground">{result.bits} bits</p>
        </div>
        <div>
          <span className="text-muted">crack time</span>
          <p className="text-foreground">{result.crack}</p>
        </div>
      </div>
    </div>
  );
}
