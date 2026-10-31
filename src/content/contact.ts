import type { PageSection } from "@/components/admin/types";

// Built-in content for "/contact" (see content/home.ts for how it's used).
// Address, phone and email come from the Settings screen, not from here.
export const CONTACT_SECTIONS: PageSection[] = [
  { id:"default-contact-0", type:"hero", label:"Contact Hero", visible:true,
    headline:"Get In Touch",
    subtext:"Tell us about your requirements and we'll connect you with the right team." },
];
