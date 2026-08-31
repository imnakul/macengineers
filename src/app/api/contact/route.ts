import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY } from "@/data/site";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";

/**
 * Enquiry endpoint.
 *
 * Revalidates with the same schema the form uses — a client-side check is a courtesy to
 * the person filling the form, never a control, since anything can POST here directly.
 *
 * Requires two environment variables to actually deliver:
 *   RESEND_API_KEY      — from resend.com
 *   CONTACT_FROM_EMAIL  — an address on a domain verified in Resend
 * CONTACT_TO_EMAIL is optional and falls back to the published company address.
 *
 * TODO: add rate limiting before this goes live. An in-memory counter is close to
 * useless on serverless (each instance has its own memory), so this wants a shared
 * store — Upstash Redis via @upstash/ratelimit is the usual fit on Vercel.
 */

/** Escapes text interpolated into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders the enquiry as a plain, readable email rather than a marketing template. */
function renderEmail(payload: ContactPayload): string {
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ");
  const rows: readonly (readonly [string, string])[] = [
    ["Name", name],
    ["Email", payload.email],
    ["Phone", payload.phone && payload.phone.length > 0 ? payload.phone : "Not provided"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5e5e5c;font-size:13px;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#2e2e2b;font-size:14px;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return [
    `<div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5;">`,
    `<h2 style="margin:0 0 16px;font-size:18px;color:#000;">New website enquiry</h2>`,
    `<table style="border-collapse:collapse;margin-bottom:20px;">${rowsHtml}</table>`,
    `<div style="padding-top:16px;border-top:1px solid rgba(0,0,0,0.12);">`,
    `<p style="margin:0 0 8px;color:#5e5e5c;font-size:13px;">Message</p>`,
    `<p style="margin:0;white-space:pre-wrap;color:#2e2e2b;font-size:14px;">${escapeHtml(
      payload.message,
    )}</p>`,
    `</div></div>`,
  ].join("");
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    /* The honeypot is the one failure worth lying about: reporting it teaches a bot
       which field gave it away, so a filled trap gets the same response as a success. */
    const trapped = parsed.error.issues.some((issue) => issue.path[0] === "company");
    if (trapped) return NextResponse.json({ ok: true }, { status: 200 });

    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? COMPANY.email;

  if (!apiKey || !from) {
    console.error(
      "[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — enquiry was validated but not delivered.",
    );
    return NextResponse.json(
      { error: `Our enquiry form is not connected yet. Please email ${COMPANY.email} or call ${COMPANY.phone}.` },
      { status: 503 },
    );
  }

  const payload = parsed.data;
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `Website enquiry — ${name}`,
      html: renderEmail(payload),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "We could not send your enquiry. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (cause) {
    console.error("[contact] Unexpected failure sending enquiry:", cause);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again shortly." },
      { status: 500 },
    );
  }
}
