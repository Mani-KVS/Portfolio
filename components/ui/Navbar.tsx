"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certificates" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
  { href: "#guestbook", label: "Guestbook" },
];

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md"
          : "border-transparent bg-[var(--color-bg)]/80 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <a href="#home" className="flex items-center gap-2.5 rounded-lg py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-solid)] text-xs font-bold text-white">
            {initials}
          </span>
          <span className="font-[var(--font-display)] text-sm font-bold tracking-tight text-[var(--color-ink)] sm:text-base">
            {name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]"
                      : "text-[var(--color-ink-muted)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-soft)] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 shadow-lg lg:hidden">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]"
                        : "text-[var(--color-ink-muted)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

