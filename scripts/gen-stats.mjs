// Computes build-time stats about the site itself and writes src/lib/stats.json.
// Runs on prebuild so the /stats dashboard always reflects the current repo.
import { execSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const CODE_EXT = new Set([".ts", ".tsx", ".css", ".mjs"]);

let files = 0;
let lines = 0;
let components = 0;
let games = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full);
    } else if (CODE_EXT.has(extname(entry))) {
      files += 1;
      lines += readFileSync(full, "utf8").split("\n").length;
      if (entry.endsWith(".tsx")) components += 1;
      if (full.includes(join("arcade", "games"))) games += 1;
    }
  }
}
walk(SRC);

function safe(cmd, fallback) {
  try {
    return execSync(cmd, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return fallback;
  }
}

const commits = Number(safe("git rev-list --count HEAD", "0")) || 0;
const lastCommit = safe("git log -1 --format=%cd --date=short", "");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const deps = Object.keys(pkg.dependencies ?? {}).length;
const devDeps = Object.keys(pkg.devDependencies ?? {}).length;

const stats = {
  files,
  lines,
  components,
  games,
  commits,
  lastCommit,
  deps,
  devDeps,
  generatedAt: new Date().toISOString().slice(0, 10),
};

writeFileSync(join(SRC, "lib", "stats.json"), JSON.stringify(stats, null, 2) + "\n");
console.log("stats:", stats);
