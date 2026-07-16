const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    var root = document.documentElement;
    root.dataset.fx = "orbs";
    var payload = localStorage.getItem("skin-payload");
    if (payload) {
      var p = JSON.parse(payload);
      var v = p.vars;
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
      root.dataset.skin = p.id;
      root.dataset.fx = p.fx;
      root.classList.toggle("dark", !!p.dark);
    }
    console.log("%c👋 hey, fellow dev. FLAG{console_is_home} — more at /ctf", "color:#a78bfa;font-family:monospace;font-size:12px");
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
