"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Resume({ resumeUrl }: { resumeUrl: string }) {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)] sm:text-xl">
              Curriculum Vitae / Resume
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-ink-muted)]">
              View or download my complete resume in PDF format covering my academic record, projects, and technical skills.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button href={resumeUrl} external variant="secondary" icon={<ExternalLink size={15} />}>
            Preview PDF
          </Button>
          <Button href={resumeUrl} download icon={<Download size={15} />}>
            Download Resume
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

