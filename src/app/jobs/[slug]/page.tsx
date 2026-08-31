import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpecRail } from "@/components/ui/SpecRail";
import { TechLabel } from "@/components/ui/TechLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import { CAREERS_PAGE, JOBS, type Job } from "@/data/jobs";
import { breadcrumbLd, jobPostingLd } from "@/lib/structured-data";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

/** Both roles are known at build time, so both pages are prerendered. */
export function generateStaticParams(): { slug: string }[] {
  return JOBS.map((job) => ({ slug: job.slug }));
}

function findJob(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/jobs/[slug]">): Promise<Metadata> {
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

/**
 * A single role.
 *
 * Applications go to the company inbox with the role in the subject line rather than
 * through a form — see the note in src/data/jobs.ts on why CVs are deliberately kept
 * out of this system.
 */
export default async function JobPage({
  params,
}: PageProps<"/jobs/[slug]">): Promise<React.JSX.Element> {
  const { slug } = await params;
  const job = findJob(slug);

  if (!job) notFound();

  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    `Application — ${job.title}`,
  )}`;

  return (
    <>
      <PageHero
        index="01"
        eyebrow={job.category}
        headline={job.title}
        headingId="job-heading"
      >
        <div className="flex flex-col gap-8">
          <ul className="flex flex-wrap gap-2">
            {[job.type, ...job.locations].map((tag) => (
              <li
                key={tag}
                className="rounded-chip px-3 py-1.5 font-mono text-[10px] tracking-tech text-ink-muted uppercase shadow-ring"
              >
                {tag}
              </li>
            ))}
          </ul>

          <Link
            href="/job-openings"
            className="inline-flex w-fit items-center gap-2 font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui hover:text-accent"
          >
            <span aria-hidden="true">&larr;</span>
            All openings
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="job-detail-heading" className="px-5 pb-24 md:px-13 md:pb-36">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="job-detail-heading" className="sr-only">
            Role detail
          </h2>

          <Reveal>
            <SpecRail items={job.meta} />
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <TechLabel index="02">{job.summaryHeading}</TechLabel>
                <p className="mt-6 text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted md:text-[17px] md:leading-[28px]">
                  {job.summary}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-12 lg:col-span-8">
              {job.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.05}>
                  <section aria-labelledby={`section-${index}`}>
                    <h3
                      id={`section-${index}`}
                      className="font-mono text-[10px] tracking-tech text-ink-muted uppercase"
                    >
                      {section.heading}
                    </h3>
                    <ul className="mt-5 flex flex-col">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-4 border-t border-hairline py-4 last:border-b"
                        >
                          <span
                            aria-hidden="true"
                            className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] bg-accent"
                          />
                          <span className="text-[15px] leading-[23px] font-regular tracking-glide text-ink">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <SpecRail items={job.closing} className="sm:grid-cols-2" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="apply-heading"
        className="bg-surface px-5 py-20 md:px-13 md:py-28"
      >
        <Reveal>
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
            <TechLabel index="03">Apply</TechLabel>
            <h2
              id="apply-heading"
              className="text-[28px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[34px] md:text-[40px]"
            >
              {CAREERS_PAGE.applyHeading}
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted">
              {CAREERS_PAGE.applyBody}
            </p>
            <ActionLink
              href={mailtoHref}
              variant="solid"
              withArrow
              ariaLabel={`Email your application for ${job.title} to ${COMPANY.email}`}
            >
              {COMPANY.email}
            </ActionLink>
          </div>
        </Reveal>
      </section>

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
