"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/content";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading label="Projects" title="Featured Engineering Projects" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card glow-ring group flex h-full flex-col overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-ink-muted)]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Calendar size={12} className="text-[var(--color-accent-solid)]" />
                  {project.period}
                </span>
                {project.featured && (
                  <span className="rounded-md bg-[var(--color-accent-tint)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-accent-solid)]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="mt-2.5 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
                {project.name}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)]"
                  >
                    <Github size={13} />
                    Source Code
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-muted)]">
                    Repository coming soon
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent-solid)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

