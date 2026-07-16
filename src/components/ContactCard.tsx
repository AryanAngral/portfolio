"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { FiDownload } from "react-icons/fi";
import { useT } from "./T";
import { profile, siteUrl } from "@/lib/data";

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `FN:${profile.name}`,
  `N:Angral;Aryan;;;`,
  `TITLE:${profile.role}`,
  `EMAIL;TYPE=INTERNET:${profile.email}`,
  `URL:${siteUrl}`,
  `URL;TYPE=GitHub:${profile.github}`,
  `URL;TYPE=LinkedIn:${profile.linkedin}`,
  `ADR;TYPE=home:;;;${profile.location};;;India`,
  "END:VCARD",
].join("\r\n");

export default function ContactCard() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, siteUrl, {
      width: 150,
      margin: 1,
      color: { dark: "#0a0a0f", light: "#ffffff" },
    }).catch(() => {});
  }, [open]);

  function downloadVcf() {
    const blob = new Blob([VCARD], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Aryan_Angral.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{t("card.title")}</p>
          <p className="text-xs text-muted">{t("card.desc")}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={downloadVcf}
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-transform hover:scale-105 cursor-pointer"
          >
            <FiDownload size={15} /> .vcf
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            {open ? t("card.hide") : t("card.show")}
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-4 flex justify-center">
          <canvas ref={canvasRef} className="rounded-lg" />
        </div>
      )}
    </div>
  );
}
