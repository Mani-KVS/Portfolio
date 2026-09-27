"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Download, ExternalLink, X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certification } from "@/lib/content";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  const [active, setActive] = useState<Certification | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    if (active) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [active]);

  return (
    <section
      id="certifications"
      className="border-y border-[var(--color-border)] bg-[var(--color-bg-soft)]/50 px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Certifications" title="Verified Credentials & Workshops" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card glow-ring group flex flex-col overflow-hidden rounded-2xl"
            >
              <button
                type="button"
                onClick={() => setActive(cert)}
                aria-label={`Preview certificate: ${cert.name}`}
                className="relative aspect-[16/11] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]"
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-200 group-hover:bg-slate-900/40 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    <ZoomIn size={14} />
                    Preview
                  </span>
                </div>
              </button>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start gap-2">
                  <Award
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-solid)]"
                  />
                  <h3 className="text-sm font-semibold leading-snug text-[var(--color-ink)]">
                    {cert.name}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
                  {cert.organization}
                  {cert.issueDate ? ` · ${cert.issueDate}` : ""}
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-[var(--color-border)] pt-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setActive(cert)}
                    className="text-xs font-semibold text-[var(--color-accent-solid)] hover:underline"
                  >
                    Preview
                  </button>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-accent-solid)]"
                    >
                      <ExternalLink size={12} />
                      Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-xs"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card w-full max-w-xl overflow-hidden rounded-2xl bg-[var(--color-surface-solid)]"
              >
                <div className="relative aspect-[16/11] w-full border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="576px"
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm transition-colors hover:bg-[var(--color-bg-soft)]"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
                    {active.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                    {active.organization}
                    {active.issueDate ? ` · ${active.issueDate}` : ""}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={active.image}
                      download
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent-solid)] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <Download size={13} />
                      Download Image
                    </a>
                    {active.credentialUrl && (
                      <a
                        href={active.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent-solid)]"
                      >
                        <ExternalLink size={13} />
                        Verify Credential
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

