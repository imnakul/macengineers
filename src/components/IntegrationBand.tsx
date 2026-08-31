import { ActionLink } from "@/components/ui/ActionLink";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Reveal } from "@/components/ui/Reveal";
import { SpecRail } from "@/components/ui/SpecRail";
import { TechLabel } from "@/components/ui/TechLabel";
import { COMPANY, INTEGRATION, QUOTE_HREF } from "@/data/site";

/** The four stages of the engagement, restated as a dimension line on the dark band. */
const HANDOVER = [
  { label: "Stage 01", value: "Design" },
  { label: "Stage 02", value: "Fabrication" },
  { label: "Stage 03", value: "Installation" },
  { label: "Stage 04", value: "Support" },
] as const;

/**
 * The page's single lifted surface. Everything above it sits flat on the canvas or
 * inside a hairline ring, so spending the whole depth budget here — one dark fill, one
 * real drop shadow, one gridded ground and the hi-vis stop of the accent — makes this
 * the block the eye stops on.
 */
export function IntegrationBand(): React.JSX.Element {
  return (
    <section aria-labelledby="integration-heading" className="px-5 pb-28 md:px-13 md:pb-44">
      <Reveal distance={24}>
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-shell bg-inverse shadow-lift">
          <div
            aria-hidden="true"
            className="drafting-grid-inverse pointer-events-none absolute inset-0"
          />
          <CornerTicks tone="inverse" inset="loose" />

          <div className="relative flex flex-col gap-12 p-8 md:p-16">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col">
                <TechLabel index="07" tone="inverse">
                  End to end
                </TechLabel>
                <h2
                  id="integration-heading"
                  className="mt-6 max-w-[12ch] text-[34px] leading-[0.98] font-block tracking-display text-canvas sm:text-[42px] md:text-[52px]"
                >
                  {INTEGRATION.headline}
                </h2>
                <p className="mt-6 max-w-[540px] text-[16px] leading-6 font-regular tracking-glide text-canvas/70 md:text-[17px] md:leading-[27px]">
                  {INTEGRATION.body}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
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
              </div>
            </div>

            <SpecRail items={HANDOVER} tone="inverse" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
