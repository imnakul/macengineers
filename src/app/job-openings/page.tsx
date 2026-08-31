import type { Metadata } from "next";
import { JobList } from "@/components/careers/JobList";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { CAREERS_PAGE, JOBS } from "@/data/jobs";
import { COMPANY } from "@/data/site";

export const metadata: Metadata = {
  title: CAREERS_PAGE.metaTitle,
  description: CAREERS_PAGE.metaDescription,
  alternates: { canonical: "/job-openings" },
  openGraph: {
    title: CAREERS_PAGE.metaTitle,
    description: CAREERS_PAGE.metaDescription,
    url: `${COMPANY.siteUrl}job-openings/`,
    siteName: COMPANY.name,
    type: "website",
  },
};

/** Careers. The list and its filters run in the browser; everything else is static. */
export default function CareersPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        index="01"
        eyebrow={CAREERS_PAGE.hero.eyebrow}
        headline={CAREERS_PAGE.hero.headline}
        subhead={CAREERS_PAGE.hero.subhead}
        headingId="careers-page-heading"
      />

      <section aria-labelledby="openings-heading" className="px-5 pb-24 md:px-13 md:pb-36">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="openings-heading" className="sr-only">
            Current openings
          </h2>
          <JobList jobs={JOBS} />
        </div>
      </section>

      <CtaBand
        index="02"
        eyebrow="Speculative"
        heading="Nothing that fits?"
        body="We hire engineers, fabricators and support staff as projects come in. Send your CV and we will keep it on file for the next opening."
        headingId="careers-cta-heading"
      >
        <ActionLink
          href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Speculative application")}`}
          variant="solid"
          withArrow
          ariaLabel={`Email a speculative application to ${COMPANY.email}`}
          className="bg-canvas text-ink-strong hover:bg-surface"
        >
          {COMPANY.email}
        </ActionLink>
      </CtaBand>
    </>
  );
}
