import { CAREERS_PAGE } from "@/data/jobs";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = CAREERS_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: CAREERS_PAGE.hero.eyebrow,
    title: CAREERS_PAGE.hero.headline,
    description: CAREERS_PAGE.metaDescription,
    picture: { src: "/images/hero/header-careers-team.png", kind: "render" },
  });
}
