"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  label,
  title,
  align = "left",
}: {
  label: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="inline-block rounded-md border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-solid)]">
        {label}
      </span>
      <h2 className="mt-3 font-[var(--font-display)] text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
        {title}
      </h2>
    </motion.div>
  );
}

