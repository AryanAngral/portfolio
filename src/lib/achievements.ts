export type Achievement = {
  id: string;
  name: string;
  icon: string;
  desc: string;
};

// "completionist" is awarded automatically when every other badge is unlocked.
export const ACHIEVEMENTS: Achievement[] = [
  { id: "power-user", name: "Power User", icon: "⌘", desc: "Opened the command palette (Ctrl+K)." },
  { id: "terminal", name: "Shell Access", icon: "🖥️", desc: "Opened the terminal (Ctrl+`)." },
  { id: "gamer", name: "Gamer", icon: "🕹️", desc: "Played a game in the arcade." },
  { id: "hacker", name: "Hacker", icon: "🚩", desc: "Captured a CTF flag." },
  { id: "neo", name: "Neo", icon: "🟢", desc: "Entered the matrix." },
  { id: "wanderer", name: "Wanderer", icon: "🧭", desc: "Explored 4+ pages of the site." },
  { id: "konami", name: "↑↑↓↓", icon: "🎮", desc: "Entered the Konami code." },
  { id: "completionist", name: "Completionist", icon: "🏆", desc: "Unlocked every other badge." },
];

export const STORE_KEY = "achievements";

export function unlock(id: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("achv", { detail: id }));
  }
}
