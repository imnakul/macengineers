"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_REVEAL } from "@/lib/motion";

/**
 * Route transition.
 *
 * A template remounts on every navigation, which is exactly the hook a cross-page fade
 * needs — the site is nine pages now, and without this a click swaps the whole document
 * in one frame with nothing to say the page changed.
 *
 * Opacity only, and short. The sections inside run their own staggered reveals on
 * arrival; adding travel here as well would put two competing movements on the same
 * pixels and read as a stutter rather than as one settle.
 */
export default function Template({ children }: { children: ReactNode }): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.route, ease: EASE_REVEAL }}
    >
      {children}
    </motion.div>
  );
}
