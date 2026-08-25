import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/site";

/**
 * The four service stages, read as one sequence. Unlike the product cards these run
 * without a ring — the numbered order does the grouping, so the section reads as a
 * process rather than a menu.
 */
export function Services(): React.JSX.Element {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={SERVICES.headline}
            body={SERVICES.body}
            align="center"
          />
        </Reveal>

        <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {SERVICES.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <article className="flex h-full flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-card bg-surface">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-5 text-[12px] font-mid tracking-glide text-ink-muted tabular-nums"
                  >
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[20px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-5 font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
