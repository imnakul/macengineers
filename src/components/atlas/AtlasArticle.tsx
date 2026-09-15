import React from "react";
import type { ContentBlock, ListItem } from "@/data/blog-posts";
import { buildArticleOutline, type ArticleHeading } from "@/lib/blog";
import { PlateSurface } from "@/variants/shared/PlateSurface";

/** Short steel rule used as the list marker — the same mark as the homepage feature lists. */
function Marker(): React.JSX.Element {
  return <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-[#1B5FC4]" />;
}

function ListRow({ item }: { item: ListItem }): React.JSX.Element {
  if (item.type === "subgroup") {
    return (
      <li className="rounded-[6px] border border-[#E3E7ED] bg-white p-5">
        <p className="font-display text-[15px] font-semibold text-[#0D1B2E]">{item.label}</p>
        {item.items.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {item.items.map((text) => (
              <li key={text} className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-600">
                <Marker />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700 md:text-base">
      <Marker />
      <span>{item.text}</span>
    </li>
  );
}

function ArticleBlock({ block, heading }: { block: ContentBlock; heading?: ArticleHeading }): React.JSX.Element {
  switch (block.type) {
    case "heading":
      return heading?.level === 3 ? (
        <h3 id={heading.id} className="mt-9 scroll-mt-28 font-display text-lg font-semibold tracking-[-0.01em] text-[#0D1B2E] first:mt-0">
          {block.text}
        </h3>
      ) : (
        <h2
          id={heading?.id}
          className="mt-14 scroll-mt-28 font-display text-2xl font-semibold tracking-[-0.02em] text-[#0D1B2E] first:mt-0 md:text-[28px]"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="mt-5 text-base leading-[1.75] text-slate-600 first:mt-0 md:text-[17px]">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="relative isolate mt-8 px-6 py-5 [--cut:10px] first:mt-0">
          <PlateSurface frameClassName="bg-[#C9D8EE]" faceClassName="bg-[#F2F6FC]" />
          <p className="text-lg font-medium leading-relaxed text-[#0D1B2E]">{block.text}</p>
        </blockquote>
      );
    case "list": {
      const hasSubgroups = block.items.some((item) => item.type === "subgroup");
      return (
        <ul className={`mt-6 first:mt-0 ${hasSubgroups ? "grid gap-3" : "space-y-2.5"}`}>
          {block.items.map((item, index) => (
            <ListRow key={`${item.type}-${index}`} item={item} />
          ))}
        </ul>
      );
    }
    default:
      return block satisfies never;
  }
}

/**
 * Renders a blog post body from its typed content blocks in Corporate Atlas typography.
 * Headings get anchor ids from `buildArticleOutline`, so an on-page contents list built
 * from the same blocks links straight to them.
 */
export function AtlasArticle({ blocks }: { blocks: readonly ContentBlock[] }): React.JSX.Element {
  const headingByBlock = new Map(buildArticleOutline(blocks).map((heading) => [heading.blockIndex, heading]));

  return (
    <div className="max-w-[680px]">
      {blocks.map((block, index) => (
        <ArticleBlock key={index} block={block} heading={headingByBlock.get(index)} />
      ))}
    </div>
  );
}
