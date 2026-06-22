import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambition Coal & Mining | Powering Industries. Connecting the World.",
  description:
    "A premier Indian coal trading and mining company delivering sustainable energy and logistics solutions across India and global markets.",
  keywords: "coal trading, mining, logistics, port operations, India, energy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <FooterWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
