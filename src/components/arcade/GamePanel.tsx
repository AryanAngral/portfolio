import type { ReactNode } from "react";

// Shared chrome for every game: score row on top, playfield, footer hint.
export function ScoreRow({ items }: { items: { label: string; value: string | number }[] }) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted">
      {items.map((item) => (
        <span key={item.label}>
          {item.label}: <span className="text-accent-2">{item.value}</span>
        </span>
      ))}
    </div>
  );
}

export function Overlay({
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  title: string;
  subtitle?: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-black/70 text-center backdrop-blur-[2px]">
      <p className="font-mono text-2xl font-bold uppercase tracking-widest text-white">{title}</p>
      {subtitle && <p className="font-mono text-sm text-white/70">{subtitle}</p>}
      <button
        onClick={onAction}
        className="mt-2 rounded-full bg-accent px-6 py-2.5 font-mono text-sm font-semibold uppercase tracking-wider text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function Playfield({ children }: { children: ReactNode }) {
  return (
    <div className="crt relative mx-auto w-fit overflow-hidden rounded-xl border border-border bg-[#0a0a12]">
      {children}
    </div>
  );
}
