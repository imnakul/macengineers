import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CHOOSE } from "@/data/site";

/**
 * Four differentiators, set as a spec table rather than four floating cards.
 *
 * The dividers are a 1px gap over a hairline ground — the one grid technique that keeps
 * rules exact at every breakpoint without per-cell border juggling. The source site
 * prefixed each item with a green check emoji; a two-digit index carries the same
 * "this is a list of four" signal without introducing the only saturated pixels
 * outside the product art.
 */
export function WhyChoose(): React.JSX.Element {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-surface px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow="Why MAC"
            title={WHY_CHOOSE.headline}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.items.map((item, index) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-3 bg-canvas p-7 transition-[background-color] duration-150 ease-ui hover:bg-surface md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[19px] leading-tight font-strong tracking-glide text-ink-strong md:text-[20px]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                  {item.description}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
