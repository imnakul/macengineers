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
  /** Persuasive copy runs on a centred spine; comparable data stays left-aligned. */
  align?: "left" | "center";
  tone?: "default" | "inverse";
  children?: ReactNode;
}

/**
 * Display type set as a block, not a line: leading locked to 1, tracking pulled to
 * -3.2% once the size clears 48px — big type needs more optical pull than the -2%
 * body rule gives it. Body copy relaxes to 1.5 and is capped at a 640px measure
 * regardless of how wide the container gets.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  body,
  align = "left",
  tone = "default",
  children,
}: SectionHeadingProps): React.JSX.Element {
  const isCentered = align === "center";
  const isInverse = tone === "inverse";

  return (
    <div className={isCentered ? "flex flex-col items-center text-center" : "flex flex-col"}>
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
          } ${isCentered ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
