import { ActionLink } from "@/components/ui/ActionLink";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SpecRail } from "@/components/ui/SpecRail";
import { TechLabel } from "@/components/ui/TechLabel";
import { ABOUT } from "@/data/site";

/**
 * Company positioning on the warm off-white fill, paired with two plates. The rail
 * underneath restates the claim as measured facts — a manufacturer is judged on
 * numbers, so the numbers get their own dimension line rather than staying buried in
 * the paragraph.
 */
export function AboutStrip(): React.JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-surface px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-6">
            <Reveal>
              <TechLabel>The company</TechLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="about-heading"
                className="mt-6 text-[34px] leading-[0.98] font-block tracking-display text-ink-strong sm:text-[42px] md:text-[52px]"
              >
                {ABOUT.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[560px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted md:text-[17px] md:leading-[27px]">
                {ABOUT.body}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9">
                <ActionLink href={ABOUT.ctaHref} variant="solid" withArrow>
                  {ABOUT.cta}
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} distance={24} className="lg:col-span-6">
            <div className="grid gap-4">
              <PlateFrame
                src={ABOUT.primaryImage.src}
                alt={ABOUT.primaryImage.alt}
                caption={ABOUT.primaryImage.caption}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 560px, 90vw"
              />
              <PlateFrame
                src={ABOUT.secondaryImage.src}
                alt={ABOUT.secondaryImage.alt}
                caption={ABOUT.secondaryImage.caption}
                ratio="aspect-[600/330]"
                sizes="(min-width: 1024px) 560px, 90vw"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-16 md:mt-20">
          <SpecRail items={ABOUT.specs} />
        </Reveal>
      </div>
    </section>
  );
}
