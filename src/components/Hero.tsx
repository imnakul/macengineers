import { ActionLink } from "@/components/ui/ActionLink";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SpecRail } from "@/components/ui/SpecRail";
import { TechLabel } from "@/components/ui/TechLabel";
import { HERO, QUOTE_HREF } from "@/data/site";

/**
 * Hero, composed as sheet 01 of a drawing set rather than as a centred stack.
 *
 * The headline is set as a block — leading 0.92, tracking -3.2% — so three lines land
 * as one shape, and it shares the fold with a single large plate instead of competing
 * with five equal tiles. The remaining renders drop to a captioned detail strip below,
 * which is where a drawing puts its secondary views. All of the page's colour still
 * comes from the product art; the accent appears only on registration marks.
 */
export function Hero(): React.JSX.Element {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden px-5 pt-14 pb-24 md:px-13 md:pt-20 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="drafting-grid drafting-fade pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <TechLabel index="01">Custom process equipment</TechLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h1
                id="hero-heading"
                className="mt-7 max-w-[13ch] text-[42px] leading-[0.94] font-block tracking-display text-ink-strong sm:text-[58px] md:text-[72px] lg:text-[80px]"
              >
                {HERO.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[560px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted md:text-[18px] md:leading-[28px]">
                {HERO.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ActionLink href="#equipment" variant="solid" withArrow>
                  {HERO.cta}
                </ActionLink>
                <ActionLink href={QUOTE_HREF} variant="ghost">
                  Get A Quote
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.24}
            distance={24}
            className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none"
          >
            <PlateFrame
              src={HERO.lead.src}
              alt={HERO.lead.alt}
              figure="01"
              caption={HERO.lead.caption}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 90vw"
              priority
            />
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-16 md:mt-20">
          <SpecRail items={HERO.specs} />
        </Reveal>

        <Reveal delay={0.36} className="mt-14 md:mt-16">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {HERO.scene.map((shot, index) => (
              <PlateFrame
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                figure={String(index + 2).padStart(2, "0")}
                caption={shot.caption}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 280px, 45vw"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
