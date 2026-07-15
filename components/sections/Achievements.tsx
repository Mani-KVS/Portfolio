"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { SiteContent } from "@/lib/content";

export function Achievements({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Achievements" title="Numbers that speak" align="center" />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[stat.icon] ?? Icons.Trophy;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card glow-ring flex flex-col items-center rounded-3xl p-7 text-center"
            >
              <div className="gradient-button flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_8px_20px_-6px_var(--color-glow)] dark:shadow-[0_8px_20px_-6px_var(--color-dark-glow)]">
                <Icon size={20} className="text-white" />
              </div>
              <p className="mt-4 font-[var(--font-display)] text-3xl font-extrabold sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
