import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { productListLd } from "@/lib/structured-data";
import { Variant5Page } from "@/variants/variant5/Variant5Page";

export const metadata: Metadata = pageMetadata({
  title: COMPANY.metaTitle,
  description: COMPANY.metaDescription,
  path: "/",
});

/**
 * MAC Engineers homepage — the Corporate Atlas design.
 *
 * Header and footer come from the (atlas) group layout, shared with every inner page.
 * The previous landing page lives on at `/5`.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Variant5Page />
      <JsonLd data={[productListLd()]} />
    </>
  );
}
