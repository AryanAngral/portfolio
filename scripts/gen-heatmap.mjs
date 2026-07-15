// Builds src/lib/heatmap.json: daily commit counts for the last 26 weeks,
// aggregated across local repo clones + this portfolio. Run manually
// (`npm run gen:heatmap`) since Vercel has neither the clones nor gh auth.
import { execSync } from "node:child_process";
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPOS_DIR = join(process.env.USERPROFILE || process.env.HOME || "", "Desktop", "GitHub-Repos");
const HERE = process.cwd();
const DAYS = 364; // 52 weeks

function datesFrom(dir) {
  try {
    return execSync("git log --all --date=short --pretty=%ad", { cwd: dir, encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

const counts = {};
const add = (dates) => dates.forEach((d) => (counts[d] = (counts[d] ?? 0) + 1));

add(datesFrom(HERE));
if (existsSync(REPOS_DIR)) {
  for (const entry of readdirSync(REPOS_DIR)) {
    const full = join(REPOS_DIR, entry);
    if (existsSync(join(full, ".git"))) add(datesFrom(full));
  }
}

// build last DAYS days ending today (UTC date strings)
const today = new Date();
const series = [];
let total = 0;
for (let i = DAYS - 1; i >= 0; i--) {
  const d = new Date(today);
  d.setDate(today.getDate() - i);
  const key = d.toISOString().slice(0, 10);
  const c = counts[key] ?? 0;
  total += c;
  series.push(c);
}

const data = {
  start: (() => {
    const d = new Date(today);
    d.setDate(today.getDate() - (DAYS - 1));
    return d.toISOString().slice(0, 10);
  })(),
  counts: series,
  total,
  activeDays: Object.keys(counts).length,
  updated: today.toISOString().slice(0, 10),
};

writeFileSync(join(HERE, "src", "lib", "heatmap.json"), JSON.stringify(data) + "\n");
console.log("heatmap.json:", { total: data.total, activeDays: data.activeDays, span: data.counts.length });
