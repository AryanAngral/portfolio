import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="02" eyebrow="Experience" title="Where I&apos;ve worked" />

      <div className="relative ml-3 border-l border-border pl-8">
        {experience.map((item, i) => (
          <Reveal key={item.role + item.org} delay={i * 0.08} className="relative mb-12 last:mb-0">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)]" />
            <p className="font-mono text-xs text-muted">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold">{item.role}</h3>
            <p className="text-sm text-accent">{item.org}</p>
            <ul className="mt-3 space-y-2">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-muted leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
