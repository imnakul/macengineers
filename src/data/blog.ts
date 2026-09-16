import type { RenderFit } from "@/components/ui/RenderStage";

/**
 * Content layer for the Blog index.
 *
 * Titles, excerpts and URLs were scraped from https://macengineers.in/category/blog/ on
 * 2026-09-01. The excerpts are the source's own truncated previews and end mid-sentence;
 * an ellipsis is appended so the truncation reads as deliberate rather than as a bug.
 *
 * Every card now links to a detail page built in this codebase — see
 * src/data/blog-posts.ts for the full article content and src/app/[slug]/page.tsx for
 * the route. Routes are flat (/{slug}), matching the URL shape the live WordPress site
 * already uses, rather than nested under /blog/.
 *
 * This is still a snapshot, not a live content source — see the MAINTENANCE NOTE in
 * blog-posts.ts for what that means for an eleventh post.
 *
 * The three featured posts lead as cards with 3D renders; the rest run as a typographic index
 * (their article pages carry artwork of their own).
 */

/** A post on the index. `image` is present only for the featured three. */
export interface BlogPost {
  readonly title: string;
  readonly href: string;
  readonly excerpt: string;
  readonly image?: string;
  readonly alt?: string;
  /** How the render sits on the studio stage. */
  readonly imageFit?: RenderFit;
}

export const BLOG_PAGE = {
  metaTitle: "Industrial Insights & Innovations | MAC Engineers Blog",
  metaDescription:
    "Trends, tips and best practices in industrial equipment, storage solutions, mixers, silos and material handling for process industries, from the MAC Engineers team.",

  hero: {
    eyebrow: "Insights",
    headline: "Industrial Insights & Innovations",
    subhead:
      "Stay updated with the latest trends, tips, and best practices in industrial equipment, storage solutions, mixers, silos, and material handling for process industries.",
  },

  featured: [
    {
      title: "The Role of Automation in Industrial Material Handling",
      href: "/the-role-of-automation-in-industrial-material-handling",
      excerpt:
        "In the modern industrial landscape, automation is redefining the way materials are moved, stored, and processed across manufacturing and warehousing…",
      image: "/images/product/turnkey-process-system.png",
      alt: "Automated process line with screw conveyor, reactor, pumps and PLC control panel on one skid",
      imageFit: "object",
    },
    {
      title: "Troubleshooting Common Industrial Equipment Issues",
      href: "/troubleshooting-common-industrial-equipment-issues",
      excerpt:
        "Industrial equipment is the backbone of manufacturing and process industries. Efficient operation of machinery like mixers, conveyors, and storage systems…",
      image: "/images/product/commissioning-support-crew.png",
      alt: "Technicians diagnosing a pump skid and process piping beside a jacketed vessel",
      imageFit: "scene",
    },
    {
      title: "Energy-Efficient Equipment for Modern Process Industries",
      href: "/energy-efficient-equipment-for-modern-process-industries",
      excerpt:
        "Energy efficiency is becoming a top priority for modern process industries. Rising energy costs, environmental regulations, and sustainability goals have…",
      image: "/images/product/engineering-workspace.png",
      alt: "Engineering workstation with process vessel models and energy performance charts",
      imageFit: "scene",
    },
  ] satisfies readonly BlogPost[],

  more: [
    {
      title: "Reducing Downtime Through Preventive Maintenance",
      href: "/reducing-downtime-through-preventive-maintenance",
      excerpt:
        "In industrial operations, equipment downtime can lead to lost productivity, increased costs, and delayed deliveries. One of the most effective…",
    },
    {
      title: "Industrial Equipment Safety Standards You Must Follow",
      href: "/industrial-equipment-safety-standards-you-must-follow",
      excerpt:
        "Safety in industrial operations is paramount. Industrial equipment like mixers, conveyors, storage tanks, and silos must comply with strict safety…",
    },
    {
      title: "Conveyor Maintenance: Preventive Tips for Continuous Operation",
      href: "/conveyor-maintenance-preventive-tips-for-continuous-operation",
      excerpt:
        "Conveyors are the lifeline of modern industrial operations, ensuring smooth material handling and uninterrupted production. However, conveyor downtime can cause…",
    },
    {
      title: "Designing Efficient Conveyor Systems for Industrial Plants",
      href: "/designing-efficient-conveyor-systems-for-industrial-plants",
      excerpt:
        "Conveyor systems are critical to the smooth functioning of industrial plants, enabling efficient movement of materials across production lines. Well-designed…",
    },
    {
      title: "Maintenance Practices to Extend Silo Lifespan",
      href: "/maintenance-practices-to-extend-silo-lifespan",
      excerpt:
        "Storage silos are critical assets in industrial plants, storing bulk materials like powders, grains, and chemicals. Proper maintenance is essential…",
    },
    {
      title: "Preventing Material Segregation in Bulk Storage Silos",
      href: "/preventing-material-segregation-in-bulk-storage-silos",
      excerpt:
        "Material segregation in bulk storage silos can lead to inconsistent product quality, operational inefficiencies, and increased waste. Segregation occurs when…",
    },
    {
      title: "Designing Silos for Polypropylene and Other Polymers",
      href: "/designing-silos-for-polypropylene-and-other-polymers",
      excerpt:
        "Storing polymers like polypropylene (PP) and other plastics requires specialized silo design to ensure material integrity, smooth flow, and operational…",
    },
  ] satisfies readonly BlogPost[],

  moreHeading: "More from the team",
} as const;
