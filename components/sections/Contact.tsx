"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Code2, ArrowUpRight } from "lucide-react";
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
  const directContactItems = [
    {
      icon: Mail,
      title: "Email",
      label: contact.email,
      href: `mailto:${contact.email}`,
    },
    ...(contact.phone
      ? [
          {
            icon: Phone,
            title: "Phone",
            label: contact.phone,
            href: `tel:${contact.phone}`,
          },
        ]
      : []),
    {
      icon: MapPin,
      title: "Location",
      label: location,
      href: undefined,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      label: "LinkedIn",
      href: contact.linkedin,
    },
    {
      icon: Github,
      title: "GitHub",
      label: "GitHub",
      href: contact.github,
    },
    ...(contact.leetcode
      ? [
          {
            icon: Code2,
            title: "LeetCode",
            label: "LeetCode",
            href: contact.leetcode,
          },
        ]
      : []),
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/55 px-5 py-20 sm:py-24"
    >
      {/* Extremely faint technical dot pattern & subtle blue/teal ambient glow */}
      <div
        aria-hidden="true"
        className="hero-dot-grid pointer-events-none absolute inset-0 opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--hero-blue-glow) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--hero-teal-glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT SIDE: Let's Connect + Animated Hello Character + Contact Info + Socials */}
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-solid)] shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-solid)]" />
                Contact
              </span>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                Let&apos;s Connect!
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base"
            >
              I&apos;m always open to discussing new opportunities, projects,
              collaborations, and ideas. Feel free to reach out — I&apos;d love
              to hear from you.
            </motion.p>

            {/* Animated Hello Character */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="w-full"
            >
              <HelloCharacter />
            </motion.div>

            {/* Existing Contact Information (Email, Phone, Location) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-2 w-full space-y-2.5 text-left"
            >
              {directContactItems.map((item) => {
                const inner = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)] transition-transform duration-200 group-hover:scale-105">
                      <item.icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                        {item.title}
                      </p>
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                        {item.label}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-[var(--color-ink-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-solid)]"
                      />
                    )}
                  </>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    className="glass-card glow-ring group flex items-center gap-3.5 rounded-xl px-4 py-2.5 transition-all duration-200 hover:border-[var(--color-accent-solid)]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="glass-card flex items-center gap-3.5 rounded-xl px-4 py-2.5"
                  >
                    {inner}
                  </div>
                );
              })}

              {/* Social Links Row (LinkedIn, GitHub, LeetCode) */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 lg:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    className="glass-card glow-ring group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)]"
                  >
                    <social.icon
                      size={15}
                      className="text-[var(--color-accent-solid)] transition-transform duration-200 group-hover:scale-110"
                    />
                    <span>{social.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-[var(--color-ink-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-solid)]"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Clean Professional Contact Form */}
          <div className="w-full lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
