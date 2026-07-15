import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07070a",
          color: "#f2f2f7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(109,40,217,0.45), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-250px",
            right: "-100px",
            width: "650px",
            height: "650px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(6,182,212,0.35), transparent 65%)",
          }}
        />
        <div style={{ display: "flex", fontSize: 30, color: "#a78bfa" }}>Hi, I&apos;m</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 8 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#9a9aa5", marginTop: 12 }}>
          {profile.role} · Cloud & Full-Stack · Applied AI
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#57575f", marginTop: 48 }}>
          {siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
