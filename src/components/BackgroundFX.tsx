"use client";

import { useEffect, useState } from "react";

export default function BackgroundFX() {
  const [fx, setFx] = useState("orbs");

  useEffect(() => {
    const read = () => setFx(document.documentElement.dataset.fx || "orbs");
    read();
    window.addEventListener("skinchange", read);
    return () => window.removeEventListener("skinchange", read);
  }, []);

  return (
    <div id="bg-fx" aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {fx === "orbs" && (
        <>
          <div className="bg-grid absolute inset-0" />
          <div className="fx-blob fx-blob-1" />
          <div className="fx-blob fx-blob-2" />
          <div className="fx-blob fx-blob-3" />
          <div className="bg-noise absolute inset-0" />
        </>
      )}
      {fx === "grid" && <div className="fx-grid-strong" />}
      {fx === "scanlines" && (
        <>
          <div className="fx-grid-strong" />
          <div className="fx-scanlines" />
        </>
      )}
      {fx === "sunset" && <div className="fx-sunset" />}
      {fx === "dots" && <div className="fx-dots" />}
      {fx === "mesh" && (
        <>
          <div className="fx-mesh" />
          <div className="bg-noise absolute inset-0" />
        </>
      )}
      {/* fx === "none" renders nothing */}
    </div>
  );
}
