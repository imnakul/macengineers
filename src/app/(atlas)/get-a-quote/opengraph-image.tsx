import { QUOTE_PAGE } from "@/data/quote";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = QUOTE_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: QUOTE_PAGE.hero.eyebrow,
    title: QUOTE_PAGE.hero.headline,
    description: QUOTE_PAGE.metaDescription,
    picture: { src: "/images/product/turnkey-process-system.png", kind: "render" },
  });
}
