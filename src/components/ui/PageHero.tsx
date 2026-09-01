import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  /** Larger opening line, set above the body copy. */
  lead?: string;
  subhead?: string;
  /** Id the page's `aria-labelledby` points at. */
  headingId: string;
  children?: ReactNode;
}

/**
 * The masthead for an interior page — the same gridded ground and block-set headline as
 * the landing hero, at a smaller scale so a subpage never out-shouts the front page.
 */
export function PageHero({
  eyebrow,
  headline,
  lead,
  subhead,
  headingId,
  children,
}: PageHeroProps): React.JSX.Element {
  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden px-5 pt-14 pb-20 md:px-13 md:pt-20 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="drafting-grid drafting-fade pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <TechLabel>{eyebrow}</TechLabel>
        </Reveal>

        <Reveal delay={0.06}>
          <h1
            id={headingId}
            className="mt-7 max-w-[16ch] text-[38px] leading-[0.96] font-block tracking-display text-ink-strong sm:text-[50px] md:text-[62px] lg:text-[72px]"
          >
            {headline}
          </h1>
        </Reveal>

        {lead ? (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[620px] text-[18px] leading-[28px] font-block tracking-glide text-ink-strong md:text-[20px] md:leading-[30px]">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {subhead ? (
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-[620px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted md:text-[17px] md:leading-[27px]">
              {subhead}
            </p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={0.22}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
