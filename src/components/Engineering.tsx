import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import DeploySimulator from "./DeploySimulator";
import Architecture from "./Architecture";

export default function Engineering() {
  return (
    <section id="engineering" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="04" eyebrow="Engineering" title="How I ship" />
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <DeploySimulator />
        </Reveal>
        <Reveal delay={0.1}>
          <Architecture />
        </Reveal>
      </div>
    </section>
  );
}
