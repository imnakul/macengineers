interface RuledListProps {
  items: readonly string[];
  /** Continues the sheet's numbering language into the list. */
  numbered?: boolean;
  className?: string;
}

/**
 * A specification list: each clause on its own ruled line with a mono index, the way a
 * policy or scope-of-work is set on a drawing. Rules come from the list's own dividers
 * rather than from card edges, so a long clause never looks like a broken card.
 */
export function RuledList({
  items,
  numbered = true,
  className = "",
}: RuledListProps): React.JSX.Element {
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <li
          key={item}
          className="group flex items-baseline gap-5 border-t border-hairline py-5 last:border-b md:gap-7"
        >
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
          >
            {numbered ? String(index + 1).padStart(2, "0") : "—"}
          </span>
          <span className="text-[15px] leading-[24px] font-regular tracking-glide text-ink md:text-[16px] md:leading-[26px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
