"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ActionLink } from "@/components/ui/ActionLink";
import { COMPANY, NAV_ITEMS, QUOTE_HREF } from "@/data/site";

/**
 * Sticky site header. The conventional CTA is present as a small pill and
 * deliberately outranked by the hero — it never competes with the headline.
 */
export function SiteHeader(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = useCallback((): void => setIsMenuOpen(false), []);

  useEffect((): (() => void) => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  return (
    <header className="sticky top-0 z-50 bg-canvas/85 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-13 md:py-5">
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
              className="rounded-btn px-3 py-2 text-[14px] font-regular tracking-glide text-ink transition-[color,background-color] duration-150 ease-ui hover:bg-surface hover:text-ink-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ActionLink href={QUOTE_HREF} variant="pill" className="hidden sm:inline-flex">
            Get A Quote
          </ActionLink>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={(): void => setIsMenuOpen((open) => !open)}
            className="rounded-btn px-3 py-2 text-[14px] font-mid tracking-glide text-ink shadow-ring transition-[background-color] duration-150 ease-ui hover:bg-surface lg:hidden"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Primary mobile"
          className="border-t border-hairline bg-canvas px-5 pb-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-3 text-[16px] font-regular tracking-glide text-ink transition-[color] duration-150 ease-ui hover:text-ink-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ActionLink href={QUOTE_HREF} variant="solid" className="mt-4 w-full">
            Get A Quote
          </ActionLink>
        </nav>
      ) : null}
    </header>
  );
}
