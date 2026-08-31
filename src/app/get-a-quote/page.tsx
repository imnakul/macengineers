import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { QUOTE_PAGE } from "@/data/quote";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { COMPANY } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: QUOTE_PAGE.metaTitle,
  description: QUOTE_PAGE.metaDescription,
  path: "/get-a-quote",
});

/** The direct routes, for anyone who would rather not fill in a form. */
const DIRECT = [
  { label: "Call the works", value: COMPANY.phone, href: COMPANY.phoneHref },
  { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "WhatsApp", value: "Message us", href: COMPANY.whatsapp },
] as const;

/** Get a Quote. The form is the page; everything else stays out of its way. */
export default function QuotePage(): React.JSX.Element {
  return (
    <>
      <PageHero
        index="01"
        eyebrow={QUOTE_PAGE.hero.eyebrow}
        headline={QUOTE_PAGE.hero.headline}
        subhead={QUOTE_PAGE.hero.subhead}
        headingId="quote-page-heading"
      />

      <section aria-labelledby="quote-form-heading" className="px-5 pb-28 md:px-13 md:pb-44">
        <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-8">
            <Reveal>
              <TechLabel index="02">Requirement</TechLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id="quote-form-heading" className="sr-only">
                Quote request form
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <QuoteForm />
            </Reveal>
          </div>

          <aside className="flex flex-col gap-4 lg:col-span-4">
            <Reveal delay={0.1}>
              <h2 className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
                Rather talk?
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-3 lg:grid-cols-1">
                {DIRECT.map((item) => (
                  <li key={item.label} className="flex flex-col gap-2 bg-canvas p-6">
                    <span className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
                      {item.label}
                    </span>
                    <Link
                      href={item.href}
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.value}`}
                      className="text-[16px] leading-[24px] font-block tracking-glide text-ink-strong transition-[color] duration-150 ease-ui hover:text-accent"
                    >
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="rounded-card bg-surface p-6 text-[14px] leading-[22px] font-regular tracking-glide text-ink-muted">
                Quotations and lead times are usually back within 24 hours. Drawings help
                us be accurate first time — attach one if you have it.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      <JsonLd
        data={[
          webPageLd(
            "WebPage",
            QUOTE_PAGE.hero.headline,
            QUOTE_PAGE.metaDescription,
            "/get-a-quote",
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Get a Quote", path: "/get-a-quote" },
          ]),
        ]}
      />
    </>
  );
}
