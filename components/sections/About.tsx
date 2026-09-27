"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { EducationEntry, SiteContent } from "@/lib/content";

export function About({
  about,
  education,
}: {
  about: SiteContent["about"];
  education: EducationEntry[];
}) {
  return (
    <>
      <section id="about" className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading label="About Me" title="Background & Career Objective" />

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
              Introduction
            </h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-ink-muted)]">
              {about.intro}
            </p>

            <h3 className="mt-6 font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
              Career Objective
            </h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-ink-muted)]">
              {about.objective}
            </p>

            <div className="mt-7 border-t border-[var(--color-border)] pt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Areas of Interest
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="glass-card rounded-2xl p-6 sm:p-8 lg:col-span-5"
          >
            <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
              Key Strengths
            </h3>
            <ul className="mt-4 space-y-3.5">
              {about.strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-3 text-sm leading-6">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-solid)]"
                  />
                  <span className="text-[var(--color-ink-muted)]">{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section
        id="education"
        className="border-y border-[var(--color-border)] bg-[var(--color-bg-soft)]/50 px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Education" title="Academic Background" />

          <div className="grid gap-4">
            {education.map((entry, i) => (
              <motion.div
                key={entry.institution}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card glow-ring rounded-2xl p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)] sm:text-lg">
                          {entry.institution}
                        </h3>
                        {entry.isCurrent && (
                          <span className="rounded-md bg-[var(--color-accent-solid)] px-2 py-0.5 text-[11px] font-semibold text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">
                        {entry.degree}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--color-ink-muted)]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} />
                          {entry.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={13} />
                          {entry.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent-solid)]">
                    <Award size={14} />
                    {entry.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

