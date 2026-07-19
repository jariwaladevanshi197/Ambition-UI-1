"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({ title, onClose, children, width = "560px" }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    document.body.style.overflow = "hidden";

    // Move focus into the dialog on open.
    const toFocus = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    toFocus?.focus();

    return () => { document.removeEventListener("keydown", keydown); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
         style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }}
         onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title"
           className="relative rounded-2xl overflow-hidden flex flex-col"
           style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.1)", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", width:"100%", maxWidth:width, maxHeight:"90vh" }}
           onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
             style={{ borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
          <h2 id="modal-title" className="font-bold text-gray-900 text-base">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background:"rgba(0,0,0,0.05)" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.1)") }
                  onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.05)") }>
            <X size={15} className="text-gray-900" />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
