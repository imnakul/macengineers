import type { Metadata } from "next";
import Link from "next/link";
import { AtlasShell } from "@/components/atlas/AtlasShell";
import { QUOTE_HREF } from "@/data/site";
import { PlateCta } from "@/variants/shared/PlateCta";
import { PlateTag } from "@/variants/shared/PlateTag";

export const metadata: Metadata = {
  title: "Page not found | MAC Engineers",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

const SUGGESTED_PAGES: readonly { label: string; href: string }[] = [
  { label: "Product", href: "/product" },
  { label: "Service", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Get a Quote", href: QUOTE_HREF },
];

/**
 * Site-wide 404 in the Corporate Atlas style. Kept out of search results, and it points
 * the visitor back into the site instead of leaving them at a dead end.
 */
export default function NotFound(): React.JSX.Element {
  return (
    <AtlasShell>
      <section aria-labelledby="not-found-heading" className="relative overflow-hidden border-b border-[#E3E7ED] bg-white">
        <div aria-hidden="true" className="drafting-grid drafting-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32">
          <PlateTag as="p" size="sm" skin="tint">
            Error 404
          </PlateTag>
          <h1
            id="not-found-heading"
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#0D1B2E] sm:text-5xl"
          >
            This page isn’t on the drawing.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-[17px]">
            The link may be out of date, or the page has moved. Head back to the homepage or pick up from one of the
            pages below.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <PlateCta href="/" size="lg" className="w-full sm:w-auto">
              Back to Home
            </PlateCta>
            <PlateCta href="/contact-us" variant="outline" size="lg" icon="none" className="w-full sm:w-auto">
              Contact Us
            </PlateCta>
          </div>

          <nav aria-label="Suggested pages" className="mt-12 w-full border-t border-[#E3E7ED] pt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {SUGGESTED_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors duration-150 hover:text-[#1B5FC4]"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </AtlasShell>
  );
}
