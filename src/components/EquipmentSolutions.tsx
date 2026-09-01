import Image from "next/image";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EQUIPMENT } from "@/data/site";

/**
 * The four equipment lines. Cards are separated by a 1px hairline ring rather than a
 * drop shadow — nothing here floats, so the one lifted surface later in the page wins.
 * Each card carries its own position in the set (01/04) in the mono register, and
 * answers hover with an accent rule drawn across its foot.
 */
export function EquipmentSolutions(): React.JSX.Element {
  const total = String(EQUIPMENT.items.length).padStart(2, "0");

  return (
    <section
      id="equipment"
      aria-labelledby="equipment-heading"
      className="scroll-mt-24 px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="equipment-heading"
            index="03"
            eyebrow="Products"
            title={EQUIPMENT.headline}
            body={EQUIPMENT.body}
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-canvas shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong">
                <div className="drafting-grid relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-7 transition-transform duration-500 ease-move group-hover:scale-[1.035]"
                  />
                  <CornerTicks />
                </div>

                <div className="flex flex-1 flex-col gap-2.5 border-t border-hairline p-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")} / {total}
                  </span>
                  <h3 className="text-[19px] leading-tight font-strong tracking-glide text-ink-strong">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                    {item.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
