import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small uppercase index label that sits above the heading. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Persuasive copy runs on a centred spine; comparable data stays left-aligned. */
  align?: "left" | "center";
  children?: ReactNode;
}

/**
 * Display type set as a block, not a line: leading locked to 1, tracking pulled to
 * -2% of font size. Body copy relaxes to 1.5 and is capped at a 640px measure
 * regardless of how wide the container gets.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  children,
}: SectionHeadingProps): React.JSX.Element {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "flex flex-col items-center text-center" : "flex flex-col"}>
      {eyebrow ? (
        <span className="mb-5 text-[12px] font-mid tracking-glide text-ink-muted uppercase">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="max-w-[900px] text-[32px] leading-none font-block tracking-glide text-ink-strong sm:text-[40px] md:text-[48px]">
        {title}
      </h2>

      {body ? (
        <p
          className={`mt-6 max-w-[640px] text-[16px] leading-6 font-regular tracking-glide text-ink-muted ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
