import type { MetadataRoute } from "next";
import { JOBS } from "@/data/jobs";
import { absoluteUrl } from "@/lib/structured-data";

/**
 * Sitemap.
 *
 * Priorities are relative to each other, not absolute claims: the two pages that convert
 * (quote and contact) sit just under the home page, the catalogue pages next, and the
 * individual job posts last. `lastModified` is the build time for static pages, and the
 * real source date for the job posts, which have one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const pages: readonly { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] =
    [
      { path: "/", priority: 1, changeFrequency: "monthly" },
      { path: "/get-a-quote", priority: 0.9, changeFrequency: "monthly" },
      { path: "/contact-us", priority: 0.9, changeFrequency: "monthly" },
      { path: "/product", priority: 0.8, changeFrequency: "monthly" },
      { path: "/service", priority: 0.8, changeFrequency: "monthly" },
      { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
      { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
      { path: "/job-openings", priority: 0.6, changeFrequency: "weekly" },
    ];

  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: built,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...JOBS.map((job) => ({
      url: absoluteUrl(`/jobs/${job.slug}`),
      lastModified: new Date(job.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
