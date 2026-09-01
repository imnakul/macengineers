import Image from "next/image";
import { CornerTicks } from "@/components/ui/CornerTicks";

interface PlateFrameProps {
  src: string;
  alt: string;
  /** Caption text. Omit for an uncaptioned plate. */
  caption?: string;
  /** Aspect-ratio utility for the image well, e.g. `aspect-square`. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /**
   * `photo` (default) is for the site's real plant photography, which already carries
   * depth from its own lighting and needs nothing added. `illustration` is for the flat
   * vector cutouts used across Product/Service/Equipment — those sit on a transparent
   * background with no shadow of their own, so this adds a soft contact-shadow pool
   * under the frame and a directional drop-shadow that follows the cutout's silhouette,
   * so it reads as standing on the sheet rather than pasted over it.
   */
  depth?: "photo" | "illustration";
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
  caption,
  ratio = "aspect-square",
  sizes,
  priority = false,
  depth = "photo",
  className = "",
}: PlateFrameProps): React.JSX.Element {
  const isIllustration = depth === "illustration";

  return (
    <figure
      className={`group/plate relative flex flex-col overflow-hidden rounded-card bg-canvas shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong ${className}`}
    >
      <div
        className={`relative ${ratio} overflow-hidden bg-surface ${
          isIllustration ? "plate-ground-illustration" : "drafting-grid"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain p-7 transition-transform duration-500 ease-move group-hover/plate:scale-[1.035] ${
            isIllustration ? "drop-shadow-[0_16px_14px_rgba(23,23,21,0.16)]" : ""
          }`}
        />
        <CornerTicks />
      </div>

      {caption ? (
        <figcaption className="flex items-baseline gap-2.5 border-t border-hairline px-4 py-3 font-mono text-[10px] tracking-tech text-ink-muted uppercase">
          <span className="min-w-0 truncate">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
