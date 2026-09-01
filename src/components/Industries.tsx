import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/data/site";

/**
 * Industries served. Left-aligned rows in a ruled table rather than centred cards —
 * this is comparable data, and comparable data reads faster off a shared left edge with
 * an exact rule between entries.
 */
export function Industries(): React.JSX.Element {
  return (
    <section
      aria-labelledby="industries-heading"
      className="px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="industries-heading"
            eyebrow="Sectors"
            title={INDUSTRIES.headline}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-2">
            {INDUSTRIES.items.map((item, index) => (
              <li
                key={item.title}
                className="group relative flex items-baseline gap-6 bg-canvas p-7 transition-[background-color] duration-150 ease-ui hover:bg-surface md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[10px] tracking-tech text-ink-muted tabular-nums transition-[color] duration-150 ease-ui group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[20px] leading-tight font-strong tracking-glide text-ink-strong md:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
