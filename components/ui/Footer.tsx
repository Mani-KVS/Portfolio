"use client";

import { Github, Linkedin, Mail, Code2, ArrowUp } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Footer({ contact, name }: { contact: SiteContent["contact"]; name: string }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-ink)]">
            {name}
          </p>
          <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} {name}. Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
            { icon: Github, href: contact.github, label: "GitHub" },
            { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
            { icon: Code2, href: contact.leetcode, label: "LeetCode" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)]"
            >
              <item.icon size={15} />
            </a>
          ))}

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            title="Back to top"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-solid)] text-white transition-opacity hover:opacity-90"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

