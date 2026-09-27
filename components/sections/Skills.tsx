"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillCategory } from "@/lib/content";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading label="Technical Skills" title="Languages, Frameworks & Tools" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const Icon =
            (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.Code2;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card glow-ring flex flex-col rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
                  <Icon size={18} />
                </div>
                <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
                  {category.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

