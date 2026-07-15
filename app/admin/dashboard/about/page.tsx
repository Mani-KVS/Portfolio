import { AdminPageHeader, EditInTinaCard } from "@/components/admin/AdminUI";
import { getSiteContent } from "@/lib/content";

export default function AdminAboutPage() {
  const { about, hero } = getSiteContent();

  return (
    <div>
      <AdminPageHeader title="About" description="Your hero intro, bio, interests, and strengths." />

      <div className="space-y-5">
        <EditInTinaCard title="Hero" description="Name, role, tagline shown at the top of your site.">
          <p className="text-sm">
            <strong>{hero.name}</strong> — {hero.role}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {hero.tagline}
          </p>
        </EditInTinaCard>

        <EditInTinaCard title="About text" description="Introduction and career objective.">
          <p className="text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
            {about.intro}
          </p>
        </EditInTinaCard>

        <EditInTinaCard title="Interests & Strengths" description="Chips and bullet list shown in the About section.">
          <div className="flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <span key={i} className="rounded-full bg-[var(--color-accent-tint)] px-3 py-1 text-xs dark:bg-[var(--color-dark-accent-tint)]">
                {i}
              </span>
            ))}
          </div>
        </EditInTinaCard>
      </div>
    </div>
  );
}
