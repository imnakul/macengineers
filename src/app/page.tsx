import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutStrip } from "@/components/AboutStrip";
import { EquipmentSolutions } from "@/components/EquipmentSolutions";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { IntegrationBand } from "@/components/IntegrationBand";
import { Journal } from "@/components/Journal";
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

/** MAC Engineers landing page. Chrome lives in the root layout; this is the sheet set. */
export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <AboutStrip />
      <EquipmentSolutions />
      <WhyChoose />
      <Services />
      <Industries />
      <IntegrationBand />
      <Journal />

      <JsonLd data={[productListLd()]} />
    </>
  );
}
