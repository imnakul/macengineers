import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpecBlock } from "@/components/ui/SpecBlock";
import { COMPANY, QUOTE_HREF } from "@/data/site";
import { SERVICE_PAGE } from "@/data/services";

export const metadata: Metadata = {
  title: SERVICE_PAGE.metaTitle,
  description: SERVICE_PAGE.metaDescription,
  alternates: { canonical: "/service" },
  openGraph: {
    title: SERVICE_PAGE.metaTitle,
    description: SERVICE_PAGE.metaDescription,
    url: `${COMPANY.siteUrl}service/`,
    siteName: COMPANY.name,
    type: "website",
  },
};

/** Service. Five capability lines as alternating spec blocks. */
export default function ServicePage(): React.JSX.Element {
  const { categories, keyBenefit } = SERVICE_PAGE;
  const total = String(categories.length).padStart(2, "0");

  return (
    <>
      <PageHero
        index="01"
        eyebrow={SERVICE_PAGE.hero.eyebrow}
        headline={SERVICE_PAGE.hero.headline}
        subhead={SERVICE_PAGE.hero.subhead}
        headingId="service-page-heading"
      />

      <section aria-labelledby="capabilities-heading" className="px-5 pb-24 md:px-13 md:pb-36">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="capabilities-heading" className="sr-only">
            Service lines
          </h2>

          <div className="flex flex-col gap-20 md:gap-28">
            {categories.map((category, index) => (
              <SpecBlock
                key={category.slug}
                index={String(index + 1).padStart(2, "0")}
                total={total}
                title={category.title}
                description={category.description}
                points={category.capabilities}
                image={category.image}
                alt={category.alt}
                figure={String(index + 1).padStart(2, "0")}
                flip={index % 2 === 1}
                headingId={`service-${category.slug}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="key-benefit-heading"
        className="bg-surface px-5 py-20 md:px-13 md:py-28"
      >
        <Reveal>
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 text-center">
            <span
              id="key-benefit-heading"
              className="font-mono text-[10px] tracking-tech text-accent uppercase"
            >
              {keyBenefit.label}
            </span>
            <p className="text-[20px] leading-[30px] font-block tracking-glide text-ink-strong md:text-[26px] md:leading-[38px]">
              {keyBenefit.body}
            </p>
          </div>
        </Reveal>
      </section>

      <CtaBand
        index="02"
        eyebrow="Next step"
        heading={SERVICE_PAGE.cta.heading}
        body={SERVICE_PAGE.cta.body}
        headingId="service-cta-heading"
      >
        <ActionLink
          href={QUOTE_HREF}
          variant="solid"
          withArrow
          className="bg-canvas text-ink-strong hover:bg-surface"
        >
          Get A Quote
        </ActionLink>
        <ActionLink
          href={COMPANY.phoneHref}
          variant="ghost"
          ariaLabel={`Call ${COMPANY.name} on ${COMPANY.phone}`}
          className="font-mono text-canvas shadow-none ring-1 ring-canvas/20 hover:bg-canvas/10 hover:ring-canvas/35"
        >
          {COMPANY.phone}
        </ActionLink>
      </CtaBand>
    </>
  );
}
