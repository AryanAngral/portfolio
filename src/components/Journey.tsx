import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { journey } from "@/lib/data";

export default function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="02" eyebrow="Journey" title="The road so far" />

      <div className="relative ml-3 border-l border-border pl-8">
        {journey.map((milestone, i) => (
          <Reveal key={milestone.title} delay={i * 0.05} className="relative mb-9 last:mb-0">
            <span className="absolute -left-[calc(2rem+4px)] top-1.5 h-2 w-2 rounded-full bg-accent-2" />
            <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
              {milestone.period}
            </p>
            <h3 className="mt-0.5 font-semibold">{milestone.title}</h3>
            <p className="mt-0.5 max-w-xl text-sm text-muted">{milestone.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
