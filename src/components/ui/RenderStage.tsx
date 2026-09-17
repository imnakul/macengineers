import React from "react";
import Image from "next/image";

/**
 * How a render sits in the stage.
 * - `object`: a single machine with a baked floor shadow; padded on all sides, feet on the floor line.
 * - `scene`: a wide people-and-equipment scene, often cropped at its base or sides; it runs to the
 *   bottom and side edges so those cuts read as the frame, not as a broken image.
 */
export type RenderFit = "object" | "scene";

export interface RenderStageProps {
  src: string;
  alt: string;
  sizes: string;
  fit?: RenderFit;
  /** Tighter padding for small cards. */
  compact?: boolean;
  /** Set on the image likely to be the page's largest paint. */
  fetchPriority?: "high" | "auto";
  /**
   * Fill the stage and crop to the centre instead of fitting inside it. For slots much narrower than
   * the render (e.g. a tall side-card column), where fitting leaves a small image under empty space.
   */
  cover?: boolean;
  /** Extra classes for the image, e.g. a parent-driven hover zoom. */
  imageClassName?: string;
}

const PADDING: Record<RenderFit, { regular: string; compact: string }> = {
  // Tall vessels are limited by height, so a slim side inset only enlarges the wide machines.
  object: { regular: "inset-x-[4%] bottom-[11%] top-[9%]", compact: "inset-x-2 bottom-[10%] top-5" },
  scene: { regular: "inset-x-0 bottom-0 top-[7%]", compact: "inset-x-0 bottom-0 top-3" },
};

/**
 * A studio set for the site's transparent 3D renders: a soft key light behind the subject, a cool
 * cyclorama falling off to the edges, a floor plane and a faint horizon highlight. Fills its
 * positioned parent. Built from spans so it is valid inside links and buttons.
 */
export function RenderStage({
  src,
  alt,
  sizes,
  fit = "object",
  compact = false,
  fetchPriority,
  cover = false,
  imageClassName = "",
}: RenderStageProps): React.JSX.Element {
  const padding = cover ? "inset-0" : PADDING[fit][compact ? "compact" : "regular"];
  const placement = cover ? "origin-center object-cover object-center" : "origin-bottom object-contain object-bottom";

  return (
    <span className="absolute inset-0 block overflow-hidden bg-[radial-gradient(120%_95%_at_50%_38%,#FFFFFF_0%,#F4F7FA_42%,#E3E9F0_100%)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 block h-[32%] bg-linear-to-b from-[#E9EEF4]/0 via-[#E1E7EF]/70 to-[#D6DEE8]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[6%] bottom-[32%] block h-px bg-linear-to-r from-white/0 via-white to-white/0"
      />
      <span className={`absolute block ${padding}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          fetchPriority={fetchPriority}
          className={`${placement} ${imageClassName}`}
        />
      </span>
    </span>
  );
}
