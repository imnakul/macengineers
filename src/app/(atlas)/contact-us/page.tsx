import type { Metadata } from "next";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { AtlasSectionHeading } from "@/components/atlas/AtlasSectionHeading";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_PAGE } from "@/data/contact";
import { COMPANY, QUOTE_HREF } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";
import { Reveal } from "@/variants/variant5/Reveal";

export const metadata: Metadata = pageMetadata({
  title: CONTACT_PAGE.metaTitle,
  description: CONTACT_PAGE.metaDescription,
  path: "/contact-us",
});

/** Contact Us. The form leads; the direct channels sit beside it, not beneath it. */
export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <AtlasPageHero
        eyebrow={CONTACT_PAGE.hero.eyebrow}
        title={CONTACT_PAGE.hero.headline}
        lead={CONTACT_PAGE.hero.lead}
        description={CONTACT_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        headingId="contact-page-heading"
      />

      <section aria-labelledby="enquiry-heading" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-7">
            <AtlasSectionHeading index="01" eyebrow="Enquiry" title={CONTACT_PAGE.form.heading} headingId="enquiry-heading" />
            <Reveal delay={120}>
              <div className="rounded-[6px] border border-[#E3E7ED] bg-white p-6 sm:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-5">
            <ContactChannels />
          </Reveal>
        </div>
      </section>

      <AtlasCtaBand
        eyebrow="Faster route"
        title="Need a quote instead?"
        body="If you already know the equipment and specification you need, the quote form captures it directly. For anything urgent, calling the works is quickest."
        headingId="contact-cta-heading"
      >
        <PlateCta href={QUOTE_HREF} size="lg" className="w-full sm:w-auto">
          Request a Quote
        </PlateCta>
        <PlateCta
          href={COMPANY.phoneHref}
          variant="outline"
          size="lg"
          icon="none"
          aria-label={`Call the works on ${COMPANY.phone}`}
          className="w-full sm:w-auto"
        >
          Call the Works
        </PlateCta>
      </AtlasCtaBand>

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
