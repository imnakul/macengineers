/**
 * Content layer for the Blog index.
 *
 * Titles, excerpts and URLs were scraped from https://macengineers.in/category/blog/ on
 * 2026-09-01. The excerpts are the source's own truncated previews and end mid-sentence;
 * an ellipsis is appended so the truncation reads as deliberate rather than as a bug.
 *
 * ARCHITECTURE NOTE — these cards link out to the existing WordPress articles rather
 * than rendering rebuilt copies. A blog is living content: hardcoding ten articles into
 * the bundle would mean nobody can publish an eleventh without a developer and a deploy.
 * Rebuilding this properly means a content source (MDX in-repo, or a headless CMS), and
 * that is a decision about who edits the site, not a layout decision.
 *
 * Only three posts have artwork in /public/mac, so those three lead as cards and the
 * rest run as a typographic index. Seven grey placeholders would look like a fault.
 */

/** A post on the index. `image` is present only for the three with local artwork. */
export interface BlogPost {
  readonly title: string;
  readonly href: string;
  readonly excerpt: string;
  readonly image?: string;
  readonly alt?: string;
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
      href: "https://macengineers.in/the-role-of-automation-in-industrial-material-handling/",
      excerpt:
        "In the modern industrial landscape, automation is redefining the way materials are moved, stored, and processed across manufacturing and warehousing…",
      image: "/mac/journal-automation.webp",
      alt: "Automated material handling equipment on a plant floor",
    },
    {
      title: "Troubleshooting Common Industrial Equipment Issues",
      href: "https://macengineers.in/troubleshooting-common-industrial-equipment-issues/",
      excerpt:
        "Industrial equipment is the backbone of manufacturing and process industries. Efficient operation of machinery like mixers, conveyors, and storage systems…",
      image: "/mac/journal-troubleshooting.webp",
      alt: "Technician inspecting an industrial mixer during maintenance",
    },
    {
      title: "Energy-Efficient Equipment for Modern Process Industries",
      href: "https://macengineers.in/energy-efficient-equipment-for-modern-process-industries/",
      excerpt:
        "Energy efficiency is becoming a top priority for modern process industries. Rising energy costs, environmental regulations, and sustainability goals have…",
      image: "/mac/journal-energy.webp",
      alt: "Energy-efficient process equipment installed in a modern plant",
    },
  ] satisfies readonly BlogPost[],

  more: [
    {
      title: "Reducing Downtime Through Preventive Maintenance",
      href: "https://macengineers.in/reducing-downtime-through-preventive-maintenance/",
      excerpt:
        "In industrial operations, equipment downtime can lead to lost productivity, increased costs, and delayed deliveries. One of the most effective…",
    },
    {
      title: "Industrial Equipment Safety Standards You Must Follow",
      href: "https://macengineers.in/industrial-equipment-safety-standards-you-must-follow/",
      excerpt:
        "Safety in industrial operations is paramount. Industrial equipment like mixers, conveyors, storage tanks, and silos must comply with strict safety…",
    },
    {
      title: "Conveyor Maintenance: Preventive Tips for Continuous Operation",
      href: "https://macengineers.in/conveyor-maintenance-preventive-tips-for-continuous-operation/",
      excerpt:
        "Conveyors are the lifeline of modern industrial operations, ensuring smooth material handling and uninterrupted production. However, conveyor downtime can cause…",
    },
    {
      title: "Designing Efficient Conveyor Systems for Industrial Plants",
      href: "https://macengineers.in/designing-efficient-conveyor-systems-for-industrial-plants/",
      excerpt:
        "Conveyor systems are critical to the smooth functioning of industrial plants, enabling efficient movement of materials across production lines. Well-designed…",
    },
    {
      title: "Maintenance Practices to Extend Silo Lifespan",
      href: "https://macengineers.in/maintenance-practices-to-extend-silo-lifespan/",
      excerpt:
        "Storage silos are critical assets in industrial plants, storing bulk materials like powders, grains, and chemicals. Proper maintenance is essential…",
    },
    {
      title: "Preventing Material Segregation in Bulk Storage Silos",
      href: "https://macengineers.in/preventing-material-segregation-in-bulk-storage-silos/",
      excerpt:
        "Material segregation in bulk storage silos can lead to inconsistent product quality, operational inefficiencies, and increased waste. Segregation occurs when…",
    },
    {
      title: "Designing Silos for Polypropylene and Other Polymers",
      href: "https://macengineers.in/designing-silos-for-polypropylene-and-other-polymers/",
      excerpt:
        "Storing polymers like polypropylene (PP) and other plastics requires specialized silo design to ensure material integrity, smooth flow, and operational…",
    },
  ] satisfies readonly BlogPost[],

  moreHeading: "More from the team",
  archiveHref: "https://macengineers.in/category/blog/",
  archiveLabel: "View the full archive",
} as const;
