import { z } from "zod";
import { QUOTE_PAGE } from "@/data/quote";

/**
 * Upload limits, shared by the form and the route so the two can never disagree about
 * what is acceptable.
 *
 * 4 MB is not arbitrary: a Vercel serverless function caps its request body at 4.5 MB,
 * so anything larger fails at the platform before our code ever runs. Rejecting it in
 * the browser with a clear message beats a mystery network error, and the page points
 * larger drawings at email instead.
 */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const ALLOWED_UPLOAD_EXTENSIONS = [
  "pdf",
  "dwg",
  "dxf",
  "png",
  "jpg",
  "jpeg",
  "zip",
] as const;

/** True when the filename ends in an extension we accept. */
export function hasAllowedExtension(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  return (ALLOWED_UPLOAD_EXTENSIONS as readonly string[]).includes(extension);
}

const PROJECT_TYPES = QUOTE_PAGE.projectTypes as readonly string[];
const TIMELINES = QUOTE_PAGE.timelines as readonly string[];

/**
 * The quote payload. Only name, email and the requirement description are required —
 * a quote request that is turned away for a missing site address is a lost enquiry, and
 * the rest can be settled in the reply.
 */
export const quoteSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Please enter your name.")
      .max(120, "Please keep this under 120 characters."),
    companyName: z.string().trim().max(120, "Please keep this under 120 characters.").optional(),
    email: z.email("Please enter a valid email address.").max(160),
    phone: z
      .string()
      .trim()
      .max(32, "Please keep this under 32 characters.")
      .regex(/^[0-9+()\-\s]*$/, "Please use digits, spaces, +, - and brackets only.")
      .optional(),
    projectTypes: z
      .array(z.string())
      .refine(
        (values) => values.every((value) => PROJECT_TYPES.includes(value)),
        "Please choose from the listed project types.",
      )
      .default([]),
    otherProjectType: z
      .string()
      .trim()
      .max(160, "Please keep this under 160 characters.")
      .optional(),
    description: z
      .string()
      .trim()
      .min(10, "Please tell us a little more — at least 10 characters.")
      .max(4000, "Please keep this under 4000 characters."),
    siteLocation: z.string().trim().max(200, "Please keep this under 200 characters.").optional(),
    capacity: z.string().trim().max(200, "Please keep this under 200 characters.").optional(),
    timeline: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || TIMELINES.includes(value),
        "Please choose one of the listed timelines.",
      )
      .optional(),
    /** Honeypot — see the note in contact-schema.ts. */
    website: z.string().max(0).optional(),
  })
  /* "Other" is only meaningful with the free text that explains it, so the two fields
     are validated together rather than independently. */
  .refine(
    (data) =>
      !data.projectTypes.includes(QUOTE_PAGE.otherProjectTypeValue) ||
      (data.otherProjectType?.length ?? 0) > 0,
    {
      message: "Please tell us what kind of project this is.",
      path: ["otherProjectType"],
    },
  );

export type QuotePayload = z.infer<typeof quoteSchema>;

export type QuoteFieldName = Exclude<keyof QuotePayload, "website">;
