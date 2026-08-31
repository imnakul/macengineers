import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { CONTACT_PAGE } from "@/data/contact";
import { COMPANY, QUOTE_HREF } from "@/data/site";

export const metadata: Metadata = {
  title: CONTACT_PAGE.metaTitle,
  description: CONTACT_PAGE.metaDescription,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: CONTACT_PAGE.metaTitle,
    description: CONTACT_PAGE.metaDescription,
    url: `${COMPANY.siteUrl}contact-us/`,
    siteName: COMPANY.name,
    type: "website",
  },
};

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
        <ActionLink
          href={QUOTE_HREF}
          variant="solid"
          withArrow
          className="bg-canvas text-ink-strong hover:bg-surface"
        >
          Get A Quote
        </ActionLink>
        <ActionLink
          href={COMPANY.phoneHref}
          variant="ghost"
          ariaLabel={`Call ${COMPANY.name} on ${COMPANY.phone}`}
          className="font-mono text-canvas shadow-none ring-1 ring-canvas/20 hover:bg-canvas/10 hover:ring-canvas/35"
        >
          {COMPANY.phone}
        </ActionLink>
      </CtaBand>
    </>
  );
}
