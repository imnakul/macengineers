/**
 * Content layer for the Contact Us page.
 *
 * Every string here was scraped verbatim from https://macengineers.in/contact-us/ on
 * 2026-08-31, including the field labels on the source enquiry form. Note the source
 * writes its opening hours as "8:30 AM - 18:00 PM", mixing 12- and 24-hour clocks; it
 * is reproduced as published rather than silently corrected.
 */

/** One way to reach the company, shown as a ruled cell. */
export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  /** Omit for entries that are not actionable, such as opening hours. */
  readonly href?: string;
}

export const CONTACT_PAGE = {
  metaTitle:
    "Contact MAC Engineers | Reach Us for Industrial Equipment & Engineering Solutions",
  metaDescription:
    "Get in touch with MAC Engineers for inquiries related to industrial mixers, storage tanks, silos, conveyors, fabrication services, and turnkey engineering solutions. Located in Ankleshwar, Gujarat, we support clients across India with reliable technical assistance.",

  hero: {
    eyebrow: "Contact",
    headline: "Contact Us",
    lead: "We would love to speak with you.",
  },

  channelsHeading: "Or Get In Touch",
  channels: [
    {
      label: "Call us",
      value: "+91 9409982541",
      href: "tel:+919409982541",
    },
    {
      label: "Email us",
      value: "info@macengineers.in",
      href: "mailto:info@macengineers.in",
    },
    {
      label: "Opening hours",
      value: "8:30 AM - 18:00 PM",
    },
    {
      label: "Visit us",
      value:
        "Green Ananta Industrial Park, Plot 12/13/14, Rajpipla Road, Ankleshwar, Gujarat 393001",
    },
  ] satisfies readonly ContactChannel[],

  form: {
    heading: "Send an enquiry",
    /** Labels reproduced from the source form. */
    labels: {
      firstName: "Your Name",
      lastName: "Last Name",
      phone: "Phone Number",
      email: "Email",
      message: "Message",
      submit: "Submit",
    },
    submitting: "Sending",
    successHeading: "Enquiry sent",
    successBody:
      "Thanks — we have your details and will get back to you. For anything urgent, call +91 9409982541.",
    errorHeading: "Could not send",
  },
} as const;
