"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const formId = useId();
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email.";
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

  const inputBaseClass =
    "contact-field-input w-full rounded-xl border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]/70 outline-none";

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.08 }}
      onSubmit={handleSubmit}
      noValidate
      className="relative w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-9"
    >
      <div className="mb-6">
        <h3 className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-ink)] sm:text-2xl">
          Contact Form
        </h3>
        <p className="mt-1.5 text-xs text-[var(--color-ink-muted)] sm:text-sm">
          Have a question, project idea, or opportunity? Send me a message directly.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-[var(--color-ink)]"
          >
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={`${inputBaseClass} ${
              errors.name ? "border-red-500" : "border-[var(--color-border)]"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-[var(--color-ink)]"
          >
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your.email@example.com"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={`${inputBaseClass} ${
              errors.email ? "border-red-500" : "border-[var(--color-border)]"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor={`${formId}-subject`}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-[var(--color-ink)]"
          >
            Subject
          </label>
          <input
            id={`${formId}-subject`}
            name="subject"
            type="text"
            placeholder="What is this regarding?"
            value={values.subject}
            onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
            className={`${inputBaseClass} ${
              errors.subject ? "border-red-500" : "border-[var(--color-border)]"
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor={`${formId}-message`}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-[var(--color-ink)]"
          >
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            placeholder="Write your message here..."
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            className={`${inputBaseClass} resize-none ${
              errors.message ? "border-red-500" : "border-[var(--color-border)]"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="gradient-button mt-6 flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_0_var(--color-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-2px_var(--color-glow)] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "sent" ? <CheckCircle2 size={17} /> : <Send size={17} />}
        <span>
          {status === "sending"
            ? "Sending..."
            : status === "sent"
              ? "Message Sent"
              : "Send Message"}
        </span>
      </button>

      {status === "sent" && (
        <p className="mt-3.5 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Thanks for reaching out — I&apos;ll reply soon!
        </p>
      )}
      {status === "error" && (
        <p className="mt-3.5 text-center text-xs text-red-500">{errorMsg}</p>
      )}
    </motion.form>
  );
}
