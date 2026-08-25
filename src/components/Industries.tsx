import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/data/site";

/**
 * Industries served. Left-aligned rows rather than centred cards — this is comparable
 * data, and comparable data reads faster off a shared left edge.
 */
export function Industries(): React.JSX.Element {
  return (
    <section
      aria-labelledby="industries-heading"
      className="px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Sectors" title={INDUSTRIES.headline} />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {INDUSTRIES.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="flex h-full items-baseline gap-5 rounded-card bg-surface p-6 md:p-8">
                  <span
                    aria-hidden="true"
                    className="text-[12px] font-mid tracking-glide text-ink-muted tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[20px] leading-tight font-strong tracking-glide text-ink-strong md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-5 font-regular tracking-glide text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
