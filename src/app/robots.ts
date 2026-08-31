import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/structured-data";

/**
 * Crawl rules. The API routes are disallowed: they answer only to POST, so a crawler
 * that follows one gets a 405 and learns nothing, and they have no business in an index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
