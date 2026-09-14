import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
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
import { productListLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: COMPANY.metaTitle,
  description: COMPANY.metaDescription,
  path: "/",
});

/**
 * MAC Engineers landing page. Chrome lives in the root layout; this is the sheet set.
 *
 * The order runs claim → proof → tool → method → fit → service → close. Exactly one
 * sheet is interactive: the sizing sheet, where a visitor states a requirement and gets
 * a spec back. Everything around it is printed — the delivery sequence and the process
 * trains read as schedules on a drawing set, not as widgets — so the one control on the
 * page is unmistakably the thing to use. Section fills alternate canvas/surface the whole
 * way down, so the page separates on value rather than on rules.
 */
export default function HomePage(): React.JSX.Element {
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

      <JsonLd data={[productListLd()]} />
    </>
  );
}
