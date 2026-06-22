"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf: number;
    let isHoveringBtn = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = document.elementFromPoint(mx, my);
      isHoveringBtn = !!(el?.closest("button, a, [role='button'], .mag-btn"));
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
        dotRef.current.style.width  = isHoveringBtn ? "8px"  : "12px";
        dotRef.current.style.height = isHoveringBtn ? "8px"  : "12px";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
        ringRef.current.style.width  = isHoveringBtn ? "52px" : "44px";
        ringRef.current.style.height = isHoveringBtn ? "52px" : "44px";
        ringRef.current.style.borderColor = isHoveringBtn
          ? "rgba(249,115,22,0.8)"
          : "rgba(249,115,22,0.4)";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height] duration-150"
        style={{
          width: 12,
          height: 12,
          background: "var(--orange)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-[width,height,border-color] duration-200"
        style={{
          width: 44,
          height: 44,
          border: "1.5px solid rgba(249,115,22,0.4)",
        }}
      />
    </>
  );
}
