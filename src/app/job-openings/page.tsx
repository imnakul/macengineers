import type { Metadata } from "next";
import { JobList } from "@/components/careers/JobList";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CAREERS_PAGE, JOBS } from "@/data/jobs";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { COMPANY } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: CAREERS_PAGE.metaTitle,
  description: CAREERS_PAGE.metaDescription,
  path: "/job-openings",
});

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
          tone="inverse"
          withArrow
          ariaLabel={`Email a speculative application to ${COMPANY.email}`}
        >
          {COMPANY.email}
        </ActionLink>
      </CtaBand>

      <JsonLd
        data={[
          webPageLd(
            "CollectionPage",
            CAREERS_PAGE.hero.headline,
            CAREERS_PAGE.metaDescription,
            "/job-openings",
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/job-openings" },
          ]),
        ]}
      />
    </>
  );
}
