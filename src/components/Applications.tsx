import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { APPLICATIONS } from "@/data/applications";
import { QUOTE_HREF } from "@/data/site";

/**
 * Industries, set out as process trains on a ruled sheet.
 *
 * The sector name is the least useful part of an industries section — every fabricator
 * claims all five. What a plant manager can actually check is the stage sequence and
 * where our scope starts and stops, so those are printed for every sector at once
 * instead of being put behind a selector. The section closes on the one thing we need
 * back from them, stated once.
 */
export function Applications(): React.JSX.Element {
  return (
    <section
      id="applications"
      aria-labelledby="applications-heading"
      className="scroll-mt-24 bg-surface px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="applications-heading"
            eyebrow={APPLICATIONS.eyebrow}
            title={APPLICATIONS.headline}
            body={APPLICATIONS.body}
          />
        </Reveal>

        <div className="mt-16 flex flex-col md:mt-20">
          {APPLICATIONS.items.map((item, itemIndex) => (
            <Reveal key={item.key} delay={Math.min(itemIndex, 4) * 0.04}>
              <article className="grid gap-8 border-t border-hairline-strong py-10 md:grid-cols-12 md:gap-12 md:py-14">
                <div className="flex flex-col md:col-span-4">
                  <h3 className="max-w-[16ch] text-[22px] leading-tight font-block tracking-display text-ink-strong md:text-[28px]">
                    {item.label}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[15px] leading-[23px] font-regular tracking-glide text-ink-muted">
                    {item.summary}
                  </p>
                </div>

                <div className="flex flex-col md:col-span-8">
                  <span className="font-mono text-[10px] leading-none tracking-tech text-ink-muted uppercase">
                    {APPLICATIONS.stagesLabel}
                  </span>
                  {/*
                    The order is the content, so the train wraps as chips with a
                    connector between them rather than sitting in a grid that would
                    reflow the sequence at a narrow width.
                  */}
                  <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
                    {item.stages.map((stage, stageIndex) => (
                      <li key={stage} className="flex items-center gap-2">
                        <span className="rounded-chip border border-hairline-strong bg-canvas px-3.5 py-2 text-[13px] leading-none font-mid tracking-glide text-ink-strong">
                          {stage}
                        </span>
                        {stageIndex < item.stages.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="h-px w-3 shrink-0 bg-accent/60"
                          />
                        ) : null}
                      </li>
                    ))}
                  </ol>

                  <span className="mt-10 font-mono text-[10px] leading-none tracking-tech text-ink-muted uppercase">
                    {APPLICATIONS.scopeLabel}
                  </span>
                  <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                    {item.scope.map((entry) => (
                      <li
                        key={entry}
                        className="relative pl-6 text-[14px] leading-[22px] font-regular tracking-glide text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute top-[11px] left-0 h-px w-3 bg-hairline-strong"
                        />
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="flex flex-col gap-6 border-t border-hairline-strong pt-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[62ch] text-[15px] leading-[23px] font-regular tracking-glide text-ink-muted">
              {APPLICATIONS.dataNote}
            </p>
            <ActionLink
              href={QUOTE_HREF}
              variant="ghost"
              withArrow
              className="self-start md:self-auto"
              ariaLabel="Send your process data to MAC Engineers"
            >
              Send us your process data
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
