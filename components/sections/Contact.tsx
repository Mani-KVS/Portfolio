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
      className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/35 px-5 py-20 sm:py-24 lg:py-28"
    >

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
