import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/lib/data";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="06" eyebrow="Certifications" title="Credentials &amp; distinctions" />

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
            <div className="min-w-0">
              <p className="font-semibold leading-snug">
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    {cert.title}
                    <FiExternalLink size={13} className="shrink-0 text-muted" />
                  </a>
                ) : (
                  cert.title
                )}
              </p>
              <p className="text-sm text-muted">
                {cert.issuer}
                {cert.year && <span> · {cert.year}</span>}
              </p>
              {cert.credentialId && (
                <p className="mt-1 break-all font-mono text-[11px] text-muted">
                  ID: {cert.credentialId}
                </p>
              )}
              {cert.courses && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.courses.map((course) => (
                    <a
                      key={course.label}
                      href={course.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted transition-colors hover:text-accent"
                    >
                      {course.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
