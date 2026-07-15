"use client";

import { useState } from "react";
import { FiCopy, FiRefreshCw } from "react-icons/fi";

function gen(n: number): string[] {
  return Array.from({ length: n }, () => crypto.randomUUID());
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>(() => []);
  const [copied, setCopied] = useState("");

  function regen() {
    setUuids(gen(5));
  }

  function copy(u: string) {
    navigator.clipboard?.writeText(u).then(() => {
      setCopied(u);
      setTimeout(() => setCopied(""), 1200);
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-semibold">UUID generator</h3>
        <button
          onClick={regen}
          className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent cursor-pointer"
        >
          <FiRefreshCw size={12} /> generate
        </button>
      </div>
      <p className="mb-4 text-xs text-muted">v4 UUIDs via crypto.randomUUID().</p>
      {uuids.length === 0 ? (
        <button
          onClick={regen}
          className="w-full rounded-lg border border-dashed border-border py-4 font-mono text-xs text-muted hover:border-accent hover:text-accent cursor-pointer"
        >
          click to generate 5 UUIDs
        </button>
      ) : (
        <ul className="space-y-1.5">
          {uuids.map((u) => (
            <li key={u} className="flex items-center justify-between gap-3">
              <code className="break-all font-mono text-xs text-foreground">{u}</code>
              <button
                onClick={() => copy(u)}
                aria-label="Copy"
                className="shrink-0 text-muted hover:text-accent cursor-pointer"
              >
                {copied === u ? <span className="font-mono text-[10px] text-emerald-400">copied</span> : <FiCopy size={13} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
