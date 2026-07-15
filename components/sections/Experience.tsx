"use client";

import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ExperienceEntry } from "@/lib/content";

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Experience" title="Where I've worked" />

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card flex flex-col items-center gap-3 rounded-3xl p-10 text-center"
        >
          <Sparkles size={22} className="text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
          <p className="font-[var(--font-display)] font-bold">Currently focused on academics &amp; projects</p>
          <p className="max-w-md text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            No internships or jobs yet — add them here from the Admin Panel the moment you land one.
          </p>
        </motion.div>
      ) : (
        <ol className="relative space-y-6 border-l-2 border-[var(--color-border)] pl-8 dark:border-[var(--color-dark-border)]">
          {entries.map((entry, i) => (
            <motion.li
              key={`${entry.role}-${entry.organization}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="glass-card absolute -left-[2.6rem] flex h-9 w-9 items-center justify-center rounded-full">
                <Briefcase size={14} className="text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
              </span>
              <div className="glass-card glow-ring rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]">
                    {entry.period}
                  </p>
                  {entry.isCurrent && (
                    <span className="gradient-button rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Current
                    </span>
                  )}
                </div>
                <h4 className="mt-1 font-[var(--font-display)] font-bold">
                  {entry.role} &middot; {entry.organization}
                </h4>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {entry.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
