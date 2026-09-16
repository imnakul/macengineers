import React from "react";
import Image from "next/image";
import { MAC_COMPANY } from "../../data/variantsData";
import { Reveal } from "../Reveal";
import { HeroCopy } from "./HeroCopy";

/** Four steel-blue corner ticks — the drafting-plate registration mark on the framed plate. */
function CornerTicks(): React.JSX.Element {
  const base = "pointer-events-none absolute h-3.5 w-3.5 border-[#1B5FC4]";
  return (
    <span aria-hidden="true" className="absolute inset-0">
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}

/**
 * Homepage heroes slide up under the sticky header, which is transparent until the page scrolls;
 * each hero adds the same height back to its top padding. The header is 64px (72px from `lg`)
 * plus its 1px bottom border.
 */
export const HERO_UNDER_HEADER = "-mt-[65px] lg:-mt-[73px]";

export interface HeroLayoutProps {
  onConsult: () => void;
}

/** Hero "A" — copy left, the full-scene turnkey render framed on the right. The layout that shipped first. */
export function HeroCurrent({ onConsult }: HeroLayoutProps): React.JSX.Element {
  return (
    <section className={`relative overflow-hidden bg-white ${HERO_UNDER_HEADER}`}>
      <div className="drafting-grid drafting-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-26 sm:px-6 sm:pt-30 md:pb-20 md:pt-40 lg:px-8 lg:pt-[168px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <HeroCopy onConsult={onConsult} />
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <figure className="relative">
                {/* Full-scene render: it carries its own plate label, drafting ground and floor, so it fills the frame uncropped. */}
                <div className="group/plate relative aspect-[4/3] overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-[#EEF1F4] shadow-[0_30px_60px_-36px_rgba(13,27,46,0.45)]">
                  <Image
                    src="/images/hero/hero-turnkey-process-system.png"
                    alt="Turnkey stainless steel process system by MAC Engineers: powder hopper and screw conveyor feeding a jacketed reactor, with pump skid, process piping and PLC control panel on one integrated base frame"
                    fill
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,0,0,1)] group-hover/plate:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/plate:scale-100"
                  />
                  <CornerTicks />
                </div>
                <figcaption className="sr-only">Plate B-01 — Turnkey process system</figcaption>
                <div className="mx-4 flex flex-col gap-1 rounded-b-[4px] border border-t-0 border-[#E3E7ED] bg-white px-4 py-3 sm:mx-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Works · {MAC_COMPANY.headquarters}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1B5FC4]">
                    ISO 9001:2015
                  </span>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
