import { AdminPageHeader, EditInTinaCard } from "@/components/admin/AdminUI";
import { getSkills } from "@/lib/content";

export default function AdminSkillsPage() {
  const { categories } = getSkills();

  return (
    <div>
      <AdminPageHeader title="Skills" description="Categories and skill chips shown in your Skills section." />

      <div className="space-y-5">
        {categories.map((cat) => (
          <EditInTinaCard key={cat.id} title={cat.title} description={`${cat.skills.length} skills`}>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--color-accent-tint)] px-3 py-1 text-xs dark:bg-[var(--color-dark-accent-tint)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </EditInTinaCard>
        ))}
      </div>
    </div>
  );
}
