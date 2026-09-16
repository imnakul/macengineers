import React from "react";
import Image from "next/image";
import { MAC_COMPANY } from "../../data/variantsData";
import {
  Annotation,
  CapabilityStrip,
  FlangePlanDrawing,
  VesselElevationDrawing,
} from "./HeroArtwork";
import { HeroCopy } from "./HeroCopy";
import { HERO_UNDER_HEADER, type HeroLayoutProps } from "./HeroCurrent";
import { HeroPlate } from "./HeroPlate";
import { HERO_FACTORY_FINAL_IMAGE } from "./heroImages";

/*
 * hero-factory-stage*.jpg (2600 × 1500, built by assets/renders-source/build-hero-factory-bg.py) are
 * plant photos with ceiling added above them (for the transparent navbar), floor below, and extra
 * plant to the left. Machine: x ≈ 53–97%, motor top y 22%, feet y 77%.
 *
 * The hero is one full screen tall and the photo covers it, anchored right. On typical laptop
 * and desktop screens that keeps the machine between ~49% and ~97% of the width, clear of the
 * copy; very wide, short screens crop the photo vertically around y 40% instead.
 */
export type HeroFactoryPhoto =
  "standard" | "outpainted" | "dof" | "tall-vessel-logo";

interface PhotoStaging {
  src: string;
  /** Section height: the hero is one screen tall, capped where the photo's proportions require it. */
  height: string;
  /** How the photo is anchored inside the section. */
  position: string;
  /** Box the photo covers; a negative right inset lets empty background past the machine run off-screen. */
  frame: string;
}

const PHOTOS: Record<HeroFactoryPhoto, PhotoStaging> = {
  standard: {
    src: "/images/hero/hero-factory-stage.jpg",
    height: "min-h-[max(780px,100svh)]",
    position: "object-[100%_40%]",
    frame: "inset-0",
  },
  /*
   * hero-factory-outpainted.jpg (1695 × 1095, assets/renders-source/build-hero-factory-direct.py) is a
   * fully painted scene: only its own roof is mirrored upward and a thin plant strip on the far left.
   * Machine: x 50–97.5%, motor top y 28%, feet y 81%. The cap at 64.6vw keeps the section no taller
   * than the photo's shape, so the machine never slides into the copy on squarer screens; on wider
   * screens the crop falls mostly on the mirrored roof (y 60%).
   */
  outpainted: {
    src: "/images/hero/hero-factory-outpainted.jpg",
    height: "min-h-[max(780px,min(100svh,64.6vw))]",
    position: "object-[100%_60%]",
    frame: "inset-0",
  },
  /*
   * hero-factory-dof-extended.jpg (1586 × 992, 16:10): ChatGPT's outpainted version of the depth-of-field
   * render, used untouched (PNG → JPEG only). Machine in the photo: x ~47–93%, motor top ~18%, feet ~72%.
   * The photo box runs 4% past the right edge (only background there), which lands the machine at
   * ~49–97% of the stage; the 65vw cap keeps the box at least as wide as the photo's shape, so the
   * crop never pushes the machine into the copy.
   */
  dof: {
    src: HERO_FACTORY_FINAL_IMAGE.src,
    height: "min-h-[max(780px,min(100svh,65vw))]",
    position: "object-[100%_50%]",
    frame: "inset-y-0 left-0 -right-[4%]",
  },
  "tall-vessel-logo": {
    src: "/images/hero/hero-factory-stage-tall-logo.jpg",
    height: "min-h-[max(780px,100svh)]",
    position: "object-[100%_40%]",
    frame: "inset-0",
  },
};
const BACKGROUND_ALT =
  "MAC Engineers turnkey process system installed in a bright stainless steel process plant: powder hopper and screw conveyor feeding a jacketed reactor, with pumps, process piping and a PLC control panel";

/** Soft white halo so plain text stays legible where it crosses the photo. */
const TEXT_HALO =
  "[text-shadow:0_0_6px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.8)]";

/**
 * `full`: drafting callouts, blueprint drawings and light overlays on the ceiling and floor.
 * `minimal`: the plant stays untouched apart from the copy wash; only the bottom line
 * (capability strip + works location) remains.
 * `final`: `minimal` with a progressive-blur transition, a faint grid above the headline, the proof row
 * in the copy (the page drops its metrics band), and materials/codes on the bottom line.
 */
export type HeroFactoryDecor = "full" | "minimal" | "final";

export interface HeroFactoryProps extends HeroLayoutProps {
  /** Which plant photo to stage. `outpainted` is the fully painted wide scene; `dof` is the depth-of-field render; `tall-vessel-logo` has the MAC logo on the reactor. */
  photo?: HeroFactoryPhoto;
  decor?: HeroFactoryDecor;
}

/**
 * Hero "D" — the factory stage. One full screen: the plant photo is the background (including
 * behind the transparent navbar) and a white wash from the left makes room for the copy.
 *
 * Below 1280px the copy and the machine would collide, so narrower screens render Hero "B"
 * (the framed plate) instead.
 *
 * TODO: When a final hero is chosen, render one layout only — both trees load an image today.
 */
