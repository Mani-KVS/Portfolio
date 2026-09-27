"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Code2 } from "lucide-react";
import { HelloCharacter } from "@/components/ui/HelloCharacter";
import { ContactForm } from "@/components/sections/ContactForm";
import type { SiteContent } from "@/lib/content";

export function Contact({
  contact,
  location,
}: {
  contact: SiteContent["contact"];
  location: string;
}) {
  const socialLinks = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      href: contact.linkedin,
    },
    {
      icon: Github,
      title: "GitHub",
      href: contact.github,
    },
    ...(contact.leetcode
      ? [
          {
            icon: Code2,
            title: "LeetCode",
            href: contact.leetcode,
          },
        ]
      : []),
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/45 px-5 py-20 sm:py-24 lg:py-28"
    >
      {/* Animated technical background matching portfolio visual language */}
      <div
        aria-hidden="true"
        className="hero-dot-grid pointer-events-none absolute inset-0 opacity-45"
      />

      {/* Soft blue & teal radial ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--hero-blue-glow) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--hero-teal-glow) 0%, transparent 70%)",
        }}
      />

      {/* Thin flowing curved wave lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full opacity-55"
      >
        <path
          d="M-80 260 C 320 180, 680 340, 1120 230 C 1300 185, 1420 210, 1520 240"
          stroke="var(--hero-wave-primary)"
          strokeWidth="1.25"
          className="animate-hero-wave"
        />
        <path
          d="M-60 320 C 360 240, 760 370, 1180 270 C 1340 235, 1440 260, 1540 290"
          stroke="var(--hero-wave-secondary)"
          strokeWidth="1.15"
          className="animate-hero-wave-reverse"
        />
      </svg>

      {/* Few subtle floating particles */}
      <span
        aria-hidden="true"
        className="animate-hero-particle pointer-events-none absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-sky-400/35"
      />
      <span
        aria-hidden="true"
        style={{ animationDelay: "-5s" }}
        className="animate-hero-particle pointer-events-none absolute left-[42%] bottom-[16%] h-1.5 w-1.5 rounded-full bg-teal-400/35"
      />
      <span
        aria-hidden="true"
        style={{ animationDelay: "-9s" }}
        className="animate-hero-particle pointer-events-none absolute right-[14%] top-[22%] h-2 w-2 rounded-full bg-blue-400/30"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT COLUMN (45-50% width on desktop): Heading + Description + Robot + Contact Details + Social Icons */}
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-[2.65rem]"
            >
              Let&apos;s <span className="text-gradient">Connect!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="mt-3.5 max-w-md text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base"
            >
              I&apos;m always excited to connect, collaborate, and explore new
              ideas or opportunities. Feel free to reach out — I&apos;d love to
              hear from you.
            </motion.p>

            {/* Animated Hello Robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="w-full"
            >
              <HelloCharacter />
            </motion.div>

            {/* Existing Contact Details (Email, Phone, Location) + Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-2 flex w-full flex-col items-center space-y-3 lg:items-start"
            >
              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-solid)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent-solid)] shadow-2xs transition-all duration-200 group-hover:border-[var(--color-accent-solid)] group-hover:scale-105">
                  <Mail size={16} />
                </span>
                <span className="break-all sm:break-normal">{contact.email}</span>
              </a>

              {/* Phone (if present in existing portfolio data) */}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-solid)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent-solid)] shadow-2xs transition-all duration-200 group-hover:border-[var(--color-accent-solid)] group-hover:scale-105">
                    <Phone size={16} />
                  </span>
                  <span>{contact.phone}</span>
                </a>
              )}

              {/* Location */}
              <div className="inline-flex items-center gap-3 px-2 py-1 text-sm font-medium text-[var(--color-ink-muted)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent-solid)] shadow-2xs">
                  <MapPin size={16} />
                </span>
                <span>{location}</span>
              </div>

              {/* Social Icon Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    title={social.title}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)] hover:shadow-[0_4px_14px_0_var(--color-glow)]"
                  >
                    <social.icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (50-55% width on desktop): Contact Form */}
          <div className="w-full lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
