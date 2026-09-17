import { PRODUCT_PAGE } from "@/data/products";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = PRODUCT_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: PRODUCT_PAGE.hero.eyebrow,
    title: PRODUCT_PAGE.hero.headline,
    description: PRODUCT_PAGE.metaDescription,
    picture: { src: "/images/product/turnkey-process-system.png", kind: "render" },
  });
}
