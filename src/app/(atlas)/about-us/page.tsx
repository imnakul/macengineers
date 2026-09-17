import type { Metadata } from "next";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { Achievements } from "@/components/about/Achievements";
import { BrandStory } from "@/components/about/BrandStory";
import { Differentiators } from "@/components/about/Differentiators";
import { Expertise } from "@/components/about/Expertise";
import { Principles } from "@/components/about/Principles";
import { QualityPolicy } from "@/components/about/QualityPolicy";
import { TeamCapabilities } from "@/components/about/TeamCapabilities";
import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT_PAGE } from "@/data/about";
import { QUOTE_HREF } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  path: "/about-us",
});

/** About Us. Atlas masthead and close; the story sections inherit Atlas tokens from the layout. */
export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <AtlasPageHero
        title={ABOUT_PAGE.hero.headline}
        description={ABOUT_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        headingId="about-page-heading"
      />

      <BrandStory />
      <Achievements />
      <Principles />
      <TeamCapabilities />
      <QualityPolicy />
      <Differentiators />
      <Expertise />

      <AtlasCtaBand
        eyebrow="Next step"
        title={ABOUT_PAGE.cta.heading}
        body={ABOUT_PAGE.cta.body}
        headingId="about-cta-heading"
      >
        <PlateCta href="/contact-us" size="lg" className="w-full sm:w-auto">
          {ABOUT_PAGE.cta.label}
        </PlateCta>
        <PlateCta href={QUOTE_HREF} variant="outline" size="lg" icon="none" className="w-full sm:w-auto">
          Request a Quote
        </PlateCta>
      </AtlasCtaBand>

      <JsonLd
        data={[
          webPageLd("AboutPage", ABOUT_PAGE.hero.headline, ABOUT_PAGE.metaDescription, "/about-us"),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" },
          ]),
        ]}
      />
    </>
  );
}
