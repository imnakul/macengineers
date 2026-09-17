import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { ABOUT_PAGE } from "@/data/about";

/**
 * The founding story, paired with a plate. The certification sits in its own ringed
 * chip rather than inside the paragraph — a third-party standard is the kind of claim a
 * buyer scans for, and burying it in prose makes them hunt.
 */
export function BrandStory(): React.JSX.Element {
  const { story } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="story-heading"
      className="py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-7">
          <Reveal>
            <TechLabel>Brand story</TechLabel>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="story-heading"
              className="mt-6 max-w-[20ch] text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[38px] md:text-[46px]"
            >
              {story.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[620px] text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted md:text-[17px] md:leading-[28px]">
              {story.body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 inline-flex items-center gap-3 self-start rounded-chip px-4 py-3 shadow-ring">
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 bg-accent" />
              <span className="font-mono text-[11px] tracking-tech text-ink-strong uppercase">
                {story.certification}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} distance={24} className="lg:col-span-5">
          <PlateFrame
            src={story.image.src}
            alt={story.image.alt}
            caption={story.image.caption}
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 460px, 90vw"
            depth="scene"
            priority
          />
        </Reveal>
      </div>
    </section>
  );
}
