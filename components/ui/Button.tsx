import type { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  icon?: ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  external,
  download,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97]";

  const sizing = size === "lg" ? "px-6 py-3 text-base" : "px-5 py-2.5 text-sm";

  const styles =
    variant === "primary"
      ? "gradient-button text-white shadow-[0_8px_24px_-8px_var(--color-glow)] hover:shadow-[0_12px_32px_-8px_var(--color-glow)] hover:-translate-y-0.5 dark:shadow-[0_8px_24px_-8px_var(--color-dark-glow)] dark:hover:shadow-[0_12px_32px_-8px_var(--color-dark-glow)]"
      : "glass-card hover:-translate-y-0.5 hover:border-[var(--color-accent-solid)]/40 dark:hover:border-[var(--color-dark-accent-solid)]/40";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizing} ${styles} ${className}`}
      >
        {icon}
        {children}
      </a>
    );
  }

  if (download) {
    return (
      <a href={href} download className={`${base} ${sizing} ${styles} ${className}`}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${sizing} ${styles} ${className}`}>
      {icon}
      {children}
    </Link>
  );
}
