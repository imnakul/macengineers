"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { LABEL_CLASS } from "@/components/ui/fieldStyles";
import { CAREERS_PAGE, type Job } from "@/data/jobs";

interface JobListProps {
  jobs: readonly Job[];
}

/** Matches "any" — the value used when a filter is not narrowing anything. */
const ANY = "";

const SELECT_CLASS =
  "w-full appearance-none rounded-btn border border-hairline-strong bg-canvas px-4 py-3 text-[15px] font-regular tracking-glide text-ink-strong transition-[border-color] duration-150 ease-ui hover:border-ink-muted/40 focus:border-accent focus:outline-none";

/** Unique, sorted values pulled off the jobs themselves rather than hardcoded. */
function optionsOf(jobs: readonly Job[], pick: (job: Job) => readonly string[]): string[] {
  return [...new Set(jobs.flatMap(pick))].sort((a, b) => a.localeCompare(b));
}

/**
 * The openings list with its three filters.
 *
 * Filtering happens in the browser over a list of two: fetching or routing for this
 * would cost a round trip to narrow a set small enough to read at a glance. The result
 * count is announced so the filters are usable without seeing the list change.
 */
export function JobList({ jobs }: JobListProps): React.JSX.Element {
  const [category, setCategory] = useState<string>(ANY);
  const [type, setType] = useState<string>(ANY);
  const [location, setLocation] = useState<string>(ANY);
  const id = useId();

  const categories = useMemo(() => optionsOf(jobs, (job) => [job.category]), [jobs]);
  const types = useMemo(() => optionsOf(jobs, (job) => [job.type]), [jobs]);
  const locations = useMemo(() => optionsOf(jobs, (job) => job.locations), [jobs]);

  const visible = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (category === ANY || job.category === category) &&
          (type === ANY || job.type === type) &&
          (location === ANY || job.locations.includes(location)),
      ),
    [jobs, category, type, location],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-category`} className={LABEL_CLASS}>
            Category
          </label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event): void => setCategory(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value={ANY}>{CAREERS_PAGE.filters.category}</option>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-type`} className={LABEL_CLASS}>
            Type
          </label>
          <select
            id={`${id}-type`}
            value={type}
            onChange={(event): void => setType(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value={ANY}>{CAREERS_PAGE.filters.type}</option>
            {types.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-location`} className={LABEL_CLASS}>
            Location
          </label>
          <select
            id={`${id}-location`}
            value={location}
            onChange={(event): void => setLocation(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value={ANY}>{CAREERS_PAGE.filters.location}</option>
            {locations.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
        {visible.length} {visible.length === 1 ? "role" : "roles"}
      </p>

      {visible.length === 0 ? (
        <p className="rounded-card bg-surface p-7 text-[15px] leading-[24px] tracking-glide text-ink-muted md:p-8">
          {CAREERS_PAGE.emptyState}
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {visible.map((job, index) => (
            <li key={job.slug}>
              <Reveal delay={index * 0.05}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="group relative flex flex-col gap-5 overflow-hidden rounded-card bg-canvas p-7 shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong md:p-8"
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="max-w-[28ch] text-[22px] leading-tight font-strong tracking-glide text-ink-strong transition-[color] duration-150 ease-ui group-hover:text-accent md:text-[26px]">
                      {job.title}
                    </h3>
                    <p className="max-w-[62ch] text-[15px] leading-[23px] font-regular tracking-glide text-ink-muted">
                      {job.teaser}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {[job.category, job.type, ...job.locations].map((tag) => (
                      <li
                        key={`${job.slug}-${tag}`}
                        className="rounded-chip px-3 py-1.5 font-mono text-[10px] tracking-tech text-ink-muted uppercase shadow-ring"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
