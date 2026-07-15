"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { certifications, education, experience, profile, projects, skillGroups } from "@/lib/data";

type Message = { from: "you" | "bot"; text: string };

const RULES: { keywords: string[]; answer: () => string }[] = [
  {
    keywords: ["skill", "stack", "tech", "language", "know"],
    answer: () => skillGroups.map((g) => `${g.title}: ${g.skills.join(", ")}`).join("\n"),
  },
  {
    keywords: ["gcp", "cloud", "terraform", "infra", "devops", "kubernetes", "docker"],
    answer: () =>
      "Aryan led a production migration to Google Cloud Platform — Cloud Run, GKE, and Vertex AI — provisioned entirely with Terraform (RBAC, IAM, alerting), plus keyless CI/CD using GitHub Actions + Workload Identity Federation.",
  },
  {
    keywords: ["experience", "work", "job", "intern", "straatix", "history"],
    answer: () => experience.map((e) => `${e.period} — ${e.role}, ${e.org}`).join("\n"),
  },
  {
    keywords: ["project", "built", "portfolio", "spender", "mind bridge", "talent"],
    answer: () => projects.map((p) => `${p.name}: ${p.description}`).join("\n"),
  },
  {
    keywords: ["education", "college", "university", "degree", "cgpa", "graduate", "study"],
    answer: () =>
      `${education.degree} from ${education.school} (${education.cgpa} CGPA), ${education.graduation.toLowerCase()} — Director's Merit Gold Medalist.`,
  },
  {
    keywords: ["cert", "credential", "google", "palo alto", "nptel", "qualified"],
    answer: () => certifications.map((c) => `${c.title} — ${c.issuer}`).join("\n"),
  },
  {
    keywords: ["security", "cyber", "pentest", "hack"],
    answer: () =>
      "Security is Aryan's thing: Google Cybersecurity courses, Palo Alto Networks Professional Certificate, NYU Cyber Security Specialization, NPTEL Cyber Security and Privacy. This site itself ships a hardened CSP — and a CTF at /ctf if you want to test yourself.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "hiring", "touch"],
    answer: () =>
      `Email ${profile.email}, use the contact form at the bottom of the homepage, or connect on LinkedIn. He replies fast.`,
  },
  {
    keywords: ["available", "open", "relocat", "remote", "full-time", "role", "opportunit"],
    answer: () =>
      "Yes — open to full-time software roles (status badge says OPEN_TO_WORK for a reason). Based in Jammu, India; open to remote and relocation. Ask him directly via the contact form.",
  },
  {
    keywords: ["resume", "cv", "pdf"],
    answer: () => "Grab it at /resume (printable HTML) or download the PDF from the hero section.",
  },
  {
    keywords: ["arcade", "game", "play", "snake", "pong"],
    answer: () => "Head to /arcade — retro games built from scratch, no external APIs. The Tic-Tac-Toe AI is unbeatable; there's a flag if you can draw it three times.",
  },
  {
    keywords: ["ai", "ml", "machine learning", "gemini", "llm", "model"],
    answer: () =>
      "Applied AI experience: Gemini API chatbots (Spender, Mind Bridge), LSTM/ARIMA time-series forecasting, and Vertex AI pipelines in production on GCP.",
  },
  {
    keywords: ["who", "about", "aryan", "yourself", "intro"],
    answer: () => `${profile.name} — ${profile.role}. ${profile.summary}`,
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo"],
    answer: () => "Hey! Ask me about Aryan's skills, experience, projects, certs, or availability. I'm keyword-matching, not AI — 100% hallucination-free.",
  },
  {
    keywords: ["joke", "funny"],
    answer: () => "Why did the developer go broke? Because he used up all his cache. (I only know one. I'm rule-based.)",
  },
];

const QUICK = ["skills", "experience", "projects", "availability", "contact"];

function reply(input: string): string {
  const q = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => q.includes(k))) return rule.answer();
  }
  return "I match keywords, not vibes — try asking about: skills, experience, projects, education, certs, security, availability, resume, or the arcade.";
}

export default function AryanBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi, I'm AryanBot 🤖 — a rule-based guide to this portfolio (no AI, no API, 100% hallucination-free). What do you want to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "you", text: q }, { from: "bot", text: reply(q) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with AryanBot"}
        className="no-print fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        {open ? <FiX size={18} /> : <FiMessageSquare size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 left-6 z-40 flex h-[420px] w-[min(20rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            role="dialog"
            aria-label="AryanBot chat"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-sm font-semibold leading-none">AryanBot</p>
                <p className="mt-0.5 font-mono text-[10px] text-muted">rule-based · zero API calls</p>
              </div>
            </div>

            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                    message.from === "you"
                      ? "ml-auto bg-accent text-accent-contrast"
                      : "bg-surface-2 text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK.map((quick) => (
                  <button
                    key={quick}
                    onClick={() => send(quick)}
                    className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-muted transition-colors hover:text-accent cursor-pointer"
                  >
                    {quick}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Aryan…"
                  className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-contrast cursor-pointer"
                >
                  <FiSend size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
