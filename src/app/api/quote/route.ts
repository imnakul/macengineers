import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY } from "@/data/site";
import { readMailConfig, renderEmail } from "@/lib/email";
import {
  ALLOWED_UPLOAD_EXTENSIONS,
  MAX_UPLOAD_BYTES,
  hasAllowedExtension,
  quoteSchema,
} from "@/lib/quote-schema";

/**
 * Quote endpoint.
 *
 * Accepts multipart form data because a quote request may carry a drawing. The file is
 * attached to the notification email and never written to disk or object storage —
 * nothing to secure, retain or delete later.
 *
 * Needs RESEND_API_KEY and CONTACT_FROM_EMAIL (see .env.example).
 *
 * TODO: add rate limiting before this goes live, alongside the same TODO on the contact
 * route. This endpoint accepts uploads, so it is the more attractive of the two to abuse.
 */

/** Reads one multipart field as a trimmed string. */
function readField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected a form submission." },
      { status: 400 },
    );
  }

  const candidate = {
    fullName: readField(form, "fullName"),
    companyName: readField(form, "companyName"),
    email: readField(form, "email"),
    phone: readField(form, "phone"),
    projectTypes: form
      .getAll("projectTypes")
      .filter((value): value is string => typeof value === "string"),
    otherProjectType: readField(form, "otherProjectType"),
    description: readField(form, "description"),
    siteLocation: readField(form, "siteLocation"),
    capacity: readField(form, "capacity"),
    timeline: readField(form, "timeline"),
    website: readField(form, "website"),
  };

  const parsed = quoteSchema.safeParse(candidate);
  if (!parsed.success) {
    /* A filled honeypot gets the same response as a success, so a bot learns nothing
       about which field gave it away. */
    const trapped = parsed.error.issues.some((issue) => issue.path[0] === "website");
    if (trapped) return NextResponse.json({ ok: true }, { status: 200 });

    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  /* The upload is validated here as well as in the browser: the browser check is a
     courtesy, this one is the control. */
  const upload = form.get("drawing");
  const file = upload instanceof File && upload.size > 0 ? upload : null;

  if (file) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `That file is over ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB. Please email it to ${COMPANY.email} instead.` },
        { status: 400 },
      );
    }
    if (!hasAllowedExtension(file.name)) {
      return NextResponse.json(
        { error: `We accept ${ALLOWED_UPLOAD_EXTENSIONS.join(", ").toUpperCase()} files.` },
        { status: 400 },
      );
    }
  }

  const config = readMailConfig(COMPANY.email);
  if (!config.ok) {
    console.error(
      "[quote] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — request was validated but not delivered.",
    );
    return NextResponse.json(
      {
        error: `Our quote form is not connected yet. Please email ${COMPANY.email} or call ${COMPANY.phone}.`,
      },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const projectTypes = data.projectTypes.join(", ");

  const html = renderEmail(
    "New quote request",
    [
      { label: "Name", value: data.fullName },
      { label: "Company", value: data.companyName ?? "" },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone ?? "" },
      { label: "Project type", value: projectTypes },
      { label: "Other", value: data.otherProjectType ?? "" },
      { label: "Site", value: data.siteLocation ?? "" },
      { label: "Quantity / capacity", value: data.capacity ?? "" },
      { label: "Timeline", value: data.timeline ?? "" },
      { label: "Attachment", value: file ? file.name : "None" },
    ],
    [{ label: "Requirement", value: data.description }],
  );

  try {
    const resend = new Resend(config.apiKey);

    const attachments = file
      ? [
          {
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
          },
        ]
      : undefined;

    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      replyTo: data.email,
      subject: `Quote request — ${data.fullName}${data.companyName ? `, ${data.companyName}` : ""}`,
      html,
      attachments,
    });

    if (error) {
      console.error("[quote] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "We could not send your request. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (cause) {
    console.error("[quote] Unexpected failure sending request:", cause);
    return NextResponse.json(
      { error: "We could not send your request. Please try again shortly." },
      { status: 500 },
    );
  }
}
