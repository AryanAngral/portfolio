"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { useT } from "./T";
import type { Project } from "@/lib/data";

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const t = useT();
  const [selected, setSelected] = useState<Project | null>(null);
  const selectedIndex = selected ? projects.indexOf(selected) : -1;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => setSelected(project)}
                  className="relative z-10 text-left text-lg font-semibold transition-colors hover:text-accent cursor-pointer"
                >
                  {project.name}
                </button>
                <div className="flex shrink-0 items-center gap-2">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} source code`}
                      className="relative z-10 text-muted transition-colors hover:text-accent"
                    >
                      <FiGithub size={17} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} live demo`}
                      className="relative z-10 text-muted transition-colors hover:text-accent"
                    >
                      <FiExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">{t(`proj.${i}.desc`, project.description)}</p>
              <div className="mt-4 flex-1" />
              <button
                onClick={() => setSelected(project)}
                className="relative z-10 mb-4 w-fit font-mono text-xs text-accent transition-colors hover:underline cursor-pointer"
              >
                {t("proj.details")}
              </button>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[92] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl"
              role="dialog"
              aria-label={selected.name}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold">{selected.name}</h3>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="text-muted hover:text-accent cursor-pointer"
                >
                  <FiX size={18} />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted">{t(`proj.${selectedIndex}.desc`, selected.description)}</p>

              <ul className="mt-5 space-y-2.5">
                {selected.points.map((point, j) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {t(`proj.${selectedIndex}.p${j}`, point)}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(selected.repo || selected.link) && (
                <div className="mt-6 flex gap-3">
                  {selected.repo && (
                    <a
                      href={selected.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-transform hover:scale-105"
                    >
                      <FiGithub size={15} /> Source
                    </a>
                  )}
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      <FiExternalLink size={15} /> Live
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