export function HeroFactory({
  onConsult,
  photo = "standard",
  decor = "full",
}: HeroFactoryProps): React.JSX.Element {
  const full = decor === "full";
  const final = decor === "final";
  const staging = PHOTOS[photo];
  /*
   * `final` stages the photo in a centred frame, so on wide monitors the machine stays beside the
   * centred copy instead of drifting to the far right. The frame is at most 1920px wide, or 1.54× the
   * screen height on tall screens, which keeps it at the photo's shape while the hero fills the full
   * height. Past 1920px the frame's right edge fades into the white section.
   */
  const stage = final
    ? "absolute inset-y-0 left-1/2 -z-10 w-full max-w-[max(1920px,154svh)] -translate-x-1/2 min-[1921px]:[mask-image:linear-gradient(to_right,#000_86%,transparent)]"
    : "contents";

  return (
    <>
      <div className="xl:hidden">
        <HeroPlate onConsult={onConsult} />
      </div>

      <section
        className={`relative isolate hidden overflow-hidden bg-white xl:flex xl:flex-col ${staging.height} ${HERO_UNDER_HEADER}`}
      >
        <div className={stage}>
          <div className={`absolute -z-20 ${staging.frame}`}>
            <Image
              src={staging.src}
              alt={BACKGROUND_ALT}
              fill
              // Not `preload`: the homepage emits a media-scoped preload for this image (see heroImages.ts).
              fetchPriority="high"
              sizes={HERO_FACTORY_FINAL_IMAGE.sizes}
              className={`object-cover ${staging.position}`}
            />
          </div>

          {/* Copy wash from the left (always); roof glow and a bottom-left settle only in `full`.
            `minimal` reaches further and leans right toward the bottom, following the lede and buttons.
            `final` layers a progressive blur (the plant slips out of focus toward the copy) under an
            eased white falloff — many stops on a smooth curve instead of one linear ramp. */}
          {final ? (
            <>
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
            </>
          ) : (
            <div
              aria-hidden="true"
              className={`absolute inset-0 -z-10 ${
                full
                  ? "bg-linear-to-r from-white from-28% via-white/75 via-40% to-white/0 to-55%"
                  : "bg-linear-100 from-white from-34% via-white/80 via-47% to-white/0 to-61%"
              }`}
            />
          )}
          {full ? (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-[18%] bg-linear-to-b from-white/55 to-white/0"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-[22%] bg-linear-to-t from-white/80 to-white/0 [mask-image:linear-gradient(to_right,#000_40%,transparent_75%)]"
              />

              <VesselElevationDrawing className="pointer-events-none absolute left-[37%] top-[12%] w-[10%] text-[#1B5FC4]/20" />
              <FlangePlanDrawing className="pointer-events-none absolute bottom-[6%] right-[13%] w-[8%] text-[#1B5FC4]/30" />

              <Annotation
                halo
                rule
                lines={["Plate B-01", "Process system"]}
                className="absolute left-[50%] top-[17%]"
              />
              <Annotation
                halo
                rule
                lines={[
                  "Engineered",
                  "Manufactured",
                  "Integrated",
                  "Delivered",
                ]}
                className="absolute left-[46%] top-[30%] 2xl:left-[47%]"
              />
              <Annotation
                halo
                rule
                lines={["From material handling", "to process solutions"]}
                className="absolute right-[2.5%] top-[14%]"
              />
              <Annotation
                halo
                lines={["Built", "For what’s", "Next"]}
                className="absolute left-[89.5%] top-[83%]"
              />
            </>
          ) : null}
        </div>

        {/* `full` keeps its two-line works stamp floating on the floor; the clean modes put the
            location on the bottom line instead (ISO is already in the eyebrow tag). */}
        {full ? (
          <>
            <Annotation
              halo
              lines={[MAC_COMPANY.headquarters, "ISO 9001:2015"]}
              className="absolute bottom-[3.5%] right-[5%]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[6.6%] right-[2%] h-px w-6 bg-[#1B5FC4]/60"
            />
          </>
        ) : null}

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-8 pb-24 pt-[120px] 2xl:pt-[136px]">
          <div className="max-w-[37rem] 2xl:max-w-[38rem]">
            <HeroCopy
              onConsult={onConsult}
              headline="compact"
              specStyle="ruled"
              ctaSize="sm"
              facts={final ? "proof" : "specs"}
            />
          </div>
          {/* Bottom line: one row aligned to the header's container edges, so the strip and the location
              share a baseline. Not wrapped in Reveal: it sits inside the bottom 48px the scroll-reveal
              ignores, so it would never appear. Off the settle gradient it gets the halo. */}
          <div className="absolute inset-x-8 bottom-7 flex items-center justify-between gap-6">
            <CapabilityStrip
              prefix={MAC_COMPANY.name}
              className={full ? undefined : TEXT_HALO}
            />
            {full ? null : (
              <p
                className={`shrink-0 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] ${TEXT_HALO}`}
              >
                {final
                  ? "SS304 · SS316L · MS — ASME · IBR · AWS"
                  : MAC_COMPANY.headquarters}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
