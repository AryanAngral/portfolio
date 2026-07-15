"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

const CHECKS: { header: string; why: string }[] = [
  { header: "content-security-policy", why: "Blocks XSS and unauthorized resource loads." },
  { header: "strict-transport-security", why: "Forces HTTPS for every future visit (HSTS)." },
  { header: "x-content-type-options", why: "Stops MIME-type sniffing attacks." },
  { header: "x-frame-options", why: "Prevents clickjacking via framing." },
  { header: "referrer-policy", why: "Limits referrer data leaked to other sites." },
  { header: "permissions-policy", why: "Denies camera, mic, geolocation, and more." },
  { header: "cross-origin-opener-policy", why: "Isolates the browsing context (COOP)." },
  { header: "cross-origin-resource-policy", why: "Blocks cross-origin resource theft (CORP)." },
];

export default function HeaderScan() {
  const [found, setFound] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(window.location.href, { cache: "no-store" })
      .then((res) => {
        const map: Record<string, string> = {};
        res.headers.forEach((value, key) => {
          map[key.toLowerCase()] = value;
        });
        setFound(map);
      })
      .catch(() => setError(true));
  }, []);

  const passed = found ? CHECKS.filter((c) => found[c.header]).length : 0;
  const grade =
    passed >= 8 ? "A+" : passed >= 7 ? "A" : passed >= 5 ? "B" : passed >= 3 ? "C" : "F";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Security headers</h3>
          <p className="text-xs text-muted">Live scan of this very page&apos;s response headers.</p>
        </div>
        <div className="text-right">
          <p className="text-gradient text-3xl font-bold">{found ? grade : "…"}</p>
          <p className="font-mono text-[10px] text-muted">{found ? `${passed}/${CHECKS.length}` : "scanning"}</p>
        </div>
      </div>

      {error && (
        <p className="font-mono text-xs text-amber-500">
          couldn&apos;t read headers in this browser — they&apos;re still set server-side.
        </p>
      )}

      <div className="space-y-2">
        {CHECKS.map((check) => {
          const ok = !!found?.[check.header];
          return (
            <div key={check.header} className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                  ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {ok ? <FiCheck size={11} /> : <FiX size={11} />}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-foreground">{check.header}</p>
                <p className="text-[11px] text-muted">{check.why}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
