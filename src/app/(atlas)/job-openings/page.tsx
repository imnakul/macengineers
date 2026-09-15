import type { Metadata } from "next";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { JobList } from "@/components/careers/JobList";
import { JsonLd } from "@/components/seo/JsonLd";
import { CAREERS_PAGE, JOBS } from "@/data/jobs";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, webPageLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";

export const metadata: Metadata = pageMetadata({
  title: CAREERS_PAGE.metaTitle,
  description: CAREERS_PAGE.metaDescription,
  path: "/job-openings",
});

/** Careers. The list and its filters run in the browser; everything else is static. */
export default function CareersPage(): React.JSX.Element {
  return (
    <>
      <AtlasPageHero
        eyebrow={CAREERS_PAGE.hero.eyebrow}
        title={CAREERS_PAGE.hero.headline}
        description={CAREERS_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        headingId="careers-page-heading"
      >
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span className="text-[#1B5FC4]">{String(JOBS.length).padStart(2, "0")}</span> open{" "}
          {JOBS.length === 1 ? "role" : "roles"}
        </p>
      </AtlasPageHero>

      <section aria-labelledby="openings-heading" className="px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="openings-heading" className="sr-only">
            Current openings
          </h2>
          <JobList jobs={JOBS} />
        </div>
      </section>

      <AtlasCtaBand
        eyebrow="Speculative"
        title="Nothing that fits?"
        body="We hire engineers, fabricators and support staff as projects come in. Send your CV and we will keep it on file for the next opening."
        headingId="careers-cta-heading"
      >
        <PlateCta
          href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Speculative application")}`}
          size="lg"
          aria-label={`Email a speculative application to ${COMPANY.email}`}
          className="w-full sm:w-auto"
        >
          {COMPANY.email}
        </PlateCta>
      </AtlasCtaBand>

      <JsonLd
        data={[
          webPageLd("CollectionPage", CAREERS_PAGE.hero.headline, CAREERS_PAGE.metaDescription, "/job-openings"),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/job-openings" },
          ]),
        ]}
      />
    </>
  );
}
