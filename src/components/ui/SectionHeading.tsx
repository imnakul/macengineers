import type { ReactNode } from "react";
import { TechLabel } from "@/components/ui/TechLabel";

interface SectionHeadingProps {
  /**
   * Id for the rendered heading. Required: every section that uses this component
   * names it via `aria-labelledby`, and a dangling reference leaves the region
   * without an accessible name.
   */
  id: string;
  /** Two-digit sheet index shown in the technical label. */
  index?: string;
  /** Short label that sits above the heading, set in the mono register. */
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "default" | "inverse";
  children?: ReactNode;
}

/**
 * Display type set as a block, not a line: leading locked to 1, tracking pulled to
 * -3.2% once the size clears 48px — big type needs more optical pull than the -2%
 * body rule gives it. Body copy relaxes to 1.5 and is capped at a 640px measure
 * regardless of how wide the container gets.
 *
 * Always left-aligned. An earlier pass let individual sections opt into a centred
 * spine for "persuasive" copy, but that judgement call landed on only two headings
 * out of the whole site — everything else, including every page's masthead and its
 * closing band, was left. The result read as arbitrary rather than intentional.
 * Left-aligned also fits the drawing-sheet system better: sheet numbers, spec rails
 * and dimension lines all read left-to-right, and a centred headline sitting above
 * them looked like it belonged to a different document.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  body,
  tone = "default",
  children,
}: SectionHeadingProps): React.JSX.Element {
  const isInverse = tone === "inverse";

  return (
    <div className="flex flex-col">
      {eyebrow ? (
        <TechLabel index={index} tone={tone} className="mb-6">
          {eyebrow}
        </TechLabel>
      ) : null}

      <h2
        id={id}
        className={`max-w-[20ch] text-[34px] leading-none font-block tracking-display sm:text-[42px] md:text-[52px] ${
          isInverse ? "text-canvas" : "text-ink-strong"
        }`}
      >
        {title}
      </h2>

      {body ? (
        <p
          className={`mt-6 max-w-[620px] text-[16px] leading-6 font-regular tracking-glide md:text-[17px] md:leading-[27px] ${
            isInverse ? "text-canvas/70" : "text-ink-muted"
          }`}
        >
          {body}
        </p>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
