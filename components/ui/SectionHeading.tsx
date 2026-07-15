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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">{label}</p>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-14 rounded-full gradient-button ${align === "center" ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
