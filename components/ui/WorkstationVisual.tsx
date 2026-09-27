"use client";

import Image from "next/image";

/**
 * Renders the hero's workstation photo inside a clean, professional frame
 * with a subtle pulsing blue/teal ambient outer glow.
 * To swap the photo later, change `hero.workstationImage` in content/site.json
 * (or edit it in TinaCMS).
 */
export function WorkstationVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full">
      {/* Subtle pulsing blue/teal outer glow behind the profile/workstation area */}
      <div
        aria-hidden="true"
        className="animate-hero-image-glow pointer-events-none absolute -inset-5 -z-10 rounded-3xl blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--hero-image-glow) 0%, var(--hero-teal-glow) 55%, transparent 80%)",
        }}
      />

      <div className="glass-card relative overflow-hidden rounded-2xl p-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--color-bg-soft)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}