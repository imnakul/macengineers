interface CornerTicksProps {
  tone?: "default" | "inverse";
  /** Distance from the container edge. */
  inset?: "tight" | "loose";
}

/**
 * Registration marks, set just inside the corners the way a print trim guide sits on a
 * plate. They are the smallest possible carrier for the accent — four 10px L-shapes per
 * frame — which is how the hue stays at roughly 1% of the page.
 *
 * Every class below is written out in full: Tailwind scans source for literal strings,
 * so an interpolated `top-${x}` would never reach the generated stylesheet.
 */
export function CornerTicks({
  tone = "default",
  inset = "tight",
}: CornerTicksProps): React.JSX.Element {
  const stroke = tone === "inverse" ? "border-accent-bright/70" : "border-accent/60";
  const isLoose = inset === "loose";

  const topLeft = isLoose ? "top-7 left-7" : "top-2.5 left-2.5";
  const topRight = isLoose ? "top-7 right-7" : "top-2.5 right-2.5";
  const bottomLeft = isLoose ? "bottom-7 left-7" : "bottom-2.5 left-2.5";
  const bottomRight = isLoose ? "right-7 bottom-7" : "right-2.5 bottom-2.5";

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`absolute h-2.5 w-2.5 border-t border-l ${stroke} ${topLeft}`} />
      <span className={`absolute h-2.5 w-2.5 border-t border-r ${stroke} ${topRight}`} />
      <span className={`absolute h-2.5 w-2.5 border-b border-l ${stroke} ${bottomLeft}`} />
      <span className={`absolute h-2.5 w-2.5 border-r border-b ${stroke} ${bottomRight}`} />
    </span>
  );
}
