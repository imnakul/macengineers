import React from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/** The previous design's chrome, kept for the comparison page at `/5`. */
export default function ClassicLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
