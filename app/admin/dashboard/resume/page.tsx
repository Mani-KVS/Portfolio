import { FileText } from "lucide-react";
import { AdminPageHeader, EditInTinaCard } from "@/components/admin/AdminUI";
import { getSiteContent } from "@/lib/content";

export default function AdminResumePage() {
  const { hero } = getSiteContent();

  return (
    <div>
      <AdminPageHeader title="Resume" description="The PDF linked to your Download Resume buttons." />

      <EditInTinaCard
        title="Current resume file"
        description="Upload a new PDF from TinaCMS to replace it — every download button updates instantly."
      >
        <a
          href={hero.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card flex w-fit items-center gap-3 rounded-2xl px-4 py-3"
        >
          <FileText size={18} className="text-[var(--color-accent-solid)] dark:text-[var(--color-dark-accent-solid)]" />
          <span className="text-sm font-medium">{hero.resumeUrl}</span>
        </a>
      </EditInTinaCard>
    </div>
  );
}
