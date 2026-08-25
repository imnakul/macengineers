import Image from "next/image";
import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/data/site";

/** Company positioning, paired with two plant photographs on a warm off-white fill. */
export function AboutStrip(): React.JSX.Element {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-surface px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex flex-col">
            <span className="mb-5 text-[12px] font-mid tracking-glide text-ink-muted uppercase">
              20+ years in process equipment
            </span>
            <h2
              id="about-heading"
              className="text-[32px] leading-none font-block tracking-glide text-ink-strong md:text-[48px]"
            >
              {ABOUT.headline}
            </h2>
            <p className="mt-6 max-w-[640px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted">
              {ABOUT.body}
            </p>
            <div className="mt-9">
              <ActionLink href={ABOUT.ctaHref} variant="solid">
                {ABOUT.cta}
              </ActionLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-canvas">
              <Image
                src={ABOUT.primaryImage.src}
                alt={ABOUT.primaryImage.alt}
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain p-6"
              />
            </div>
            <div className="relative aspect-[600/350] overflow-hidden rounded-card bg-canvas">
              <Image
                src={ABOUT.secondaryImage.src}
                alt={ABOUT.secondaryImage.alt}
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain p-6"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
