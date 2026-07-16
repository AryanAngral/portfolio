"use client";

import { useEffect, useState } from "react";
import { getLang, translate, type Lang } from "@/lib/i18n";

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydrate
    setLang(getLang());
    const on = (e: Event) => setLang((e as CustomEvent).detail as Lang);
    window.addEventListener("langchange", on);
    return () => window.removeEventListener("langchange", on);
  }, []);
  return lang;
}

export function useT() {
  const lang = useLang();
  return (key: string, fallback?: string) => translate(key, lang, fallback);
}

// Translatable text leaf — usable inside Server Components.
export default function T({ k, fallback }: { k: string; fallback?: string }) {
  const lang = useLang();
  return <>{translate(k, lang, fallback)}</>;
}
