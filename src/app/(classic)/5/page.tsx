import type { Metadata } from "next";
import { AboutStrip } from "@/components/AboutStrip";
import { Applications } from "@/components/Applications";
import { EquipmentSolutions } from "@/components/EquipmentSolutions";
import { ExecutionPhases } from "@/components/ExecutionPhases";
import { Hero } from "@/components/Hero";
import { IntegrationBand } from "@/components/IntegrationBand";
import { Journal } from "@/components/Journal";
import { RfqConfigurator } from "@/components/RfqConfigurator";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${COMPANY.metaTitle} — Previous Design`,
    description: COMPANY.metaDescription,
    path: "/5",
  }),
  /* Same content as the homepage used to carry; kept for comparison only, so it stays
     out of search results instead of competing with `/` as duplicate content. */
  robots: { index: false, follow: true },
};

/**
 * The previous MAC Engineers landing page, kept reachable for comparison after the
 * Corporate Atlas design took over `/`. Chrome comes from the root layout.
 *
 * The order runs claim → proof → tool → method → fit → service → close. Exactly one
 * sheet is interactive: the sizing sheet, where a visitor states a requirement and gets
 * a spec back. Section fills alternate canvas/surface the whole way down, so the page
 * separates on value rather than on rules.
 */
export default function PreviousHomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <AboutStrip />
      <EquipmentSolutions />
      <RfqConfigurator />
      <ExecutionPhases />
      <Applications />
      <Services />
      <WhyChoose />
      <IntegrationBand />
      <Journal />
    </>
  );
}
