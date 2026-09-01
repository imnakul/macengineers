/**
 * Motion tokens.
 *
 * These mirror the `--ease-*` custom properties in globals.css. CSS transitions and
 * Framer animations are driven by different engines but must describe the same physics,
 * and the only way that stays true is if both read from one written-down set.
 *
 * The system animates `opacity` and `transform` only. Height, top and left are never
 * touched — they cost layout on every frame, and on a long page that is the difference
 * between a scroll that tracks the finger and one that does not.
 */

/** Cubic-bezier control points, in the tuple shape Framer expects. */
type Ease = readonly [number, number, number, number];

/** Interface response — hover, colour, small state changes. */
export const EASE_UI: Ease = [0.4, 0, 0.2, 1];

/** Reveals. Decelerating: fast to arrive, slow to settle. */
export const EASE_REVEAL: Ease = [0, 0, 0.2, 1];

/** Movement over distance. */
export const EASE_MOVE: Ease = [0.33, 0, 0, 1];

export const DURATION = {
  /** Immediate feedback: press, hover, colour. */
  fast: 0.15,
  /** A reveal's opacity. */
  base: 0.3,
  /** A reveal's travel — longer than its fade, so it lands after it is legible. */
  slow: 0.45,
  /** Route change. Short on purpose: navigation should feel instant, not staged. */
  route: 0.22,
} as const;

/**
 * How far up the viewport an element must come before it reveals.
 *
 * A percentage of the *viewport*, not of the element. Framer's `amount` option measures
 * a fraction of the element instead, which means a 700px block has to travel three times
 * further than a 200px card before anything happens — so blocks of different heights
 * reveal at visibly different moments on the same scroll. This keeps them consistent.
 */
export const REVEAL_MARGIN = "0px 0px -12% 0px";
