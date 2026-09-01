/**
 * Content layer for the Product page.
 *
 * Every string here was scraped verbatim from https://macengineers.in/product/ on
 * 2026-09-01. The source prefixes each category and bullet group with a decorative
 * emoji; those are dropped for the same reason they were dropped on the landing page —
 * they are ornament rather than content, and saturated glyphs break the neutral canvas
 * this design runs on. The source also runs each category's tagline straight into its
 * description as one paragraph; they are separated here so the tagline can lead.
 */

/** One equipment line, with the specification points the source lists beneath it. */
export interface ProductCategory {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly specs: readonly string[];
  readonly image: string;
  readonly alt: string;
  /** All four are flat vector cutouts, not photography — see PlateFrame's `depth` prop. */
  readonly imageDepth: "photo" | "illustration";
}

export const PRODUCT_PAGE = {
  metaTitle: "Industrial Equipment & Process Solutions | MAC Engineers Products",
  metaDescription:
    "Storage tanks, industrial liquid mixers, storage silos, conveyor systems and turnkey process plants engineered by MAC Engineers in SS304, SS316 and MS for chemical, pharmaceutical, food and FMCG industries.",

  hero: {
    eyebrow: "Products",
    headline: "Precision Engineered Equipment for Every Process Industry",
    subhead:
      "At MAC Engineers, we manufacture a comprehensive range of industrial equipment designed to improve productivity, ensure reliability, and meet industry standards. Our products are engineered for precision, durability, and efficiency across process industries.",
  },

  categories: [
    {
      slug: "storage-tanks",
      title: "Storage Tanks",
      tagline: "Secure & Custom-Built Storage Solutions",
      description:
        "Our storage tanks are engineered for safe, reliable, and long-lasting containment of liquids, chemicals, and food-grade materials.",
      specs: [
        "Available in SS304, SS316, and MS",
        "Options: Pressure-rated, jacketed, insulated tanks",
        "Designed for chemical, pharmaceutical, food & beverage, and FMCG industries",
      ],
      image: "/mac/product-storage-tanks.png",
      alt: "Illustration of an industrial bulk storage tank with access platforms and discharge cone",
      imageDepth: "illustration",
    },
    {
      slug: "liquid-mixers",
      title: "Industrial Liquid Mixers",
      tagline: "High-Performance Mixing, Every Time",
      description:
        "We design mixers that deliver consistent and uniform blending for critical processes.",
      specs: [
        "Types: Inline, batch, and conical agitators",
        "VFD control for variable speed",
        "Sanitary design for hygienic applications",
        "Ideal for chemicals, pharma, food, and cosmetic industries",
      ],
      image: "/mac/product-liquid-mixers.png",
      alt: "Illustration of an industrial liquid mixer vessel with drive motor and agitator",
      imageDepth: "illustration",
    },
    {
      slug: "storage-silos",
      title: "Storage Silos",
      tagline: "Reliable Bulk Material Handling",
      description:
        "Our silos are designed for efficient, dust-free storage and discharge of solids.",
      specs: [
        "Suitable for powders, resins, granules, cement, and polymers",
        "Equipped with level sensors, discharge nozzles, and structural safety designs",
        "Custom-engineered for plant-specific requirements",
      ],
      image: "/mac/product-storage-silos.png",
      alt: "Illustration of a storage silo with conical discharge for granules and powders",
      imageDepth: "illustration",
    },
    {
      slug: "conveyor-systems",
      title: "Conveyor Systems",
      tagline: "Seamless Material Movement",
      description:
        "We provide conveyors that streamline bulk transport and improve plant efficiency.",
      specs: [
        "Belt Conveyors for general material handling",
        "Screw Conveyors for powders & granules",
        "Bucket Elevators for vertical transport",
        "Options for dust-free design, variable speed, and automation",
      ],
      image: "/mac/product-conveyor-systems.png",
      alt: "Illustration of a belt conveyor system for bulk material handling",
      imageDepth: "illustration",
    },
  ] satisfies readonly ProductCategory[],

  /**
   * Given its own block rather than a fifth card: it is the offering that contains all
   * the others, so ranking it beside them would misrepresent what is being sold.
   */
  turnkey: {
    title: "Turnkey Process Plants",
    tagline: "End-to-End Plant & Automation Solutions",
    description:
      "At MAC Engineers, we don't just supply equipment — we deliver fully integrated turnkey solutions for powder and liquid plants. From concept to commissioning, our turnkey projects cover design, fabrication, installation, and automation, ensuring maximum efficiency and reliability.",
    scopeHeading: "Scope of Turnkey Projects",
    scope: [
      "Complete plant layout & engineering design",
      "Storage systems (tanks, silos)",
      "Mixing & blending systems (liquid & powder)",
      "Material handling with conveyors",
      "Process & utility piping",
      "Full automation & control systems for seamless operation",
      "Testing, commissioning, and after-sales support",
    ],
    benefitLabel: "Benefit",
    benefit:
      "With automation integration, our turnkey plants reduce manual intervention, improve accuracy, minimize downtime, and ensure consistent production output.",
    image: "/mac/hero-process-skid.png",
    alt: "Skid-mounted process equipment assembly fabricated by MAC Engineers",
  },

  whyChoose: {
    heading: "Why Choose MAC Engineers Products?",
    items: [
      "Custom-Engineered for Your Plant",
      "Durable & Industry-Compliant Materials (SS304, SS316, MS)",
      "On-Time Delivery & Installation",
      "Trusted by Chemical, Pharma, Food & FMCG industries",
    ],
  },

  cta: {
    heading: "Specify your equipment",
    body: "Tell us the duty, capacity and material grade you need. We will come back with a drawing, a lead time and a price.",
  },
} as const;
