"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Resume({ resumeUrl }: { resumeUrl: string }) {
  return (
    <section id="resume" className="relative mx-auto max-w-4xl px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card glow-ring flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
      >
        <div className="gradient-button flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_8px_20px_-6px_var(--color-glow)] dark:shadow-[0_8px_20px_-6px_var(--color-dark-glow)]">
          <FileText size={20} className="text-white" />
        </div>
        <h2 className="font-[var(--font-display)] text-xl font-bold">Want the full picture?</h2>
        <p className="max-w-md text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
          Grab a copy of my resume for a complete summary of my education, skills, and experience.
        </p>
        <Button href={resumeUrl} download icon={<Download size={16} />}>
          Download Resume (PDF)
        </Button>
      </motion.div>
    </section>
  );
}
