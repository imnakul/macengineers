import type { Metadata } from "next";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { QUOTE_PAGE } from "@/data/quote";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { PlateTag } from "@/variants/shared/PlateTag";
import { Reveal } from "@/variants/variant5/Reveal";

export const metadata: Metadata = pageMetadata({
  title: QUOTE_PAGE.metaTitle,
  description: QUOTE_PAGE.metaDescription,
  path: "/get-a-quote",
});

/** The direct routes, for anyone who would rather not fill in a form. */
const DIRECT: readonly { label: string; value: string; href: string }[] = [
  { label: "Call the works", value: COMPANY.phone, href: COMPANY.phoneHref },
  { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "WhatsApp", value: "Message us", href: COMPANY.whatsapp },
];

/** Longest prefill accepted, matching the description limit in the quote schema. */
const MAX_SPEC_LENGTH = 4000;

interface QuotePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Reads the specification a sizing tool passes across in `?spec=`.
 *
 * Everything here is treated as untrusted text from a URL: only a single string value is
 * accepted, and it is clamped to the same length the schema allows, so a hand-edited link
 * cannot seed a body the form would only reject on submit. It lands as the default value
 * of a plain textarea, so there is no markup path out of it.
 */
function readSpec(params: Record<string, string | string[] | undefined>): string {
  const value = params.spec;
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_SPEC_LENGTH);
}

/** Get a Quote. The form is the page; everything else stays out of its way. */
export default async function QuotePage({ searchParams }: QuotePageProps): Promise<React.JSX.Element> {
  const spec = readSpec(await searchParams);

  return (
    <>
      <AtlasPageHero
        eyebrow={QUOTE_PAGE.hero.eyebrow}
        title={QUOTE_PAGE.hero.headline}
        description={QUOTE_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]}
        headingId="quote-page-heading"
      />

      <section aria-labelledby="quote-form-heading" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="rounded-[6px] border border-[#E3E7ED] bg-white p-6 sm:p-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E7ED] pb-5">
                  <h2 id="quote-form-heading" className="font-display text-xl font-semibold tracking-[-0.01em] text-[#0D1B2E]">
                    Your requirement
                  </h2>
                  {spec ? <PlateTag skin="tint">Spec carried over</PlateTag> : null}
                </div>
                <QuoteForm defaultDescription={spec} />
              </div>
            </Reveal>
          </div>

          <aside aria-labelledby="direct-heading" className="flex flex-col gap-4 lg:col-span-4">
            <Reveal delay={100}>
              <h2 id="direct-heading" className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Rather talk?
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <ul className="grid gap-px overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-[#E3E7ED] sm:grid-cols-3 lg:grid-cols-1">
                {DIRECT.map((item) => (
                  <li key={item.label} className="flex flex-col gap-2 bg-white p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</span>
                    <a
                      href={item.href}
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.value}`}
                      className="font-display text-base font-semibold text-[#0D1B2E] transition-colors duration-150 hover:text-[#1B5FC4]"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <p className="rounded-[6px] border border-[#E3E7ED] bg-[#F2F6FC] p-6 text-sm leading-relaxed text-slate-600">
                Quotations and lead times are usually back within 24 hours. Drawings help us be accurate first time — attach
                one if you have it.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      <JsonLd
        data={[
          webPageLd("WebPage", QUOTE_PAGE.hero.headline, QUOTE_PAGE.metaDescription, "/get-a-quote"),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Get a Quote", path: "/get-a-quote" },
          ]),
        ]}
      />
    </>
  );
}
