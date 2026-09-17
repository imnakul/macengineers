import type { Metadata } from "next";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SpecBlock } from "@/components/ui/SpecBlock";
import { SERVICE_PAGE } from "@/data/services";
import { QUOTE_HREF } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, serviceListLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";

export const metadata: Metadata = pageMetadata({
  title: SERVICE_PAGE.metaTitle,
  description: SERVICE_PAGE.metaDescription,
  path: "/service",
});

/** Service. Five capability lines as alternating spec blocks, then the key benefit. */
export default function ServicePage(): React.JSX.Element {
  const { categories, keyBenefit } = SERVICE_PAGE;

  return (
    <>
      <AtlasPageHero
        title={SERVICE_PAGE.hero.headline}
        description={SERVICE_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service" }]}
        headingId="service-page-heading"
      />

      <section aria-labelledby="capabilities-heading" className="py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="capabilities-heading" className="sr-only">
            Service lines
          </h2>

          <div className="flex flex-col gap-14 sm:gap-20 md:gap-28">
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

      <section aria-labelledby="key-benefit-heading" className="border-t border-hairline bg-canvas py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <AtlasCtaBand
        eyebrow="Next step"
        title={SERVICE_PAGE.cta.heading}
        body={SERVICE_PAGE.cta.body}
        headingId="service-cta-heading"
      >
        <PlateCta href={QUOTE_HREF} size="lg" className="w-full sm:w-auto">
          Request a Quote
        </PlateCta>
        <PlateCta href="/contact-us" variant="outline" size="lg" icon="none" className="w-full sm:w-auto">
          Contact Us
        </PlateCta>
      </AtlasCtaBand>

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
