"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactCard from "./ContactCard";
import { profile } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const configured = Boolean(serviceId && templateId && publicKey);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!configured) {
      setStatus("error");
      return;
    }

    // Honeypot: real users never see or fill this field; bots do.
    const honeypot = formRef.current.elements.namedItem("website") as HTMLInputElement | null;
    if (honeypot?.value) {
      setStatus("success");
      formRef.current.reset();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId!, templateId!, formRef.current, {
        publicKey: publicKey!,
        blockHeadless: true,
        limitRate: { id: "portfolio-contact", throttle: 10_000 },
      });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      const info =
        err instanceof Error
          ? { message: err.message }
          : typeof err === "string"
            ? { message: err }
            : { status: (err as { status?: number }).status, text: (err as { text?: string }).text };
      console.error("EmailJS send failed:", info);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="07" eyebrow="Contact" title="Let&apos;s build something" />

      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="max-w-sm text-muted leading-relaxed">
            Have a role, project, or idea in mind? My inbox is open — drop a message and
            I&apos;ll get back to you directly.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <FiMail size={16} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <FiGithub size={16} /> github.com/AryanAngral
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <FiLinkedin size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
          >
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="from_name"
                required
                placeholder="Your name"
                className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
              <input
                type="email"
                name="reply_to"
                required
                placeholder="Your email"
                className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              className="resize-none rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend size={15} />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-500">Thanks — your message is on its way!</p>
            )}
            {status === "error" && !configured && (
              <p className="text-sm text-amber-500">
                Email isn&apos;t configured yet — set the EmailJS environment variables (see
                README) or reach out at{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </p>
            )}
            {status === "error" && configured && (
              <p className="text-sm text-red-500">
                Something went wrong sending your message. Please try again or email{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>{" "}
                directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <ContactCard />
      </Reveal>
    </section>
  );
}
