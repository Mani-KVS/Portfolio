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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]";

  const sizing = size === "lg" ? "px-5 py-2.5 text-sm sm:text-base" : "px-4 py-2 text-sm";

  const styles =
    variant === "primary"
      ? "bg-[var(--color-accent-solid)] text-white shadow-sm hover:opacity-95"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs hover:border-[var(--color-accent-solid)] hover:bg-[var(--color-bg-soft)]";

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

