/**
 * Content layer for the MAC Engineers landing page.
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

/** A content block paired with an illustration — used by products and services. */
export interface IllustratedItem {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly alt: string;
}

/** A text-only value proposition, rendered as a ringed card. */
export interface TextItem {
  readonly title: string;
  readonly description: string;
}

/** A blog post surfaced on the landing page. */
export interface JournalPost {
  readonly title: string;
  readonly href: string;
  readonly image: string;
  readonly alt: string;
}

/** A single measured fact — a mono key over a value. Rendered by SpecRail. */
export interface SpecItem {
  readonly label: string;
  readonly value: string;
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
  logo: "/mac/logo.webp",
} as const;

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

export const HERO = {
  headline: "Engineering Productivity For Process Industries",
  subhead:
    "From storage tanks to advanced mixers, silos, and conveyors — MAC Engineers delivers reliable equipment that drives efficiency, safety, and performance.",
  cta: "Explore Our Solutions",
  /**
   * Sourced facts only: the years figure and compliance line come from ABOUT.body, the
   * material grades from the storage-tank description, and the reach and works location
   * from COMPANY.metaDescription and COMPANY.address.
   */
  specs: [
    { label: "Experience", value: "20+ Years" },
    { label: "Materials", value: "SS304 / SS316 / MS" },
    { label: "Delivery", value: "Pan-India" },
    { label: "Works", value: "Ankleshwar, Gujarat" },
  ] satisfies readonly SpecItem[],
  /** The lead plate, printed large beside the headline. */
  lead: {
    src: "/mac/hero-reactor-vessel.png",
    alt: "Stainless steel reactor vessel with manhole and piping in industrial processing plant",
    caption: "Reactor vessel",
  },
  /** The detail strip beneath — four smaller plates, captioned like drawing figures. */
  scene: [
    {
      src: "/mac/hero-storage-tanks.png",
      alt: "Stainless steel storage tanks with piping system and access platform in industrial plant",
      caption: "Storage tanks",
    },
    {
      src: "/mac/hero-bulk-storage.png",
      alt: "Industrial storage tanks for bulk material and liquid storage in processing plant",
      caption: "Bulk storage",
    },
    {
      src: "/mac/hero-conveyor-hopper.png",
      alt: "Industrial conveyor system with storage hopper and material handling equipment in plant",
      caption: "Conveyor & hopper",
    },
    {
      src: "/mac/hero-process-skid.png",
      alt: "Skid-mounted process equipment assembly fabricated by MAC Engineers",
      caption: "Process skid",
    },
  ],
} as const;

export const ABOUT = {
  headline: "MAC Engineers Is A Trusted Partner For Process Industries Across India.",
  body: "With 20+ years of expertise, we specialize in the design, fabrication, and supply of custom-built storage tanks, liquid mixers, silos, and conveyors. Our solutions are built with precision, industrial-grade materials, and compliance with international safety standards.",
  cta: "Contact Us",
  ctaHref: "/contact-us",
  specs: [
    { label: "Equipment lines", value: "04" },
    { label: "Sectors served", value: "04" },
    { label: "Compliance", value: "International standards" },
    { label: "Scope", value: "Design to commissioning" },
  ] satisfies readonly SpecItem[],
  primaryImage: {
    src: "/mac/about-mixing-tanks.png",
    alt: "Stainless steel industrial mixing tanks with piping and process equipment in manufacturing plant",
    caption: "Mixing tank battery",
  },
  secondaryImage: {
    src: "/mac/about-plant-layout.png",
    alt: "Layout of a MAC Engineers process plant installation",
    caption: "Plant layout",
  },
} as const;

/** Shared on the source site by both the Equipment and Service sections. */
const CAPABILITY_BLURB =
  "We design and manufacture a comprehensive range of industrial equipment to optimize your production workflow. Our solutions include durable storage tanks for secure material containment, high-efficiency liquid mixers for consistent blending, custom-engineered storage silos for bulk material handling, and reliable conveyor systems to automate transport. Each product is built to enhance your operational efficiency, ensuring you can focus on production while we elevate your productivity.";

