"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Download, ExternalLink, X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certification } from "@/lib/content";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Certifications" title="Certifications" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass-card glow-ring group flex flex-col overflow-hidden rounded-3xl"
          >
            <button
              onClick={() => setActive(cert)}
              className="relative h-32 w-full overflow-hidden bg-[var(--color-bg-soft)] dark:bg-[var(--color-dark-bg-soft)]"
            >
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn size={20} className="text-white" />
              </div>
            </button>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start gap-2">
                <Award size={15} className="mt-0.5 shrink-0 text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
                <h3 className="text-sm font-semibold leading-snug">{cert.name}</h3>
              </div>
              <p className="mt-2 text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                {cert.organization}
                {cert.issueDate ? ` · ${cert.issueDate}` : ""}
              </p>
              <div className="mt-auto flex gap-3 pt-3">
                <button
                  onClick={() => setActive(cert)}
                  className="text-xs font-semibold text-[var(--color-accent-solid)] hover:underline dark:text-[var(--color-dark-accent-solid)]"
                >
                  View
                </button>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-accent-solid)] dark:text-[var(--color-dark-ink-muted)] dark:hover:text-[var(--color-dark-accent-solid)]"
                  >
                    <ExternalLink size={11} />
                    Credential
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-lg overflow-hidden rounded-3xl bg-[var(--color-surface-solid)] dark:bg-[var(--color-dark-surface-solid)]"
            >
              <div className="relative h-64 w-full bg-[var(--color-bg-soft)] dark:bg-[var(--color-dark-bg-soft)]">
                <Image src={active.image} alt={active.name} fill sizes="512px" className="object-cover" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-[var(--font-display)] text-lg font-bold">{active.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {active.organization}
                  {active.issueDate ? ` · ${active.issueDate}` : ""}
                </p>
                <div className="mt-5 flex gap-3">
                  <a
                    href={active.image}
                    download
                    className="gradient-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Download size={13} />
                    Download
                  </a>
                  {active.credentialUrl && (
                    <a
                      href={active.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                    >
                      <ExternalLink size={13} />
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
