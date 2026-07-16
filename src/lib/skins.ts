// The skin engine. Each skin is a full visual identity: palette + font stack
// + background FX + optional special CSS (keyed by data-skin in globals.css).
// Applied by writing CSS variables on <html> — no external requests.

export type FontKey = "sans" | "mono" | "serif" | "apple" | "segoe" | "roboto";
export type FxKey = "orbs" | "grid" | "scanlines" | "sunset" | "dots" | "mesh" | "none";

export type Skin = {
  id: string;
  name: string;
  group: string;
  font: FontKey;
  fx: FxKey;
  dark: boolean;
  vars: {
    bg: string;
    fg: string;
    surface: string;
    surface2: string;
    border: string;
    accent: string;
    accent2: string;
    contrast: string;
    muted: string;
  };
};

export const FONT_STACKS: Record<FontKey, string> = {
  sans: "var(--font-geist-sans), system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, monospace",
  serif: "Georgia, 'Times New Roman', serif",
  apple: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  segoe: "'Segoe UI', system-ui, sans-serif",
  roboto: "Roboto, 'Helvetica Neue', system-ui, sans-serif",
};

export const SKINS: Skin[] = [
  {
    id: "nebula", name: "Nebula", group: "Signature", font: "sans", fx: "orbs", dark: true,
    vars: { bg: "#07070a", fg: "#f2f2f7", surface: "#101014", surface2: "#17171d", border: "#23232b", accent: "#a78bfa", accent2: "#22d3ee", contrast: "#0a0a0f", muted: "#9a9aa5" },
  },
  {
    id: "synthwave", name: "Synthwave", group: "Neon", font: "sans", fx: "sunset", dark: true,
    vars: { bg: "#1a0b2e", fg: "#fdf4ff", surface: "#251043", surface2: "#2f1656", border: "#3f2170", accent: "#ff2fb3", accent2: "#22d3ee", contrast: "#150022", muted: "#c0a9e0" },
  },
  {
    id: "cyberpunk", name: "Cyberpunk", group: "Neon", font: "mono", fx: "grid", dark: true,
    vars: { bg: "#050014", fg: "#fdf200", surface: "#0a0620", surface2: "#120b30", border: "#241a55", accent: "#fdf200", accent2: "#00e5ff", contrast: "#050014", muted: "#c9c400" },
  },
  {
    id: "vaporwave", name: "Vaporwave", group: "Neon", font: "sans", fx: "sunset", dark: false,
    vars: { bg: "#f3d9fa", fg: "#3a2a5d", surface: "#ffffff", surface2: "#f0d5f7", border: "#e3b9ee", accent: "#d926a9", accent2: "#26c6da", contrast: "#ffffff", muted: "#7a5c93" },
  },
  {
    id: "dracula", name: "Dracula", group: "Dev classics", font: "sans", fx: "orbs", dark: true,
    vars: { bg: "#282a36", fg: "#f8f8f2", surface: "#2f313f", surface2: "#383a4a", border: "#44475a", accent: "#bd93f9", accent2: "#ff79c6", contrast: "#21222c", muted: "#a6a8b8" },
  },
  {
    id: "nord", name: "Nord", group: "Dev classics", font: "sans", fx: "orbs", dark: true,
    vars: { bg: "#2e3440", fg: "#eceff4", surface: "#343b49", surface2: "#3b4252", border: "#4c566a", accent: "#88c0d0", accent2: "#81a1c1", contrast: "#2e3440", muted: "#abb4c6" },
  },
  {
    id: "solarized", name: "Solarized", group: "Dev classics", font: "mono", fx: "none", dark: true,
    vars: { bg: "#002b36", fg: "#93a1a1", surface: "#073642", surface2: "#0a4552", border: "#0f5666", accent: "#b58900", accent2: "#2aa198", contrast: "#002b36", muted: "#839496" },
  },
  {
    id: "github", name: "GitHub", group: "Dev classics", font: "sans", fx: "none", dark: true,
    vars: { bg: "#0d1117", fg: "#e6edf3", surface: "#161b22", surface2: "#21262d", border: "#30363d", accent: "#2f81f7", accent2: "#3fb950", contrast: "#ffffff", muted: "#8b949e" },
  },
  {
    id: "terminal", name: "Terminal", group: "Retro", font: "mono", fx: "scanlines", dark: true,
    vars: { bg: "#020c02", fg: "#33ff66", surface: "#041204", surface2: "#06210a", border: "#0d3d16", accent: "#33ff66", accent2: "#7dffa3", contrast: "#020c02", muted: "#2fbe52" },
  },
  {
    id: "amber", name: "Amber CRT", group: "Retro", font: "mono", fx: "scanlines", dark: true,
    vars: { bg: "#140d00", fg: "#ffb000", surface: "#1e1400", surface2: "#2a1c00", border: "#3d2a00", accent: "#ffb000", accent2: "#ffd479", contrast: "#140d00", muted: "#c9931f" },
  },
  {
    id: "paper", name: "Paper", group: "Editorial", font: "serif", fx: "none", dark: false,
    vars: { bg: "#faf9f6", fg: "#1a1a1a", surface: "#ffffff", surface2: "#f0eee8", border: "#e2ded3", accent: "#b91c1c", accent2: "#1d4ed8", contrast: "#ffffff", muted: "#57534e" },
  },
  {
    id: "blueprint", name: "Blueprint", group: "Editorial", font: "mono", fx: "grid", dark: true,
    vars: { bg: "#0a2a52", fg: "#dbeafe", surface: "#0e356a", surface2: "#124080", border: "#1e4f92", accent: "#ffffff", accent2: "#93c5fd", contrast: "#0a2a52", muted: "#a3c2e8" },
  },
  {
    id: "brutalist", name: "Brutalist", group: "Editorial", font: "mono", fx: "none", dark: false,
    vars: { bg: "#ffffff", fg: "#000000", surface: "#ffffff", surface2: "#f0f0f0", border: "#000000", accent: "#000000", accent2: "#ff3b00", contrast: "#ffffff", muted: "#333333" },
  },
  {
    id: "newspaper", name: "Newspaper", group: "Editorial", font: "serif", fx: "none", dark: false,
    vars: { bg: "#f4f1ea", fg: "#1a1a1a", surface: "#fbfaf6", surface2: "#eae6da", border: "#d6d0c4", accent: "#1a1a1a", accent2: "#8b0000", contrast: "#ffffff", muted: "#4a4a4a" },
  },
  {
    id: "glass", name: "Glassmorphism", group: "Styles", font: "sans", fx: "mesh", dark: true,
    vars: { bg: "#0b1120", fg: "#eef2ff", surface: "rgba(255,255,255,0.07)", surface2: "rgba(255,255,255,0.12)", border: "rgba(255,255,255,0.18)", accent: "#7dd3fc", accent2: "#c4b5fd", contrast: "#0b1120", muted: "#bcc6de" },
  },
  {
    id: "apple", name: "Apple", group: "Styles", font: "apple", fx: "mesh", dark: false,
    vars: { bg: "#f5f5f7", fg: "#1d1d1f", surface: "#ffffff", surface2: "#ececee", border: "#d2d2d7", accent: "#0071e3", accent2: "#34c759", contrast: "#ffffff", muted: "#6e6e73" },
  },
  {
    id: "fluent", name: "Microsoft", group: "Styles", font: "segoe", fx: "none", dark: false,
    vars: { bg: "#faf9f8", fg: "#201f1e", surface: "#ffffff", surface2: "#f3f2f1", border: "#e1dfdd", accent: "#0078d4", accent2: "#2b88d8", contrast: "#ffffff", muted: "#605e5c" },
  },
  {
    id: "android", name: "Android", group: "Styles", font: "roboto", fx: "dots", dark: false,
    vars: { bg: "#fef7ff", fg: "#1d1b20", surface: "#ffffff", surface2: "#f3edf7", border: "#e7e0ec", accent: "#6750a4", accent2: "#7d5260", contrast: "#ffffff", muted: "#49454f" },
  },
  {
    id: "neu", name: "Neumorphism", group: "Styles", font: "sans", fx: "none", dark: false,
    vars: { bg: "#e0e5ec", fg: "#3d4759", surface: "#e0e5ec", surface2: "#d6dbe3", border: "#c8cdd6", accent: "#6d5dfc", accent2: "#4a90e2", contrast: "#ffffff", muted: "#5f6b7a" },
  },
];

export const DEFAULT_SKIN = "nebula";

export function skinById(id: string): Skin | undefined {
  return SKINS.find((s) => s.id === id);
}

// Serializable payload stored in localStorage + applied pre-paint by ThemeScript.
export function skinPayload(skin: Skin) {
  return {
    id: skin.id,
    dark: skin.dark,
    fx: skin.fx,
    font: FONT_STACKS[skin.font],
    vars: skin.vars,
  };
}
