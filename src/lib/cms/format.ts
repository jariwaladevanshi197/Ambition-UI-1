// Small parsers that turn CMS free-text fields into the structured bits the
// page designs need. Each degrades gracefully when the text doesn't match.

/** "5,000+" -> { num: 5000, suffix: "+" }; non-numeric values ("ISO") -> null. */
export function parseStat(value: string): { num: number; suffix: string } | null {
  const m = value.trim().match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { num: Number(m[1].replace(/,/g, "")), suffix: m[2] };
}

/** "2003 — Foundation" -> ["2003", "Foundation"]; no separator -> ["", text]. */
export function splitPair(text: string): [string, string] {
  const i = text.indexOf(" — ");
  return i < 0 ? ["", text] : [text.slice(0, i).trim(), text.slice(i + 3).trim()];
}

/** "GCV: 5500–6500 kcal/kg" -> ["GCV", "5500–6500 kcal/kg"]; no colon -> null. */
export function splitSpec(spec: string): [string, string] | null {
  const i = spec.indexOf(":");
  return i < 0 ? null : [spec.slice(0, i).trim(), spec.slice(i + 1).trim()];
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** "2024-06-15" -> "Jun 2024"; anything else is shown as typed. */
export function formatMonth(date: string): string {
  const m = date.match(/^(\d{4})-(\d{2})/);
  if (!m) return date;
  return `${MONTHS[Number(m[2]) - 1] ?? ""} ${m[1]}`.trim();
}

/** Initials for an avatar: "Mr. Jayesh Agrawal" -> "JA", "Mrs. Yashika Agrawal" -> "YA". */
export function initials(name: string): string {
  const clean = name.replace(/^(mr|mrs|ms|dr|shri|smt)\.?\s+/i, "").trim();
  const parts = clean.split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
