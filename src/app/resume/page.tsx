import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import PrintButton from "@/components/PrintButton";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/lib/data";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Resume of ${profile.name}, ${profile.role}.`,
  robots: { index: false },
};

export default function ResumePage() {
  return (
    <main id="resume-page" className="mx-auto max-w-3xl px-6 py-12">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <div className="flex items-center gap-3">
          <PrintButton />
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <FiDownload size={15} /> Official PDF
          </a>
        </div>
      </div>

      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-muted">{profile.role} · {profile.location}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
            github.com/AryanAngral
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
        </p>
        <p className="mt-4 text-sm leading-relaxed">{profile.summary}</p>
      </header>

      <ResumeSection title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-semibold">{education.degree}</p>
          <p className="text-sm text-muted">{education.graduation}</p>
        </div>
        <p className="text-sm text-muted">
          {education.school}, {education.location} · CGPA {education.cgpa}
        </p>
      </ResumeSection>

      <ResumeSection title="Technical Skills">
        <div className="space-y-1.5">
          {skillGroups.map((group) => (
            <p key={group.title} className="text-sm leading-relaxed">
              <span className="font-semibold">{group.title}: </span>
              <span className="text-muted">{group.skills.join(", ")}</span>
            </p>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Experience">
        <div className="space-y-6">
          {experience.map((item) => (
            <div key={item.role + item.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-semibold">
                  {item.role} · <span className="font-normal">{item.org}</span>
                </p>
                <p className="text-sm text-muted">{item.period}</p>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        <div className="space-y-5">
          {projects.map((project) => (
            <div key={project.name}>
              <p className="font-semibold">
                {project.name}{" "}
                <span className="font-normal text-sm text-muted">
                  — {project.tags.join(", ")}
                </span>
              </p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Certifications & Distinctions">
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          {certifications.map((cert) => (
            <li key={cert.title}>
              <span className="font-medium text-foreground">{cert.title}</span> — {cert.issuer}
              {cert.year && ` (${cert.year})`}
            </li>
          ))}
        </ul>
      </ResumeSection>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-6 last:border-b-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
      {children}
    </section>
  );
}
