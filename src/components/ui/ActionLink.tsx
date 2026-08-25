import Link from "next/link";
import type { ReactNode } from "react";

type ActionVariant = "solid" | "ghost" | "pill";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  /** Accessible name when the visible label alone is ambiguous out of context. */
  ariaLabel?: string;
  className?: string;
}

const BASE =
  "inline-flex items-center justify-center text-[14px] tracking-glide transition-[color,background-color,border-color] duration-150 ease-ui";

const VARIANTS: Readonly<Record<ActionVariant, string>> = {
  solid:
    "rounded-btn bg-cta px-4 py-2.5 font-block text-canvas hover:bg-ink-strong",
  ghost:
    "rounded-btn px-3 py-2.5 font-regular text-ink shadow-ring hover:bg-surface",
  pill: "rounded-full bg-cta px-4 py-2 font-mid text-canvas hover:bg-ink-strong",
};

/**
 * The single call-to-action primitive. Three variants map to the three button
 * geometries measured in the source design system — 6px radius for standard
 * actions, a full pill for the header CTA.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  ariaLabel,
  className = "",
}: ActionLinkProps): React.JSX.Element {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...(isExternal ? { rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
