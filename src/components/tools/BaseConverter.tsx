"use client";

import { useMemo, useState } from "react";

const BASES = [
  { key: "bin", label: "Binary", radix: 2 },
  { key: "oct", label: "Octal", radix: 8 },
  { key: "dec", label: "Decimal", radix: 10 },
  { key: "hex", label: "Hex", radix: 16 },
];

export default function BaseConverter() {
  const [value, setValue] = useState("255");
  const [radix, setRadix] = useState(10);

  const parsed = useMemo(() => {
    const clean = value.trim().toLowerCase().replace(/^0x|^0b|^0o/, "");
    if (!clean) return null;
    const n = parseInt(clean, radix);
    if (Number.isNaN(n) || !Number.isFinite(n)) return null;
    // validate all chars are legal for the radix
    const valid = [...clean].every((c) => parseInt(c, radix).toString(radix) === c || c === "0");
    return valid ? n : null;
  }, [value, radix]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-1 font-semibold">Number base converter</h3>
      <p className="mb-4 text-xs text-muted">Convert between binary, octal, decimal, and hex.</p>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          placeholder="value"
        />
        <select
          value={radix}
          onChange={(e) => setRadix(Number(e.target.value))}
          className="rounded-lg border border-border bg-surface-2 px-2 py-2 font-mono text-xs outline-none focus:border-accent cursor-pointer"
        >
          {BASES.map((b) => (
            <option key={b.key} value={b.radix}>
              from {b.label.toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 space-y-2">
        {BASES.map((b) => (
          <div key={b.key} className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {b.label}
            </span>
            <span className="break-all text-right font-mono text-sm text-foreground">
              {parsed === null ? "—" : (b.radix === 16 ? parsed.toString(16).toUpperCase() : parsed.toString(b.radix))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
