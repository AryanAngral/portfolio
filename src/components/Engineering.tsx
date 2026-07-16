import Reveal from "./Reveal";
import T from "./T";
import SectionHeading from "./SectionHeading";
import DeploySimulator from "./DeploySimulator";

export default function Engineering() {
  return (
    <section id="engineering" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="04" eyebrow={<T k="h.eng.eyebrow" />} title={<T k="h.eng.title" />} />
      <Reveal>
        <DeploySimulator />
      </Reveal>
    </section>
  );
}
