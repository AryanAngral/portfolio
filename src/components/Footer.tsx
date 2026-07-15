import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
          <a href="/arcade" className="transition-colors hover:text-accent">🕹️ arcade</a>
          <a href="/algorithms" className="transition-colors hover:text-accent">📊 algorithms</a>
          <a href="/ctf" className="transition-colors hover:text-accent">🚩 ctf</a>
          <a href="/resume" className="transition-colors hover:text-accent">📄 resume</a>
          <a href="/stats" className="transition-colors hover:text-accent">📈 stats</a>
        </nav>
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <FiGithub size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <FiMail size={16} />
          </a>
        </div>
        <p>Built with Next.js &amp; Tailwind · no trackers</p>
      </div>
    </footer>
  );
}
