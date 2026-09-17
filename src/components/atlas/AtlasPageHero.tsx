import React from "react";
import Image from "next/image";
import { Reveal } from "@/variants/variant5/Reveal";
import { AtlasBreadcrumbs, type AtlasBreadcrumbItem } from "./AtlasBreadcrumbs";

/** A transparent cut-out scene whose subject sits on its right, trimmed to its visible pixels. */
export interface AtlasPageHeroImage {
  src: string;
  alt: string;
}

interface AtlasPageHeroProps {
  title: string;
  /** Larger opening line under the title. */
  lead?: string;
  description?: string;
  breadcrumbs: readonly AtlasBreadcrumbItem[];
  /** Id the page's `aria-labelledby` points at. */
  headingId: string;
  /** Rendered under the copy — meta rows, actions. */
  children?: React.ReactNode;
  /** Optional right-hand column on large screens (e.g. a fact panel). */
  aside?: React.ReactNode;
  /**
   * Optional scene standing on the header's bottom rule: to the right of the copy on large screens,
   * under it on smaller ones. Ignored when `aside` is set, since both claim the right-hand side.
   */
  image?: AtlasPageHeroImage;
}

/**
 * Masthead for Corporate Atlas inner pages: breadcrumb trail, display title and supporting copy on the white drafting ground, closed by a hairline
 * so the first content section's background change reads as the start of the page body.
 * The title steps down to 32px on phones so long article titles stay a few lines tall.
 */
export function AtlasPageHero({
  title,
  lead,
  description,
  breadcrumbs,
  headingId,
  children,
  aside,
  image,
}: AtlasPageHeroProps): React.JSX.Element {
  const scene = aside ? undefined : image;

  return (
    <section aria-labelledby={headingId} className="relative overflow-hidden border-b border-[#E3E7ED] bg-white">
      <div aria-hidden="true" className="drafting-grid drafting-fade pointer-events-none absolute inset-0" />
      <div
        className={`relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 md:pb-20 md:pt-14 lg:px-8 ${
          scene ? "lg:flex lg:min-h-[440px] lg:flex-col" : ""
        }`}
      >
        {scene ? (
          // Large screens: the scene fills the right half of the header, feet on the bottom rule.
          // Each copy is display:none at the other size, so only one is ever announced.
          <div className="pointer-events-none absolute bottom-0 right-8 top-6 hidden w-[52%] lg:block">
            <Image src={scene.src} alt={scene.alt} fill fetchPriority="high" sizes="(max-width: 1280px) 52vw, 640px" className="object-contain object-right-bottom" />
          </div>
        ) : null}

        <Reveal>
          <AtlasBreadcrumbs items={breadcrumbs} />
        </Reveal>

        <div
          className={`mt-8 grid grid-cols-1 gap-10 sm:mt-10 ${aside ? "lg:grid-cols-12 lg:items-end lg:gap-16" : ""} ${
            scene ? "lg:my-auto lg:pb-6" : ""
          }`}
        >
          <div className={aside ? "min-w-0 lg:col-span-7" : `min-w-0 max-w-3xl ${scene ? "lg:max-w-[44%]" : ""}`}>
            <Reveal delay={120}>
              <h1
                id={headingId}
                className={`break-words font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0D1B2E] sm:text-5xl sm:leading-[1.05] lg:text-[56px] lg:leading-none`}
              >
                {title}
              </h1>
            </Reveal>
            {lead ? (
              <Reveal delay={180}>
                <p className="mt-5 max-w-2xl text-[17px] font-medium leading-relaxed text-[#0D1B2E] sm:mt-6 md:text-xl">{lead}</p>
              </Reveal>
            ) : null}
            {description ? (
              <Reveal delay={220}>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-[17px]">
                  {description}
                </p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={260}>
                <div className="mt-6 sm:mt-8">{children}</div>
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={200} className="lg:col-span-5">
              {aside}
            </Reveal>
          ) : null}
        </div>

        {scene ? (
          // Smaller screens: the scene sits under the copy; the negative margin cancels the bottom padding
          // so it stands on the rule too.
          <div className="relative -mb-12 mt-8 aspect-[3/2] sm:-mb-16 md:-mb-20 md:aspect-[2/1] lg:hidden">
            <Image src={scene.src} alt={scene.alt} fill fetchPriority="high" sizes="(max-width: 768px) 92vw, 720px" className="object-contain object-bottom" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
