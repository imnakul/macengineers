import type { SpecItem } from "@/data/site";

interface SpecRailProps {
  items: readonly SpecItem[];
  tone?: "default" | "inverse";
  className?: string;
}

/**
 * A dimension line. Each fact sits under its own measured rule with a tick dropped at
 * the left edge, the way a drawing annotates a run. Facts only — every value rendered
 * here is already stated in the site copy.
 */
export function SpecRail({
  items,
  tone = "default",
  className = "",
}: SpecRailProps): React.JSX.Element {
  const isInverse = tone === "inverse";

  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="relative flex flex-col gap-2 pt-4">
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 h-px ${
              isInverse ? "bg-canvas/15" : "bg-hairline-strong"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-0 left-0 h-2 w-px ${
              isInverse ? "bg-accent-bright" : "bg-accent"
            }`}
          />
          <dt
            className={`font-mono text-[10px] leading-none tracking-tech uppercase ${
              isInverse ? "text-canvas/45" : "text-ink-muted"
            }`}
          >
            {item.label}
          </dt>
          <dd
            className={`text-[15px] leading-tight font-block tracking-glide ${
              isInverse ? "text-canvas" : "text-ink-strong"
            }`}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
