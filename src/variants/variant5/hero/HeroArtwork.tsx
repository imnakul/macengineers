import React from "react";

/* ---------------------------------------------------------------------------
 * Decorative drafting artwork shared by the hero layouts: blueprint drawings,
 * plate corner brackets and the small monospaced annotations. Every label is
 * live text (not baked into imagery), so it stays sharp, legible and
 * translatable at any viewport.
 * ------------------------------------------------------------------------- */

/** Keeps drawing lines at 1px however large the drawing renders (`vector-effect` is not inherited). */
const HAIRLINE_STROKES = "[&_*]:[vector-effect:non-scaling-stroke]";

interface DrawingProps {
  className?: string;
}

/** Elevation of a dished-head process vessel with nozzles, legs and dimension lines. */
export function VesselElevationDrawing({ className = "" }: DrawingProps): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 240 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      className={`${HAIRLINE_STROKES} ${className}`}
    >
      <g>
        {/* Shell and dished heads */}
        <path d="M60 90 Q60 50 120 44 Q180 50 180 90 V220 Q180 258 120 264 Q60 258 60 220 Z" />
        <path d="M60 90 H180 M60 220 H180" strokeDasharray="3 3" />
        {/* Jacket bands */}
        <path d="M60 150 H180 M60 165 H180 M60 180 H180 M60 195 H180" opacity="0.6" />
        {/* Top nozzles and agitator drive */}
        <path d="M112 44 V22 H128 V44 M108 22 H132 M116 22 V10 H124 V22" />
        <path d="M80 56 V38 H92 V52 M150 52 V36 H162 V58" />
        {/* Manway */}
        <circle cx="120" cy="120" r="16" />
        <circle cx="120" cy="120" r="11" opacity="0.6" />
        {/* Side nozzles */}
        <path d="M180 110 H198 V122 H180 M60 200 H44 V212 H60" />
        {/* Bottom outlet and legs */}
        <path d="M116 264 V282 H124 V264 M112 282 H128" />
        <path d="M72 238 V298 H84 V244 M156 244 V298 H168 V238" />
        <path d="M66 298 H90 M150 298 H174" />
        {/* Centre line */}
        <path d="M120 2 V312" strokeDasharray="10 3 2 3" opacity="0.7" />
        {/* Dimension lines */}
        <path d="M60 306 H180 M60 302 V310 M180 302 V310" opacity="0.8" />
        <path d="M216 44 V264 M212 44 H220 M212 264 H220" opacity="0.8" />
        <path d="M188 90 H224 M188 220 H224" strokeDasharray="2 3" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Plan view of a bolted flange / manway cover with bolt circle and centre lines. */
export function FlangePlanDrawing({ className = "" }: DrawingProps): React.JSX.Element {
  const bolts = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    // Rounded so the server and the browser print identical attributes (their trig can differ in the last digit).
    return { cx: Number((100 + Math.cos(angle) * 70).toFixed(2)), cy: Number((100 + Math.sin(angle) * 70).toFixed(2)) };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      className={`${HAIRLINE_STROKES} ${className}`}
    >
      <g>
        <circle cx="100" cy="100" r="86" />
        <circle cx="100" cy="100" r="70" strokeDasharray="4 3" opacity="0.7" />
        <circle cx="100" cy="100" r="54" />
        <circle cx="100" cy="100" r="36" opacity="0.6" />
        {bolts.map((bolt) => (
          <circle key={`${bolt.cx.toFixed(1)}-${bolt.cy.toFixed(1)}`} cx={bolt.cx} cy={bolt.cy} r="5" />
        ))}
        <path d="M100 0 V200 M0 100 H200" strokeDasharray="10 3 2 3" opacity="0.7" />
        <path d="M14 196 H186 M14 192 V200 M186 192 V200" opacity="0.8" />
      </g>
    </svg>
  );
}

/** Large L-shaped registration brackets that sit on (or just outside) a plate's corners. */
export function PlateBrackets({ className = "" }: DrawingProps): React.JSX.Element {
  const arm = "pointer-events-none absolute h-7 w-7 border-[#1B5FC4] sm:h-9 sm:w-9";
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span className={`${arm} left-0 top-0 rounded-tl-[6px] border-l-2 border-t-2`} />
      <span className={`${arm} right-0 top-0 rounded-tr-[6px] border-r-2 border-t-2`} />
      <span className={`${arm} bottom-0 left-0 rounded-bl-[6px] border-b-2 border-l-2`} />
      <span className={`${arm} bottom-0 right-0 rounded-br-[6px] border-b-2 border-r-2`} />
    </span>
  );
}

interface AnnotationProps {
  lines: readonly string[];
  /** Hairline to the left of the text block. */
  leader?: boolean;
  className?: string;
}

/** Stacked monospaced callout text, like the notes on an engineering drawing. */
export function Annotation({
  lines,
  leader = false,
  className = "",
}: AnnotationProps): React.JSX.Element {
  return (
    <p
      className={`font-mono text-[9.5px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-slate-500 xl:text-[10.5px] ${
        leader ? "border-l border-[#1B5FC4]/40 pl-3" : ""
      } ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}

export const CAPABILITY_STRIP: readonly string[] = [
  "Process Equipment",
  "Piping & Systems",
  "Skid Integration",
  "Automation Ready",
];

/** One-line capability strip separated by thin rules. Wraps cleanly on narrow plates. */
export function CapabilityStrip({ className = "" }: DrawingProps): React.JSX.Element {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] ${className}`}
    >
      {CAPABILITY_STRIP.map((item, index) => (
        <React.Fragment key={item}>
          {index > 0 ? <span aria-hidden="true" className="h-3 w-px bg-slate-300" /> : null}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </p>
  );
}
