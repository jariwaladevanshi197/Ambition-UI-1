import { ActivitiesHero, CoreOperations, Gallery } from "@/components/activities/ActivitiesSections";
import { findSection, loadSections, renderSections } from "@/components/cms/renderSections";
import { ACTIVITIES_SECTIONS } from "@/content/activities";

export default async function ActivitiesPage() {
  const sections = await loadSections("/activities", ACTIVITIES_SECTIONS);
  const heroStats = findSection(sections, "Hero Stats")?.stats ?? [];

  return renderSections(sections, {
    "Activities Hero": s => <ActivitiesHero section={s} stats={heroStats} />,
    // Shown as the stat grid beside the hero headline.
    "Hero Stats":      () => null,
    "Core Operations": s => <CoreOperations section={s} />,
    "Photo Gallery":   s => <Gallery section={s} />,
  });
}
