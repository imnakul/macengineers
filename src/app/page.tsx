import { AboutStrip } from "@/components/AboutStrip";
import { EquipmentSolutions } from "@/components/EquipmentSolutions";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { IntegrationBand } from "@/components/IntegrationBand";
import { Journal } from "@/components/Journal";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhyChoose } from "@/components/WhyChoose";

/** MAC Engineers landing page. Every section is a Server Component except the header. */
export default function HomePage(): React.JSX.Element {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded-btn focus:bg-cta focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-block focus:text-canvas"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <AboutStrip />
        <EquipmentSolutions />
        <WhyChoose />
        <Services />
        <Industries />
        <IntegrationBand />
        <Journal />
      </main>

      <SiteFooter />
    </>
  );
}
