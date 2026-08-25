import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY, INTEGRATION, QUOTE_HREF } from "@/data/site";

/**
 * The page's single lifted surface. Everything above it sits flat on the canvas or
 * inside a hairline ring, so spending the whole depth budget here — one dark fill,
 * one real drop shadow — makes this the block the eye stops on.
 */
export function IntegrationBand(): React.JSX.Element {
  return (
    <section
      aria-labelledby="integration-heading"
      className="px-5 pb-24 md:px-13 md:pb-32"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1180px] flex-col gap-10 rounded-shell bg-inverse p-8 shadow-lift md:flex-row md:items-end md:justify-between md:p-16">
          <div className="flex flex-col">
            <span className="mb-5 text-[12px] font-mid tracking-glide text-canvas/60 uppercase">
              End to end
            </span>
            <h2
              id="integration-heading"
              className="max-w-[14ch] text-[32px] leading-none font-block tracking-glide text-canvas md:text-[48px]"
            >
              {INTEGRATION.headline}
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-6 font-regular tracking-glide text-canvas/70">
              {INTEGRATION.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <ActionLink
              href={QUOTE_HREF}
              variant="solid"
              className="bg-canvas text-ink-strong hover:bg-surface"
            >
              Get A Quote
            </ActionLink>
            <ActionLink
              href={COMPANY.phoneHref}
              variant="ghost"
              ariaLabel={`Call MAC Engineers on ${COMPANY.phone}`}
              className="text-canvas shadow-none ring-1 ring-canvas/20 hover:bg-canvas/10"
            >
              {COMPANY.phone}
            </ActionLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
