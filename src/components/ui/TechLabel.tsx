import type { ReactNode } from "react";

interface TechLabelProps {
  /** Two-digit sheet index, e.g. "03". Rendered in the accent. */
  index?: string;
  children: ReactNode;
  /** `inverse` switches the ramp for use on the dark band. */
  tone?: "default" | "inverse";
  className?: string;
}

/**
 * The technical register — the layer an engineering drawing carries alongside its
 * geometry: sheet number, then the thing being drawn. Mono, uppercase, and tracked
 * wide (+14%) in deliberate opposition to the sans, which is tracked tight (-2%).
 * That opposition is what keeps the two registers from reading as one muddled voice.
 */
export function TechLabel({
  index,
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
      {index ? (
        <>
          <span className={isInverse ? "text-canvas/80" : "text-ink-strong"}>{index}</span>
          <span aria-hidden="true" className={isInverse ? "text-canvas/25" : "text-ink-muted/45"}>
            /
          </span>
        </>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
