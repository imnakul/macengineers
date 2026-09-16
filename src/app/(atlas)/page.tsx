import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { productListLd } from "@/lib/structured-data";
import { Variant5Page } from "@/variants/variant5/Variant5Page";
import {
  HERO_DESKTOP_MEDIA,
  HERO_FACTORY_FINAL_IMAGE,
  HERO_MOBILE_MEDIA,
  HERO_PLATE_IMAGE,
} from "@/variants/variant5/hero/heroImages";

export const metadata: Metadata = pageMetadata({
  title: COMPANY.metaTitle,
  description: COMPANY.metaDescription,
  path: "/",
});

/**
 * Preloads a `fill` hero image with exactly the `srcset`/`sizes` its `<Image>` requests, scoped to the
 * breakpoint where it is the largest paint. `preload()` always lands in <head>.
 */
function preloadHeroImage(src: string, sizes: string, media: string): void {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: sizes,
    media,
    fetchPriority: "high",
  });
}

/**
 * MAC Engineers homepage — the Corporate Atlas design.
 *
 * Header and footer come from the (atlas) group layout, shared with every inner page.
 * The previous landing page lives on at `/5`.
 */
export default function HomePage(): React.JSX.Element {
  preloadHeroImage(HERO_FACTORY_FINAL_IMAGE.src, HERO_FACTORY_FINAL_IMAGE.sizes, HERO_DESKTOP_MEDIA);
  preloadHeroImage(HERO_PLATE_IMAGE.src, HERO_PLATE_IMAGE.sizes, HERO_MOBILE_MEDIA);

  return (
    <>
      <Variant5Page />
      <JsonLd data={[productListLd()]} />
    </>
  );
}
