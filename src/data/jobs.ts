/**
 * Content layer for Careers and the individual job pages.
 *
 * Scraped verbatim from https://macengineers.in/job-openings/ and the two job pages
 * beneath https://macengineers.in/jobs/ on 2026-09-01.
 *
 * NOTE ON THE SOURCE — the engineering role's detail page prints "Location: Ankleshwar
 * / Bharuch" in its summary block but is tagged only "Ankleshwar" in its job-location
 * taxonomy. Both are reproduced: the summary line verbatim, and the taxonomy value as
 * the thing the filter matches on, since that is what the source filters by.
 *
 * NO APPLICATION FORM BY DESIGN — the source collects a CV upload directly. A CV is
 * sensitive personal data, and accepting one means owning storage, retention, access
 * control and deletion for it. That is a decision the company must make deliberately,
 * not something to switch on as a side effect of a redesign, so applications route to
 * the company's own inbox instead and the files never enter this system.
 */

/** A labelled fact in a job's summary block. */
export interface JobMeta {
  readonly label: string;
  readonly value: string;
}

/** A headed group of bullets within a job description. */
export interface JobSection {
  readonly heading: string;
  readonly items: readonly string[];
}

export interface Job {
  readonly slug: string;
  /** ISO date the role was published. Required by Google for JobPosting rich results. */
  readonly datePosted: string;
  readonly dateModified: string;
  readonly title: string;
  readonly category: string;
  readonly type: string;
  readonly locations: readonly string[];
  /** Short teaser used on the listing page. */
  readonly teaser: string;
  readonly summaryHeading: string;
  readonly summary: string;
  readonly meta: readonly JobMeta[];
  readonly sections: readonly JobSection[];
  readonly closing: readonly JobMeta[];
}

