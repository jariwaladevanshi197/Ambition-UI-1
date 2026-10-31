import HeroSection        from "@/components/home/HeroSection";
import StatsSection       from "@/components/home/StatsSection";
import NetworkMap         from "@/components/home/NetworkMap";
import ServicesSection    from "@/components/home/ServicesSection";
import SustainSection     from "@/components/home/SustainSection";
import CSRPreview         from "@/components/home/CSRPreview";
import { loadSections, renderSections } from "@/components/cms/renderSections";
import { HOME_SECTIONS } from "@/content/home";

export default async function HomePage() {
  const sections = await loadSections("/", HOME_SECTIONS);
  return renderSections(sections, {
    "Hero Banner":                s => <HeroSection section={s} />,
    // The network map isn't editable content; it stays anchored below the stats.
    "Key Stats (By The Numbers)": s => <><StatsSection section={s} /><NetworkMap /></>,
    "Services Preview":           s => <ServicesSection section={s} />,
    "Sustainability Pillars":     s => <SustainSection section={s} />,
    "CSR Preview":                s => <CSRPreview section={s} />,
  });
}
