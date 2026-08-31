import Image from "next/image";
import { CornerTicks } from "@/components/ui/CornerTicks";

interface PlateFrameProps {
  src: string;
  alt: string;
  /** Figure number shown in the caption bar, e.g. "01". */
  figure?: string;
  /** Caption text. Omit for an uncaptioned plate. */
  caption?: string;
  /** Aspect-ratio utility for the image well, e.g. `aspect-square`. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * A drawing plate: the render sat on a gridded ground, boxed by a hairline, registered
 * at the corners, and titled underneath in the mono register. This is the page's core
 * visual idea — every image is presented as a plate on a sheet rather than as a
 * photograph in a card.
 */
export function PlateFrame({
  src,
  alt,
  figure,
  caption,
  ratio = "aspect-square",
  sizes,
  priority = false,
  className = "",
}: PlateFrameProps): React.JSX.Element {
  return (
    <figure
      className={`group/plate relative flex flex-col overflow-hidden rounded-card bg-canvas shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong ${className}`}
    >
      <div className={`relative ${ratio} drafting-grid overflow-hidden bg-surface`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-7 transition-transform duration-500 ease-move group-hover/plate:scale-[1.035]"
        />
        <CornerTicks />
      </div>

      {caption ? (
        <figcaption className="flex items-baseline gap-2.5 border-t border-hairline px-4 py-3 font-mono text-[10px] tracking-tech text-ink-muted uppercase">
          {figure ? <span className="shrink-0 text-accent">Fig. {figure}</span> : null}
          <span className="min-w-0 truncate">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
