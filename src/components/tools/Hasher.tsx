"use client";

import { useEffect, useState } from "react";

async function sha(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return "—";
  }
}

export default function Hasher() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!input) {
        setOut([]);
        return;
      }
      const [s256, s1] = await Promise.all([sha("SHA-256", input), sha("SHA-1", input)]);
      if (!active) return;
      setOut([
        { label: "SHA-256", value: s256 },
        { label: "SHA-1", value: s1 },
        { label: "Base64", value: toBase64(input) },
      ]);
    })();
    return () => {
      active = false;
    };
  }, [input]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-1 font-semibold">Hash &amp; encode</h3>
      <p className="mb-4 text-xs text-muted">SHA via the Web Crypto API, in your browser.</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="type anything to hash"
        className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 font-mono text-sm outline-none focus:border-accent"
      />
      <div className="mt-4 space-y-3">
        {out.length === 0 && <p className="font-mono text-xs text-muted">output appears here…</p>}
        {out.map((row) => (
          <div key={row.label}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent-2">{row.label}</p>
            <p className="mt-0.5 break-all font-mono text-xs text-foreground">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
