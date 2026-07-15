"use client";

import { useState, useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const noopSubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [, forceRender] = useState(0);

  const isDark = mounted && document.documentElement.classList.contains("dark");

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    forceRender((n) => n + 1);
  }

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}
