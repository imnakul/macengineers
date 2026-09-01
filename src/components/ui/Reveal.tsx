"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_MOVE, EASE_REVEAL, REVEAL_MARGIN } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds. Use the item index in a grid. */
  delay?: number;
  /** Travel distance in px. Larger blocks earn a longer move. */
  distance?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal built from the two properties this design system allows to
 * animate: `opacity` and `transform`.
 *
 * The trigger is measured against the viewport rather than as a fraction of the element,
 * so a tall spec block and a short card reveal at the same point in the scroll — see
 * REVEAL_MARGIN. Collapses to a plain wrapper when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
}: RevealProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{
        opacity: { duration: DURATION.base, ease: EASE_REVEAL, delay },
        y: { duration: DURATION.slow, ease: EASE_MOVE, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
