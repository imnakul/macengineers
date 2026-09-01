import { ABOUT_PAGE } from "@/data/about";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = ABOUT_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: ABOUT_PAGE.hero.eyebrow,
    title: ABOUT_PAGE.hero.headline,
    description: ABOUT_PAGE.metaDescription,
  });
}
