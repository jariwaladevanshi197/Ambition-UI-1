import ImageCarousel from "@/components/about/ImageCarousel";
import { Timeline, MissionVision, Leadership, WhyChooseUs } from "@/components/about/AboutSections";
import { findSection, loadSections, renderSections } from "@/components/cms/renderSections";
import { ABOUT_SECTIONS } from "@/content/about";

export default async function AboutPage() {
  const sections = await loadSections("/about", ABOUT_SECTIONS);
  const trust = findSection(sections, "Trust Stats")?.stats;

  return renderSections(sections, {
    // The carousel's slides are designed artwork, not editable content; the
    // section only controls whether (and where) the carousel shows.
    "Hero Carousel (5 rotating slides)": () => <ImageCarousel />,
    "Our Journey — Milestones":          s => <Timeline section={s} />,
    "Mission & Vision":                  s => <MissionVision section={s} />,
    "Leadership Team":                   s => <Leadership section={s} />,
    "Why Choose Us":                     s => <WhyChooseUs section={s} trust={trust} />,
    // Shown as the strip at the bottom of Why Choose Us.
    "Trust Stats":                       () => null,
  });
}
