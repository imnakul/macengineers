import { BLOG_POSTS, type BlogPostDetail, type ContentBlock } from "@/data/blog-posts";

/** A heading inside an article, with the anchor id it is rendered under. */
export interface ArticleHeading {
  readonly id: string;
  readonly text: string;
  /** 2 for section headings, 3 for lettered sub-points such as "a. Increased Efficiency". */
  readonly level: 2 | 3;
  /** Position of the heading in the post's block list. */
  readonly blockIndex: number;
}

/** Lettered sub-points ("a. …", "b. …") sit under a numbered section in the source posts. */
const SUBHEADING_PATTERN = /^[a-z]\.\s/i;

const WORDS_PER_MINUTE = 220;

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

/**
 * Every heading in a post, with stable, de-duplicated anchor ids. The article renderer
 * and the table of contents both call this, so their ids always agree.
 */
export function buildArticleOutline(blocks: readonly ContentBlock[]): ArticleHeading[] {
  const seen = new Map<string, number>();
  const outline: ArticleHeading[] = [];

  blocks.forEach((block, blockIndex) => {
    if (block.type !== "heading") return;
    const base = slugify(block.text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    outline.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text: block.text,
      level: SUBHEADING_PATTERN.test(block.text) ? 3 : 2,
      blockIndex,
    });
  });

  return outline;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Rough reading time in whole minutes, never less than one. */
export function estimateReadingMinutes(blocks: readonly ContentBlock[]): number {
  const words = blocks.reduce((total, block) => {
    if (block.type !== "list") return total + countWords(block.text);
    return (
      total +
      block.items.reduce(
        (sum, item) =>
          sum +
          (item.type === "item"
            ? countWords(item.text)
            : countWords(item.label) + item.items.reduce((inner, text) => inner + countWords(text), 0)),
        0
      )
    );
  }, 0);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** "24 October 2025" (long) or "24 Oct 2025" (short), fixed to en-IN and UTC so builds are stable. */
export function formatPostDate(iso: string, style: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function findPostBySlug(slug: string): BlogPostDetail | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Blog index entries link by flat href ("/slug"); this resolves them to the full post. */
export function findPostByHref(href: string): BlogPostDetail | undefined {
  return findPostBySlug(href.replace(/^\//, ""));
}

/** The next `count` posts after the current one, wrapping around the list. */
export function relatedPosts(currentSlug: string, count = 3): BlogPostDetail[] {
  const currentIndex = BLOG_POSTS.findIndex((post) => post.slug === currentSlug);
  const ordered = [...BLOG_POSTS.slice(currentIndex + 1), ...BLOG_POSTS.slice(0, Math.max(currentIndex, 0))];
  return ordered.filter((post) => post.slug !== currentSlug).slice(0, count);
}
