import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PAGE } from "@/data/about";

/**
 * The four counted figures. On the source these animate up from zero on scroll; here
 * they are simply printed. A number a buyer wants to read should not be withheld
 * pending an animation — and it should survive with JavaScript disabled.
 */
export function Achievements(): React.JSX.Element {
  const { achievements } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="achievements-heading"
      className="bg-surface px-5 py-24 md:px-13 md:py-36"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="achievements-heading"
            index="03"
            eyebrow="By the numbers"
            title={achievements.heading}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-2 lg:grid-cols-4">
            {achievements.items.map((item) => (
              <div key={item.title} className="flex flex-col bg-canvas p-7 md:p-8">
                <dt className="sr-only">{item.title}</dt>
                <dd className="flex flex-col gap-3">
                  <span className="text-[46px] leading-none font-block tracking-display text-ink-strong tabular-nums md:text-[56px]">
                    {item.value}
                  </span>
                  <span className="text-[17px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </span>
                  <span className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
