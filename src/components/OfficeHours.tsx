"use client";

import { useEffect, useState } from "react";

// Aryan is in IST (UTC+5:30). Shows his local time and a rough "likely online"
// window so recruiters know when a reply is fast.
function istNow(): { time: string; online: boolean } {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utcMs + 5.5 * 3600000);
  const h = ist.getHours();
  const time = ist.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { time, online: h >= 9 && h < 24 };
}

export default function OfficeHours() {
  const [state, setState] = useState<{ time: string; online: boolean } | null>(null);

  useEffect(() => {
    // client-only clock init
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(istNow());
    const t = setInterval(() => setState(istNow()), 30000);
    return () => clearInterval(t);
  }, []);

  if (!state) return null;

  return (
    <div className="flex items-center gap-2.5 text-sm text-muted">
      <span className="relative flex h-2 w-2">
        {state.online && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            state.online ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      </span>
      <span className="font-mono text-xs">
        {state.time} IST · {state.online ? "likely online" : "probably asleep"}
      </span>
    </div>
  );
}
