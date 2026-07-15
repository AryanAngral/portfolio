import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/lib/data";
import { FiAward } from "react-icons/fi";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Certifications" title="Credentials & distinctions" />

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal
            key={cert.title}
            delay={i * 0.06}
            className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
              <FiAward size={16} />
            </span>
            <div>
              <p className="font-semibold leading-snug">{cert.title}</p>
              <p className="text-sm text-muted">{cert.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
