/**
 * Hero image sources and `sizes`, shared by the hero components and the homepage's preload links,
 * so the preloaded candidates are exactly the ones the `<Image>` elements request.
 */

/** Factory-stage background (xl and up). */
export const HERO_FACTORY_IMAGE = {
  src: "/images/hero/hero-factory-dof-extended.jpg",
  sizes: "105vw",
} as const;

/** Drafting-plate machine render (the hero below xl). */
export const HERO_PLATE_IMAGE = {
  src: "/images/hero/hero-turnkey-grounded.png",
  sizes: "(max-width: 1024px) 92vw, (max-width: 1280px) 40vw, 560px",
} as const;

/** Where the two heroes swap (Tailwind `xl`). */
export const HERO_DESKTOP_MEDIA = "(min-width: 1280px)";
export const HERO_MOBILE_MEDIA = "(max-width: 1279.98px)";
