"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast shadow-lg shadow-accent/20 transition-transform hover:scale-105 cursor-pointer"
    >
      <FiPrinter size={15} /> Print / Save as PDF
    </button>
  );
}
