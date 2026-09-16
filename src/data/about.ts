/**
 * Content layer for the About Us page.
 *
 * Every string here was scraped verbatim from https://macengineers.in/about-us/ on
 * 2026-08-31. Only whitespace was normalised (the source renders several stray spaces
 * before punctuation, e.g. "Ankleshwar , the"). The achievement figures are rendered on
 * the source by a JavaScript counter widget and were read from its `data-to-value`
 * attributes rather than from the visible text, which is empty until the script runs.
 *
 * KNOWN CONFLICT IN THE SOURCE CONTENT — flagged, not resolved: the brand story states
 * the company was founded in 2019, while the achievements counter and the landing page
 * both claim "20+ years". These cannot both be true. Both are reproduced here exactly
 * as the client publishes them; correcting a factual claim about a real business is
 * theirs to make, not ours.
 */

import type { TextItem } from "@/data/site";

/** A counted achievement. The value carries its own suffix, as the source does. */
export interface Achievement {
  readonly value: string;
  readonly title: string;
  readonly description: string;
}

/** A named principle with supporting copy — vision, mission, values. */
export interface Principle {
  readonly title: string;
  readonly body: string;
}

export const ABOUT_PAGE = {
  metaTitle:
    "About MAC Engineers | Leading Industrial Equipment & Process Solutions Manufacturer in Gujarat",
  metaDescription:
    "Learn about MAC Engineers, a trusted manufacturer of industrial equipment including mixers, storage tanks, silos, and material handling systems. With advanced engineering expertise and a strong presence across Gujarat and India, we deliver reliable, customized solutions for process industries.",

  hero: {
    eyebrow: "About us",
    headline: "Industrial Equipment Experts from Gujarat to All of India",
    subhead:
      "Trusted manufacturer of industrial mixers, storage tanks, silos, and conveyors delivering quality across Gujarat and India.",
  },

  story: {
    heading: "Brand Story: Rooted in the Heart of Gujarat's Industrial Hub",
    body: "Founded in 2019 in Ankleshwar, the chemical manufacturing hub of Gujarat, MAC Engineers was born from the shared vision of three skilled mechanical engineers. They recognized the pressing need for an engineering partner delivering accuracy, reliability, and timely execution—without compromising on safety or quality. Today, MAC Engineers stands as a trusted name across chemical, pharmaceutical, agrochemical, construction chemical, and infrastructure sectors.",
    certification: "Proudly ISO 9001:2015 certified.",
    image: {
      src: "/images/product/project-lifecycle-team.png",
      alt: "MAC Engineers team taking a process vessel from design desk through fabrication to site installation",
      caption: "Design to installation",
    },
  },

  principles: {
    heading: "Vision, Mission & Core Values",
    items: [
      {
        title: "Vision",
        body: "Become India's premier engineering and service provider, recognized for quality, timeliness, and excellence.",
      },
      {
        title: "Mission",
        body: "Deliver best-in-class infrastructure and industrial solutions that value both performance and cost-effectiveness, while caring for safety, our team, and the environment.",
      },
      {
        title: "Core Values",
        body: "Attentively listen and respond to client needs. Deliver quality consistently and on schedule. Operate within a safe, transparent, and ethical framework.",
      },
    ] satisfies readonly Principle[],
  },

  achievements: {
    heading: "Our Achievements",
    items: [
      {
        value: "350+",
        title: "Satisfied Customers",
        description: "Trusted by industry leaders nationwide.",
      },
      {
        value: "100+",
        title: "Projects Completed",
        description: "From pilot plants to large-scale turnkey projects.",
      },
      {
        value: "50+",
        title: "Total Staff",
        description: "Engineers, fabricators & support teams.",
      },
      {
        value: "20+",
        title: "Years of Experience",
        description: "Proven reliability in industrial solutions.",
      },
    ] satisfies readonly Achievement[],
  },

  team: {
    heading: "Our Team & Capabilities",
    body: "At the heart of our operations is a dedicated team of qualified engineers, supervisors, and skilled fabricators—every individual capable of executing projects with precision, efficiency, and a commitment to safety.",
    image: {
      src: "/images/product/quality-inspection.png",
      alt: "MAC Engineers engineer inspecting fabricated components while a technician works on a pump skid",
      caption: "Engineers & fabricators",
    },
  },

  quality: {
    heading: "Quality Policy & Values",
    intro:
      "Our core principles revolve around delivering services that are safe, effective, punctual, and reliable. To achieve this, we:",
    items: [
      "Commit to strict regulatory compliance and industry-leading engineering protocols.",
      "Provide tailored solutions—covering installation, refurbishment, piping, tanks, and reactors—based on client specifications.",
      'Uphold a "ZERO ACCIDENT" policy to ensure safety of both personnel and property.',
      "Pledge to exceed customer expectations while fostering trust, integrity, and constant improvement.",
    ],
  },

  differentiators: {
    heading: "What Sets Us Apart",
    items: [
      {
        title: "Fastest Turnaround & Trusted Quality",
        description:
          "Known for being reliable and expedient, we uphold the highest industry standards.",
      },
      {
        title: "Innovative Engineering",
        description:
          "We combine forward-thinking design with sustainable and efficient practices to build future-ready solutions.",
      },
      {
        title: "Award-Winning Excellence",
        description:
          "Recipients of the India 5000 Best MSME Award 2020, we are recognized for our innovation and service quality.",
      },
    ] satisfies readonly TextItem[],
  },

  expertise: {
    heading: "Services & Expertise",
    intro:
      "From mechanical equipment installation and refurbishment to complete structural fabrication, our specialization includes:",
    items: [
      "Mechanical services: servicing, repair, and installation.",
      "Fabrication: structures, piping, fire-hydrant lines, tanks, and reactors.",
      "Turnkey projects with design, erection, and commissioning included.",
    ],
  },

  trustedBy: {
    heading: "Trusted By",
    body: "We are proud to work with organizations across Gujarat and pan-India, supporting their manufacturing and expansion requirements with robust and efficient process equipment.",
  },

  cta: {
    heading: "Join the MAC Engineers Experience",
    body: "Whether you're seeking reliable engineering partners for tanks, mixers, silos, or complete plant setup, we deliver dependable solutions crafted for your operational success.",
    label: "Get in Touch",
  },
} as const;
