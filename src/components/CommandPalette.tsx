"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiBriefcase,
  FiDownload,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { profile } from "@/lib/data";

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const openUrl = (url: string) => () => {
      window.open(url, url.startsWith("mailto:") ? "_self" : "_blank", "noreferrer");
    };
    return [
      { id: "about", label: "Go to About", hint: "Section", icon: <FiUser size={15} />, run: go("about") },
      { id: "experience", label: "Go to Experience", hint: "Section", icon: <FiBriefcase size={15} />, run: go("experience") },
      { id: "projects", label: "Go to Projects", hint: "Section", icon: <FiFolder size={15} />, run: go("projects") },
      { id: "certifications", label: "Go to Certifications", hint: "Section", icon: <FiAward size={15} />, run: go("certifications") },
      { id: "contact", label: "Go to Contact", hint: "Section", icon: <FiMail size={15} />, run: go("contact") },
      {
        id: "resume",
        label: "Download resume",
        hint: "Action",
        icon: <FiDownload size={15} />,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "theme",
        label: "Toggle dark / light theme",
        hint: "Action",
        icon: <FiMoon size={15} />,
        run: () => {
          const dark = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", dark);
          localStorage.setItem("theme", dark ? "dark" : "light");
        },
      },
      { id: "github", label: "Open GitHub profile", hint: "Link", icon: <FiGithub size={15} />, run: openUrl(profile.github) },
      { id: "linkedin", label: "Open LinkedIn profile", hint: "Link", icon: <FiLinkedin size={15} />, run: openUrl(profile.linkedin) },
      { id: "email", label: `Email ${profile.email}`, hint: "Link", icon: <FiMail size={15} />, run: openUrl(`mailto:${profile.email}`) },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q));
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
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
    window.addEventListener("cmdk:open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("cmdk:open", onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[index]) {
      e.preventDefault();
      filtered[index].run();
      close();
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
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <FiSearch size={16} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
              />
              <kbd className="shrink-0 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
                Esc
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    onClick={() => {
                      cmd.run();
                      close();
                    }}
                    onMouseEnter={() => setIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      i === index ? "bg-surface-2 text-accent" : "text-foreground"
                    }`}
                  >
                    <span className="text-muted">{cmd.icon}</span>
                    <span className="flex-1">{cmd.label}</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted">
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
