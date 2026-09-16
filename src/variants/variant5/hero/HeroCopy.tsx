import React from "react";
import { MAC_COMPANY } from "../../data/variantsData";
import { PlateCta } from "../../shared/PlateCta";
import { PlateTag } from "../../shared/PlateTag";
import { Reveal } from "../Reveal";

interface HeroFact {
  label: string;
  value: string;
}

const HERO_SPECS: readonly HeroFact[] = [
  { label: "Materials", value: "SS304 / SS316L / MS" },
  { label: "Standards", value: "ASME · IBR · AWS" },
  { label: "HSE Record", value: "Zero Accident" },
  { label: "Reach", value: "Pan-India Delivery" },
];

/** Proof row that replaces both the specs and the separate metrics band, so no fact repeats. */
const HERO_PROOF: readonly HeroFact[] = [
  { label: "Heritage", value: "15+ Yrs Engineering" },
  { label: "Quality", value: "ISO 9001:2015" },
  { label: "Safety", value: "Zero-Accident HSE" },
  { label: "Delivery", value: "Pan-India Projects" },
];

export interface HeroCopyProps {
  /** Opens the project-consultation RFQ. */
  onConsult: () => void;
  /** `ruled` separates the spec cells with hairlines, for heroes that sit on imagery. */
  specStyle?: "plain" | "ruled";
  /** `compact` steps the display size down for layouts whose copy column is narrower. */
  headline?: "default" | "compact";
  /** Button size; `sm` keeps both CTAs on one row in narrow copy columns. */
  ctaSize?: "sm" | "md";
  /**
   * `proof`: the eyebrow carries the works location and the fact row carries the company proof
   * points (heritage, quality, safety, delivery), for layouts that drop the metrics band.
   */
  facts?: "specs" | "proof";
}

const HEADLINE_SIZE: Record<NonNullable<HeroCopyProps["headline"]>, string> = {
  default: "lg:text-[64px] lg:leading-[1.02]",
  compact: "lg:text-[52px] lg:leading-[1.03] xl:text-[58px] 2xl:text-[62px]",
};

/**
 * The homepage hero's copy column: status tag, headline, lede, the two CTAs and the
 * spec row. Every hero layout renders this, so the wording never drifts between them.
 */
export function HeroCopy({
  onConsult,
  specStyle = "plain",
  headline = "default",
  ctaSize = "md",
  facts = "specs",
}: HeroCopyProps): React.JSX.Element {
  const ruled = specStyle === "ruled";
  const proof = facts === "proof";
  const rows = proof ? HERO_PROOF : HERO_SPECS;

  return (
    <>
      <Reveal>
        <PlateTag as="p" size="sm" skin="tint">
          {proof ? (
            // One text node wrapper: the tag spaces its children apart, which would detach ", India".
            <span>
              Est. {MAC_COMPANY.established} · Ankleshwar, Gujarat<span className="hidden sm:inline">, India</span>
            </span>
          ) : (
            <>
              Est. {MAC_COMPANY.established} · ISO 9001:2015<span className="hidden sm:inline">{" "}Certified System</span>
            </>
          )}
        </PlateTag>
      </Reveal>

      <Reveal delay={90}>
        <h1 className={`mt-6 font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.025em] text-[#0D1B2E] sm:mt-7 sm:text-5xl ${HEADLINE_SIZE[headline]}`}>
          Engineering Productivity for Process Industries
        </h1>
      </Reveal>

      <Reveal delay={170}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          MAC Engineers combines industrial equipment manufacturing, mechanical project execution,
          process systems and automation to move customers from process requirement to reliable
          production.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <PlateCta onClick={onConsult} size={ctaSize} className="w-full sm:w-auto">
            Request a Project Consultation
          </PlateCta>
          <PlateCta href="#pillars" variant="outline" icon="arrow-down" size={ctaSize} className="w-full sm:w-auto">
            Explore Manufacturing &amp; Services
          </PlateCta>
        </div>
      </Reveal>

      <Reveal delay={310}>
        {/* `ruled`: cells size to their content (no wrapping) and are split by hairlines. */}
        <dl
          className={`mt-10 grid grid-cols-2 gap-y-5 border-t border-[#E3E7ED] pt-6 sm:mt-12 ${
            ruled ? "gap-x-6 sm:flex sm:gap-x-0 sm:divide-x sm:divide-[#E3E7ED]" : "gap-x-6 sm:grid-cols-4"
          }`}
        >
          {rows.map((spec, index) => (
            <div
              key={spec.label}
              className={ruled ? `sm:whitespace-nowrap ${index === 0 ? "sm:pr-5" : "sm:px-5"}` : undefined}
            >
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                {spec.label}
              </dt>
              <dd className="mt-1.5 text-[13px] font-semibold text-[#0D1B2E]">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </>
  );
}
