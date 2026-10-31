import { CARD_ICONS, type IconOption } from "@/components/admin/iconRegistry";

/** A page's own icon + accent colour for a card, matched by the card's title. */
export interface CardDesign { icon: string; color: string; }

/**
 * The icon to show for a CMS card. The card's own icon (picked in the Pages
 * editor) wins; the page's design only supplies an icon when the card has
 * none, and its accent colour while the card still uses the designed icon.
 */
export function cardIcon(key: string | undefined, design?: CardDesign): IconOption | undefined {
  const k = key || design?.icon;
  const opt = k ? CARD_ICONS.find(o => o.key === k) : undefined;
  if (!opt) return undefined;
  return design && design.icon === k ? { ...opt, color: design.color } : opt;
}