export const EQUIPMENT = {
  headline: "Our Equipment Solutions",
  body: CAPABILITY_BLURB,
  items: [
    {
      title: "Storage Tanks",
      description: "Bulk liquid, chemical & food-grade storage with SS304/SS316/MS options.",
      image: "/mac/product-storage-tanks.png",
      alt: "Illustration of an industrial bulk storage tank with access platforms and discharge cone",
    },
    {
      title: "Industrial Liquid Mixers",
      description: "Inline, batch & conical mixers with VFD for uniform blending.",
      image: "/mac/product-liquid-mixers.png",
      alt: "Illustration of an industrial liquid mixer vessel with drive motor and agitator",
    },
    {
      title: "Storage Silos",
      description: "Safe storage for granules, resins & powders with smooth discharge design.",
      image: "/mac/product-storage-silos.png",
      alt: "Illustration of a storage silo with conical discharge for granules and powders",
    },
    {
      title: "Conveyor Systems",
      description: "Screw, belt & bucket elevators for efficient bulk material handling.",
      image: "/mac/product-conveyor-systems.png",
      alt: "Illustration of a belt conveyor system for bulk material handling",
    },
  ] satisfies readonly IllustratedItem[],
} as const;

export const WHY_CHOOSE = {
  headline: "Why Choose MAC Engineers?",
  items: [
    {
      title: "Process Industry Expertise",
      description: "Designed for chemical, pharma, food, and allied industries.",
    },
    {
      title: "Custom Fabrication",
      description: "Every solution is built to your plant's exact specifications.",
    },
    {
      title: "On-Site Support",
      description: "From erection to testing and commissioning.",
    },
    {
      title: "Nationwide Reach",
      description: "Rapid response and execution across India.",
    },
  ] satisfies readonly TextItem[],
} as const;

export const SERVICES = {
  headline: "Our Service",
  body: CAPABILITY_BLURB,
  items: [
    {
      title: "Design & Engineering",
      description: "CAD & 3D layouts for precision planning.",
      image: "/mac/service-design-engineering.png",
      alt: "Illustration of engineers preparing CAD and 3D plant layouts",
    },
    {
      title: "Fabrication & Supply",
      description: "In-house manufacturing with strict QC.",
      image: "/mac/service-fabrication-supply.png",
      alt: "Illustration of in-house fabrication of process equipment",
    },
    {
      title: "Installation & Commissioning",
      description: "Safe, on-site setup and testing.",
      image: "/mac/service-installation-commissioning.png",
      alt: "Illustration of on-site installation and commissioning of plant equipment",
    },
    {
      title: "After-Sales Support",
      description: "AMC, spares & troubleshooting across India.",
      image: "/mac/service-after-sales-support.png",
      alt: "Illustration of after-sales service and maintenance support",
    },
  ] satisfies readonly IllustratedItem[],
} as const;

export const INDUSTRIES = {
  headline: "Industries We Serve",
  items: [
    {
      title: "Chemical & Petrochemical",
      description: "Corrosion-resistant equipment.",
    },
    {
      title: "Pharmaceutical & API",
      description: "SS316 hygienic storage & mixing.",
    },
    {
      title: "Food & Beverage Processing",
      description: "Safe tanks & mixers for consistent results.",
    },
    {
      title: "Cosmetics & FMCG",
      description: "Custom-designed equipment for fast production.",
    },
  ] satisfies readonly TextItem[],
} as const;

export const INTEGRATION = {
  headline: "Seamless Integration",
  body: "From initial design and fabrication to professional installation, we handle the entire process. Our end-to-end service saves you time and effort, ensuring a seamless transition and immediate boost to your workflow.",
} as const;

export const JOURNAL = {
  headline: "From the blog",
  href: "/blog",
  posts: [
    {
      title: "The Role of Automation in Industrial Material Handling",
      href: "https://macengineers.in/the-role-of-automation-in-industrial-material-handling/",
      image: "/mac/journal-automation.webp",
      alt: "Automated material handling equipment on a plant floor",
    },
    {
      title: "Troubleshooting Common Industrial Equipment Issues",
      href: "https://macengineers.in/troubleshooting-common-industrial-equipment-issues/",
      image: "/mac/journal-troubleshooting.webp",
      alt: "Technician inspecting an industrial mixer during maintenance",
    },
    {
      title: "Energy-Efficient Equipment for Modern Process Industries",
      href: "https://macengineers.in/energy-efficient-equipment-for-modern-process-industries/",
      image: "/mac/journal-energy.webp",
      alt: "Energy-efficient process equipment installed in a modern plant",
    },
  ] satisfies readonly JournalPost[],
} as const;

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
