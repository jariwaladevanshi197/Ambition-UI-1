"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AmbitionLogo from "./AmbitionLogo";

const links = [
  { href: "/",           label: "Home"       },
  { href: "/about",      label: "About"      },
  { href: "/services",   label: "Services"   },
  { href: "/activities", label: "Activities" },
  { href: "/csr",        label: "CSR"        },
  { href: "/contact",    label: "Contact"    },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(17,17,17,0.95)" : "rgba(17,17,17,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.18)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <AmbitionLogo size={44} />
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

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: pathname === l.href ? "var(--orange)" : "rgba(255,255,255,0.6)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin"
                className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200"
                style={{ background:"var(--orange)", color:"white" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 6px 20px rgba(249,115,22,0.4)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
            Admin Panel
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-4"
             style={{ background:"rgba(17,17,17,0.97)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="text-sm font-medium py-1"
                  style={{ color: pathname === l.href ? "var(--orange)" : "rgba(255,255,255,0.65)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-semibold rounded-md text-center mt-1"
                style={{ background:"var(--orange)", color:"white" }}>
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
