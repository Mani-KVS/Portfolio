"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Code2, MapPin, FolderGit2 } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { WorkstationVisual } from "@/components/ui/WorkstationVisual";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import * as Icons from "lucide-react";
import type { SiteContent } from "@/lib/content";

const HERO_ROLES = [
  "Software Engineer",
  "Software Developer",
  "Full-Stack Developer",
  "Backend Developer",
  "AI/ML Engineer",
] as const;

function HeroRoleTypewriter() {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState<string>(HERO_ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const currentFullRole = HERO_ROLES[roleIndex];

    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentFullRole) {
      // Pause ~2 seconds after the complete role is displayed
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText === "") {
      // Move to the next role and begin typing
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }, 260);
    } else {
      const nextText = isDeleting
        ? currentFullRole.slice(0, displayText.length - 1)
        : currentFullRole.slice(0, displayText.length + 1);

      const speed = isDeleting ? 38 : 72;
      timeoutId = setTimeout(() => {
        setDisplayText(nextText);
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, roleIndex, prefersReducedMotion]);

  const shownRole = prefersReducedMotion ? HERO_ROLES[0] : displayText;

  return (
    <div className="mt-2.5 flex min-h-[2rem] items-center sm:min-h-[2.25rem]">
      <span className="sr-only">{HERO_ROLES.join(", ")}</span>
      <p
        aria-hidden="true"
        className=" inline-flex items-center font-[var(--font-display)] text-lg font-semibold text-[var(--color-accent-solid)] sm:text-xl"
      >
        <span>{shownRole}</span>
        {!prefersReducedMotion && (
          <span className="animate-cursor-blink ml-0.5 inline-block h-[1.15em] w-[2px] rounded-full bg-[var(--color-accent-solid)] align-middle" />
        )}
      </p>
    </div>
  );
}

export function Hero({
  hero,
  contact,
  stats,
}: {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
  stats: SiteContent["stats"];
}) {
  return (
    <section
      id="home"
      className="relative border-b border-[var(--color-border)] bg-transparent px-5 pt-14 pb-20 sm:pt-20 sm:pb-24"
    >
      <AuroraBackground variant="full" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1 text-xs font-medium text-[var(--color-ink)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for SDE &amp; Internship Roles
            </span>
            {hero.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
                <MapPin size={12} className="text-[var(--color-accent-solid)]" />
                {hero.location}
              </span>
            )}
          </div>

          <h1 className="mt-6 font-[var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            {hero.name}
          </h1>

          <HeroRoleTypewriter />

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
            {hero.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={<FolderGit2 size={16} />} size="lg">
              View Projects
            </Button>
            <Button href="#contact" variant="secondary" icon={<Mail size={16} />} size="lg">
              Contact Me
            </Button>
            <Button
              href={hero.resumeUrl}
              variant="secondary"
              download
              icon={<Download size={16} />}
              size="lg"
            >
              Download Resume
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent-solid)] hover:text-[var(--color-ink)]"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent-solid)] hover:text-[var(--color-ink)]"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            )}
            {contact.leetcode && (
              <a
                href={contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent-solid)] hover:text-[var(--color-ink)]"
              >
                <Code2 size={14} />
                LeetCode
              </a>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon =
                (Icons as unknown as Record<string, Icons.LucideIcon>)[stat.icon] ?? Icons.Sparkles;
              return (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <Icon size={16} className="text-[var(--color-accent-solid)]" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <WorkstationVisual src={hero.workstationImage} alt={hero.workstationImageAlt} />
        </motion.div>
      </div>
    </section>
  );
}


