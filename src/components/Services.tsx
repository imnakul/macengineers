import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/site";

/**
 * The four service stages, read as one sequence. Unlike the product cards these run
 * without a ring: each stage hangs off its own measured rule with an accent node at the
 * origin, so the four columns read as a dimension chain — a process — rather than as a
 * menu of four unrelated things.
 */
export function Services(): React.JSX.Element {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title={SERVICES.headline}
            body={SERVICES.body}
          />
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SERVICES.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="group flex h-full flex-col">
                  <div className="relative h-px w-full bg-hairline-strong">
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 bg-accent"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-4 font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                  >
                    Step {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 text-[19px] leading-tight font-strong tracking-glide text-ink-strong md:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>

                  <div className="plate-ground-illustration relative mt-7 aspect-[4/3] overflow-hidden rounded-card bg-surface">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-7 drop-shadow-[0_16px_14px_rgba(23,23,21,0.16)] transition-transform duration-500 ease-move group-hover:scale-[1.035]"
                    />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
