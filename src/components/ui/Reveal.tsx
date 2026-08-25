"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds. Use the item index in a grid. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal built from the two properties this design system allows to
 * animate: `opacity` (300ms, decelerating) and `transform` (400ms, the move curve).
 * Height, top and left are never touched.
 *
 * Collapses to a plain wrapper when the visitor prefers reduced motion.
 */
export function Reveal({ children, delay = 0, className }: RevealProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        opacity: { duration: 0.3, ease: [0, 0, 0.2, 1], delay },
        y: { duration: 0.4, ease: [0.33, 0, 0, 1], delay },
      }}
    >
      {children}
    </motion.div>
  );
}
