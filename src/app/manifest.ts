import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/site";

/**
 * Web app manifest. This is a brochure site, not an installable app, so `display` stays
 * "browser"; the manifest exists to give browsers and search engines the site's name,
 * colours and icons from one declared source.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.name,
    description: COMPANY.metaDescription,
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "en-IN",
    background_color: "#f4f7fa",
    theme_color: "#ffffff",
    categories: ["business"],
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
