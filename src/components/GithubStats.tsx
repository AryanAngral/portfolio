import { FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";
import T from "./T";
import SectionHeading from "./SectionHeading";
import CommitHeatmap from "./CommitHeatmap";
import LanguageDonut from "./LanguageDonut";
import CountUp from "./CountUp";
import { profile } from "@/lib/data";
import github from "@/lib/github.json";

const yearsActive = new Date().getFullYear() - github.memberSince;

function compact(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)}K+` : String(n);
}

const TILES = [
  { value: github.repos, label: "Public repositories", hint: "on GitHub" },
  { value: compact(github.linesOfCode), label: "Lines of code", hint: "across public repos" },
  { value: `${github.commits}+`, label: "Commits", hint: "pushed to GitHub" },
  { value: github.languages.length, label: "Languages", hint: github.languages.join(" · ") },
  { value: github.topLanguage, label: "Most-used language", hint: "across projects" },
  { value: `${yearsActive}+`, label: "Years on GitHub", hint: `since ${github.memberSince}` },
];

export default function GithubStats() {
  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="06" eyebrow={<T k="h.gh.eyebrow" />} title={<T k="h.gh.title" />} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TILES.map((tile, i) => (
          <Reveal key={tile.label} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-surface p-5">
              <p className="text-gradient text-3xl font-bold">
                <CountUp value={tile.value} />
              </p>
              <p className="mt-2 text-xs font-medium"><T k={`gh.${i}`} fallback={tile.label} /></p>
              <p className="mt-0.5 font-mono text-[10px] text-muted">{tile.hint}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Reveal delay={0.08}>
          <LanguageDonut />
        </Reveal>
        <Reveal delay={0.12}>
          <CommitHeatmap />
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <FiGithub size={16} /> <T k="gh.viewall" />
        </a>
      </Reveal>
    </section>
  );
}
