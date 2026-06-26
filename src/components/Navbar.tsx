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
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.3)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <AmbitionLogo size={44} />
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

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: pathname === l.href ? "var(--orange)" : "rgba(0,0,0,0.65)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* spacer to keep logo + nav centered */}
        <div className="hidden md:block w-[110px]" />

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-900" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-4"
             style={{ background:"rgba(255,255,255,0.98)", borderTop:"1px solid rgba(0,0,0,0.08)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="text-sm font-medium py-1"
                  style={{ color: pathname === l.href ? "var(--orange)" : "rgba(0,0,0,0.65)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
