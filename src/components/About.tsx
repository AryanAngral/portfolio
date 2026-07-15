import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education, profile, skillGroups } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="About" title="Who I am" />

      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-muted leading-relaxed">{profile.summary}</p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">Education</p>
            <p className="mt-2 font-semibold">{education.degree}</p>
            <p className="text-sm text-muted">
              {education.school}, {education.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
              <span>CGPA: {education.cgpa}</span>
              <span>{education.graduation}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-6">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
