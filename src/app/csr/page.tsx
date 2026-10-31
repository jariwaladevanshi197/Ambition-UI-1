import { CsrHero, ImpactCounters, CsrProjects, RecentInitiatives, PartnerCta } from "@/components/csr/CsrSections";
import { findSection, loadSections, renderSections } from "@/components/cms/renderSections";
import { getActivities } from "@/lib/cms/server";
import { CSR_SECTIONS, DEFAULT_INITIATIVES } from "@/content/csr";

export default async function CSRPage() {
  const [sections, loaded] = await Promise.all([loadSections("/csr", CSR_SECTIONS), getActivities()]);
  const initiatives = loaded ?? DEFAULT_INITIATIVES.map((a, i) => ({ ...a, id: `default-initiative-${i}` }));
  const impact = findSection(sections, "Impact at a Glance")?.stats ?? [];

  return renderSections(sections, {
    "CSR Hero":           s => <CsrHero section={s} stats={impact} />,
    "Impact at a Glance": s => <ImpactCounters section={s} />,
    "CSR Projects":       s => <CsrProjects section={s} />,
    "Recent Initiatives": s => <RecentInitiatives section={s} initiatives={initiatives} />,
    "Partner CTA":        s => <PartnerCta section={s} />,
  });
}
