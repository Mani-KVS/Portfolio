"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingField";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(): boolean {
    const next: Partial<FormValues> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email.";
    if (!values.subject.trim()) next.subject = "Please enter a subject.";
    if (!values.message.trim() || values.message.trim().length < 5)
      next.message = "Message should be at least 5 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const formattedMessage = values.subject.trim()
        ? `[Subject: ${values.subject.trim()}]\n\n${values.message.trim()}`
        : values.message.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: formattedMessage,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="glass-card relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6">
        <h3 className="font-[var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-ink)] sm:text-xl">
          Send a Direct Message
        </h3>
        <p className="mt-1 text-xs text-[var(--color-ink-muted)] sm:text-sm">
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FloatingInput
            label="Name"
            name="name"
            autoComplete="name"
            value={values.name}
            error={errors.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </div>

        <FloatingInput
          label="Subject"
          name="subject"
          value={values.subject}
          error={errors.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
        />

        <FloatingTextarea
          label="Message"
          name="message"
          rows={5}
          value={values.message}
          error={errors.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-solid)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_var(--color-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-2px_var(--color-glow)] active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "sent" ? <CheckCircle2 size={16} /> : <Send size={16} />}
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent" : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Thanks for reaching out — I&apos;ll reply soon!
        </p>
      )}
      {status === "error" && <p className="mt-3 text-center text-xs text-red-500">{errorMsg}</p>}
    </motion.form>
  );
}

