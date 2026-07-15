"use client";

import { useMemo, useState } from "react";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcnlhbiIsInJvbGUiOiJlbmdpbmVlciIsImlhdCI6MTcwMDAwMDAwMH0.7s2mQh0i2mVYb6y9m0xq0m8m2m8m2m8m2m8m2m8m2m8";

function decodePart(part: string): string {
  try {
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return "(could not decode)";
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const parts = useMemo(() => {
    const t = token.trim();
    if (!t) return null;
    const seg = t.split(".");
    if (seg.length < 2) return { error: true };
    return {
      header: decodePart(seg[0]),
      payload: decodePart(seg[1]),
      signature: seg[2] ?? "",
    };
  }, [token]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-semibold">JWT decoder</h3>
        <button
          onClick={() => setToken(SAMPLE)}
          className="font-mono text-xs text-muted hover:text-accent cursor-pointer"
        >
          load sample
        </button>
      </div>
      <p className="mb-4 text-xs text-muted">
        Decodes header &amp; payload locally. It does <em>not</em> verify the signature — that needs
        the secret, which should never leave a server.
      </p>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        rows={3}
        placeholder="paste a JWT (header.payload.signature)"
        className="w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-3 font-mono text-xs outline-none focus:border-accent"
      />
      {parts && "error" in parts && (
        <p className="mt-3 font-mono text-xs text-amber-500">that doesn&apos;t look like a JWT.</p>
      )}
      {parts && !("error" in parts) && (
        <div className="mt-4 space-y-3">
          <Block label="Header" tone="text-cyan-300" body={parts.header} />
          <Block label="Payload" tone="text-violet-300" body={parts.payload} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-pink-300">Signature</p>
            <p className="mt-0.5 break-all font-mono text-xs text-muted">{parts.signature || "(none)"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Block({ label, tone, body }: { label: string; tone: string; body: string }) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-wider ${tone}`}>{label}</p>
      <pre className="mt-0.5 overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-xs text-foreground">
        {body}
      </pre>
    </div>
  );
}
