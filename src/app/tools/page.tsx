import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import PasswordMeter from "@/components/tools/PasswordMeter";
import Hasher from "@/components/tools/Hasher";
import JwtDecoder from "@/components/tools/JwtDecoder";
import HeaderScan from "@/components/tools/HeaderScan";
import RegexTester from "@/components/tools/RegexTester";
import BaseConverter from "@/components/tools/BaseConverter";
import UuidGenerator from "@/components/tools/UuidGenerator";
import JsPlayground from "@/components/tools/JsPlayground";

export const metadata: Metadata = {
  title: "Security tools — Aryan Angral",
  description:
    "Client-side security toys: password entropy meter, SHA/base64 hasher, JWT decoder, and a live security-headers scan.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft size={15} /> Back to portfolio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          everything runs in your browser
        </p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Security <span className="text-gradient">tools</span>
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        A few things a security-minded engineer keeps in their back pocket — all client-side, no
        data ever leaves this tab.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <PasswordMeter />
        <Hasher />
        <JwtDecoder />
        <HeaderScan />
        <RegexTester />
        <BaseConverter />
        <UuidGenerator />
        <JsPlayground />
      </div>
    </main>
  );
}
