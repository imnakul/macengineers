import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CHOOSE } from "@/data/site";

/**
 * Four differentiators. The source site prefixed each with a green check emoji; here a
 * two-digit index carries the same "this is a list of four" signal without introducing
 * the only saturated pixels outside the product art.
 */
export function WhyChoose(): React.JSX.Element {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-surface px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Why MAC" title={WHY_CHOOSE.headline} />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-card bg-canvas p-6 shadow-ring">
                  <span
                    aria-hidden="true"
                    className="text-[12px] font-mid tracking-glide text-ink-muted tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[20px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-5 font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
