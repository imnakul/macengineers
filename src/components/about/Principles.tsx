import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PAGE } from "@/data/about";

/** Vision, mission and values — three equal statements, so three equal columns. */
export function Principles(): React.JSX.Element {
  const { principles } = ABOUT_PAGE;

  return (
    <section
      aria-labelledby="principles-heading"
      className="py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="principles-heading"
            eyebrow="What we stand for"
            title={principles.heading}
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-card bg-canvas p-7 shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong md:p-8">
                  <h3 className="text-[22px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[24px] font-regular tracking-glide text-ink-muted">
                    {item.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
