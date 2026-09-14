import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "./VariantIcons";
import { PlateSurface } from "./PlateSurface";

/* ---------------------------------------------------------------------------
 * PlateCta — the "machined plate" call-to-action.
 *
 * Silhouette of an industrial nameplate: two diagonally opposite corners are
 * chamfered at 45°, and the arrow sits in its own terminal cell behind a
 * hairline divider. Hover runs a "machining pass": a darker fill sweeps
 * across the face left-to-right while the arrow nudges forward.
 *
 * Construction: the button itself stays a plain rectangle so the keyboard
 * focus ring is never clipped. Two absolutely positioned layers carry the
 * shape — a chamfered "frame" (the rim colour) and a chamfered "face" inset
 * 1px inside it — so outline plates get a crisp 1px border that also follows
 * the diagonal cuts. Only `transform` and colours animate.
 * ------------------------------------------------------------------------- */

/** Colour family. `steel` is the site accent; `signal` is the MAC logo red. */
export type PlateCtaTone = "steel" | "signal";

/** `solid` for the primary action, `outline` for the secondary action beside it. */
export type PlateCtaVariant = "solid" | "outline";

export type PlateCtaSize = "sm" | "md" | "lg";

/** Terminal-cell glyph. `none` drops the cell entirely. */
export type PlateCtaIcon = "arrow-right" | "arrow-down" | "none";

interface PlateCtaBaseProps {
  children: React.ReactNode;
  variant?: PlateCtaVariant;
  tone?: PlateCtaTone;
  size?: PlateCtaSize;
  icon?: PlateCtaIcon;
  /** Optional glyph rendered before the label (e.g. a phone icon). */
  leadingIcon?: React.ReactNode;
  /** Layout classes only (width, shrink, wrapping). Visual styling lives here. */
  className?: string;
}

/** Native attributes forwarded to the rendered `<button>`. */
type PlateButtonElementProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  href?: undefined;
};

/** Native attributes forwarded to the rendered link. A string `href` selects this shape. */
type PlateLinkElementProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
  href: string;
};

export type PlateCtaButtonProps = PlateCtaBaseProps & PlateButtonElementProps;
export type PlateCtaLinkProps = PlateCtaBaseProps & PlateLinkElementProps;
export type PlateCtaProps = PlateCtaButtonProps | PlateCtaLinkProps;

const SIZE_CLASSES: Record<PlateCtaSize, { root: string; label: string; cell: string; glyph: string }> = {
  sm: { root: "[--cut:7px] text-[13px]", label: "gap-2 px-4 py-2.5", cell: "px-3", glyph: "h-3.5 w-3.5" },
  md: { root: "[--cut:9px] text-sm", label: "gap-2.5 px-6 py-3.5", cell: "px-4", glyph: "h-4 w-4" },
  lg: { root: "[--cut:11px] text-sm", label: "gap-2.5 px-7 py-4", cell: "px-5", glyph: "h-4 w-4" },
};

interface SkinClasses {
  text: string;
  frame: string;
  face: string;
  sweep: string;
  divider: string;
  focus: string;
}

const SKINS: Record<PlateCtaTone, Record<PlateCtaVariant, SkinClasses>> = {
  steel: {
    solid: {
      text: "text-white",
      frame: "bg-[#0F3D87]",
      face: "bg-[#1B5FC4] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
      sweep: "bg-[#0F3D87]",
      divider: "border-white/20",
      focus: "focus-visible:outline-[#1B5FC4]",
    },
    outline: {
      text: "text-[#0D1B2E]",
      frame: "bg-[#CBD5E1] group-hover/plate:bg-[#1B5FC4]",
      face: "bg-white",
      sweep: "bg-[#F2F6FC]",
      divider: "border-[#E3E7ED] group-hover/plate:border-[#DCE4F0]",
      focus: "focus-visible:outline-[#1B5FC4]",
    },
  },
  signal: {
    solid: {
      text: "text-white",
      frame: "bg-[#7E1719]",
      face: "bg-[#BD2E2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
      sweep: "bg-[#9E1F22]",
      divider: "border-white/20",
      focus: "focus-visible:outline-[#BD2E2C]",
    },
    outline: {
      text: "text-[#0D1B2E]",
      frame: "bg-[#E7C3C2] group-hover/plate:bg-[#BD2E2C]",
      face: "bg-white",
      sweep: "bg-[#FBF1F0]",
      divider: "border-[#F0DCDB] group-hover/plate:border-[#E7C3C2]",
      focus: "focus-visible:outline-[#BD2E2C]",
    },
  },
};

const EASE_OUT = "ease-[cubic-bezier(0.33,0,0,1)]";

/** Type guard: a string `href` means the plate renders as a link. */
function isLinkElementProps(
  props: PlateButtonElementProps | PlateLinkElementProps
): props is PlateLinkElementProps {
  return typeof props.href === "string";
}

/** Internal routes go through `next/link`; hashes, `tel:`, `mailto:` and external URLs use `<a>`. */
function isInternalRoute(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Machined-plate CTA. Renders a `<button>` by default, or a link when `href` is set.
 *
 * @example
 * <PlateCta onClick={openQuote}>Request a Quote</PlateCta>
 * <PlateCta href="#pillars" variant="outline" icon="arrow-down">Explore</PlateCta>
 */
export function PlateCta({
  children,
  variant = "solid",
  tone = "steel",
  size = "md",
  icon = "arrow-right",
  leadingIcon,
  className = "",
  ...elementProps
}: PlateCtaProps): React.JSX.Element {
  const skin = SKINS[tone][variant];
  const sizing = SIZE_CLASSES[size];

  const rootClassName = [
    "group/plate relative isolate inline-flex select-none items-stretch font-semibold tracking-[-0.01em]",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-4",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    sizing.root,
    skin.text,
    skin.focus,
    className,
  ].join(" ");

  const content = (
    <>
      <PlateSurface frameClassName={skin.frame} faceClassName={skin.face}>
        <span
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 group-hover/plate:scale-x-100 ${EASE_OUT} ${skin.sweep}`}
        />
      </PlateSurface>

      <span className={`relative flex flex-1 items-center justify-center ${sizing.label}`}>
        {leadingIcon}
        {children}
      </span>

      {icon === "none" ? null : (
        <span
          aria-hidden="true"
          className={`relative flex items-center border-l transition-colors duration-150 ${sizing.cell} ${skin.divider}`}
        >
          <ArrowRightIcon
            className={`${sizing.glyph} transition-transform duration-[167ms] ${EASE_OUT} ${
              icon === "arrow-down"
                ? "rotate-90 group-hover/plate:translate-y-0.5"
                : "group-hover/plate:translate-x-0.5"
            }`}
          />
        </span>
      )}
    </>
  );

  if (isLinkElementProps(elementProps)) {
    const { href, ...anchorProps } = elementProps;
    return isInternalRoute(href) ? (
      <Link href={href} className={rootClassName} {...anchorProps}>
        {content}
      </Link>
    ) : (
      <a href={href} className={rootClassName} {...anchorProps}>
        {content}
      </a>
    );
  }

  /* `href` is `undefined` on this branch; React omits undefined attributes. */
  const { type = "button", ...buttonProps } = elementProps;
  return (
    <button type={type} className={rootClassName} {...buttonProps}>
      {content}
    </button>
  );
}
