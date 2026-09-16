"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { BLOG_PAGE } from "@/data/blog";
import { NAV_ITEMS, QUOTE_HREF } from "@/data/site";
import { DURATION, EASE_MOVE, EASE_UI } from "@/lib/motion";
import { MAC_COMPANY } from "@/variants/data/variantsData";
import { PlateCta } from "@/variants/shared/PlateCta";

/** The logo is the home link, so "Home" is left out of the header nav. */
const HEADER_NAV_ITEMS = NAV_ITEMS.filter((item) => item.href !== "/");

/** Intrinsic size of the cropped logo artwork, so it renders at its true aspect ratio. */
const LOGO_WIDTH = 699;
const LOGO_HEIGHT = 256;

/** Closing is quicker than opening, so dismissing the menu never feels like it lags. */
const MENU_CLOSE_DURATION = 0.22;

/** Backdrop fades; it carries no travel of its own. */
const BACKDROP_VARIANTS: Variants = {
  open: { opacity: 1, transition: { duration: 0.2, ease: EASE_UI } },
  closed: { opacity: 0, transition: { duration: 0.2, ease: EASE_UI } },
};

/**
 * Panel slides in from the right edge it is attached to and leaves the same way.
 * Under reduced motion `MotionConfig` drops the transform, leaving the opacity fade.
 */
const PANEL_VARIANTS: Variants = {
  open: { x: 0, opacity: 1, transition: { duration: DURATION.base, ease: EASE_MOVE } },
  closed: { x: "100%", opacity: 0, transition: { duration: MENU_CLOSE_DURATION, ease: EASE_UI } },
};

/** Blog articles live at flat `/{slug}` URLs, so they cannot be matched to "Blog" by prefix. */
const BLOG_ARTICLE_HREFS: ReadonlySet<string> = new Set(
  [...BLOG_PAGE.featured, ...BLOG_PAGE.more].map((post) => post.href)
);

/** Maps the current URL to the href of the nav entry that owns it. */
function sectionHrefFor(pathname: string): string {
  if (BLOG_ARTICLE_HREFS.has(pathname)) return "/blog";
  if (pathname.startsWith("/jobs/")) return "/job-openings";
  return pathname;
}

function isActiveItem(sectionHref: string, itemHref: string): boolean {
  return sectionHref === itemHref || sectionHref.startsWith(`${itemHref}/`);
}

/**
 * Corporate Atlas site header, shared by the homepage and every inner page.
 *
 * The bar keeps one height at every scroll position, so nothing below it shifts; only
 * the hairline and shadow fade in once the page scrolls. Six links, the logo and the
 * quote button only fit side by side from `lg`, so below that everything, including the
 * quote button, lives in a slide-over menu. On the homepage the bar starts fully transparent,
 * so the hero (which slides up underneath it) reads as one surface, and gains its frosted
 * white fill once the page scrolls. The menu slides in from the right, closes on
 * Escape, locks page scroll while open, and returns focus to the menu button on close.
 */
export function AtlasHeader(): React.JSX.Element {
  const pathname = usePathname();
  const sectionHref = sectionHrefFor(pathname);
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const overHero = pathname === "/" && !scrolled;
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = React.useCallback((): void => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    // Scroll lock has to touch the body directly; there is no element-level alternative.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          overHero ? "bg-transparent" : "bg-white/90 backdrop-blur-md"
        } ${scrolled ? "border-[#E3E7ED] shadow-[0_8px_30px_-18px_rgba(13,27,46,0.35)]" : "border-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="MAC Engineers home">
            <Image
              src={MAC_COMPANY.logo}
              alt="MAC Engineers"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              sizes="120px"
              loading="eager"
              className="h-7 w-auto sm:h-8 lg:h-10"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-8">
            {HEADER_NAV_ITEMS.map((item) => {
              const active = isActiveItem(sectionHref, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative whitespace-nowrap text-[13px] font-medium transition-colors duration-150 ${
                    active ? "text-[#0D1B2E]" : "text-slate-600 hover:text-[#0D1B2E]"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#1B5FC4] transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center">
            <div className="hidden lg:block">
              <PlateCta size="sm" href={QUOTE_HREF} icon="none" className="whitespace-nowrap">
                Request a Quote
              </PlateCta>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="atlas-mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E3E7ED] text-slate-700 transition-colors hover:border-[#1B5FC4] hover:text-[#1B5FC4] lg:hidden"
            >
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* AnimatePresence keeps the menu mounted until its exit slide has finished. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="atlas-mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              variants={BACKDROP_VARIANTS}
              className="absolute inset-0 bg-[#0D1B2E]/50 backdrop-blur-sm"
            />
            <motion.div
              id="atlas-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={PANEL_VARIANTS}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-[#E3E7ED] px-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E3E7ED] text-slate-700 transition-colors hover:border-[#1B5FC4] hover:text-[#1B5FC4]"
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
                <ul>
                  {HEADER_NAV_ITEMS.map((item) => {
                    const active = isActiveItem(sectionHref, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between border-b border-[#F0F2F5] py-4 text-lg font-medium transition-colors hover:text-[#1B5FC4] ${
                            active ? "text-[#1B5FC4]" : "text-[#0D1B2E]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="border-t border-[#E3E7ED] p-5">
                <PlateCta href={QUOTE_HREF} onClick={() => setMenuOpen(false)} className="w-full">
                  Request a Quote
                </PlateCta>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}
