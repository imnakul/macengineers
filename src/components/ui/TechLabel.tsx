import type { ReactNode } from "react";

interface TechLabelProps {
  children: ReactNode;
  /** `inverse` switches the ramp for use on the dark band. */
  tone?: "default" | "inverse";
  className?: string;
}

/**
 * The technical register — the mono, uppercase, wide-tracked (+14%) label style used
 * for eyebrows, in deliberate opposition to the sans, which is tracked tight (-2%).
 * That opposition is what keeps the two registers from reading as one muddled voice.
 *
 * This used to carry an optional two-digit sheet index ("03 / Eyebrow"), styled as a
 * running sheet count across the page. Removed: it was purely decorative — not a link,
 * not tied to a real table of contents, and the alt text and headings already carry
 * every bit of real information a reader needs. It added visual noise without a payoff.
 */
export function TechLabel({
  children,
  tone = "default",
  className = "",
}: TechLabelProps): React.JSX.Element {
  const isInverse = tone === "inverse";

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] leading-none tracking-tech uppercase ${
        isInverse ? "text-canvas/55" : "text-ink-muted"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-[7px] w-[7px] shrink-0 ${
          isInverse ? "bg-accent-bright" : "bg-accent"
        }`}
      />
      <span>{children}</span>
    </span>
  );
}
