"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/data";

const ROLES = ["Software Engineer", "Cloud & DevOps Builder", "Full-Stack Developer", "AI Tinkerer"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(600px circle at 20% 20%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%), radial-gradient(500px circle at 80% 70%, color-mix(in srgb, var(--accent-2) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-5xl gap-10 py-32">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availability}
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="-mt-4 font-mono text-sm text-accent"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="-mt-8 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mt-8 h-9 text-2xl font-semibold text-muted sm:text-3xl"
        >
          <RotatingRoles />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="-mt-4 max-w-xl text-base text-muted sm:text-lg"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:scale-105"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <FiDownload size={15} /> Resume
          </a>

          <div className="ml-2 flex items-center gap-3">
            <SocialLink href={profile.github} label="GitHub">
              <FiGithub size={18} />
            </SocialLink>
            <SocialLink href={profile.linkedin} label="LinkedIn">
              <FiLinkedin size={18} />
            </SocialLink>
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <FiMail size={18} />
            </SocialLink>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <FiArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}

function RotatingRoles() {
  return (
    <span className="relative inline-block">
      {ROLES.map((role, i) => (
        <motion.span
          key={role}
          className="absolute left-0 top-0 whitespace-nowrap text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: ROLES.length * 2.4,
            times: [
              i / ROLES.length,
              i / ROLES.length + 0.03,
              (i + 1) / ROLES.length - 0.05,
              (i + 1) / ROLES.length,
            ],
            repeat: Infinity,
          }}
        >
          {role}
        </motion.span>
      ))}
      <span className="invisible">{ROLES[0]}</span>
    </span>
  );
}
