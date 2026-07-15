"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Sparkles } from "lucide-react";
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
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="About Me" title="Who I am" />

      <div className="grid gap-6 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:col-span-3"
        >
          <p className="leading-relaxed text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {about.intro}
          </p>
          <p className="mt-4 leading-relaxed text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {about.objective}
          </p>

          <h3 className="mt-8 mb-3 font-[var(--font-display)] text-sm font-bold uppercase tracking-wide">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((interest) => (
              <span
                key={interest}
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-accent-tint)] px-3 py-1.5 text-xs font-medium text-[var(--color-accent-solid)] dark:bg-[var(--color-dark-accent-tint)] dark:text-[var(--color-dark-accent-solid)]"
              >
                <Sparkles size={12} />
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-3xl p-8 md:col-span-2"
        >
          <h3 className="mb-4 font-[var(--font-display)] text-sm font-bold uppercase tracking-wide">
            Strengths
          </h3>
          <ul className="space-y-4">
            {about.strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]"
                />
                <span className="text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {strength}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-6">
        <h3 className="mb-6 font-[var(--font-display)] text-lg font-bold">Education</h3>
        <ol className="relative space-y-6 border-l-2 border-[var(--color-border)] pl-8 dark:border-[var(--color-dark-border)]">
          {education.map((entry, i) => (
            <motion.li
              key={entry.institution}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="glass-card absolute -left-[2.6rem] flex h-9 w-9 items-center justify-center rounded-full">
                <GraduationCap size={15} className="text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
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
                <h4 className="mt-1 font-[var(--font-display)] font-bold">{entry.institution}</h4>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {entry.degree}
                </p>
                <p className="mt-2 text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {entry.location} &middot; {entry.score}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
