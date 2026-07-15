import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Projects" title="Things I've built" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 0.08}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
              {project.name}
            </h3>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
