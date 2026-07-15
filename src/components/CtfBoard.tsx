"use client";

import { useState } from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { unlock } from "@/lib/achievements";

const CHALLENGES = [
  {
    hash: "3ad25d620b5df22fcb46711653e5d93f2abe311ab12aa997203839da309f638a",
    name: "The oldest trick",
    hint: "View the source, Luke. The homepage keeps a secret between the tags.",
  },
  {
    hash: "b4be7ede274928c38e3ec7be8c9a8f708f2a1a281aa570d1154b1d6306214348",
    name: "Crawler's confession",
    hint: "Even robots get told where not to go.",
  },
  {
    hash: "d039b58bde7d456fee58ff132ab8ab318ee67981e9f16b4645de15fbd91d1a18",
    name: "Environment variables",
    hint: "Open the terminal (Ctrl+`) and read the environment like any good archaeologist. Some strings need decoding.",
  },
  {
    hash: "45d49228770484a6fa969d6465eb60616fc01f8c774038063c3ff3a66e3ff601",
    name: "Get lost",
    hint: "Pages that don't exist still have source code.",
  },
  {
    hash: "ef31ae5815c3c8dfcc92738a693bb65ae6e0f848946fc043a32ecfb1aa2a746c",
    name: "Perfect play",
    hint: "Draw against the unbeatable Tic-Tac-Toe AI three times in one sitting.",
  },
  {
    hash: "417823741a88dc63b6473df1f0b5104a654d7bee95e142be5f9e362fae57ea0f",
    name: "Developer's home",
    hint: "F12. Developers live in the console — the site greets them there.",
  },
];

const STORE_KEY = "ctf-found";

function loadFound(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function CtfBoard() {
  const [found, setFound] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : loadFound(),
  );
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [shownHints, setShownHints] = useState<Set<number>>(new Set());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const flag = input.trim();
    if (!flag) return;
    const hash = await sha256(flag);
    if (!CHALLENGES.some((c) => c.hash === hash)) {
      setMessage("✗ not a flag — keep digging.");
      return;
    }
    if (found.includes(hash)) {
      setMessage("already captured that one.");
      return;
    }
    const next = [...found, hash];
    setFound(next);
    unlock("hacker");
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* no persistence */
    }
    setInput("");
    setMessage(
      next.length === CHALLENGES.length
        ? "🏆 ALL FLAGS CAPTURED. You have my respect — mention this in your email."
        : `✓ captured! ${next.length}/${CHALLENGES.length}`,
    );
  }

  return (
    <div>
      <form onSubmit={submit} className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="FLAG{...}"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-3 font-mono text-sm text-accent-2">{message}</p>}

      <div className="mt-8 space-y-3">
        {CHALLENGES.map((challenge, i) => {
          const captured = found.includes(challenge.hash);
          return (
            <div
              key={challenge.hash}
              className={`rounded-xl border p-4 transition-colors ${
                captured ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2.5 font-medium">
                  {captured ? (
                    <FiCheckCircle className="shrink-0 text-emerald-500" size={17} />
                  ) : (
                    <FiCircle className="shrink-0 text-muted" size={17} />
                  )}
                  {challenge.name}
                </p>
                {!captured && (
                  <button
                    onClick={() => setShownHints((s) => new Set([...s, i]))}
                    className="shrink-0 font-mono text-xs text-muted transition-colors hover:text-accent cursor-pointer"
                  >
                    {shownHints.has(i) ? "" : "hint?"}
                  </button>
                )}
              </div>
              {(captured || shownHints.has(i)) && (
                <p className="mt-2 pl-7 text-sm text-muted">{challenge.hint}</p>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-muted">
        {found.length}/{CHALLENGES.length} captured · progress lives in your browser
      </p>
    </div>
  );
}
