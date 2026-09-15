import type { Metadata } from "next";
import Image from "next/image";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Reveal } from "@/components/ui/Reveal";
import { SpecBlock } from "@/components/ui/SpecBlock";
import { TechLabel } from "@/components/ui/TechLabel";
import { PRODUCT_PAGE } from "@/data/products";
import { QUOTE_HREF } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, productListLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";

export const metadata: Metadata = pageMetadata({
  title: PRODUCT_PAGE.metaTitle,
  description: PRODUCT_PAGE.metaDescription,
  path: "/product",
});

/** Product. Four equipment lines as alternating spec blocks, then turnkey on its own. */
export default function ProductPage(): React.JSX.Element {
  const { categories, turnkey, whyChoose } = PRODUCT_PAGE;

  return (
    <>
      <AtlasPageHero
        eyebrow={PRODUCT_PAGE.hero.eyebrow}
        title={PRODUCT_PAGE.hero.headline}
        description={PRODUCT_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Product" }]}
        headingId="product-page-heading"
      />

      <section aria-labelledby="lines-heading" className="px-4 py-14 sm:px-6 sm:py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="lines-heading" className="sr-only">
            Equipment lines
          </h2>

          <div className="flex flex-col gap-14 sm:gap-20 md:gap-28">
            {categories.map((category, index) => (
              <SpecBlock
                key={category.slug}
                title={category.title}
                tagline={category.tagline}
                description={category.description}
                points={category.specs}
                image={category.image}
                alt={category.alt}
                imageDepth={category.imageDepth}
                flip={index % 2 === 1}
                headingId={`product-${category.slug}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="turnkey-heading" className="border-t border-hairline bg-canvas px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-6">
            <Reveal>
              <TechLabel>Complete plants</TechLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="turnkey-heading"
                className="mt-6 max-w-[16ch] text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[38px] md:text-[46px]"
              >
                {turnkey.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[26px] font-block tracking-glide text-ink-strong">
                {turnkey.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 max-w-[560px] text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted">
                {turnkey.description}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="relative mt-8 overflow-hidden rounded-card bg-surface">
                <Image
                  src={turnkey.image}
                  alt={turnkey.alt}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="drafting-grid h-auto w-full object-contain p-7"
                />
                <CornerTicks />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col lg:col-span-6">
            <Reveal delay={0.1}>
              <h3 className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">{turnkey.scopeHeading}</h3>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-5 flex flex-col">
                {turnkey.scope.map((item) => (
                  <li key={item} className="border-t border-hairline py-4 last:border-b">
                    <span className="text-[15px] leading-[23px] font-regular tracking-glide text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-card bg-surface p-6 shadow-ring md:p-7">
                <span className="font-mono text-[10px] tracking-tech text-accent uppercase">{turnkey.benefitLabel}</span>
                <p className="mt-3 text-[15px] leading-[24px] font-regular tracking-glide text-ink">{turnkey.benefit}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-products-heading" className="border-t border-hairline px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <TechLabel>Standards</TechLabel>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="why-products-heading"
              className="mt-6 max-w-[18ch] text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[38px] md:text-[46px]"
            >
              {whyChoose.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-2 lg:grid-cols-4">
              {whyChoose.items.map((item) => (
                <li
                  key={item}
                  className="group relative flex flex-col gap-4 bg-canvas p-7 transition-[background-color] duration-150 ease-ui hover:bg-surface md:p-8"
                >
                  <p className="text-[16px] leading-[24px] font-strong tracking-glide text-ink-strong">{item}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <AtlasCtaBand
        eyebrow="Next step"
        title={PRODUCT_PAGE.cta.heading}
        body={PRODUCT_PAGE.cta.body}
        headingId="product-cta-heading"
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
          productListLd(),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Product", path: "/product" },
          ]),
        ]}
      />
    </>
  );
}
