import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SkillsRadar from "./SkillsRadar";
import CountUp from "./CountUp";
import { education, profile, skillGroups } from "@/lib/data";

const stats = [
  { value: "8.8", label: "CGPA in Computer Science" },
  { value: "200+", label: "Students reached via workshops" },
  { value: "30%", label: "Latency cut in optimized pipelines" },
  { value: "8", label: "Certifications & distinctions" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" eyebrow="About" title="Who I am" />

      <Reveal className="mb-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface p-5 text-center"
            >
              <p className="text-gradient text-3xl font-bold">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

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

      <Reveal delay={0.15} className="mt-12">
        <SkillsRadar />
      </Reveal>
    </section>
  );
}
