/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageSection } from "@/components/admin/types";
import { CARD_ICONS } from "@/components/admin/iconRegistry";
import { Highlight, plainText } from "./Highlight";

// Layout for sections added in the admin's Pages editor that the page has no
// purpose-built component for. Kept deliberately plain, in the site's style.
export default function GenericSection({ section: s }: { section: PageSection }) {
  switch (s.type) {
    case "hero":
      return (
        <section className="pt-32 pb-20 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {s.headline && (
                <h1 className="font-black mb-5 leading-tight" style={{ fontSize: "clamp(32px,5vw,56px)", color: "#111111" }}>
                  <Highlight text={s.headline} />
                </h1>
              )}
              {s.subtext && <p className="text-base leading-relaxed mb-8" style={{ color: "#555555", maxWidth: 480 }}>{s.subtext}</p>}
              {s.ctaText && <CtaLink href={s.ctaLink || "/contact"} label={s.ctaText} />}
            </div>
            {s.image && (
              <div className="hidden lg:block rounded-xl overflow-hidden shadow-lg" style={{ height: 380 }}>
                <img src={s.image} alt={plainText(s.headline ?? "")} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      );

    case "stats":
      return (
        <section className="py-16 px-6" style={{ background: "#f9f9f9" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {(s.stats ?? []).map((st, i) => (
              <div key={i} className="rounded-2xl p-6 text-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="text-3xl font-black mb-1" style={{ color: "var(--orange)" }}>{st.value}</div>
                <div className="text-xs font-semibold" style={{ color: "rgba(0,0,0,0.5)" }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case "cards":
      return (
        <section className="py-20 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(s.cards ?? []).map((c, i) => {
              const icon = c.icon ? CARD_ICONS.find(o => o.key === c.icon) : undefined;
              return (
                <div key={i} className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid #e5e5e5" }}>
                  {c.image && <img src={c.image} alt={c.title} className="w-full object-cover" style={{ height: 160 }} />}
                  <div className="p-6">
                    {icon && (
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: `${icon.color}15` }}>
                        <icon.Icon size={20} style={{ color: icon.color }} />
                      </div>
                    )}
                    <h3 className="font-bold text-sm mb-2" style={{ color: "#111111" }}>{c.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );

    case "text":
      return (
        <section className="py-20 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-3xl mx-auto">
            {s.heading && <h2 className="text-3xl font-black mb-4" style={{ color: "#111111" }}><Highlight text={s.heading} /></h2>}
            {s.body && <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#555555" }}>{s.body}</p>}
          </div>
        </section>
      );

    case "image-text":
      return (
        <section className="py-20 px-6" style={{ background: "#f9f9f9" }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {s.image && <img src={s.image} alt={plainText(s.heading ?? "")} className="w-full rounded-xl object-cover" style={{ maxHeight: 380 }} />}
            <div>
              {s.heading && <h2 className="text-3xl font-black mb-4" style={{ color: "#111111" }}><Highlight text={s.heading} /></h2>}
              {s.body && <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#555555" }}>{s.body}</p>}
            </div>
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="py-16 px-6 text-center" style={{ background: "#f9f9f9" }}>
          <div className="max-w-2xl mx-auto">
            {s.ctaHeading && <h2 className="text-2xl font-black text-gray-900 mb-3"><Highlight text={s.ctaHeading} /></h2>}
            {s.ctaBody && <p className="text-sm mb-6" style={{ color: "rgba(0,0,0,0.5)" }}>{s.ctaBody}</p>}
            {s.ctaBtn && <CtaLink href="/contact" label={s.ctaBtn} />}
          </div>
        </section>
      );

    case "gallery":
      if (!s.gallery?.length) return null;
      return (
        <section className="py-20 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
            {s.gallery.map((g, i) => (
              <figure key={i} className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
                {g.label && (
                  <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs font-bold text-white"
                              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    {g.label}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      );
  }
}

function CtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: "var(--orange)" }}>
      {label} <ArrowRight size={14} />
    </Link>
  );
}
