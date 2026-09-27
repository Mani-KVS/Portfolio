"use client";

import Image from "next/image";

/**
 * Renders the hero's workstation photo inside a clean, professional frame.
 * To swap the photo later, change `hero.workstationImage` in content/site.json
 * (or edit it in TinaCMS).
 */
export function WorkstationVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full">
      <div className="glass-card overflow-hidden rounded-2xl p-2">
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