import React from "react";

/* ---------------------------------------------------------------------------
 * Plate geometry — the shared silhouette language of the "machined plate"
 * system (CTAs, chips, tags, section stamps, process markers).
 *
 * `clip-path` also clips borders and box-shadows, so a plain `border` cannot
 * follow a chamfered edge. Instead every plate is drawn with two layers:
 * a "frame" filling the whole box (the rim colour) and a "face" inset 1px
 * inside it. The 1px of frame left showing becomes a hairline border that
 * follows the diagonal cuts too.
 * ------------------------------------------------------------------------- */

/** Two diagonally opposite corners cut at 45°. Size comes from the parent's `--cut` property. */
export const PLATE_CHAMFER =
  "[clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]";

/** Regular octagon — the silhouette of a bolt head. Scales with the element. */
export const PLATE_OCTAGON =
  "[clip-path:polygon(30%_0,70%_0,100%_30%,100%_70%,70%_100%,30%_100%,0_70%,0_30%)]";

export type PlateShape = "chamfer" | "octagon";

const SHAPE_CLASSES: Record<PlateShape, string> = {
  chamfer: PLATE_CHAMFER,
  octagon: PLATE_OCTAGON,
};

interface PlateSurfaceProps {
  /** Background classes for the rim layer (the visible 1px edge). */
  frameClassName: string;
  /** Background classes for the face layer. */
  faceClassName: string;
  shape?: PlateShape;
  /** Rendered inside the clipped face — e.g. a hover sweep layer. */
  children?: React.ReactNode;
}

/**
 * Draws the frame + face layers behind a plate's content.
 *
 * The parent must be positioned and create a stacking context
 * (`relative isolate`, or `relative z-*`). Chamfered plates also need a
 * `[--cut:Npx]` class on the parent.
 */
export function PlateSurface({
  frameClassName,
  faceClassName,
  shape = "chamfer",
  children,
}: PlateSurfaceProps): React.JSX.Element {
  const clip = SHAPE_CLASSES[shape];
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 transition-colors duration-150 ${clip} ${frameClassName}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-px -z-10 overflow-hidden transition-colors duration-150 ${clip} ${faceClassName}`}
      >
        {children}
      </span>
    </>
  );
}
