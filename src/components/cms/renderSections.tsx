import "server-only";
import { Fragment, type ReactNode } from "react";
import { notFound } from "next/navigation";
import type { PageSection } from "@/components/admin/types";
import { getCmsPage } from "@/lib/cms/server";
import GenericSection from "./GenericSection";

/**
 * The sections to render for a page, in the order set in the admin's Pages
 * editor. Falls back to the page's built-in content only when Supabase can't
 * be reached; an unpublished page 404s.
 *
 * Fields a CMS section has never had (null in the DB) are filled from the
 * built-in section with the same label, so older rows still render fully.
 * Fields an admin cleared are saved as "" and stay empty.
 */
export async function loadSections(slug: string, defaults: PageSection[]): Promise<PageSection[]> {
  const page = await getCmsPage(slug);
  if (!page) return defaults;
  if (page.status === "unpublished") notFound();
  return page.sections.map(s => {
    const fallback = findSection(defaults, s.label);
    if (!fallback) return s;
    const filled = { ...s } as Record<string, unknown>;
    for (const [k, v] of Object.entries(fallback)) if (filled[k] === undefined) filled[k] = v;
    return filled as unknown as PageSection;
  });
}

export function findSection(sections: PageSection[], label: string): PageSection | undefined {
  return sections.find(s => s.label === label);
}

export type Renderers = Record<string, (section: PageSection) => ReactNode>;

/**
 * Renders each section with the page's purpose-built component for its label
 * (labels are fixed once a section exists, so they're a stable key). Sections
 * added later in the admin have no custom component and get a generic layout
 * for their type.
 */
export function renderSections(sections: PageSection[], renderers: Renderers): ReactNode {
  return sections.map(s => (
    <Fragment key={s.id}>
      {renderers[s.label] ? renderers[s.label](s) : <GenericSection section={s} />}
    </Fragment>
  ));
}
