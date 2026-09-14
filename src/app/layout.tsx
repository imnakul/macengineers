import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPANY } from "@/data/site";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { GlobalVariantSwitcher } from "@/variants/shared/GlobalVariantSwitcher";
import "./globals.css";

/**
 * Archivo is the DISPLAY face only — headlines and short display strings.
 *
 * It is loaded as a variable font (no `weight` array) so the 450 / 575 stops the token
 * system asks for are real interpolated instances rather than weights the browser rounds
 * or synthesises. Its grotesque skeleton comes out of American signage and typewriter
 * grotesques, which is the right voice at 80px and the wrong one at 16px: the same large
 * x-height and closed apertures that make it solid on a headline close up into each
 * other in a paragraph.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The READING face — body copy, subtext, UI, form fields: everything that is read in
 * sentences rather than scanned as a shape.
 *
 * Geist replaces IBM Plex Sans. Plex is a corporate face with a stiff, slightly
 * condensed fit and a semibold that turns heavy and blocky the moment it is used for
 * emphasis — which is exactly where it was landing here, on every card title and spec
 * value. Geist is a Swiss-neutral grotesque with wider apertures, a taller x-height and
 * a genuinely even weight ramp, so 500 and 600 read as emphasis rather than as a
 * different, denser typeface. Loaded as a variable font so the 450 / 500 / 575 / 600
 * stops the token system asks for are real interpolated instances.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The technical register: sheet numbers, figure captions, material specs.
 *
 * Geist Mono is drawn on the same skeleton as Geist, so a spec label and the prose
 * beneath it are two settings of one voice instead of two unrelated faces — which is
 * the argument that originally put Plex Mono here, now satisfied without Plex.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /* Each page supplies its own complete title, every one of which already names the
     company. A plain string here is the fallback for any route that does not; there is
     deliberately no template, which would append the company name a second time. */
  title: COMPANY.metaTitle,
  description: COMPANY.metaDescription,
  metadataBase: new URL(COMPANY.siteUrl),
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.legalName }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: COMPANY.metaTitle,
    description: COMPANY.metaDescription,
    url: COMPANY.siteUrl,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Macengineersank",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded-btn focus:bg-cta focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-block focus:text-canvas"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />

        <GlobalVariantSwitcher />

        <JsonLd data={[organizationLd(), websiteLd()]} />

        {/*
          Both are no-ops off Vercel: Analytics only sends events once the app is
          served from a Vercel deployment with Analytics enabled on the project, and
          Speed Insights the same for Core Web Vitals. Safe to ship unconditionally —
          neither throws or logs noise locally or on another host, they just idle.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
