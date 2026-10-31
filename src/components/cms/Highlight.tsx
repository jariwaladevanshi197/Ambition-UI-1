import { Fragment } from "react";

// Renders a CMS headline with the site's orange accent:
//   "What We *Do*"                     -> "Do" in orange
//   "Quality Trade.\nReliable Supply." -> line break, last line in orange
// Plain single-line text renders as-is.
export function Highlight({ text, color = "var(--orange)" }: { text: string; color?: string }) {
  const lines = text.split("\n");
  const hasMarkers = /\*[^*]+\*/.test(text);

  return (
    <>
      {lines.map((line, li) => {
        const accentWholeLine = !hasMarkers && lines.length > 1 && li === lines.length - 1;
        const parts = hasMarkers ? line.split(/(\*[^*]+\*)/) : [line];
        return (
          <Fragment key={li}>
            {li > 0 && <br />}
            {accentWholeLine
              ? <span style={{ color }}>{line}</span>
              : parts.map((p, pi) =>
                  p.startsWith("*") && p.endsWith("*") && p.length > 2
                    ? <span key={pi} style={{ color }}>{p.slice(1, -1)}</span>
                    : <Fragment key={pi}>{p}</Fragment>
                )}
          </Fragment>
        );
      })}
    </>
  );
}

/** The headline text without highlight markers, for alt text and titles. */
export function plainText(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1").replace(/\n/g, " ");
}
