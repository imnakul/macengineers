interface RuledListProps {
  items: readonly string[];
  className?: string;
}

/**
 * A specification list: each clause on its own ruled line with a small accent bullet,
 * the way a policy or scope-of-work is set on a drawing. Rules come from the list's own
 * dividers rather than from card edges, so a long clause never looks like a broken card.
 *
 * This used to offer a `numbered` mode (a mono "01, 02, 03…" index). Dropped: every
 * caller's list is a set of parallel clauses or scope items, not a sequence where order
 * carries meaning, so the number was decorative — the same reasoning that removed
 * sheet-numbering everywhere else on the site this pass.
 */
export function RuledList({ items, className = "" }: RuledListProps): React.JSX.Element {
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-4 border-t border-hairline py-5 last:border-b"
        >
          <span
            aria-hidden="true"
            className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] bg-accent"
          />
          <span className="text-[15px] leading-[24px] font-regular tracking-glide text-ink md:text-[16px] md:leading-[26px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
