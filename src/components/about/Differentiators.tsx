import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PAGE } from "@/data/about";

/** Three claims about how the company works, in a ruled table like the landing page. */
export function Differentiators(): React.JSX.Element {
  const { differentiators } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="differentiators-heading"
      className="bg-surface py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="differentiators-heading"
            eyebrow="Why MAC"
            title={differentiators.heading}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring md:grid-cols-3">
            {differentiators.items.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-3 bg-canvas p-7 transition-[background-color] duration-150 ease-ui hover:bg-surface md:p-8"
              >
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
