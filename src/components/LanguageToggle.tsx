"use client";

import { useEffect, useState } from "react";
import { getLang, type Lang } from "@/lib/i18n";

export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(getLang());
  }, []);

  function toggle() {
    const next: Lang = lang === "en" ? "hi" : "en";
    setLang(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent("langchange", { detail: next }));
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      title="English / हिन्दी"
      className="no-print flex h-9 items-center rounded-full border border-border bg-surface px-3 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
    >
      {lang === "en" ? "EN" : "हिं"}
    </button>
  );
}
