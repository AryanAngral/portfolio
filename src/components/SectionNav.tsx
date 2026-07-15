"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "engineering", label: "Engineering" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("top");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // only on the homepage (where these sections exist)
    if (!document.getElementById("about")) return;
    // enable only where the homepage sections exist
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    function scrollToIndex(delta: number) {
      const ids = SECTIONS.map((s) => s.id).filter((id) => document.getElementById(id));
      const cur = ids.indexOf(active);
      const next = Math.max(0, Math.min(ids.length - 1, (cur < 0 ? 0 : cur) + delta));
      document.getElementById(ids[next])?.scrollIntoView({ behavior: "smooth" });
    }
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement)?.isContentEditable;
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "j") {
        e.preventDefault();
        scrollToIndex(1);
      } else if (e.key === "k") {
        e.preventDefault();
        scrollToIndex(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (!enabled) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="no-print fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100 ${
                on ? "text-accent" : "text-muted"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 rounded-full transition-all ${
                on ? "scale-125 bg-accent" : "bg-border group-hover:bg-muted"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
