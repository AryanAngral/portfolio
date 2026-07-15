import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import DeploySimulator from "./DeploySimulator";

export default function Engineering() {
  return (
    <section id="engineering" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="04" eyebrow="Engineering" title="How I ship" />
      <Reveal>
        <DeploySimulator />
      </Reveal>
    </section>
  );
}
