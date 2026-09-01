import Link from "next/link";
import type { ReactNode } from "react";

type ActionVariant = "solid" | "ghost" | "pill" | "line";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  /** Adds a trailing arrow that advances on hover. */
  withArrow?: boolean;
  /** Accessible name when the visible label alone is ambiguous out of context. */
  ariaLabel?: string;
  className?: string;
}

const BASE =
  "group/action inline-flex items-center justify-center gap-2 text-[14px] tracking-glide transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-ui active:scale-[0.97]";

const VARIANTS: Readonly<Record<ActionVariant, string>> = {
  solid: "rounded-btn bg-cta px-5 py-3 font-block text-canvas hover:bg-ink-strong",
  ghost:
    "rounded-btn px-5 py-3 font-mid text-ink shadow-ring hover:bg-surface hover:shadow-ring-strong",
  pill: "rounded-full bg-cta px-4 py-2 font-mid text-canvas hover:bg-ink-strong",
  line: "font-mono text-[11px] tracking-tech uppercase text-ink-strong hover:text-accent",
};

/** Advances 3px on hover — the only motion a button needs to feel answered. */
function Arrow(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className="shrink-0 transition-transform duration-150 ease-ui group-hover/action:translate-x-[3px]"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/**
 * The single call-to-action primitive. Four variants map to the button geometries in
 * the design system — 6px radius for standard actions, a full pill for the header CTA,
 * and a mono `line` variant that belongs to the technical register rather than the sans.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  withArrow = false,
  ariaLabel,
  className = "",
}: ActionLinkProps): React.JSX.Element {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...(isExternal ? { rel: "noopener noreferrer" } : {})}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}
