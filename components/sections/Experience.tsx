"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ExperienceEntry } from "@/lib/content";

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/40 px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Experience" title="Professional Experience & Readiness" />

        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)] sm:text-lg">
                Focused on Software Engineering Coursework &amp; Applied Projects
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
                Currently pursuing an Integrated M.Tech in Software Engineering at VIT-AP University and actively seeking Software Development Engineer (SDE) internships and entry-level engineering roles.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry, i) => (
              <motion.div
                key={`${entry.role}-${entry.organization}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card glow-ring rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
                    <Briefcase size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
                        {entry.role} &middot; {entry.organization}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--color-accent-solid)]">
                          {entry.period}
                        </span>
                        {entry.isCurrent && (
                          <span className="rounded-md bg-[var(--color-accent-solid)] px-2 py-0.5 text-[10px] font-semibold text-white">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                      {entry.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

