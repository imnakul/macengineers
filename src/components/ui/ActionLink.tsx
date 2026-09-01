import Link from "next/link";
import type { ReactNode } from "react";

type ActionVariant = "solid" | "ghost" | "compact" | "line";
type ActionTone = "default" | "inverse";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  /**
   * `inverse` is for use on the dark band (IntegrationBand / CtaBand). It exists
   * because overriding a variant's background/text color from the outside — passing
   * e.g. `className="bg-canvas text-ink-strong"` to fight `bg-cta`/`text-canvas` baked
   * into the variant — does not reliably work: Tailwind resolves two classes that set
   * the same CSS property by where they land in the *compiled stylesheet*, not by their
   * order in the className string. Every CTA on every dark band on this site was
   * rendering with the wrong color pair (a near-black button with black text) because
   * of exactly that. `tone` folds both states into one non-conflicting class string per
   * combination, so there is nothing left for two classes to fight over.
   */
  tone?: ActionTone;
  /** Adds a trailing arrow that advances on hover. */
  withArrow?: boolean;
  /** Accessible name when the visible label alone is ambiguous out of context. */
  ariaLabel?: string;
  className?: string;
}

const BASE =
  "group/action inline-flex items-center justify-center gap-2 text-[14px] tracking-glide transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-ui active:scale-[0.97]";

/**
 * Every variant×tone pairing that is actually used gets its own complete class string.
 * `compact` and `line` have no inverse call sites today, so they are left tone-agnostic
 * rather than padded out with an unused branch.
 */
const VARIANTS: Readonly<Record<ActionVariant, Partial<Record<ActionTone, string>>>> = {
  solid: {
    default: "rounded-btn bg-cta px-5 py-3 font-block text-canvas hover:bg-ink-strong",
    inverse: "rounded-btn bg-canvas px-5 py-3 font-block text-ink-strong hover:bg-surface",
  },
  ghost: {
    default:
      "rounded-btn px-5 py-3 font-mid text-ink shadow-ring hover:bg-surface hover:shadow-ring-strong",
    inverse:
      "rounded-btn px-5 py-3 font-mid text-canvas ring-1 ring-canvas/25 hover:bg-canvas/10 hover:ring-canvas/40",
  },
  /**
   * The header's slimmer CTA. This used to be `rounded-full` — a true pill — and it was
   * the only `rounded-full` element on the entire site; every other small rounded
   * element (job-type chips, the ISO cert badge) uses `rounded-chip` (14px), and every
   * button uses `rounded-btn` (6px). There was no sibling pattern the pill belonged to,
   * so it just read as an arbitrary shape next to everything else. Same compact size,
   * now the same 6px radius as every other button on the site.
   */
  compact: {
    default: "rounded-btn bg-cta px-4 py-2 font-mid text-canvas hover:bg-ink-strong",
  },
  line: {
    default: "font-mono text-[11px] tracking-tech uppercase text-ink-strong hover:text-accent",
  },
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
 * The single call-to-action primitive. Every geometric variant shares the system's one
 * button radius (6px) — `compact` is smaller, not differently shaped. `line` is the one
 * exception: it belongs to the mono technical register rather than the sans, by design.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  tone = "default",
  withArrow = false,
  ariaLabel,
  className = "",
}: ActionLinkProps): React.JSX.Element {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const variantClass = VARIANTS[variant][tone] ?? VARIANTS[variant].default;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${BASE} ${variantClass} ${className}`}
      {...(isExternal ? { rel: "noopener noreferrer" } : {})}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}
