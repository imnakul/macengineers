/**
 * Content layer for the Service page.
 *
 * Every string here was scraped verbatim from https://macengineers.in/service/ on
 * 2026-09-01, with decorative emoji dropped as elsewhere on this site.
 *
 * NOTE — the same conflict flagged in src/data/about.ts appears here: the source
 * intro claims "over two decades of expertise" while the About page dates the company
 * to 2019. Reproduced as published; the correction is the client's to make.
 */

/** One service line, with the capability points the source lists beneath it. */
export interface ServiceCategory {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly image: string;
  readonly alt: string;
}

export const SERVICE_PAGE = {
  metaTitle: "Engineering, Fabrication & Installation Services | MAC Engineers",
  metaDescription:
    "End-to-end engineering services from MAC Engineers: custom design and fabrication, project execution, process and utility piping, structural steel works, and equipment erection across India.",

  hero: {
    eyebrow: "Services",
    headline: "End-to-End Engineering Services for Process Industries",
    subhead:
      "At MAC Engineers, we provide end-to-end engineering, fabrication, and installation services for process industries across India. With over two decades of expertise, advanced technology, and a strong commitment to quality, we deliver solutions that enhance plant efficiency, safety, and performance.",
  },

  categories: [
    {
      slug: "custom-design-fabrication",
      title: "Custom Design & Fabrication",
      description:
        "We specialize in the design and fabrication of storage tanks, liquid mixers, silos, and conveyors tailored to meet your plant's specific requirements.",
      capabilities: [
        "Expertise in SS304, SS316, and MS construction",
        "Hygienic and durable fabrication process",
        "Compliance with industry and safety standards",
        "Custom-built solutions that maximize operational efficiency",
      ],
      image: "/mac/service-design-engineering.png",
      alt: "Illustration of engineers preparing CAD and 3D plant layouts",
    },
    {
      slug: "project-services",
      title: "Project Services",
      description:
        "With a skilled team and strong resources, we execute projects with precision, safety, and timeliness.",
      capabilities: [
        "Execution of greenfield and brownfield projects",
        "Structural steel erection and installation with strict supervision",
        "Minimization of material wastage through optimized cutting & fabrication",
        "Services include: piping, steel structures, insulation, painting, commissioning",
        "Focus on safety, quality, and timely delivery",
      ],
      image: "/mac/service-fabrication-supply.png",
      alt: "Illustration of in-house fabrication of process equipment",
    },
    {
      slug: "process-utility-piping",
      title: "Process & Utility Piping",
      description:
        "We design and install process and utility piping systems essential for plant operations.",
      capabilities: [
        "Process Piping: Transfers raw materials or products to vessels, storage tanks, or other equipment",
        "Utility Piping: Supplies steam, hot/cold water, compressed air, nitrogen, and other essential services",
        "Expertise in MS, SS, and GI piping systems",
        "Full scope: process pipelines, water systems, steam systems, compressed air systems, bulk chemical transfer lines",
        "Complete testing as per client requirements for quality assurance",
      ],
      image: "/mac/hero-process-skid.png",
      alt: "Skid-mounted process equipment assembly with process and utility piping",
    },
    {
      slug: "structural-steel-works",
      title: "Structural Steel Works",
      description:
        "Strong structures are the foundation of any robust factory. We provide structural steel fabrication, erection, and maintenance services for both new and running plants.",
      capabilities: [
        "Plant maintenance & shutdown job works",
        "Skilled manpower for onsite fabrication and repair",
        "Fabrication and erection of platforms, industrial building structures, and steel supports",
        "Reconditioning & replacement of corroded or worn-out structures",
        "Compliance with load-bearing designs for safety and durability",
      ],
      image: "/mac/hero-conveyor-hopper.png",
      alt: "Industrial conveyor system with storage hopper and supporting steel structure",
    },
    {
      slug: "equipment-erection-installation",
      title: "Equipment Erection & Installation",
      description:
        "Equipment is the heart of every plant, and its performance depends on precise installation.",
      capabilities: [
        "Installation of rotary equipment: pumps, gearboxes, mixers, centrifuges, ball mills",
        "Vessel erection: MS, SS, and glass-lined vessels",
        "Reactors: MS, SS, MSGL with geared motors",
        "Screw conveyors and silo installations with platforms",
        "Storage tanks: FRP, MS, SS, HDPE with chemical anchoring",
        "Chemical process equipment: reaction columns, heat exchangers, etc.",
        "Safe, time-bound, and technologically sound execution by skilled manpower",
      ],
      image: "/mac/service-installation-commissioning.png",
      alt: "Illustration of on-site installation and commissioning of plant equipment",
    },
  ] satisfies readonly ServiceCategory[],

  keyBenefit: {
    label: "Key Benefit",
    body: "We ensure your plant operates at peak efficiency with reliable engineering solutions that combine durability, precision, and timely execution.",
  },

  cta: {
    heading: "Scope your project",
    body: "Whether it is a shutdown job, a piping run or a full plant erection, tell us the site and the schedule and we will tell you what it takes.",
  },
} as const;
