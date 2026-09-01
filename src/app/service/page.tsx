import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpecBlock } from "@/components/ui/SpecBlock";
import { QUOTE_HREF } from "@/data/site";
import { SERVICE_PAGE } from "@/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, serviceListLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: SERVICE_PAGE.metaTitle,
  description: SERVICE_PAGE.metaDescription,
  path: "/service",
});

/** Service. Five capability lines as alternating spec blocks. */
export default function ServicePage(): React.JSX.Element {
  const { categories, keyBenefit } = SERVICE_PAGE;

  return (
    <>
      <PageHero
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
                title={category.title}
                description={category.description}
                points={category.capabilities}
                image={category.image}
                alt={category.alt}
                imageDepth={category.imageDepth}
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
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="flex max-w-[760px] flex-col gap-5">
              <span
                id="key-benefit-heading"
                className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-tech text-accent uppercase"
              >
                <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 bg-accent" />
                {keyBenefit.label}
              </span>
              <p className="text-[20px] leading-[30px] font-block tracking-glide text-ink-strong md:text-[26px] md:leading-[38px]">
                {keyBenefit.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        heading={SERVICE_PAGE.cta.heading}
        body={SERVICE_PAGE.cta.body}
        headingId="service-cta-heading"
      >
        <ActionLink href={QUOTE_HREF} variant="solid" tone="inverse" withArrow>
          Get A Quote
        </ActionLink>
      </CtaBand>

      <JsonLd
        data={[
          serviceListLd(),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Service", path: "/service" },
          ]),
        ]}
      />
    </>
  );
}
