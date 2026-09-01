import type { BlogPostDetail, ContentBlock, ListItem } from "@/data/blog-posts";

interface BlogArticleProps {
  blocks: readonly BlogPostDetail["blocks"][number][];
}

const BULLET = (
  <span
    aria-hidden="true"
    className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] bg-accent"
  />
);

function ListItemRow({ item }: { item: ListItem }): React.JSX.Element {
  if (item.type === "subgroup") {
    return (
      <li className="border-t border-hairline py-5 last:border-b">
        <p className="text-[15px] leading-[23px] font-strong tracking-glide text-ink-strong">
          {item.label}
        </p>
        {item.items.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2.5">
            {item.items.map((text) => (
              <li key={text} className="flex items-baseline gap-3">
                {BULLET}
                <span className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <li className="flex items-baseline gap-4 border-t border-hairline py-4 last:border-b">
      {BULLET}
      <span className="text-[15px] leading-[23px] font-regular tracking-glide text-ink">
        {item.text}
      </span>
    </li>
  );
}

function Block({ block }: { block: ContentBlock }): React.JSX.Element {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-12 text-[22px] leading-[1.15] font-block tracking-display text-ink-strong first:mt-0 md:text-[26px]">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mt-5 text-[16px] leading-[27px] font-regular tracking-glide text-ink-muted first:mt-0 md:text-[17px] md:leading-[29px]">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-accent py-1 pl-6 text-[17px] leading-[27px] font-block tracking-glide text-ink-strong first:mt-0">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-6 flex flex-col first:mt-0">
          {block.items.map((item, index) => (
            <ListItemRow key={`${item.type}-${index}`} item={item} />
          ))}
        </ul>
      );
    default:
      return block satisfies never;
  }
}

/**
 * Renders one post's body from its typed content blocks. Headings step down to
 * article scale (22–26px, well under a page's own H1/H2) so a long post never reads as
 * louder than the page chrome around it. No numbering anywhere in this component — the
 * site dropped decorative sheet-numbering site-wide; a bare accent dot carries the same
 * "this is a list" signal without a number that means nothing.
 */
export function BlogArticle({ blocks }: BlogArticleProps): React.JSX.Element {
  return (
    <div className="max-w-[680px]">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
