import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { COMPANY } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
