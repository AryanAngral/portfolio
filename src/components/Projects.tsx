import { FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import { courseworkRepos, profile, projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="03" eyebrow="Projects" title="Things I&apos;ve built" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <div className="flex shrink-0 items-center gap-2">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} source code on GitHub`}
                      className="relative z-10 text-muted transition-colors hover:text-accent"
                    >
                      <FiGithub size={17} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} live demo`}
                      className="relative z-10 text-muted transition-colors hover:text-accent"
                    >
                      <FiExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">{project.description}</p>

              <ul className="mt-4 flex-1 space-y-2">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-muted leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold">Coursework & practice</h3>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            All repos →
          </a>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseworkRepos.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.05} className="h-full">
            <a
              href={repo.repo}
              target="_blank"
              rel="noreferrer"
              className="group/repo flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-sm font-semibold transition-colors group-hover/repo:text-accent">
                  {repo.name}
                </p>
                <FiGithub size={15} className="shrink-0 text-muted" />
              </div>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{repo.description}</p>
              <span className="mt-3 w-fit rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted">
                {repo.tech}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
