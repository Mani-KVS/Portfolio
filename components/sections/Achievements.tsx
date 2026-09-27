"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { SiteContent } from "@/lib/content";

export function Achievements({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading label="Highlights" title="Key Academic & Coding Milestones" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon =
            (Icons as unknown as Record<string, Icons.LucideIcon>)[stat.icon] ?? Icons.Trophy;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card glow-ring flex flex-col rounded-2xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
                <Icon size={18} />
              </div>
              <p className="mt-4 font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)]">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

