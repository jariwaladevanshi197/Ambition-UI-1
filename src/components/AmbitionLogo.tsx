"use client";

interface Props {
  size?: number;
}

// The logo PNG (263×235) has the orange-A icon in the top ~75% and
// "AMBITION®" dark text in the bottom ~25%. We clip to the icon only
// so the text is not visible on dark backgrounds; callers add their own
// styled "AMBITION COAL" text beside it.
export default function AmbitionLogo({ size = 42 }: Props) {
  // Scale the image so the icon portion fills `size` px, then overflow-hidden clips the text.
  const ratio   = 263 / 235;           // original aspect ratio
  const imgH    = Math.round(size / 0.74); // show icon = top 74% of image
  const imgW    = Math.round(imgH * ratio);
  const divW    = Math.round(size * ratio);

  return (
    <div style={{ width: divW, height: size, overflow: "hidden", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ambition-logo.png"
        alt="Ambition Coal logo"
        width={imgW}
        height={imgH}
        style={{ display: "block", objectFit: "contain" }}
      />
    </div>
  );
}
