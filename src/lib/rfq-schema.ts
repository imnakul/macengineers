import { z } from "zod";

/** Scope categories offered as the first step of the proposal request. */
export const RFQ_PROFILES = {
  equipment: "Equipment Mfg",
  services: "Plant Services",
  turnkey: "Turnkey Plant",
} as const;

export type RfqProfile = keyof typeof RFQ_PROFILES;

/** Industries offered in the proposal request, keyed by the value the form submits. */
export const RFQ_INDUSTRIES = {
  chemical: "Chemical & Petrochemical",
  pharma: "Pharmaceutical & API (Sanitary)",
  construction: "Construction Chemicals & Dry-Mix",
  coatings: "Paints, Coatings & Inks (HSD)",
  agro: "Agrochemicals & Fertilizers",
  food: "Food, Dairy & Beverage",
} as const;

export type RfqIndustry = keyof typeof RFQ_INDUSTRIES;

const optionalText = (max: number): z.ZodOptional<z.ZodString> =>
  z.string().trim().max(max, `Please keep this under ${max} characters.`).optional();

/**
 * The engineering-proposal request (homepage modal), validated in the modal before it opens
 * WhatsApp and again by /api/rfq, so the two cannot drift.
 */
export const rfqSchema = z.object({
  profile: z.enum(Object.keys(RFQ_PROFILES) as [RfqProfile, ...RfqProfile[]]),
  industry: z.enum(Object.keys(RFQ_INDUSTRIES) as [RfqIndustry, ...RfqIndustry[]]),
  capacity: optionalText(120),
  scope: optionalText(200),
  contactName: z.string().trim().min(1, "Please enter your name.").max(120, "Please keep this under 120 characters."),
  company: z.string().trim().min(1, "Please enter your company or plant name.").max(160, "Please keep this under 160 characters."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone number we can reach.")
    .max(32, "Please keep this under 32 characters.")
    // Permissive on purpose: international formats, spaces, dashes and brackets all occur.
    .regex(/^[0-9+()\-\s]+$/, "Please use digits, spaces, +, - and brackets only."),
  email: z.email("Please enter a valid email address.").max(160),
  notes: optionalText(2000),
  /** Honeypot: hidden from people and assistive technology, so a filled value means a bot. */
  website: z.string().max(0).optional(),
});

export type RfqPayload = z.infer<typeof rfqSchema>;

/** The request as plain labelled lines, shared by the WhatsApp message and the email. */
export function rfqSummary(payload: RfqPayload): ReadonlyArray<{ label: string; value: string }> {
  return [
    { label: "Scope", value: RFQ_PROFILES[payload.profile] },
    { label: "Industry", value: RFQ_INDUSTRIES[payload.industry] },
    { label: "Capacity / size", value: payload.capacity ?? "" },
    { label: "Equipment / service", value: payload.scope ?? "" },
    { label: "Name", value: payload.contactName },
    { label: "Company", value: payload.company },
    { label: "Phone", value: payload.phone },
    { label: "Email", value: payload.email },
  ].filter((row) => row.value.length > 0);
}
