import Link from "next/link";
import { Mail, Phone, MapPin, Settings } from "lucide-react";
import AmbitionLogo from "./AmbitionLogo";
import { createClient } from "@/lib/supabase/server";

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

// Fallbacks match today's hardcoded copy exactly, so nothing changes
// visually until these are edited in the admin panel's Settings section.
const FALLBACK = {
  address: "Ambition House, BKC, Mumbai 400051",
  phone: "+91 22 XXXX XXXX",
  email: "info@ambitioncoal.co.in",
  linkedin: "", twitter: "", youtube: "",
};

export default async function Footer() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("settings").select("*").limit(1).maybeSingle();

  const address  = settings?.address  || FALLBACK.address;
  const phone    = settings?.phone    || FALLBACK.phone;
  const email    = settings?.email    || FALLBACK.email;
  const socials = [
    { icon: "in", label: "LinkedIn", href: settings?.linkedin || FALLBACK.linkedin },
    { icon: "𝕏",  label: "Twitter",  href: settings?.twitter  || FALLBACK.twitter  },
    { icon: "▶",  label: "YouTube",  href: settings?.youtube  || FALLBACK.youtube  },
  ];

  return (
    <footer style={{ background: "#f5f5f5", borderTop: "1px solid rgba(249,115,22,0.3)" }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AmbitionLogo size={48} />
              <div className="leading-none ml-1">
                <div className="font-black text-sm tracking-tight">
                  <span className="text-gray-900">AMBITION </span>
                  <span style={{ color:"var(--orange)" }}>COAL</span>
                </div>
                <div className="text-[8px] tracking-widest font-semibold mt-0.5" style={{ color:"rgba(0,0,0,0.4)", letterSpacing:"0.15em" }}>
                  PVT. LTD.
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(0,0,0,0.55)" }}>
              Pioneers in supplying Imported Coal across Gujarat, Karnataka, Andhra Pradesh &
              Chhattisgarh. Promoted by Mr. Jayesh Mahesh Agrawal & Yashika Jayesh Agrawal.
            </p>
            {/* Contact snippets */}
            <div className="flex flex-col gap-3">
              {[
                { Icon: MapPin, text: address },
                { Icon: Phone,  text: phone   },
                { Icon: Mail,   text: email   },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>
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
                      style={{ color: "rgba(0,0,0,0.55)" }}
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
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
            © {new Date().getFullYear()} Ambition Coal Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href || "#"}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="social-icon-btn w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200"
                style={{
                  background: "rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {icon}
              </a>
            ))}
            <Link href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all duration-200"
                  style={{ background:"rgba(0,0,0,0.06)", border:"1px solid rgba(0,0,0,0.1)", color:"rgba(0,0,0,0.45)" }}>
              <Settings size={11}/> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
