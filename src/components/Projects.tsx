import { FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";
import T from "./T";
import SectionHeading from "./SectionHeading";
import ProjectShowcase from "./ProjectShowcase";
import { courseworkRepos, profile, projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="05" eyebrow={<T k="h.proj.eyebrow" />} title={<T k="h.proj.title" />} />

      <ProjectShowcase projects={projects} />

      <Reveal className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold"><T k="proj.coursework" /></h3>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            <T k="proj.allrepos" />
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
