import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { COMPANY } from "@/data/site";
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
  title: COMPANY.metaTitle,
  description: COMPANY.metaDescription,
  metadataBase: new URL(COMPANY.siteUrl),
  openGraph: {
    title: COMPANY.metaTitle,
    description: COMPANY.metaDescription,
    url: COMPANY.siteUrl,
    siteName: COMPANY.name,
    type: "website",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
