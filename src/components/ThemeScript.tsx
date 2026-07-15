const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    var custom = localStorage.getItem("accent-theme");
    if (custom) {
      var t = JSON.parse(custom);
      if (t && t.a && t.b) {
        document.documentElement.style.setProperty("--accent", t.a);
        document.documentElement.style.setProperty("--accent-2", t.b);
        document.documentElement.style.setProperty("--accent-contrast", t.c || "#ffffff");
      }
    }
    console.log("%c👋 hey, fellow dev. FLAG{console_is_home} — more at /ctf", "color:#a78bfa;font-family:monospace;font-size:12px");
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
