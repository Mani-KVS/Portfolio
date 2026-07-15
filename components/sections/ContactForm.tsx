"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingField";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(): boolean {
    const next: Partial<FormValues> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email.";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card glow-ring rounded-3xl p-7"
    >
      <div className="space-y-5">
        <FloatingInput
          label="Your name"
          value={values.name}
          error={errors.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        <FloatingInput
          label="Your email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        <FloatingTextarea
          label="Your message"
          value={values.message}
          error={errors.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="gradient-button mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--color-glow)] transition-transform active:scale-[0.98] disabled:opacity-60 dark:shadow-[0_8px_24px_-8px_var(--color-dark-glow)]"
      >
        {status === "sent" ? <CheckCircle2 size={16} /> : <Send size={16} />}
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent" : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="mt-3 text-center text-xs text-emerald-500">Thanks for reaching out — I&apos;ll reply soon!</p>
      )}
      {status === "error" && <p className="mt-3 text-center text-xs text-red-500">{errorMsg}</p>}
    </motion.form>
  );
}
