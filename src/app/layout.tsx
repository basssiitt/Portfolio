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
  metadataBase: new URL("https://claslo.com"),
  title: "Abdul Basit Chandio | Full Stack Developer & Founder",
  description:
    "Full Stack Developer and Founder of Claslo. I build fast, accessible web apps, enterprise SaaS platforms, and AI integrations.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "AI",
    "SaaS",
    "Portfolio",
    "Claslo",
    "Pakistan",
  ],
  authors: [{ name: "Abdul Basit Chandio", url: "https://claslo.com" }],
  creator: "Abdul Basit Chandio",
  publisher: "Abdul Basit Chandio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Abdul Basit Chandio | Full Stack Developer & Founder",
    description:
      "Full Stack Developer and Founder of Claslo. I build fast, accessible web apps, enterprise SaaS platforms, and AI integrations.",
    type: "website",
    locale: "en_US",
    url: "https://claslo.com",
    siteName: "Abdul Basit Chandio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdul Basit Chandio | Full Stack Developer & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Basit Chandio | Full Stack Developer & Founder",
    description:
      "Full Stack Developer and Founder of Claslo. I build fast, accessible web apps, enterprise SaaS platforms, and AI integrations.",
    images: ["/og-image.png"],
    creator: "@basssiitt",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
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
