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
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id="quality-heading"
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
