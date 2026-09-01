import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { CONTACT_PAGE } from "@/data/contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { QUOTE_HREF } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: CONTACT_PAGE.metaTitle,
  description: CONTACT_PAGE.metaDescription,
  path: "/contact-us",
});

/** Contact Us. The form leads; the direct channels sit beside it, not beneath it. */
export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        index="01"
        eyebrow={CONTACT_PAGE.hero.eyebrow}
        headline={CONTACT_PAGE.hero.headline}
        lead={CONTACT_PAGE.hero.lead}
        subhead={CONTACT_PAGE.hero.subhead}
        headingId="contact-page-heading"
      />

      <section
        aria-labelledby="enquiry-heading"
        className="px-5 pb-24 md:px-13 md:pb-36"
      >
        <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <TechLabel index="02">Enquiry</TechLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="enquiry-heading"
                className="mt-6 text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[36px] md:text-[42px]"
              >
                {CONTACT_PAGE.form.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="mt-9">
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <ContactChannels />
          </Reveal>
        </div>
      </section>

      <CtaBand
        index="03"
        eyebrow="Faster route"
        heading="Need a quote instead?"
        body="If you already know the equipment and specification you need, the quote form captures it directly. For anything urgent, calling the works is quickest."
        headingId="contact-cta-heading"
      >
        <ActionLink href={QUOTE_HREF} variant="solid" tone="inverse" withArrow>
          Get A Quote
        </ActionLink>
      </CtaBand>

      <JsonLd
        data={[
          webPageLd("ContactPage", CONTACT_PAGE.hero.headline, CONTACT_PAGE.metaDescription, "/contact-us"),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact-us" },
          ]),
        ]}
      />
    </>
  );
}
