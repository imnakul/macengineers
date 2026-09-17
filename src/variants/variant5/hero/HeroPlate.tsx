import React from "react";
import Image from "next/image";
import { Reveal } from "../Reveal";
import { Annotation, CapabilityStrip, FlangePlanDrawing, PlateBrackets, VesselElevationDrawing } from "./HeroArtwork";
import { HeroCopy } from "./HeroCopy";
import { HERO_UNDER_HEADER, type HeroLayoutProps } from "./heroLayout";
import { HERO_PLATE_IMAGE } from "./heroImages";

const HERO_MACHINE_ALT =
  "Turnkey stainless steel process system by MAC Engineers: powder hopper and screw conveyor feeding a jacketed reactor, with pump skid, process piping and PLC control panel on one integrated base frame";

/**
 * The drafting plate: the transparent turnkey render standing on a lit sheet, with live-text
 * callouts, a capability strip and oversized registration brackets. Callouts that would crowd
 * a phone-width plate are hidden below `sm`.
 */
function HeroMachinePlate(): React.JSX.Element {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/3.3] overflow-hidden rounded-[8px] border border-[#DDE4EE] bg-linear-to-b from-[#FBFCFE] via-[#F1F5F9] to-[#E1E8F0] shadow-[0_40px_80px_-48px_rgba(13,27,46,0.5)] sm:aspect-[4/3.15]">
        <div className="drafting-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        {/* Floor plane: the lower third darkens slightly so the machine has ground to stand on. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-linear-to-b from-transparent via-[#E3E9F0]/70 to-[#D5DDE7]"
        />
        <VesselElevationDrawing className="pointer-events-none absolute -right-10 top-[20%] hidden w-[24%] text-[#1B5FC4]/20 sm:block" />

        <p className="absolute right-4 top-4 z-10 border-b border-[#0D1B2E]/15 pb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0D1B2E] sm:right-6 sm:top-6 sm:text-[10px]">
          Plate B-01 — Turnkey Process System
        </p>
        <Annotation
          leader
          lines={["Engineered", "Manufactured", "Integrated", "Delivered"]}
          className="absolute right-6 top-[17%] z-10 hidden sm:block"
        />
        <Annotation
          lines={["From", "material handling", "to process solutions"]}
          className="absolute left-6 top-[27%] z-10 hidden sm:block"
        />

        <div className="absolute bottom-[17%] left-[2%] right-[8%] top-[15%] sm:bottom-[13%] sm:right-[15%] sm:top-[14%]">
          <Image
            src={HERO_PLATE_IMAGE.src}
            alt={HERO_MACHINE_ALT}
            fill
            fetchPriority="high"
            sizes={HERO_PLATE_IMAGE.sizes}
            className="object-contain object-bottom"
          />
        </div>

        <CapabilityStrip className="absolute inset-x-4 bottom-3 z-10 justify-center text-center sm:bottom-4" />
      </div>

      <PlateBrackets className="-inset-1.5 sm:-inset-2.5" />
    </figure>
  );
}

/** Homepage hero below 1280px: copy, then the drafting plate (side by side from `lg`), with a blueprint flange crossing the plate edge. */
export function HeroPlate({ onConsult }: HeroLayoutProps): React.JSX.Element {
  return (
    <section className={`relative overflow-hidden bg-white ${HERO_UNDER_HEADER}`}>
      <div className="drafting-grid drafting-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-26 sm:px-6 sm:pt-30 md:pb-20 md:pt-36 lg:px-8 lg:pt-[152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative z-10 lg:col-span-6">
            <HeroCopy onConsult={onConsult} headline="compact" />
          </div>

          <div className="relative lg:col-span-6">
            <Reveal delay={200}>
              <div className="relative">
                <FlangePlanDrawing className="pointer-events-none absolute -left-20 top-[4%] z-10 hidden w-44 text-[#1B5FC4]/25 lg:block xl:-left-24 xl:w-52" />
                <HeroMachinePlate />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
