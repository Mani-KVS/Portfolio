"use client";

import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type CommonProps = { label: string; error?: string };

export function FloatingInput({
  label,
  error,
  ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const filled = Boolean(props.value ?? props.defaultValue);

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholder=" "
        className={`peer w-full rounded-xl border bg-transparent px-4 pt-5 pb-2 text-sm outline-none transition-colors ${
          error
            ? "border-red-400"
            : "border-[var(--color-border)] focus:border-[var(--color-accent-solid)] dark:border-[var(--color-dark-border)] dark:focus:border-[var(--color-dark-accent-solid)]"
        }`}
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          focused || filled
            ? "top-1.5 text-[10px] font-semibold text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]"
            : "top-3.5 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]"
        }`}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function FloatingTextarea({
  label,
  error,
  ...props
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const filled = Boolean(props.value ?? props.defaultValue);

  return (
    <div className="relative">
      <textarea
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholder=" "
        rows={props.rows ?? 4}
        className={`peer w-full resize-none rounded-xl border bg-transparent px-4 pt-5 pb-2 text-sm outline-none transition-colors ${
          error
            ? "border-red-400"
            : "border-[var(--color-border)] focus:border-[var(--color-accent-solid)] dark:border-[var(--color-dark-border)] dark:focus:border-[var(--color-dark-accent-solid)]"
        }`}
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          focused || filled
            ? "top-1.5 text-[10px] font-semibold text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]"
            : "top-3.5 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]"
        }`}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
