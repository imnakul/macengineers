"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ActionLink } from "@/components/ui/ActionLink";
import { COMPANY, NAV_ITEMS, QUOTE_HREF } from "@/data/site";

/**
 * Sticky site header.
 *
 * Two states: it floats on the bare canvas at the top of the page, then commits to a
 * hairline rule and a tighter rhythm once the visitor scrolls. The conventional CTA is
 * present as a small pill and deliberately outranked by the hero — it never competes
 * with the headline. Nav hover is an accent rule scaled in from the left, so the
 * measurement-mark language of the page shows up in the chrome too.
 */
export function SiteHeader(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const closeMenu = useCallback((): void => setIsMenuOpen(false), []);

  useEffect((): (() => void) => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 8);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect((): (() => void) => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  /* The panel covers the viewport, so the page behind it must not scroll with it. */
  useEffect((): (() => void) => {
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = isMenuOpen ? "hidden" : previous;

    return (): void => {
      style.overflow = previous;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-canvas/85 backdrop-blur-md transition-[border-color,background-color] duration-150 ease-ui ${
        isScrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 px-5 transition-[padding] duration-150 ease-ui md:px-13 ${
          isScrolled ? "py-3 md:py-3.5" : "py-4 md:py-5"
        }`}
      >
        <Link
          href="/"
          aria-label={`${COMPANY.name} — home`}
          className="relative block h-[28px] w-[98px] shrink-0 md:h-[32px] md:w-[112px]"
        >
          <Image
            src={COMPANY.logo}
            alt={`${COMPANY.name} industrial equipment manufacturer logo`}
            fill
            sizes="112px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative rounded-btn px-3 py-2 text-[14px] font-mid tracking-glide text-ink transition-[color] duration-150 ease-ui hover:text-ink-strong"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 ease-ui group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={COMPANY.phoneHref}
            aria-label={`Call ${COMPANY.name} on ${COMPANY.phone}`}
            className="hidden font-mono text-[11px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui hover:text-accent xl:inline-flex"
          >
            {COMPANY.phone}
          </Link>

          <ActionLink href={QUOTE_HREF} variant="pill" className="hidden sm:inline-flex">
            Get A Quote
          </ActionLink>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={(): void => setIsMenuOpen((open) => !open)}
            className="rounded-btn px-3 py-2 font-mono text-[11px] tracking-tech text-ink uppercase shadow-ring transition-[background-color] duration-150 ease-ui hover:bg-surface lg:hidden"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Primary mobile"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-100%)] overflow-y-auto bg-canvas px-5 pt-2 pb-10 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.label} className="border-b border-hairline">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 py-4 text-[20px] font-block tracking-glide text-ink-strong transition-[color] duration-150 ease-ui hover:text-accent"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ActionLink
            href={QUOTE_HREF}
            variant="solid"
            withArrow
            className="mt-8 w-full"
          >
            Get A Quote
          </ActionLink>

          <Link
            href={COMPANY.phoneHref}
            aria-label={`Call ${COMPANY.name} on ${COMPANY.phone}`}
            className="mt-6 block font-mono text-[11px] tracking-tech text-ink-muted uppercase"
          >
            {COMPANY.phone}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
