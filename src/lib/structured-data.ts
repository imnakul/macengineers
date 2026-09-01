import { BLOG_PAGE } from "@/data/blog";
import type { BlogPostDetail, ContentBlock } from "@/data/blog-posts";
import type { Job } from "@/data/jobs";
import { PRODUCT_PAGE } from "@/data/products";
import { SERVICE_PAGE } from "@/data/services";
import { COMPANY, FOOTER } from "@/data/site";

/**
 * Structured data for the site.
 *
 * Two rules govern everything below.
 *
 * 1. Markup must agree with what a visitor can actually read on the page. Structured
 *    data that contradicts visible content is the single most common cause of a manual
 *    action against a site, and for a local business a mismatched name/address/phone is
 *    also a ranking problem in its own right.
 *
 * 2. Nothing is asserted that cannot be sourced. Two things are therefore deliberately
 *    absent — see CONFLICTS below.
 *
 * CONFLICTS IN THE SOURCE DATA — flagged, not resolved:
 *
 *   Address. The live site's own markup carries "S/10, Jivandeep Arcade, Near Asian
 *   Paint Chokdi, Gadkhol Part, GIDC", postal code 393002 — a different address from
 *   the one printed on its contact page and footer ("12/13/14, Green Ananta Industrial
 *   Park, Rajpipla Road", 393001). The visible address wins here, because markup must
 *   match the page. If the markup one is current, COMPANY.address is what needs fixing,
 *   not this file.
 *
 *   Geo coordinates are omitted. The live site publishes a latitude and longitude, but
 *   they cannot be confirmed to belong to the visible address rather than the other one,
 *   and a wrong pin on a map is worse than no pin.
 *
 *   Opening hours are omitted. The contact page reads "8:30 AM - 18:00 PM" with no days
 *   given; the live markup says 09:00 to 17:00, seven days a week. Both cannot be right,
 *   and guessing the days would be inventing business facts.
 */

/** Stable node identifiers, so nodes can reference each other instead of repeating. */
const ORGANIZATION_ID = `${COMPANY.siteUrl}#organization`;
const WEBSITE_ID = `${COMPANY.siteUrl}#website`;

/**
 * Absolute URL for a route. `siteUrl` already ends in a slash, so the leading slash is
 * trimmed off the path — and the home page keeps the bare origin.
 */
export function absoluteUrl(path: string): string {
  if (path === "/") return COMPANY.siteUrl;
  return `${COMPANY.siteUrl}${path.replace(/^\//, "")}`;
}

/** The postal address, taken from the address the site actually displays. */
function postalAddress(): Record<string, unknown> {
  return {
    "@type": "PostalAddress",
    streetAddress: "12/13/14, Green Ananta Industrial Park, Rajpipla Road",
    addressLocality: "Ankleshwar",
    addressRegion: "Gujarat",
    postalCode: "393001",
    addressCountry: "IN",
  };
}

/** The company itself. Every other node points at this by id rather than restating it. */
export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.siteUrl,
    logo: absoluteUrl(COMPANY.logo),
    image: absoluteUrl(COMPANY.logo),
    description: COMPANY.metaDescription,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: postalAddress(),
    sameAs: FOOTER.social.map((item) => item.href),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Industrial storage tanks",
      "Industrial liquid mixers",
      "Storage silos",
      "Conveyor systems",
      "Turnkey process plants",
    ],
  };
}

export function websiteLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: COMPANY.siteUrl,
    name: COMPANY.name,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
  };
}

/** One step in a breadcrumb trail. */
export interface Crumb {
  readonly name: string;
  readonly path: string;
}

export function breadcrumbLd(crumbs: readonly Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * The equipment lines as a list of products. No `offers` node: the site publishes no
 * prices, and inventing an availability or a currency to satisfy a validator would be
 * asserting something untrue.
 */
export function productListLd(): Record<string, unknown> {
  const items = [
    ...PRODUCT_PAGE.categories.map((category) => ({
      name: category.title,
      description: category.description,
      image: absoluteUrl(category.image),
    })),
    {
      name: PRODUCT_PAGE.turnkey.title,
      description: PRODUCT_PAGE.turnkey.description,
      image: absoluteUrl(PRODUCT_PAGE.turnkey.image),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: PRODUCT_PAGE.hero.headline,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        description: item.description,
        image: item.image,
        brand: { "@id": ORGANIZATION_ID },
        manufacturer: { "@id": ORGANIZATION_ID },
      },
    })),
  };
}

export function serviceListLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: SERVICE_PAGE.hero.headline,
    itemListElement: SERVICE_PAGE.categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: category.title,
        description: category.description,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "India" },
      },
    })),
  };
}

export function blogListLd(): Record<string, unknown> {
  const posts = [...BLOG_PAGE.featured, ...BLOG_PAGE.more];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: BLOG_PAGE.hero.headline,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: post.href,
      name: post.title,
    })),
  };
}

/**
 * A single role, in the shape Google Jobs expects.
 *
 * `employmentType` is normalised to the schema.org vocabulary — "Full Time" as written
 * on the page is not a value Google recognises; FULL_TIME is.
 */
export function jobPostingLd(job: Job): Record<string, unknown> {
  const description = [
    `<p>${job.summary}</p>`,
    ...job.sections.map(
      (section) =>
        `<h3>${section.heading}</h3><ul>${section.items
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`,
    ),
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.datePosted,
    dateModified: job.dateModified,
    employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: { "@id": ORGANIZATION_ID },
    industry: "Industrial Equipment Manufacturing",
    occupationalCategory: job.category,
    directApply: false,
    jobLocation: job.locations.map((locality) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    })),
  };
}

/** Flattens one content block to plain text, for the articleBody field. */
function blockText(block: ContentBlock): string {
  if (block.type === "list") {
    return block.items
      .map((item) => (item.type === "subgroup" ? `${item.label}: ${item.items.join("; ")}` : item.text))
      .join(" ");
  }
  return block.text;
}

/** A blog post, in the shape a rich search result expects. */
export function blogPostingLd(post: BlogPostDetail): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    articleBody: post.blocks.map(blockText).join("\n\n"),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    image: post.image ? absoluteUrl(post.image) : absoluteUrl(COMPANY.logo),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/${post.slug}`) },
  };
}

/** Generic page node, used where a page has no richer type of its own. */
export function webPageLd(
  type: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage",
  name: string,
  description: string,
  path: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
  };
}
