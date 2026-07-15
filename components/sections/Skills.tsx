"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillCategory } from "@/lib/content";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Skills" title="Technologies I work with" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.Code2;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass-card glow-ring group rounded-3xl p-6 transition-shadow"
            >
              <div className="gradient-button flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_8px_20px_-6px_var(--color-glow)] transition-transform duration-300 group-hover:scale-110 dark:shadow-[0_8px_20px_-6px_var(--color-dark-glow)]">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="mt-4 font-[var(--font-display)] font-bold">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-[var(--color-accent-tint)] px-2.5 py-1 text-xs font-medium text-[var(--color-accent-solid)] dark:bg-[var(--color-dark-accent-tint)] dark:text-[var(--color-dark-accent-solid)]"
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
