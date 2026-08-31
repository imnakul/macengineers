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
import { COMPANY, QUOTE_HREF } from "@/data/site";

export const metadata: Metadata = {
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: ABOUT_PAGE.metaTitle,
    description: ABOUT_PAGE.metaDescription,
    url: `${COMPANY.siteUrl}about-us/`,
    siteName: COMPANY.name,
    type: "website",
  },
};

/** About Us. Nine sheets, numbered continuously down the page. */
export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        index="01"
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
        index="09"
        eyebrow="Next step"
        heading={ABOUT_PAGE.cta.heading}
        body={ABOUT_PAGE.cta.body}
        headingId="about-cta-heading"
      >
        <ActionLink
          href="/contact-us"
          variant="solid"
          withArrow
          className="bg-canvas text-ink-strong hover:bg-surface"
        >
          {ABOUT_PAGE.cta.label}
        </ActionLink>
        <ActionLink
          href={QUOTE_HREF}
          variant="ghost"
          className="font-mono text-canvas shadow-none ring-1 ring-canvas/20 hover:bg-canvas/10 hover:ring-canvas/35"
        >
          Get A Quote
        </ActionLink>
      </CtaBand>
    </>
  );
}
