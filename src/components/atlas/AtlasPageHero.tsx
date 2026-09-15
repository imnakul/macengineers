import React from "react";
import { Reveal } from "@/variants/variant5/Reveal";
import { PlateTag } from "@/variants/shared/PlateTag";
import { AtlasBreadcrumbs, type AtlasBreadcrumbItem } from "./AtlasBreadcrumbs";

interface AtlasPageHeroProps {
  /** Optional section label. Omit when the breadcrumb already provides the same context. */
  eyebrow?: string;
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
}

/**
 * Masthead for Corporate Atlas inner pages: breadcrumb trail, tinted plate eyebrow,
 * display title and supporting copy on the white drafting ground, closed by a hairline
 * so the first content section's background change reads as the start of the page body.
 * The title steps down to 32px on phones so long article titles stay a few lines tall.
 */
export function AtlasPageHero({
  eyebrow,
  title,
  lead,
  description,
  breadcrumbs,
  headingId,
  children,
  aside,
}: AtlasPageHeroProps): React.JSX.Element {
  return (
    <section aria-labelledby={headingId} className="relative overflow-hidden border-b border-[#E3E7ED] bg-white">
      <div aria-hidden="true" className="drafting-grid drafting-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 md:pb-20 md:pt-14 lg:px-8">
        <Reveal>
          <AtlasBreadcrumbs items={breadcrumbs} />
        </Reveal>

        <div className={`mt-8 grid grid-cols-1 gap-10 sm:mt-10 ${aside ? "lg:grid-cols-12 lg:items-end lg:gap-16" : ""}`}>
          <div className={aside ? "min-w-0 lg:col-span-7" : "min-w-0 max-w-3xl"}>
            {eyebrow ? (
              <Reveal delay={60}>
                <PlateTag as="p" size="sm" skin="tint">
                  {eyebrow}
                </PlateTag>
              </Reveal>
            ) : null}
            <Reveal delay={120}>
              <h1
                id={headingId}
                className={`${eyebrow ? "mt-4 sm:mt-5" : "mt-0"} break-words font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0D1B2E] sm:text-5xl sm:leading-[1.05] lg:text-[56px] lg:leading-none`}
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
      </div>
    </section>
  );
}
