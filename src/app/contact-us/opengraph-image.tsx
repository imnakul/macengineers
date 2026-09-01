import { CONTACT_PAGE } from "@/data/contact";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = CONTACT_PAGE.metaTitle;

export default function Image(): ReturnType<typeof renderOgImage> {
  return renderOgImage({
    eyebrow: CONTACT_PAGE.hero.eyebrow,
    title: CONTACT_PAGE.hero.headline,
    description: CONTACT_PAGE.metaDescription,
  });
}
