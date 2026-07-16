"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiLoader, FiPlay } from "react-icons/fi";
import { useT } from "./T";
import { pipeline } from "@/lib/data";

type State = "idle" | "running" | "done";

export default function DeploySimulator() {
  const t = useT();
  const [state, setState] = useState<State>("idle");
  const [active, setActive] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState("running");
    setActive(-1);
    pipeline.forEach((_, i) => {
      timers.current.push(setTimeout(() => setActive(i), i * 700 + 300));
    });
    timers.current.push(
      setTimeout(() => {
        setActive(pipeline.length);
        setState("done");
      }, pipeline.length * 700 + 300),
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">{t("sim.title")}</h3>
          <p className="text-xs text-muted">{t("sim.desc")}</p>
        </div>
        <button
          onClick={run}
          disabled={state === "running"}
          className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-transform hover:scale-105 disabled:opacity-60 cursor-pointer"
        >
          {state === "running" ? <FiLoader className="animate-spin" size={14} /> : <FiPlay size={14} />}
          {state === "done" ? t("sim.redeploy") : state === "running" ? t("sim.deploying") : t("sim.deploy")}
        </button>
      </div>

      <ol className="relative ml-3 border-l border-border pl-6">
        {pipeline.map((stage, i) => {
          const reached = active >= i;
          const complete = active > i || state === "done";
          return (
            <li key={stage.label} className="relative mb-4 last:mb-0">
              <span
                className={`absolute -left-[calc(1.5rem+7px)] top-1 grid h-3.5 w-3.5 place-items-center rounded-full border transition-colors duration-300 ${
                  complete
                    ? "border-emerald-500 bg-emerald-500 text-black"
                    : reached
                      ? "border-accent bg-accent"
                      : "border-border bg-surface"
                }`}
              >
                {complete && <FiCheck size={9} />}
              </span>
              <p
                className={`font-mono text-sm transition-colors duration-300 ${
                  reached ? "text-foreground" : "text-muted"
                }`}
              >
                {stage.label}
              </p>
              <p
                className={`text-xs transition-opacity duration-300 ${
                  reached ? "text-muted opacity-100" : "opacity-40"
                }`}
              >
                {stage.detail}
              </p>
            </li>
          );
        })}
      </ol>

      {state === "done" && (
        <p className="mt-4 rounded-lg bg-emerald-500/10 px-4 py-2 font-mono text-xs text-emerald-400">
          ✓ deployed with zero long-lived credentials — total {pipeline.length} stages
        </p>
      )}
    </div>
  );
}
