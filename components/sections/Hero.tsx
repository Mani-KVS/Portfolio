"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { WorkstationVisual } from "@/components/ui/WorkstationVisual";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import * as Icons from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Hero({
  hero,
  contact,
  stats,
}: {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
  stats: SiteContent["stats"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--color-bg)] px-5 pt-32 pb-20 dark:bg-[var(--color-dark-bg)]"
    >
      <AuroraBackground />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Available for SDE roles
          </span>

          <h1
            className="mt-7 font-[var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight text-[#020617] dark:text-white sm:text-6xl lg:text-7xl"
>
              {hero.name}
          </h1>
          <p className="text-gradient mt-4 font-[var(--font-display)] text-2xl font-bold sm:text-3xl">
            {hero.role}
          </p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {hero.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={hero.resumeUrl} download icon={<Download size={17} />} size="lg">
              View Resume
            </Button>
            <Button href="#contact" variant="secondary" icon={<Mail size={17} />} size="lg">
              Contact Me
            </Button>
            <Button
              href={contact.github}
              variant="secondary"
              external
              icon={<Github size={17} />}
              size="lg"
            >
              GitHub
            </Button>
            <Button
              href={contact.linkedin}
              variant="secondary"
              external
              icon={<Linkedin size={17} />}
              size="lg"
            >
              LinkedIn
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[stat.icon] ?? Icons.Sparkles;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="glass-card glow-ring rounded-2xl p-4"
                >
                  <Icon size={16} className="text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
                  <p className="mt-2 font-[var(--font-display)] text-2xl font-extrabold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <WorkstationVisual src={hero.workstationImage} alt={hero.workstationImageAlt} />
        </motion.div>
      </div>
    </section>
  );
}
