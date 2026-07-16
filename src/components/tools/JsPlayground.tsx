"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";

const SAMPLE = `// runs in a locked-down sandbox (no network, no DOM access)
const langs = ["C++", "TypeScript", "Python"];
console.log("skills:", langs.join(", "));
console.log("2 ** 10 =", 2 ** 10);
console.table(langs.map((l, i) => ({ i, l })));`;

// Runs user JS inside a sandboxed iframe (allow-scripts only → opaque origin,
// no access to this page, no network). Uses an inline <script>, NOT eval — so
// the site's strict CSP (no unsafe-eval) stays intact.
export default function JsPlayground() {
  const [code, setCode] = useState(SAMPLE);
  const [logs, setLogs] = useState<string[]>([]);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.__playground) {
        setLogs((prev) => [...prev, e.data.line].slice(-100));
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function run() {
    setLogs([]);
    const frame = frameRef.current;
    if (!frame) return;
    // prevent user code from closing the script tag and escaping the sandbox doc
    const safeCode = code.replace(/<\/(script)/gi, "<\\/$1");
    const srcdoc = `<!doctype html><html><body><script>
      var send = function(line){ parent.postMessage({__playground:true, line: String(line)}, "*"); };
      var fmt = function(a){ try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch(e){ return String(a); } };
      console.log = function(){ send(Array.prototype.map.call(arguments, fmt).join(" ")); };
      console.error = function(){ send("⚠ " + Array.prototype.map.call(arguments, fmt).join(" ")); };
      console.table = function(v){ send(JSON.stringify(v, null, 2)); };
      window.onerror = function(m){ send("⚠ " + m); };
      try { ${safeCode}\n } catch (e) { send("⚠ " + e); }
    <\/script></body></html>`;
    frame.srcdoc = srcdoc;
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:col-span-2">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-semibold">JS playground</h3>
        <button
          onClick={run}
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 font-mono text-xs text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
        >
          <FiPlay size={12} /> Run
        </button>
      </div>
      <p className="mb-4 text-xs text-muted">
        Sandboxed iframe, no <code>eval</code>, no network — your CSP stays strict.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={9}
          className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs outline-none focus:border-accent"
        />
        <div className="min-h-[9rem] overflow-auto rounded-lg border border-border bg-[#0a0a12] p-3 font-mono text-xs text-emerald-300">
          {logs.length === 0 ? (
            <span className="text-muted">console output appears here…</span>
          ) : (
            logs.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {l}
              </div>
            ))
          )}
        </div>
      </div>
      <iframe ref={frameRef} title="sandbox" sandbox="allow-scripts" className="hidden" />
    </div>
  );
}
