import type { ReactNode } from "react";
import Link from "next/link";
import { FileEdit } from "lucide-react";

export function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-[var(--font-display)] text-2xl font-bold">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  loading,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
  loading?: boolean;
}) {
  return (
    <div className="glass-card glow-ring rounded-2xl p-5">
      <div className="gradient-button flex h-10 w-10 items-center justify-center rounded-xl text-white">
        {icon}
      </div>
      <p className="mt-3 font-[var(--font-display)] text-2xl font-extrabold">
        {loading ? "—" : value}
      </p>
      <p className="mt-0.5 text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
        {label}
      </p>
    </div>
  );
}

/** Every content type (About/Skills/Projects/Certificates/Resume) is
 * authored through TinaCMS so there's one source of truth. This card
 * previews the current content and deep-links into the Tina editor
 * instead of duplicating a second content-editing UI. */
export function EditInTinaCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-display)] font-bold">{title}</h2>
          <p className="mt-1 max-w-md text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {description}
          </p>
        </div>
        <Link
          href="/admin"
          className="gradient-button flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
        >
          <FileEdit size={14} />
          Edit in TinaCMS
        </Link>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
