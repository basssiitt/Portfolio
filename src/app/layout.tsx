import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Basit Chandio — Founder & CEO of Claslo | Full Stack Developer",
  description:
    "Portfolio of Abdul Basit Chandio — Founder & CEO of Claslo, Full Stack Developer. Building fast, accessible web apps and AI-powered digital products.",
  keywords: [
    "Abdul Basit Chandio",
    "Claslo",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "AI SaaS",
  ],
  authors: [{ name: "Abdul Basit Chandio" }],
  openGraph: {
    title: "Abdul Basit Chandio — Founder & CEO of Claslo | Full Stack Developer",
    description:
      "Building fast, accessible web apps and AI-powered digital products for ambitious clients.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-[var(--cyan)] selection:text-black">
        <ScrollProgress />
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
