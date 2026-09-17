import React from "react";
import Image from "next/image";
import { CapabilityStrip } from "./HeroArtwork";
import { HeroCopy } from "./HeroCopy";
import { HERO_UNDER_HEADER, type HeroLayoutProps } from "./heroLayout";
import { HeroPlate } from "./HeroPlate";
import { HERO_FACTORY_IMAGE } from "./heroImages";

const BACKGROUND_ALT =
  "MAC Engineers turnkey process system installed in a bright stainless steel process plant: powder hopper and screw conveyor feeding a jacketed reactor, with pumps, process piping and a PLC control panel";

/** Soft white halo so plain text stays legible where it crosses the photo. */
const TEXT_HALO = "[text-shadow:0_0_6px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.8)]";

/**
 * The homepage hero. From 1280px it is the factory stage: one full screen with the plant photo as the
 * background (including behind the transparent navbar), a progressive blur and white falloff making
 * room for the copy, and a faint grid above the headline. Narrower screens, where the copy and the
 * machine would collide, get the framed drafting plate instead.
 *
 * The photo (hero-factory-dof-extended.jpg, 1586 × 992) has the machine at x ~47–93%. Its box runs 4%
 * past the right edge (only background there), which lands the machine at ~49–97% of the stage. The
 * section is capped at 65vw tall so the box never gets squarer than the photo, which would crop it
 * sideways and push the machine into the copy.
 *
 * On wide monitors the photo sits in a centred frame so the machine stays beside the centred copy.
 * The frame is at most 1920px wide, or 1.54× the screen height on tall screens (keeping the photo's
 * shape while the hero fills the full height). Past 1920px its right edge fades into the white section.
 *
 * Both layouts are in the markup and CSS picks one; the homepage preloads only the image for the
 * current screen size (see heroImages.ts).
 */
export function HeroFactory({ onConsult }: HeroLayoutProps): React.JSX.Element {
  return (
    <>
      <div className="xl:hidden">
        <HeroPlate onConsult={onConsult} />
      </div>

      <section
        className={`relative isolate hidden min-h-[max(780px,min(100svh,65vw))] overflow-hidden bg-white xl:flex xl:flex-col ${HERO_UNDER_HEADER}`}
      >
        <div className="absolute inset-y-0 left-1/2 -z-10 w-full max-w-[max(1920px,154svh)] -translate-x-1/2 min-[1921px]:[mask-image:linear-gradient(to_right,#000_86%,transparent)]">
          <div className="absolute inset-y-0 -right-[4%] left-0 -z-20">
            <Image
              src={HERO_FACTORY_IMAGE.src}
              alt={BACKGROUND_ALT}
              fill
              // Not `preload`: the homepage emits a media-scoped preload for this image (see heroImages.ts).
              fetchPriority="high"
              sizes={HERO_FACTORY_IMAGE.sizes}
              className="object-cover object-[100%_50%]"
            />
          </div>

          {/* The plant slips out of focus toward the copy, under an eased white falloff (many stops on a
              smooth curve rather than one linear ramp), with a faint grid fading out above the headline. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 backdrop-blur-[14px] [mask-image:linear-gradient(100deg,#000_30%,rgba(0,0,0,0.85)_38%,rgba(0,0,0,0.5)_45%,rgba(0,0,0,0.18)_51%,transparent_56%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#fff_0%,#fff_30%,rgba(255,255,255,0.96)_34%,rgba(255,255,255,0.88)_38%,rgba(255,255,255,0.74)_42%,rgba(255,255,255,0.55)_46%,rgba(255,255,255,0.34)_50%,rgba(255,255,255,0.16)_54%,rgba(255,255,255,0.05)_58%,rgba(255,255,255,0)_61%)]"
          />
          <div
            aria-hidden="true"
            className="drafting-grid absolute inset-0 -z-10 opacity-35 [mask-image:radial-gradient(ellipse_42%_38%_at_18%_14%,#000_0%,rgba(0,0,0,0.4)_50%,transparent_80%)]"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-8 pb-24 pt-[120px] 2xl:pt-[136px]">
          <div className="max-w-[37rem] 2xl:max-w-[38rem]">
            <HeroCopy onConsult={onConsult} headline="compact" specStyle="ruled" ctaSize="sm" facts="proof" />
          </div>
          {/* Bottom line: one row aligned to the header's container edges. Not wrapped in Reveal: it sits
              inside the bottom 48px the scroll-reveal ignores, so it would never appear. */}
          <div className="absolute inset-x-8 bottom-7 flex items-center justify-between gap-6">
            <CapabilityStrip className={TEXT_HALO} />
            <p
              className={`shrink-0 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] ${TEXT_HALO}`}
            >
              SS304 · SS316L · MS — ASME · IBR · AWS
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
