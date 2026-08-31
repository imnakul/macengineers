import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { ABOUT_PAGE } from "@/data/about";

/** Team and capability, with the plate leading on the left to break the page's rhythm. */
export function TeamCapabilities(): React.JSX.Element {
  const { team } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="team-heading"
      className="bg-surface px-5 py-24 md:px-13 md:py-36"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal distance={24} className="lg:order-1 lg:col-span-5">
          <PlateFrame
            src={team.image.src}
            alt={team.image.alt}
            figure="02"
            caption={team.image.caption}
            ratio="aspect-[600/430]"
            sizes="(min-width: 1024px) 460px, 90vw"
          />
        </Reveal>

        <div className="flex flex-col lg:order-2 lg:col-span-7">
          <Reveal>
            <TechLabel index="05">People</TechLabel>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="team-heading"
              className="mt-6 max-w-[18ch] text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[38px] md:text-[46px]"
            >
              {team.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[620px] text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted md:text-[17px] md:leading-[28px]">
              {team.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
