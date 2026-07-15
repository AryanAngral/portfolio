// Refresh src/lib/github.json from the GitHub CLI. Run manually
// (`npm run gen:github`) — NOT wired to build, since the Vercel build
// environment has no `gh` auth and the data changes rarely. This keeps the
// site at zero runtime external API calls.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const USER = "AryanAngral";

function gh(query) {
  return execSync(`gh api "${query}"`, { encoding: "utf8" });
}

const profile = JSON.parse(gh(`users/${USER}`));
const repos = JSON.parse(gh(`users/${USER}/repos?per_page=100`));

const langCounts = {};
for (const repo of repos) {
  if (repo.fork || !repo.language) continue;
  const lang = repo.language === "Jupyter Notebook" ? "Jupyter" : repo.language;
  langCounts[lang] = (langCounts[lang] ?? 0) + 1;
}
const languages = Object.entries(langCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([lang]) => lang);

const data = {
  repos: profile.public_repos,
  languages,
  topLanguage: languages[0] ?? "—",
  memberSince: new Date(profile.created_at).getFullYear(),
  updated: new Date().toISOString().slice(0, 10),
};

writeFileSync(join(process.cwd(), "src", "lib", "github.json"), JSON.stringify(data, null, 2) + "\n");
console.log("github.json:", data);
