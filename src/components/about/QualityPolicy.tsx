import { Reveal } from "@/components/ui/Reveal";
import { RuledList } from "@/components/ui/RuledList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PAGE } from "@/data/about";

/**
 * The quality commitments, set as a ruled clause list. This is the closest thing on the
 * site to a contract, so it is typeset like one — numbered, one clause per rule.
 */
export function QualityPolicy(): React.JSX.Element {
  const { quality } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="quality-heading"
      className="px-5 py-24 md:px-13 md:py-36"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id="quality-heading"
              index="06"
              eyebrow="Policy"
              title={quality.heading}
              body={quality.intro}
            />
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:col-span-7">
          <RuledList items={quality.items} />
        </Reveal>
      </div>
    </section>
  );
}
