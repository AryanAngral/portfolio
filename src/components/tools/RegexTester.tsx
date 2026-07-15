"use client";

import { useMemo, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("reach me at aryan.angral.dev@gmail.com or test@example.com");

  const result = useMemo(() => {
    if (!pattern) return { error: null as string | null, matches: [] as string[] };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches = Array.from(text.matchAll(re)).map((m) => m[0]);
      return { error: null, matches };
    } catch (e) {
      return { error: (e as Error).message, matches: [] };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (result.error || !pattern) return null;
    try {
      const re = new RegExp(`(${pattern})`, flags.includes("g") ? flags : flags + "g");
      return text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-accent/30 text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      );
    } catch {
      return null;
    }
  }, [pattern, flags, text, result.error]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-1 font-semibold">Regex tester</h3>
      <p className="mb-4 text-xs text-muted">Live pattern matching with the JS engine.</p>
      <div className="flex gap-2">
        <span className="flex items-center font-mono text-muted">/</span>
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          placeholder="pattern"
        />
        <span className="flex items-center font-mono text-muted">/</span>
        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
          className="w-14 rounded-lg border border-border bg-surface-2 px-2 py-2 font-mono text-sm outline-none focus:border-accent"
          placeholder="flags"
        />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs outline-none focus:border-accent"
      />
      {result.error ? (
        <p className="mt-3 font-mono text-xs text-red-400">{result.error}</p>
      ) : (
        <>
          <p className="mt-3 rounded-lg bg-surface-2 p-3 text-sm leading-relaxed">{highlighted}</p>
          <p className="mt-2 font-mono text-xs text-accent-2">
            {result.matches.length} match{result.matches.length === 1 ? "" : "es"}
          </p>
        </>
      )}
    </div>
  );
}
