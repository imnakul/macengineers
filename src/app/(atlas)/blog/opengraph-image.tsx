import { BLOG_PAGE } from "@/data/blog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = BLOG_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: BLOG_PAGE.hero.eyebrow,
    title: BLOG_PAGE.hero.headline,
    description: BLOG_PAGE.metaDescription,
  });
}
