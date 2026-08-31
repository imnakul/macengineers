import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";

interface SpecBlockProps {
  /** Position in the set, e.g. "01". */
  index: string;
  total: string;
  title: string;
  /** Short lead line above the description. Products have one; services do not. */
  tagline?: string;
  description: string;
  points: readonly string[];
  image: string;
  alt: string;
  figure: string;
  /** Puts the plate on the left. Alternate down a page so the eye keeps moving. */
  flip?: boolean;
  headingId: string;
  priority?: boolean;
}

/**
 * One equipment or service line: the plate on one side, the specification on the other,
 * sides alternating down the page. The points sit on their own hairline rules rather
 * than on bullets — a specification reads as a schedule, not as prose.
 */
export function SpecBlock({
  index,
  total,
  title,
  tagline,
  description,
  points,
  image,
  alt,
  figure,
  flip = false,
  headingId,
  priority = false,
}: SpecBlockProps): React.JSX.Element {
  return (
    <article
      aria-labelledby={headingId}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <Reveal
        distance={24}
        className={`mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none ${
          flip ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <PlateFrame
          src={image}
          alt={alt}
          figure={figure}
          caption={title}
          ratio="aspect-[4/3]"
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 460px, 90vw"
          priority={priority}
        />
      </Reveal>

      <div
        className={`flex flex-col lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
      >
        <Reveal>
          <span
            aria-hidden="true"
            className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
          >
            {index} / {total}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h3
            id={headingId}
            className="mt-4 text-[26px] leading-[1.05] font-block tracking-display text-ink-strong sm:text-[32px] md:text-[38px]"
          >
            {title}
          </h3>
        </Reveal>

        {tagline ? (
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[560px] text-[17px] leading-[26px] font-block tracking-glide text-ink-strong">
              {tagline}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.14}>
          <p className="mt-4 max-w-[600px] text-[16px] leading-[26px] font-regular tracking-glide text-ink-muted">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <ul className="mt-8 flex flex-col">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-baseline gap-4 border-t border-hairline py-4 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] bg-accent"
                />
                <span className="text-[15px] leading-[23px] font-regular tracking-glide text-ink">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
