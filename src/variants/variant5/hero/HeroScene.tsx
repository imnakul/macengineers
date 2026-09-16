import React from "react";
import Image from "next/image";
import { MAC_COMPANY } from "../../data/variantsData";
import { Annotation, CapabilityStrip, FlangePlanDrawing, VesselElevationDrawing } from "./HeroArtwork";
import { HeroCopy } from "./HeroCopy";
import { HERO_UNDER_HEADER, type HeroLayoutProps } from "./HeroCurrent";
import { HERO_MACHINE_ALT, HERO_MACHINE_SRC, HeroPlate } from "./HeroPlate";

/**
 * Hero "C" — the full-bleed stage. Copy sits on a white wash on the left; the turnkey render
 * stands large on a lit floor to the right, with a faint mirror reflection and drafting callouts.
 *
 * The stage needs ~1280px before the copy and the machine stop colliding, so narrower screens
 * render Hero "B" (the framed plate) instead — same machine, same copy.
 *
 * TODO: Swap the gradient backdrop for the bright factory-interior plate once it is generated.
 * TODO: When a final hero is chosen, render one layout only — both trees load their image today.
 */
export function HeroScene({ onConsult }: HeroLayoutProps): React.JSX.Element {
  return (
    <>
      <div className="xl:hidden">
        <HeroPlate onConsult={onConsult} />
      </div>

      <section className={`relative isolate hidden overflow-hidden bg-[#F4F7FA] xl:block ${HERO_UNDER_HEADER}`}>
        {/* Backdrop: a lit stage brightest behind the machine, drafting grid, and a floor plane. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(110%_85%_at_74%_38%,#FFFFFF_0%,#EEF2F7_48%,#DAE2EC_100%)]"
        />
        <div aria-hidden="true" className="drafting-grid absolute inset-0 -z-10 opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-linear-to-b from-[#E8EDF3]/0 via-[#DEE5ED]/80 to-[#CCD6E2]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[30%] -z-10 h-px bg-white/90" />

        <div className="relative mx-auto max-w-[1600px]">
          <VesselElevationDrawing className="pointer-events-none absolute left-[37%] top-[6%] w-[11%] text-[#1B5FC4]/20" />
          <FlangePlanDrawing className="pointer-events-none absolute bottom-[3%] right-[10%] w-[10%] text-[#1B5FC4]/25" />

          {/* Machine + floor reflection. Width is capped so the machine never outgrows the section's minimum height. */}
          <div className="pointer-events-none absolute bottom-[8%] right-[1%] aspect-[1448/1158] w-[min(56%,820px)]">
            <Image
              src={HERO_MACHINE_SRC}
              alt={HERO_MACHINE_ALT}
              fill
              fetchPriority="high"
              sizes="(min-width: 1464px) 820px, 56vw"
              className="object-contain object-bottom"
            />
            {/* The render carries ~6% of floor padding under its feet, so the mirror starts twice that above its bottom edge. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[88%] h-full -scale-y-100 opacity-[0.13] [mask-image:linear-gradient(to_top,#000_0%,transparent_28%)]"
            >
              <Image src={HERO_MACHINE_SRC} alt="" fill sizes="(min-width: 1464px) 820px, 56vw" className="object-contain object-bottom" />
            </div>
          </div>

          {/* White wash behind the copy: solid to the far left, feathering out over the machine's hopper end. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[70%] w-screen bg-white/85" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[30%] w-[22%] bg-linear-to-r from-white/85 to-white/0"
          />

          {/* Callouts */}
          <Annotation
            tone="ink"
            rule
            lines={["Plate B-01", "Turnkey process system"]}
            className="absolute left-[49%] top-[9%]"
          />
          <Annotation
            rule
            lines={["Engineered", "Manufactured", "Integrated", "Delivered"]}
            className="absolute left-[46%] top-[33%]"
          />
          <Annotation
            leader
            lines={["From material handling", "to process solutions"]}
            className="absolute right-[3%] top-[7%]"
          />
          <Annotation
            leader
            tone="ink"
            lines={[MAC_COMPANY.headquarters, "ISO 9001:2015"]}
            className="absolute bottom-[5%] right-[3%]"
          />

          <div className="relative mx-auto flex min-h-[max(812px,min(100svh,1012px))] max-w-7xl flex-col justify-center px-8 pb-24 pt-[136px]">
            <div className="max-w-[36rem] 2xl:max-w-[38rem]">
              <HeroCopy onConsult={onConsult} headline="compact" specStyle="ruled" />
            </div>
            {/* Not wrapped in Reveal: it sits inside the bottom 48px the scroll-reveal ignores, so it would never appear. */}
            <div className="absolute bottom-7 left-8">
              <CapabilityStrip prefix={MAC_COMPANY.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
