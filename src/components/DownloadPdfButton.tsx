"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";

export default function DownloadPdfButton() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // STUB: PDF generation handler to be wired later (e.g. via @react-pdf/renderer or edge API)
    // Fallback: trigger browser print dialog for immediate utility
    setTimeout(() => {
      setDownloading(false);
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 400);
  };

  return (
    <MagneticButton
      onClick={handleDownload}
      variant="primary"
      className="!px-6 !py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase font-mono print:hidden"
      ariaLabel="Download Abdul Basit Chandio's CV as PDF"
    >
      <svg
        className="w-4 h-4 mr-1 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span>{downloading ? "Preparing PDF..." : "Download PDF"}</span>
    </MagneticButton>
  );
}
