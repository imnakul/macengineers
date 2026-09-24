import type { PlateDepth } from "@/components/ui/PlateFrame";

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
  /** Transparent 3D renders staged by PlateFrame (see its `depth` prop). */
  readonly imageDepth: PlateDepth;
}

export const PRODUCT_PAGE = {
  metaTitle: "Industrial Equipment & Process Solutions | MAC Engineers Products",
  metaDescription:
    "Storage tanks, industrial liquid mixers, high speed dispersers, IBC mixers, storage silos, conveyor systems and turnkey process plants engineered by MAC Engineers in SS304, SS316 and MS for chemical, pharmaceutical, food and FMCG industries.",

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
      image: "/images/product/storage-tank-vertical.png",
      alt: "Vertical stainless steel storage tank with conical bottom, top manway, level gauge, cage ladder and access platform",
      imageDepth: "render",
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
      image: "/images/product/liquid-mixer-cutaway.png",
      alt: "Cutaway of a stainless steel liquid mixer showing twin pitched-blade impellers, top drive motor and side manway",
      imageDepth: "render",
    },
    {
      slug: "high-speed-dispersers",
      title: "High Speed Dispersers",
      tagline: "Hydraulic Lifting, High-Shear Dispersion",
      description:
        "High-performance dispersers for crushing, dispersing, emulsifying and mixing liquids of different viscosities, with a hydraulic lift that adjusts to every container height.",
      specs: [
        "Capacity: 200 L to 1,500 L",
        "Available in MS, SS304, and SS316",
        "High-speed upper & lower saw-tooth disc for strong shear",
        "Ideal for paints, coatings, inks, resins, adhesives, food and pharma",
      ],
      image: "/images/product/high-speed-disperser.png",
      alt: "Hydraulic lifting high-speed disperser with belt drive and saw-tooth disc lowered into a stainless steel mixing vessel",
      imageDepth: "render",
    },
    {
      slug: "ibc-mixers",
      title: "IBC Mixers",
      tagline: "Horizontal Frame Mounted, Direct on the Tank",
      description:
        "A compact mixer that mounts on a rigid top frame directly over an IBC tank, for light to medium viscosity liquids, re-suspension of settled solids and powder dissolution.",
      specs: [
        "Capacity: 200 L to 1,000 L IBC tanks",
        "Available in MS, SS304, and SS316",
        "Horizontal motor with inline / helical gearbox for low vibration",
        "Cowl disc, propeller, anchor or pitched-blade impellers",
      ],
      image: "/images/product/ibc-mixer-frame-mounted.png",
      alt: "Horizontal frame mounted mixer sitting on top of an IBC tank, with its impeller mixing the liquid inside",
      imageDepth: "render",
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
      image: "/images/product/conical-storage-silo.png",
      alt: "Stainless steel storage silo with conical discharge, support structure and cage ladder",
      imageDepth: "render",
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
      image: "/images/product/screw-conveyor-hopper.png",
      alt: "Inclined screw conveyor fed from a stainless steel hopper, with geared drive and support frame",
      imageDepth: "render",
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
    image: "/images/product/turnkey-process-system.png",
    alt: "Turnkey process system: powder hopper and screw conveyor feeding a jacketed reactor, with pumps, piping and PLC control panel on one skid",
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
