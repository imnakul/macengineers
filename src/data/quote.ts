/**
 * Content layer for the Get a Quote page.
 *
 * Field labels and options were scraped verbatim from
 * https://macengineers.in/get-a-quote/ on 2026-09-01.
 */

export const QUOTE_PAGE = {
  metaTitle: "Request a Quote | MAC Engineers Industrial Equipment & Projects",
  metaDescription:
    "Share your project requirement with MAC Engineers — piping, structural fabrication, equipment erection, turnkey plant setup or custom design — and receive a personalised quotation and lead time.",

  hero: {
    eyebrow: "Get a quote",
    headline: "Request a Quote for Your Next Project",
    subhead:
      "Share a few details about your project needs, and our team of experts will provide you with a personalized quotation and lead time within 24 hours.",
  },

  labels: {
    fullName: "Full Name",
    companyName: "Company Name",
    email: "Email",
    phone: "Phone",
    projectTypes: "Type of Project",
    otherProjectType: "Please specify",
    description: "Brief Description of Requirement",
    siteLocation: "Location / Site Details",
    capacity: "Approximate Quantity / Capacity",
    timeline: "Expected Project Timeline",
    drawing: "Upload Drawing / Specification",
    submit: "Send My Quote Request",
  },

  projectTypes: [
    "Piping & Utility",
    "Structural Fabrication",
    "Equipment Erection",
    "Turnkey Plant Setup (Powder / Liquid)",
    "Custom Design & Fabrication",
    "Other (Please Specify)",
  ],

  /** The option that reveals the free-text field. Kept as a constant so the form and
      the schema agree on which value is the special one. */
  otherProjectTypeValue: "Other (Please Specify)",

  timelines: [
    "Urgent (within 2 weeks)",
    "Within 1 Month",
    "Within 3 Months",
    "Other",
  ],

  submitting: "Sending",
  successHeading: "Quote request sent",
  successBody:
    "Thanks — we have your requirement and will come back with a quotation and lead time. For anything urgent, call +91 9409982541.",
  errorHeading: "Could not send",

  uploadHint:
    "PDF, DWG, DXF, PNG, JPG or ZIP, up to 4 MB. For anything larger, email it to info@macengineers.in and we will match it to your request.",
} as const;
