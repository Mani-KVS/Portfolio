"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Project } from "@/lib/content";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Projects" title="Things I've built" />

      <div className="grid gap-7 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <TiltCard className="glass-card glow-ring group flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative h-52 w-full overflow-hidden bg-[var(--color-bg-soft)] dark:bg-[var(--color-dark-bg-soft)]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]">
                  {project.period}
                </p>
                <h3 className="mt-1.5 font-[var(--font-display)] text-lg font-bold">{project.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--color-accent-tint)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent-solid)] dark:bg-[var(--color-dark-accent-tint)] dark:text-[var(--color-dark-accent-solid)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3 border-t border-[var(--color-border)] pt-4 dark:border-[var(--color-dark-border)]">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors hover:text-[var(--color-accent-solid)] dark:hover:text-[var(--color-dark-accent-solid)]"
                    >
                      <Github size={13} />
                      Code
                    </a>
                  ) : (
                    <span className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-muted)]/50 dark:text-[var(--color-dark-ink-muted)]/50">
                      Code coming soon
                    </span>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors hover:text-[var(--color-accent-solid)] dark:hover:text-[var(--color-dark-accent-solid)]"
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
