import React from "react";
import { Reveal } from "@/variants/variant5/Reveal";

interface AtlasCtaBandProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Id the section's `aria-labelledby` points at. */
  headingId: string;
  /** The actions — normally one solid and one outline `PlateCta`. */
  children: React.ReactNode;
}

/**
 * Closing call to action for inner pages, matching the homepage's final section: a
 * white drafting card on the porcelain ground with a centred headline and plate actions.
 * Padding tightens on small screens so the card does not dominate a phone viewport.
 */
export function AtlasCtaBand({ eyebrow, title, body, headingId, children }: AtlasCtaBandProps): React.JSX.Element {
  return (
    <section aria-labelledby={headingId} className="border-t border-[#E3E7ED] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[8px] border border-[#E3E7ED] bg-white px-5 py-10 text-center sm:px-12 sm:py-14 md:py-20">
            <div aria-hidden="true" className="drafting-grid drafting-fade pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B5FC4] sm:text-[11px] sm:tracking-[0.22em]">
                {eyebrow}
              </p>
              <h2
                id={headingId}
                className="mx-auto mt-4 max-w-2xl font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0D1B2E] sm:text-4xl lg:text-[44px] lg:leading-[1.06]"
              >
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:mt-5">{body}</p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                {children}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
