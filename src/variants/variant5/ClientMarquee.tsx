"use client";

import React from "react";
import Image from "next/image";
import { CLIENT_LOGOS, type ClientLogo } from "@/data/clients";
import { Reveal } from "./Reveal";

/** Horizontal space between logos, desktop scale (px). Also trails each copy so the loop seam matches. */
const LOGO_GAP = 72;
/** Scroll speed in px/s. Slow enough to read a wordmark as it passes. */
const SCROLL_SPEED = 40;

const TRACK_WIDTH = CLIENT_LOGOS.reduce((total, logo) => total + logo.displayWidth + LOGO_GAP, 0);
const LOOP_SECONDS = Math.round(TRACK_WIDTH / SCROLL_SPEED);

/* Inline style is unavoidable: the gap and loop length come from the logo data above. */
const TRACK_STYLE = {
  animationDuration: `${LOOP_SECONDS}s`,
  "--logo-gap": `${LOGO_GAP}px`,
} satisfies React.CSSProperties & Record<"--logo-gap", string>;

function LogoRow({ logos, isDuplicate }: { logos: readonly ClientLogo[]; isDuplicate: boolean }): React.JSX.Element {
  return (
    <ul
      role="list"
      aria-hidden={isDuplicate || undefined}
      className={`flex shrink-0 items-center gap-x-[calc(var(--logo-gap)*var(--logo-scale))] pr-[calc(var(--logo-gap)*var(--logo-scale))] motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-10 motion-reduce:px-4 ${
        isDuplicate ? "motion-reduce:hidden" : ""
      }`}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex shrink-0 items-center">
          <Image
            src={logo.src}
            alt={isDuplicate ? "" : logo.name}
            width={logo.displayWidth}
            height={logo.displayHeight}
            sizes={`${logo.displayWidth}px`}
            draggable={false}
            /* Inline style is unavoidable: each logo has its own optical size, scaled by the band's --logo-scale. */
            style={{
              width: `calc(${logo.displayWidth}px * var(--logo-scale))`,
              height: `calc(${logo.displayHeight}px * var(--logo-scale))`,
            }}
            /* Multiply drops the white plate baked into the two JPEG-sourced marks. */
            className="select-none object-contain mix-blend-multiply"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * "Trusted by" band: client logos on an endless horizontal loop.
 *
 * The list renders twice and the track slides by exactly one copy (-50%), so the loop has no seam.
 * The copy is hidden from assistive tech. Motion pauses on hover. Under reduced motion the band
 * becomes a static, centred wrap of the logos instead.
 */
export function ClientMarquee(): React.JSX.Element {
  return (
    <section
      aria-labelledby="clients-heading"
      className="border-y border-[#E3E7ED] bg-white py-10 [--logo-scale:0.78] sm:py-12 md:py-14 md:[--logo-scale:1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-[11px] sm:tracking-[0.22em]">
              Our Clients
            </p>
            <h2
              id="clients-heading"
              className="mt-2 font-display text-lg font-semibold tracking-[-0.015em] text-[#0D1B2E] sm:text-xl"
            >
              Trusted by leading process manufacturers
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="group/marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] sm:mt-10 motion-reduce:[mask-image:none]">
        <div
          style={TRACK_STYLE}
          className="flex w-max animate-marquee py-2 group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
        >
          <LogoRow logos={CLIENT_LOGOS} isDuplicate={false} />
          <LogoRow logos={CLIENT_LOGOS} isDuplicate />
        </div>
      </div>
    </section>
  );
}
