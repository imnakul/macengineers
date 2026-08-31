import { z } from "zod";

/**
 * The enquiry payload, validated identically on both sides of the network boundary:
 * the form imports this to gate submission, the route handler imports it to reject
 * anything that reaches the API by other means. One schema, so the two cannot drift.
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(80, "Please keep this under 80 characters."),
  lastName: z.string().trim().max(80, "Please keep this under 80 characters.").optional(),
  email: z.email("Please enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .max(32, "Please keep this under 32 characters.")
    /* Deliberately permissive: international formats, spaces, dashes and brackets all
       occur in real enquiries, and rejecting a reachable number costs more than it
       saves. */
    .regex(/^[0-9+()\-\s]*$/, "Please use digits, spaces, +, - and brackets only.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more — at least 10 characters.")
    .max(2000, "Please keep this under 2000 characters."),
  /**
   * Honeypot. Hidden from people and from assistive technology, so anything that
   * arrives with it filled is automated. Named plausibly on purpose — bots fill fields
   * whose names they recognise.
   */
  company: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/** Field names a person actually fills in, used to key the error map. */
export type ContactFieldName = Exclude<keyof ContactPayload, "company">;
