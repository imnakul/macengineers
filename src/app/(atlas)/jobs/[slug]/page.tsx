import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CAREERS_PAGE, JOBS, type Job } from "@/data/jobs";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, jobPostingLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";
import { PlateTag } from "@/variants/shared/PlateTag";
import { Reveal } from "@/variants/variant5/Reveal";

/** Every role is known at build time, so each page is prerendered. */
export function generateStaticParams(): { slug: string }[] {
  return JOBS.map((job) => ({ slug: job.slug }));
}

function findJob(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = findJob(slug);

  if (!job) return { title: "Role not found | MAC Engineers" };

  const description = `${job.title} at MAC Engineers — ${job.category}, ${job.type}, ${job.locations.join(" / ")}. ${job.teaser}`;

  return pageMetadata({
    title: `${job.title} | Careers at ${COMPANY.name}`,
    description,
    path: `/jobs/${job.slug}`,
    type: "article",
  });
}

/** Label/value facts as a hairline grid — the Atlas treatment of a spec rail. */
function FactGrid({
  items,
  className = "",
}: {
  items: readonly { readonly label: string; readonly value: string }[];
  className?: string;
}): React.JSX.Element {
  return (
    <dl className={`grid gap-px overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-[#E3E7ED] ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5 bg-white p-5">
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</dt>
          <dd className="font-display text-[15px] font-semibold leading-snug text-[#0D1B2E]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A single role in the Corporate Atlas style.
 *
 * Applications go to the company inbox with the role in the subject line rather than
 * through a form — see the note in src/data/jobs.ts on why CVs are deliberately kept
 * out of this system.
 */
export default async function JobPage({ params }: PageProps<"/jobs/[slug]">): Promise<React.JSX.Element> {
  const { slug } = await params;
  const job = findJob(slug);

  if (!job) notFound();

  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Application — ${job.title}`)}`;
  const applyLabel = `Email your application for ${job.title} to ${COMPANY.email}`;

  return (
    <>
      <AtlasPageHero
        title={job.title}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/job-openings" }, { label: job.title }]}
        headingId="job-heading"
      >
        <ul className="flex flex-wrap gap-2" aria-label="Role category, type and locations">
          {[job.category, job.type, ...job.locations].map((tag) => (
            <li key={tag}>
              <PlateTag>{tag}</PlateTag>
            </li>
          ))}
        </ul>
      </AtlasPageHero>

      <section aria-labelledby="job-detail-heading" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="job-detail-heading" className="sr-only">
            Role detail
          </h2>

          <Reveal>
            <FactGrid items={job.meta} className="sm:grid-cols-2 lg:grid-cols-4" />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-28">
                <div className="rounded-[6px] border border-[#E3E7ED] bg-white p-6 sm:p-7">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B5FC4]">
                    {job.summaryHeading}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{job.summary}</p>
                  <PlateCta href={mailtoHref} aria-label={applyLabel} className="mt-6 w-full">
                    Apply for this role
                  </PlateCta>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-8">
              {job.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 60}>
                  <section aria-labelledby={`job-section-${index}`}>
                    <h3
                      id={`job-section-${index}`}
                      className="border-b border-[#E3E7ED] pb-3 font-display text-xl font-semibold tracking-[-0.01em] text-[#0D1B2E]"
                    >
                      {section.heading}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
                          <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-[#1B5FC4]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <FactGrid items={job.closing} className="sm:grid-cols-2" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <AtlasCtaBand
        eyebrow="Apply"
        title={CAREERS_PAGE.applyHeading}
        body={CAREERS_PAGE.applyBody}
        headingId="apply-heading"
      >
        <PlateCta href={mailtoHref} size="lg" aria-label={applyLabel} className="w-full sm:w-auto">
          {COMPANY.email}
        </PlateCta>
        <PlateCta href="/job-openings" variant="outline" size="lg" icon="none" className="w-full sm:w-auto">
          All Openings
        </PlateCta>
      </AtlasCtaBand>

      <JsonLd
        data={[
          jobPostingLd(job),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/job-openings" },
            { name: job.title, path: `/jobs/${job.slug}` },
          ]),
        ]}
      />
    </>
  );
}
