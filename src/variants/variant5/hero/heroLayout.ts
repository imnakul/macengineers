/**
 * The homepage hero slides up under the sticky header, which is transparent until the page scrolls,
 * and adds the same height back to its top padding. The header is 64px (72px from `lg`) plus its
 * 1px bottom border.
 */
export const HERO_UNDER_HEADER = "-mt-[65px] lg:-mt-[73px]";

export interface HeroLayoutProps {
  /** Opens the project-consultation RFQ. */
  onConsult: () => void;
}
