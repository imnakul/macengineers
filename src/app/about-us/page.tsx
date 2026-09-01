import type { Metadata } from "next";
import { Achievements } from "@/components/about/Achievements";
import { BrandStory } from "@/components/about/BrandStory";
import { Differentiators } from "@/components/about/Differentiators";
import { Expertise } from "@/components/about/Expertise";
import { Principles } from "@/components/about/Principles";
import { QualityPolicy } from "@/components/about/QualityPolicy";
import { TeamCapabilities } from "@/components/about/TeamCapabilities";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ABOUT_PAGE } from "@/data/about";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { QUOTE_HREF } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  path: "/about-us",
});

/** About Us. Nine sheets, numbered continuously down the page. */
export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_PAGE.hero.eyebrow}
        headline={ABOUT_PAGE.hero.headline}
        subhead={ABOUT_PAGE.hero.subhead}
        headingId="about-page-heading"
      />

      <BrandStory />
      <Achievements />
      <Principles />
      <TeamCapabilities />
      <QualityPolicy />
      <Differentiators />
      <Expertise />

      <CtaBand
        eyebrow="Next step"
        heading={ABOUT_PAGE.cta.heading}
        body={ABOUT_PAGE.cta.body}
        headingId="about-cta-heading"
      >
        <ActionLink href="/contact-us" variant="solid" tone="inverse" withArrow>
          {ABOUT_PAGE.cta.label}
        </ActionLink>
        <ActionLink href={QUOTE_HREF} variant="ghost" tone="inverse" className="font-mono">
          Get A Quote
        </ActionLink>
      </CtaBand>

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