export const JOBS: readonly Job[] = [
  {
    slug: "mechanical-engineer-service-projects",
    datePosted: "2026-02-11",
    dateModified: "2026-07-02",
    title: "Diploma Mechanical Engineer – Service (Industrial Sector)",
    category: "Engineering",
    type: "Full Time",
    locations: ["Ankleshwar"],
    teaser:
      "Installation, maintenance, troubleshooting and repair of mechanical systems and machinery at client sites.",
    summaryHeading: "Job Summary",
    summary:
      "We are seeking a motivated and technically skilled Diploma Mechanical Engineer with 1–2 years of experience in industrial equipment servicing. The candidate will be responsible for the installation, maintenance, troubleshooting, and repair of mechanical systems and machinery at client sites.",
    meta: [
      { label: "Experience", value: "1–2 Years" },
      { label: "Location", value: "Ankleshwar / Bharuch" },
      { label: "Industry", value: "Industrial Equipment / Machinery / Manufacturing" },
      { label: "Employment Type", value: "Full-Time" },
      { label: "Department", value: "Service / After-Sales / Technical Support" },
      { label: "Reporting To", value: "Service Manager / Project Head" },
    ],
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Perform installation and commissioning of industrial machinery at customer sites.",
          "Conduct routine maintenance, inspection, and service visits.",
          "Troubleshoot mechanical issues and ensure timely repair and resolution.",
          "Prepare service reports, document findings, and maintain service records.",
          "Interact with clients to understand issues and provide technical support.",
          "Ensure adherence to safety guidelines and company standards during service.",
          "Coordinate with internal teams for spares, documentation, and technical queries.",
          "Provide on-site training or demonstration to operators or maintenance staff, if required.",
        ],
      },
      {
        heading: "Key Requirements",
        items: [
          "Diploma in Mechanical Engineering from a recognized institute.",
          "1 to 2 years of experience in servicing industrial machinery or related equipment.",
          "Good knowledge of mechanical components, hydraulics, and basic electricals.",
          "Ability to read and interpret technical drawings and service manuals.",
          "Willingness to travel to customer sites (local and outstation).",
          "Strong problem-solving skills and a customer-first approach.",
          "Basic proficiency in MS Office and report writing.",
        ],
      },
      {
        heading: "Preferred Qualities",
        items: [
          "Experience in metal processing, coating, packaging, or automation industries.",
          "Understanding of preventive maintenance schedules.",
          "Good communication skills in Hindi and English (or local language as needed).",
        ],
      },
    ],
    closing: [
      { label: "Salary", value: "Based on industry standards and experience" },
      { label: "Reporting to", value: "Service Manager / Senior Engineer" },
    ],
  },
  {
    slug: "office-assistant-cum-accountant",
    datePosted: "2026-02-17",
    dateModified: "2026-07-02",
    title: "Office Assistant cum Accountant",
    category: "Accounts & Administration",
    type: "Full Time",
    locations: ["Ankleshwar", "Bharuch"],
    teaser:
      "Day-to-day office administration and basic accounting for a fast-paced industrial environment.",
    summaryHeading: "Position Overview",
    summary:
      "Mac Engineers is looking for a reliable and detail-oriented Office Assistant cum Accountant to manage day-to-day office administration and basic accounting activities. The ideal candidate should be organized, disciplined, and comfortable handling multiple responsibilities in a fast-paced industrial environment.",
    meta: [
      { label: "Department", value: "Accounts & Administration" },
      { label: "Employment Type", value: "Full-Time" },
      { label: "Location", value: "Ankleshwar / Bharuch" },
      { label: "Experience", value: "1–3 Years" },
    ],
    sections: [
      {
        heading: "Key Responsibilities — Accounting & Finance",
        items: [
          "Maintain day-to-day accounting entries in Tally/ERP",
          "Handle purchase, sales, expense, and journal entries",
          "Prepare GST data, assist in return filing, and maintain compliance records",
          "Manage bank entries, reconciliation, and petty cash",
          "Coordinate with external accountant/CA as required",
        ],
      },
      {
        heading: "Key Responsibilities — Office Administration",
        items: [
          "Manage office documentation, filing, and records",
          "Handle emails, phone calls, and correspondence",
          "Prepare quotations, invoices, delivery challans, and follow-ups",
          "Support HR-related documentation (attendance, leave records, basic payroll data)",
          "Coordinate with internal departments for smooth office operations",
        ],
      },
      {
        heading: "Required Skills & Qualifications",
        items: [
          "Graduate in Commerce (B.Com preferred)",
          "1–3 years of relevant experience in accounting and office administration",
          "Working knowledge of Tally, MS Excel, and MS Word",
          "Basic understanding of GST and statutory compliance",
          "Good communication skills in English and Hindi (Gujarati preferred)",
          "High level of accuracy, integrity, and time management",
        ],
      },
      {
        heading: "Preferred Profile",
        items: [
          "Experience in engineering, fabrication, or manufacturing industry",
          "Ability to work independently with minimal supervision",
          "Professional attitude and willingness to take responsibility",
        ],
      },
    ],
    closing: [
      { label: "Salary", value: "As per industry standards and experience" },
      { label: "Growth", value: "Opportunity in a fast-growing engineering company" },
    ],
  },
];

export const CAREERS_PAGE = {
  metaTitle: "Careers & Job Openings | MAC Engineers, Ankleshwar",
  metaDescription:
    "Current openings at MAC Engineers in Ankleshwar and Bharuch, Gujarat — engineering, service and accounts roles in industrial equipment manufacturing.",

  hero: {
    eyebrow: "Careers",
    headline: "Jobs",
    subhead:
      "Open roles at our Ankleshwar works. Apply by email with your CV attached.",
  },

  filters: {
    category: "All Job Category",
    type: "All Job Type",
    location: "All Job Location",
  },

  emptyState: "No roles match these filters. Clear them to see every opening.",
  applyHeading: "Apply for this position",
  applyBody:
    "Send your CV to the address below with the role title in the subject line. We read everything that arrives.",
} as const;
