"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Code2 } from "lucide-react";
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
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: location, href: undefined },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin },
    { icon: Github, label: "GitHub", href: contact.github },
    { icon: Code2, label: "LeetCode", href: contact.leetcode },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Contact" title="Let's build something great" />

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          {links.map((link) => {
            const content = (
              <>
                <span className="gradient-button flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                  <link.icon size={15} className="text-white" />
                </span>
                <span className="text-sm font-medium">{link.label}</span>
              </>
            );
            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-card glow-ring flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-transform hover:-translate-y-0.5"
              >
                {content}
              </a>
            ) : (
              <div key={link.label} className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3.5">
                {content}
              </div>
            );
          })}
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}
