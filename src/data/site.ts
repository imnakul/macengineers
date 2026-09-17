/**
 * Company facts, navigation and footer content shared across the site.
 *
 * Every string here was scraped verbatim from https://macengineers.in/ on 2026-08-24.
 * Decorative emoji that prefixed several headings on the source site were dropped —
 * they are ornament rather than content, and saturated glyphs break the neutral canvas
 * this design runs on. Contact links were corrected: the live site points its email and
 * phone anchors at placeholder values (`mailto:contact@mysite.com`, `tel:123-456-7890`)
 * that do not match the displayed text.
 */

/** A primary or secondary navigation entry. */
export interface NavItem {
  readonly label: string;
  readonly href: string;
}

/** A text-only value proposition, rendered as a ringed card. */
export interface TextItem {
  readonly title: string;
  readonly description: string;
}

export const COMPANY = {
  name: "MAC Engineers",
  legalName: "Mac Engineers India",
  tagline: "Engineering Productivity For Process Industries",
  metaTitle: "Industrial Equipment Manufacturer | MAC Engineers Gujarat",
  metaDescription:
    "MAC Engineers manufactures custom storage tanks, liquid mixers, silos & conveyor systems for pharma, chemical & food industries. Ankleshwar GIDC, Gujarat. Pan-India delivery.",
  siteUrl: "https://macengineers.in/",
  email: "info@macengineers.in",
  phone: "+91 9409982541",
  phoneHref: "tel:+919409982541",
  whatsapp: "https://wa.me/919409982541",
  address:
    "12/13/14, Green Ananta Industrial Park, Rajpipla Road, Ankleshwar, Gujarat, Pin code - 393001",
  copyright: "Copyright 2025 © Mac Engineers India",
  logo: "/brand/mac-engineers-logo.webp",
} as const;

/**
 * Where website enquiries (contact, quote and proposal forms) are delivered. The published
 * address above stays on the site; CONTACT_TO_EMAIL in the environment overrides this.
 */
export const ENQUIRY_INBOX = "macengineersank@gmail.com";

/** WhatsApp number in international format without "+", as wa.me expects. */
export const WHATSAPP_NUMBER = "919409982541";

/**
 * Primary navigation. Every entry now resolves inside this codebase; the only links
 * that still leave for the live WordPress site are the individual blog articles, which
 * are deliberately not rebuilt here (see src/data/blog.ts).
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Product", href: "/product" },
  { label: "Service", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/job-openings" },
  { label: "Contact Us", href: "/contact-us" },
];

export const QUOTE_HREF = "/get-a-quote";

export const FOOTER = {
  blurb:
    "Mac Engineers is a leading provider of custom-engineered industrial equipment, specializing in the design, fabrication, and installation of storage tanks, liquid mixers, storage silos, and conveyor systems. Based in Ankleshwar, Gujarat",
  quickLinksHeading: "Quick Links",
  quickLinks: [
    { label: "About Us", href: "/about-us" },
    { label: "Product", href: "/product" },
    { label: "Service", href: "/service" },
    { label: "Blog", href: "/blog" },
    { label: "Jobs", href: "/job-openings" },
    { label: "Contact Us", href: "/contact-us" },
  ] satisfies readonly NavItem[],
  contactHeading: "Get In Touch",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Macengineersank" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/macengineers/" },
    { label: "Twitter", href: "https://x.com/Macengineersank" },
  ] satisfies readonly NavItem[],
} as const;
