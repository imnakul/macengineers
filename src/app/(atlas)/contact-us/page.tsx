import type { Metadata } from "next";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
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
      {/* No eyebrow or second intro line: the breadcrumb and title already say "Contact", and the
          form sits right below, so one short line is enough. */}
      <AtlasPageHero
        title={CONTACT_PAGE.hero.headline}
        description={CONTACT_PAGE.hero.lead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        headingId="contact-page-heading"
        image={{
          src: "/images/hero/header-contact-desk.png",
          alt: "MAC Engineers support desk: a coordinator on a headset talks through a vessel model and drawings with a site engineer",
        }}
      />

      <section aria-labelledby="enquiry-heading" className="py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* The page hero already carries the headline, so the form gets a small label that pairs with
              the channels label beside it rather than a second large heading. */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <h2 id="enquiry-heading" className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
              {CONTACT_PAGE.form.heading}
            </h2>
            <Reveal delay={120}>
              <div className="rounded-[6px] border border-[#D6DDE6] bg-white p-6 sm:p-8">
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
