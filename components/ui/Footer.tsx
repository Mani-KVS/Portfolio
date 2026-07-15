"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Footer({ contact, name }: { contact: SiteContent["contact"]; name: string }) {
  return (
    <footer className="relative border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
          © {new Date().getFullYear()} {name}. Crafted with Next.js, Tailwind CSS &amp; Framer Motion.
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
            { icon: Github, href: contact.github, label: "GitHub" },
            { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={item.label}
              className="glass-card flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-[var(--color-accent-solid)] dark:hover:text-[var(--color-dark-accent-solid)]"
            >
              <item.icon size={15} />
            </a>
          ))}

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="gradient-button flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_4px_16px_-4px_var(--color-glow)] dark:shadow-[0_4px_16px_-4px_var(--color-dark-glow)]"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
