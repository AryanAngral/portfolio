import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
