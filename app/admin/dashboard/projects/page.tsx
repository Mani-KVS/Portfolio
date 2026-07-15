import Image from "next/image";
import Link from "next/link";
import { FileEdit } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { getProjects } from "@/lib/content";

export default function AdminProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Add, edit, or remove projects — unlimited, all managed through TinaCMS."
      />

      <div className="glass-card overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5 dark:border-[var(--color-dark-border)]">
          <p className="text-sm font-semibold">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
          <Link
            href="/admin"
            className="gradient-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
          >
            <FileEdit size={14} />
            Add / Edit in TinaCMS
          </Link>
        </div>
        <div className="divide-y divide-[var(--color-border)] dark:divide-[var(--color-dark-border)]">
          {projects.map((p) => (
            <div key={p.slug} className="flex items-center gap-4 p-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-soft)] dark:bg-[var(--color-dark-bg-soft)]">
                <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="truncate text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                  {p.technologies.join(", ")}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--color-accent-tint)] px-2.5 py-1 text-[10px] font-semibold dark:bg-[var(--color-dark-accent-tint)]">
                {p.featured ? "Featured" : "Standard"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
