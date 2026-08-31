import type { Metadata } from "next";
import { COMPANY } from "@/data/site";
import { absoluteUrl } from "@/lib/structured-data";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/product". Use "/" for the home page. */
  path: string;
  type?: "website" | "article";
}

/**
 * Builds per-page metadata from one source of truth.
 *
 * This exists because the canonical link and the og:url must name the *same* URL. Given
 * separately they drift — an earlier pass here had canonicals without a trailing slash
 * and og:urls with one, which asks a crawler to treat one page as two.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Macengineersank",
      title,
      description,
    },
  };
}
