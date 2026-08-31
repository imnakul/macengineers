import type { ReactNode } from "react";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";

interface CtaBandProps {
  index: string;
  eyebrow: string;
  heading: string;
  body: string;
  headingId: string;
  /** The actions themselves, so each page can choose its own pair. */
  children: ReactNode;
}

/**
 * The dark lifted band, reusable across pages. Each page spends its entire depth budget
 * here and nowhere else — everything above sits flat or inside a hairline ring, which is
 * what makes this the block the eye stops on.
 */
export function CtaBand({
  index,
  eyebrow,
  heading,
  body,
  headingId,
  children,
}: CtaBandProps): React.JSX.Element {
  return (
    <section aria-labelledby={headingId} className="px-5 pb-28 md:px-13 md:pb-44">
      <Reveal distance={24}>
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-shell bg-inverse shadow-lift">
          <div
            aria-hidden="true"
            className="drafting-grid-inverse pointer-events-none absolute inset-0"
          />
          <CornerTicks tone="inverse" inset="loose" />

          <div className="relative flex flex-col gap-10 p-8 md:flex-row md:items-end md:justify-between md:p-16">
            <div className="flex flex-col">
              <TechLabel index={index} tone="inverse">
                {eyebrow}
              </TechLabel>
              <h2
                id={headingId}
                className="mt-6 max-w-[14ch] text-[32px] leading-[0.98] font-block tracking-display text-canvas sm:text-[40px] md:text-[48px]"
              >
                {heading}
              </h2>
              <p className="mt-6 max-w-[540px] text-[16px] leading-6 font-regular tracking-glide text-canvas/70 md:text-[17px] md:leading-[27px]">
                {body}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              {children}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
