"use client";

import { useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type CommonProps = { label: string; error?: string };

export function FloatingInput({
  label,
  error,
  ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = Boolean(props.value ?? props.defaultValue);

  return (
    <div className="relative">
      <input
        id={id}
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
        className={`contact-field-input peer w-full rounded-xl border bg-[var(--color-bg)] px-4 pt-5 pb-2 text-sm text-[var(--color-ink)] outline-none ${
          error
            ? "border-red-500"
            : "border-[var(--color-border)] focus:border-[var(--color-accent-solid)]"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-150 ${
          focused || filled
            ? "top-1.5 text-[11px] font-semibold text-[var(--color-accent-solid)]"
            : "top-3.5 text-sm text-[var(--color-ink-muted)]"
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
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = Boolean(props.value ?? props.defaultValue);

  return (
    <div className="relative">
      <textarea
        id={id}
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
        className={`contact-field-input peer w-full resize-none rounded-xl border bg-[var(--color-bg)] px-4 pt-5 pb-2 text-sm text-[var(--color-ink)] outline-none ${
          error
            ? "border-red-500"
            : "border-[var(--color-border)] focus:border-[var(--color-accent-solid)]"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-150 ${
          focused || filled
            ? "top-1.5 text-[11px] font-semibold text-[var(--color-accent-solid)]"
            : "top-3.5 text-sm text-[var(--color-ink-muted)]"
        }`}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

