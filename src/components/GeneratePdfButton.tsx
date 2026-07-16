"use client";

import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { certifications, education, experience, profile, projects, skillGroups } from "@/lib/data";

// Builds a clean one/two-page résumé PDF from the same data that powers the
// site, entirely in the browser (jsPDF). Always in sync — no separate file.
export default function GeneratePdfButton() {
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const M = 48;
      let y = 56;

      const line = (
        text: string,
        opts: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number } = {},
      ) => {
        const { size = 10, bold = false, color = [40, 40, 40], gap = 14 } = opts;
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const wrapped = doc.splitTextToSize(text, W - M * 2);
        wrapped.forEach((ln: string) => {
          if (y > 780) {
            doc.addPage();
            y = 56;
          }
          doc.text(ln, M, y);
          y += gap;
        });
      };
      const heading = (t: string) => {
        y += 6;
        line(t.toUpperCase(), { size: 11, bold: true, color: [109, 40, 217], gap: 16 });
        doc.setDrawColor(220, 220, 220);
        doc.line(M, y - 8, W - M, y - 8);
      };

      line(profile.name, { size: 22, bold: true, color: [15, 15, 20], gap: 24 });
      line(`${profile.role} · ${profile.location}`, { size: 10, color: [90, 90, 90] });
      line(`${profile.email}  |  github.com/AryanAngral  |  LinkedIn`, { size: 9, color: [90, 90, 90] });
      y += 4;
      line(profile.summary, { size: 10, gap: 14 });

      heading("Education");
      line(`${education.degree} — ${education.graduation}`, { bold: true });
      line(`${education.school}, ${education.location} · CGPA ${education.cgpa}`, { color: [90, 90, 90] });

      heading("Technical Skills");
      skillGroups.forEach((g) => line(`${g.title}: ${g.skills.join(", ")}`, { gap: 13 }));

      heading("Experience");
      experience.forEach((e) => {
        line(`${e.role} — ${e.org}  (${e.period})`, { bold: true, gap: 14 });
        e.points.forEach((p) => line(`•  ${p}`, { color: [70, 70, 70], gap: 13 }));
        y += 2;
      });

      heading("Projects");
      projects.forEach((p) => {
        line(`${p.name}  [${p.tags.join(", ")}]`, { bold: true, gap: 14 });
        p.points.forEach((pt) => line(`•  ${pt}`, { color: [70, 70, 70], gap: 13 }));
        y += 2;
      });

      heading("Certifications");
      certifications.forEach((c) => line(`•  ${c.title} — ${c.issuer}${c.year ? ` (${c.year})` : ""}`, { gap: 13 }));

      doc.save("Aryan_Angral_Resume_generated.pdf");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={generate}
      disabled={busy}
      className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-60 cursor-pointer"
    >
      <FiFileText size={15} /> {busy ? "Generating…" : "Generate PDF (live)"}
    </button>
  );
}
