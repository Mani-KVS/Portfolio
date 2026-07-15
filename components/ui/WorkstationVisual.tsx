"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Renders the hero's realistic workstation photo inside a glassmorphic,
 * glowing frame. To swap the photo later, change `hero.workstationImage`
 * in content/site.json (or edit it in TinaCMS) — this component and the
 * layout around it never need to change.
 */
export function WorkstationVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full"
    >
      {/* Ambient glow behind the frame */}
      <div className="ambient-glow absolute -inset-8 -z-10 rounded-[2.5rem] opacity-90" />

      <div className="glass-card relative overflow-hidden rounded-[2rem] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 48vw, 90vw"
            priority
            className="object-cover"
          />

          {/* Light & Dark mode adaptive overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-[var(--color-accent-from)]/10 dark:from-[#0a0714]/50 dark:to-[var(--color-dark-accent-from)]/10 mix-blend-multiply dark:mix-blend-normal" />

          {/* Accent gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-from)]/10 via-transparent to-[var(--color-accent-to)]/10 dark:from-[var(--color-dark-accent-from)]/10 dark:to-[var(--color-dark-accent-to)]/10" />
        </div>
      </div>
    </motion.div>
  );
}