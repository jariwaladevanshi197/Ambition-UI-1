import type { CompanySettings } from "@/components/admin/types";

// Used whenever the settings row can't be loaded. Matches the contact details
// the site showed before Settings was wired up.
export const DEFAULT_SETTINGS: CompanySettings = {
  name: "Ambition Coal Pvt. Ltd.",
  tagline: "Providing a One Stop Coal Solution.",
  email: "info@ambitioncoal.co.in",
  phone: "+91 22 XXXX XXXX",
  address: "Ambition House, BKC, Mumbai 400051",
  linkedin: "",
  twitter: "",
  youtube: "",
  estYear: "2003",
};
