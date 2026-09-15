"use client";

import React from "react";

export interface RevealProps {
  children: React.ReactNode;
  /** Classes for the wrapper — also where grid-span classes go when the wrapper is a grid child. */
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
}

/**
 * Scroll-reveal wrapper. IntersectionObserver fires once per element; children
 * rise 20px and fade in with a staggerable delay. Honours reduced-motion via
 * the global CSS rule.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      /* Inline style is unavoidable here: the stagger delay is a runtime value per element. */
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
