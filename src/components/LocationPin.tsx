"use client";

export default function LocationPin() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative flex items-center gap-4">
        <div className="relative grid h-14 w-14 place-items-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-accent/30" />
          <span className="absolute h-8 w-8 rounded-full bg-accent/20" />
          <span className="relative text-2xl">📍</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Jammu, India</p>
          <p className="font-mono text-xs text-muted">32.73°N, 74.87°E · UTC+5:30</p>
          <p className="mt-1 text-xs text-muted">Open to remote &amp; relocation</p>
        </div>
      </div>
    </div>
  );
}
