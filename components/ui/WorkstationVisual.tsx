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
      {/* Calm static subtle ambient depth behind the profile/workstation frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-2xl transition-opacity duration-600"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--hero-image-glow) 0%, transparent 75%)",
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