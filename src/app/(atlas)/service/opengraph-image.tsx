import { SERVICE_PAGE } from "@/data/services";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SERVICE_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: SERVICE_PAGE.hero.eyebrow,
    title: SERVICE_PAGE.hero.headline,
    description: SERVICE_PAGE.metaDescription,
    picture: { src: "/images/product/installation-crew.png", kind: "render" },
  });
}
