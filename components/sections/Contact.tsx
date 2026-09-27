"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Code2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import type { SiteContent } from "@/lib/content";

export function Contact({
  contact,
  location,
}: {
  contact: SiteContent["contact"];
  location: string;
}) {
  const links = [
    { icon: Mail, title: "Email", label: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, title: "Phone", label: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, title: "Location", label: location, href: undefined },
    { icon: Linkedin, title: "LinkedIn", label: "linkedin.com/in/venkata-sai-manikanta-konjeti", href: contact.linkedin },
    { icon: Github, title: "GitHub", label: "github.com/Mani-KVS", href: contact.github },
    { icon: Code2, title: "LeetCode", label: "leetcode.com/u/manikanta_8999", href: contact.leetcode },
  ];

  return (
    <section
      id="contact"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/50 px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Contact" title="Get in Touch" />

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="space-y-3 lg:col-span-5"
          >
            {links.map((link) => {
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-accent-solid)]">
                    <link.icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                      {link.title}
                    </p>
                    <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                      {link.label}
                    </p>
                  </div>
                  {link.href && (
                    <ArrowUpRight size={15} className="shrink-0 text-[var(--color-ink-muted)]" />
                  )}
                </>
              );
              return link.href ? (
                <a
                  key={link.title}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass-card glow-ring flex items-center gap-3.5 rounded-xl px-4 py-3 transition-colors hover:border-[var(--color-accent-solid)]"
                >
                  {content}
                </a>
              ) : (
                <div key={link.title} className="glass-card flex items-center gap-3.5 rounded-xl px-4 py-3">
                  {content}
                </div>
              );
            })}
          </motion.div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

