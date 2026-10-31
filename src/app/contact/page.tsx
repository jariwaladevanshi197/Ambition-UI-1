import ContactView from "@/components/contact/ContactView";
import { findSection, loadSections, renderSections } from "@/components/cms/renderSections";
import { getSettings } from "@/lib/cms/server";
import { CONTACT_SECTIONS } from "@/content/contact";
import { DEFAULT_SETTINGS } from "@/content/settings";

export default async function ContactPage() {
  const [sections, settings] = await Promise.all([loadSections("/contact", CONTACT_SECTIONS), getSettings()]);
  const hero = findSection(sections, "Contact Hero");

  // The map + form layout always leads the page (its heading is the
  // "Contact Hero" section); any other sections render below it.
  return (
    <>
      <ContactView section={hero} settings={{
        // Blank fields fall back the same way the footer's do.
        address: settings?.address || DEFAULT_SETTINGS.address,
        phone:   settings?.phone   || DEFAULT_SETTINGS.phone,
        email:   settings?.email   || DEFAULT_SETTINGS.email,
      }} />
      {renderSections(sections, { "Contact Hero": () => null })}
    </>
  );
}
