import Image from "next/image";
import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { HERO, QUOTE_HREF } from "@/data/site";

/**
 * Hero. The headline is set as a block — leading 1, tracking -2% — so the two lines
 * land as one shape. Below it, the five equipment renders run as a single scene band
 * rather than five separate cards: the product art carries all of the page's colour.
 */
export function Hero(): React.JSX.Element {
  return (
    <section aria-labelledby="hero-heading" className="px-5 pt-16 pb-24 md:px-13 md:pt-24 md:pb-32">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[40px] leading-none font-block tracking-glide text-ink-strong sm:text-[56px] md:text-[72px] lg:text-[85px]"
          >
            {HERO.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-7 max-w-[640px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted md:text-[20px] md:leading-[26px]">
            {HERO.subhead}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ActionLink href="#equipment" variant="solid">
              {HERO.cta}
            </ActionLink>
            <ActionLink href={QUOTE_HREF} variant="ghost">
              Get A Quote
            </ActionLink>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.18} className="mt-16 md:mt-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {HERO.scene.map((shot, index) => (
            <div
              key={shot.src}
              className={`relative aspect-square overflow-hidden rounded-card bg-surface ${
                index === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                priority={index < 2}
                className="object-contain p-3"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
