import Image from "next/image";
import Link from "next/link";
import { FileEdit } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { getCertifications } from "@/lib/content";

export default function AdminCertificatesPage() {
  const certifications = getCertifications();

  return (
    <div>
      <AdminPageHeader
        title="Certificates"
        description="Upload certificate images and details — managed through TinaCMS."
      />

      <div className="mb-5 flex justify-end">
        <Link
          href="/admin"
          className="gradient-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
        >
          <FileEdit size={14} />
          Add / Edit in TinaCMS
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <div key={c.slug} className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-28 w-full bg-[var(--color-bg-soft)] dark:bg-[var(--color-dark-bg-soft)]">
              <Image src={c.image} alt={c.name} fill sizes="300px" className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold leading-snug">{c.name}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                {c.organization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
