import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPANY } from "@/data/site";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import "./globals.css";

/**
 * Archivo is loaded as a variable font (no `weight` array) so the 450 / 575 stops the
 * token system asks for are real interpolated instances rather than weights the browser
 * rounds or synthesises. Its grotesque skeleton comes out of American signage and
 * typewriter grotesques — the right voice for fabricated steel.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The technical register: sheet numbers, figure captions, material specs. Plex Mono is
 * static-only, so the weights it is actually used at are declared explicitly.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
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

        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
