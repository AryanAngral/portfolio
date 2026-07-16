import { DEFAULT_SKIN, skinById, skinPayload, type Skin } from "./skins";

// Applies a skin to <html>: CSS variables, data-skin/data-fx, dark class,
// active font. Persists to localStorage and notifies listeners (BackgroundFX).
export function applySkin(skin: Skin) {
  const root = document.documentElement;
  const p = skinPayload(skin);

  if (skin.id === DEFAULT_SKIN) {
    // hand control back to the :root/.dark system + theme toggle
    ["background", "foreground", "surface", "surface-2", "border", "accent", "accent-2", "accent-contrast", "muted", "font-active"].forEach(
      (v) => root.style.removeProperty(`--${v}`),
    );
    delete root.dataset.skin;
    root.dataset.fx = "orbs";
  } else {
    const v = p.vars;
    root.style.setProperty("--background", v.bg);
    root.style.setProperty("--foreground", v.fg);
    root.style.setProperty("--surface", v.surface);
    root.style.setProperty("--surface-2", v.surface2);
    root.style.setProperty("--border", v.border);
    root.style.setProperty("--accent", v.accent);
    root.style.setProperty("--accent-2", v.accent2);
    root.style.setProperty("--accent-contrast", v.contrast);
    root.style.setProperty("--muted", v.muted);
    root.style.setProperty("--font-active", p.font);
    root.dataset.skin = skin.id;
    root.dataset.fx = skin.fx;
    root.classList.toggle("dark", skin.dark);
  }

  try {
    if (skin.id === DEFAULT_SKIN) localStorage.removeItem("skin-payload");
    else localStorage.setItem("skin-payload", JSON.stringify(p));
    localStorage.setItem("skin", skin.id);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("skinchange", { detail: skin.id }));
}

export function applySkinById(id: string) {
  const skin = skinById(id);
  if (skin) applySkin(skin);
}
