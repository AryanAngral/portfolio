"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certifications, experience, profile, projects, skillGroups } from "@/lib/data";

type Line = { text: string; kind: "input" | "output" };

const PROMPT = "aryan@portfolio:~$";

const BANNER = String.raw`
   _   ___ _   _   _ _  _
  /_\ | _ \ | | | /_\ \| |
 / _ \|   / |_| |/ _ \  |
/_/ \_\_|_\\___//_/ \_\_|   portfolio v2.6
`;

function runCommand(raw: string): { output: string[]; action?: () => void } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return {
        output: [
          "available commands:",
          "  whoami      — who is this guy",
          "  skills      — technical skills",
          "  experience  — where I've worked",
          "  projects    — things I've built",
          "  certs       — certifications",
          "  resume      — download my resume",
          "  arcade      — play 17 retro games",
          "  algorithms  — watch sorts & pathfinding run",
          "  stats       — engineering stats for this site",
          "  tools       — client-side security tools",
          "  ctf         — the flag hunt (6 hidden flags)",
          "  matrix      — enter the matrix (esc to exit)",
          "  contact     — jump to the contact form",
          "  email       — copy nothing, just read it",
          "  github      — open GitHub",
          "  linkedin    — open LinkedIn",
          "  skins       — pick from 19 site themes",
          "  theme       — toggle dark/light",
          "  clear       — clear the screen",
          "  exit        — close the terminal",
        ],
      };
    case "whoami":
      return { output: [profile.name, profile.role, profile.summary] };
    case "skills":
      return {
        output: skillGroups.map((g) => `${g.title}: ${g.skills.join(", ")}`),
      };
    case "experience":
      return {
        output: experience.map((e) => `${e.period}  ${e.role} — ${e.org}`),
      };
    case "projects":
      return { output: projects.map((p) => `${p.name} — ${p.description}`) };
    case "certs":
    case "certifications":
      return { output: certifications.map((c) => `${c.title} (${c.issuer})`) };
    case "resume": {
      return {
        output: ["downloading resume…"],
        action: () => {
          const a = document.createElement("a");
          a.href = profile.resumeUrl;
          a.download = "";
          a.click();
        },
      };
    }
    case "arcade":
      return {
        output: ["loading the arcade…"],
        action: () => {
          window.location.href = "/arcade";
        },
      };
    case "algorithms":
    case "algo":
      return {
        output: ["opening the algorithm visualizers…"],
        action: () => {
          window.location.href = "/algorithms";
        },
      };
    case "stats":
      return {
        output: ["opening the engineering dashboard…"],
        action: () => {
          window.location.href = "/stats";
        },
      };
    case "tools":
      return {
        output: ["opening the security tools…"],
        action: () => {
          window.location.href = "/tools";
        },
      };
    case "ctf":
    case "hack":
      return {
        output: ["6 flags hidden across this site. good luck.", "opening /ctf…"],
        action: () => {
          window.location.href = "/ctf";
        },
      };
    case "matrix":
      return {
        output: ["wake up, Neo…"],
        action: () => window.dispatchEvent(new Event("matrix:toggle")),
      };
    case "contact":
      return {
        output: ["taking you to the contact form…"],
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "email":
      return { output: [profile.email] };
    case "github":
      return {
        output: ["opening GitHub…"],
        action: () => window.open(profile.github, "_blank", "noreferrer"),
      };
    case "linkedin":
      return {
        output: ["opening LinkedIn…"],
        action: () => window.open(profile.linkedin, "_blank", "noreferrer"),
      };
    case "skins":
    case "skin":
      return {
        output: ["opening the skin gallery — 19 themes…"],
        action: () => window.dispatchEvent(new Event("skins:open")),
      };
    case "theme":
      return {
        output: ["toggled."],
        action: () => {
          const dark = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", dark);
          localStorage.setItem("theme", dark ? "dark" : "light");
        },
      };
    case "sudo hire me":
    case "hire":
    case "hire me":
      return {
        output: ["✓ permission granted. opening a hiring email + celebrating…"],
        action: () => {
          window.dispatchEvent(new Event("confetti"));
          const subject = encodeURIComponent("Let's work together");
          const body = encodeURIComponent(
            "Hi Aryan,\n\nI came across your portfolio and would love to talk about an opportunity.\n\n",
          );
          window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        },
      };
    case "sudo":
    case "sudo su":
      return { output: ["nice try. (psst — try 'sudo hire me')"] };
    case "now":
      return {
        output: ["opening the /now page…"],
        action: () => {
          window.location.href = "/now";
        },
      };
    case "ls":
      return { output: ["about  journey  experience  projects  certifications  contact  .env"] };
    case "cat .env":
    case "env":
      return {
        output: [
          "NODE_ENV=production",
          "COFFEE_LEVEL=critical",
          "SECRET=RkxBR3t0ZXJtaW5hbF9hcmNoYWVvbG9naXN0fQ==",
        ],
      };
    case "":
      return { output: [] };
    default:
      return { output: [`command not found: ${cmd} — try 'help'`] };
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { text: BANNER, kind: "output" },
    { text: "welcome — type 'help' to get started.", kind: "output" },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("terminal:open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("terminal:open", onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function submit() {
    const raw = value;
    setValue("");
    setHistIndex(-1);
    const cmd = raw.trim().toLowerCase();
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setLines((l) => [...l, { text: `${PROMPT} ${raw}`, kind: "input" }]);
      close();
      return;
    }
    const { output, action } = runCommand(raw);
    setLines((l) => [
      ...l,
      { text: `${PROMPT} ${raw}`, kind: "input" },
      ...output.map((text) => ({ text, kind: "output" as const })),
    ]);
    if (raw.trim()) setHistory((h) => [raw, ...h]);
    action?.();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, history.length - 1);
      if (history[next]) {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIndex - 1;
      setHistIndex(next);
      setValue(next >= 0 ? history[next] : "");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[95] flex items-end justify-center bg-black/40 px-4 pb-[10vh] backdrop-blur-sm sm:items-center sm:pb-0"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
            className="flex h-[420px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface font-mono text-[13px] shadow-2xl"
            role="dialog"
            aria-label="Interactive terminal"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-muted">aryan@portfolio — zsh</span>
              <span className="ml-auto text-[10px] text-muted">Esc to close</span>
            </div>
            <div ref={bodyRef} className="flex-1 space-y-1 overflow-y-auto p-4">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={`whitespace-pre-wrap break-words leading-relaxed ${
                    line.kind === "input" ? "text-accent" : "text-foreground"
                  }`}
                >
                  {line.text}
                </p>
              ))}
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-accent">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full bg-transparent outline-none"
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
