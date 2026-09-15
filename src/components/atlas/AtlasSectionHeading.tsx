import React from "react";
import { Reveal } from "@/variants/variant5/Reveal";
import { PlateSurface } from "@/variants/shared/PlateSurface";

interface AtlasSectionHeadingProps {
  /** Two-digit stamp such as "01". Omit for unnumbered sections. */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Id for the `h2`, so the parent section can point `aria-labelledby` at it. */
  headingId?: string;
}

/**
 * Architectural section header: a chamfered index stamp and mono eyebrow over a
 * clean hairline, then the display title and supporting copy.
 * Spacing and title size step down on small screens so the heading never eats the fold.
 */
export function AtlasSectionHeading({
  index,
  eyebrow,
  title,
  description,
  headingId,
}: AtlasSectionHeadingProps): React.JSX.Element {
  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <Reveal>
        <div className="relative flex items-center gap-3 border-b border-[#E3E7ED] pb-3 sm:pb-4">
          {index ? (
            <span className="relative isolate inline-flex shrink-0 items-center py-1 pl-2 pr-1.5 font-mono text-xs font-semibold tracking-[0.22em] text-[#1B5FC4] [--cut:6px]">
              <PlateSurface frameClassName="bg-[#C9D8EE]" faceClassName="bg-[#F2F6FC]" />
              {index}
            </span>
          ) : null}
          <span className="min-w-0 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-[11px] sm:tracking-[0.22em]">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2
          id={headingId}
          className="mt-5 font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0D1B2E] sm:mt-6 sm:text-4xl lg:text-[44px] lg:leading-[1.05]"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={140}>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:mt-4 sm:text-base md:text-[17px]">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
