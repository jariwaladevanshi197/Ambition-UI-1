"use client";
import { useEffect, useRef, useState } from "react";

const ASSOCIATES = [
  { name:"TATA Group",              abbr:"TATA", domain:"tata.com"                  },
  { name:"Aditya Birla / Grasim",  abbr:"AB",   domain:"adityabirla.com"           },
  { name:"JSW Steel",               abbr:"JSW",  domain:"jsw.in"                    },
  { name:"Heidelberg Materials",    abbr:"HM",   domain:"heidelbergmaterials.com"   },
  { name:"Donear Group",            abbr:"DNR",  domain:"donear.com"                },
  { name:"Keshav Cement",           abbr:"KC",   domain:"keshavcement.com"          },
  { name:"Surana Group",            abbr:"SG",   domain:"suranagroup.com"           },
  { name:"Swastik Group",           abbr:"SWK",  domain:"swastikgroup.in"           },
  { name:"Bindal Silk Mills",       abbr:"BSM",  domain:"bindaltex.com"             },
  { name:"Farlin Group",            abbr:"FRL",  domain:"farlin.in"                 },
  { name:"Mohit Minerals",          abbr:"MM",   domain:"mohitminerals.com"         },
  { name:"Jay Bharat",              abbr:"JB",   domain:"jaybharat.com"             },
  { name:"ILC Iron & Steel",        abbr:"ILC",  domain:"ilciron.com"               },
  { name:"Kanoria / Bagalkot",      abbr:"KBC",  domain:"kanorias.com"              },
  { name:"Ramanuj Fashion",         abbr:"RF",   domain:"ramanujfashion.com"        },
  { name:"Basai Steels",            abbr:"BS",   domain:"basaisteels.com"           },
];

const ITEMS = [...ASSOCIATES, ...ASSOCIATES];

function AssociateBadge({
  name, abbr, domain,
}: {
  name: string; abbr: string; domain: string;
}) {
  const [imgOk, setImgOk] = useState(true);
  const url = `https://logo.clearbit.com/${domain}`;

  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
      style={{
        background: imgOk ? "#ffffff" : "rgba(249,115,22,0.12)",
        border: imgOk ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(249,115,22,0.2)",
      }}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={name}
          width={30}
          height={30}
          style={{ objectFit:"contain", display:"block" }}
          onError={() => setImgOk(false)}
        />
      ) : (
        <span
          style={{
            color: "var(--orange)",
            fontWeight: 900,
            lineHeight: 1,
            textAlign: "center",
            padding: "0 2px",
            fontSize: abbr.length > 3 ? "7px" : abbr.length === 3 ? "9px" : "11px",
          }}
        >
          {abbr}
        </span>
      )}
    </div>
  );
}

export default function AssociatesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const xRef     = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    let speed = 0.6;

    const step = () => {
      xRef.current -= speed;
      if (Math.abs(xRef.current) >= half) xRef.current = 0;
      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const pause  = () => { speed = 0; };
    const resume = () => { speed = 0.6; };
    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(rafRef.current);
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-16 overflow-hidden" style={{ background:"#f5f5f5", borderTop:"1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-5xl mx-auto px-6 mb-10 text-center">
        <div className="section-tag">OUR ASSOCIATES</div>
        <h2 className="text-2xl font-black text-gray-900">
          Trusted by <span style={{ color:"var(--orange)" }}>Industry Leaders</span>
        </h2>
        <p className="text-xs mt-2" style={{ color:"rgba(0,0,0,0.45)" }}>
          Long-term supply relationships with India's biggest power, steel, cement & textile companies
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ maskImage:"linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div ref={trackRef} className="flex gap-4 w-max">
          {ITEMS.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl shrink-0 transition-all duration-200"
              style={{
                background: "rgba(0,0,0,0.03)",
                border:     "1px solid rgba(0,0,0,0.08)",
                minWidth:   200,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(249,115,22,0.4)";
                el.style.background  = "rgba(249,115,22,0.06)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,0,0,0.08)";
                el.style.background  = "rgba(0,0,0,0.03)";
              }}
            >
              <AssociateBadge name={a.name} abbr={a.abbr} domain={a.domain} />
              <span className="text-xs font-semibold text-gray-900 leading-tight">{a.name}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] mt-6" style={{ color:"rgba(0,0,0,0.35)" }}>
        + Cement makers · Power utilities · Steel plants · Textile & paper industries
      </p>
    </section>
  );
}
