import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EQUIPMENT } from "@/data/site";

/**
 * The four equipment lines. Cards are separated by a 1px hairline ring rather than a
 * drop shadow — nothing here floats, so the one lifted surface later in the page wins.
 */
export function EquipmentSolutions(): React.JSX.Element {
  return (
    <section
      id="equipment"
      aria-labelledby="equipment-heading"
      className="scroll-mt-24 px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title={EQUIPMENT.headline}
            body={EQUIPMENT.body}
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-chip bg-canvas shadow-ring">
                <div className="relative aspect-square bg-surface">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-6"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-[20px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-5 font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
