import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import AmbitionLogo from "./AmbitionLogo";

const cols = [
  {
    title: "COMPANY",
    links: [
      { label: "About Us",   href: "/about"    },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Milestones", href: "/about#timeline"   },
      { label: "Careers",    href: "/contact"  },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "Coal Trading",        href: "/services" },
      { label: "Port Operations",     href: "/services" },
      { label: "Logistics",           href: "/services" },
      { label: "International Trade", href: "/services" },
    ],
  },
  {
    title: "ACTIVITIES",
    links: [
      { label: "Our Activities", href: "/activities" },
      { label: "Gallery",        href: "/activities#gallery" },
      { label: "CSR Projects",   href: "/csr"        },
      { label: "Partner with Us",href: "/contact"    },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(249,115,22,0.12)" }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AmbitionLogo size={48} />
              <div className="leading-none ml-1">
                <div className="font-black text-sm tracking-tight">
                  <span className="text-white">AMBITION </span>
                  <span style={{ color:"var(--orange)" }}>COAL</span>
                </div>
                <div className="text-[8px] tracking-widest font-semibold mt-0.5" style={{ color:"rgba(255,255,255,0.35)", letterSpacing:"0.15em" }}>
                  PVT. LTD.
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.38)" }}>
              Pioneers in supplying Imported Coal across Gujarat, Karnataka, Andhra Pradesh &
              Chhattisgarh. Promoted by Mr. Jayesh Mahesh Agrawal & Yashika Jayesh Agrawal.
            </p>
            {/* Contact snippets */}
            <div className="flex flex-col gap-3">
              {[
                { Icon: MapPin,  text: "Ambition House, BKC, Mumbai 400051" },
                { Icon: Phone,   text: "+91 22 XXXX XXXX"                    },
                { Icon: Mail,    text: "info@ambitioncoal.co.in"             },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <Icon size={13} className="mt-0.5 shrink-0" style={{ color: "var(--orange)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-widest mb-4" style={{ color: "var(--orange)" }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Ambition Coal Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {["in", "𝕏", "▶"].map((icon, i) => (
              <button
                key={i}
                aria-label={["LinkedIn","Twitter","YouTube"][i]}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--orange)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--orange)";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
