import { Reveal } from "@/components/ui/Reveal";
import { RuledList } from "@/components/ui/RuledList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PAGE } from "@/data/about";

/** Scope of work, closed by the client-base note the source places under "Trusted By". */
export function Expertise(): React.JSX.Element {
  const { expertise, trustedBy } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="expertise-heading"
      className="py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id="expertise-heading"
              eyebrow="Scope"
              title={expertise.heading}
              body={expertise.intro}
            />
          </Reveal>
        </div>

        <div className="flex flex-col lg:col-span-7">
          <Reveal delay={0.08}>
            <RuledList items={expertise.items} />
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 rounded-card bg-surface p-7 md:p-8">
              <h3 className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
                {trustedBy.heading}
              </h3>
              <p className="mt-4 text-[15px] leading-[24px] font-regular tracking-glide text-ink md:text-[16px] md:leading-[26px]">
                {trustedBy.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
