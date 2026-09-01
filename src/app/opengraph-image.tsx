import { COMPANY, HERO } from "@/data/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = COMPANY.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: COMPANY.name,
    title: HERO.headline,
    description: COMPANY.metaDescription,
  });
}
