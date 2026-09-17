import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY, ENQUIRY_INBOX } from "@/data/site";
import { readMailConfig, renderEmail } from "@/lib/email";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Enquiry endpoint.
 *
 * Revalidates with the same schema the form uses — a client-side check is a courtesy to
 * the person filling the form, never a control, since anything can POST here directly.
 *
 * Needs RESEND_API_KEY and CONTACT_FROM_EMAIL (see .env.example). CONTACT_TO_EMAIL is
 * optional and falls back to ENQUIRY_INBOX.
 *
 * TODO: add rate limiting before this goes live. An in-memory counter is close to
 * useless on serverless (each instance has its own memory), so this wants a shared
 * store — Upstash Redis via @upstash/ratelimit is the usual fit on Vercel.
 */
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

  const config = readMailConfig(ENQUIRY_INBOX);
  if (!config.ok) {
    console.error(
      "[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — enquiry was validated but not delivered.",
    );
    return NextResponse.json(
      {
        error: `Our enquiry form is not connected yet. Please email ${COMPANY.email} or call ${COMPANY.phone}.`,
      },
      { status: 503 },
    );
  }

  const payload = parsed.data;
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ");

  const html = renderEmail(
    "New website enquiry",
    [
      { label: "Name", value: name },
      { label: "Email", value: payload.email },
      { label: "Phone", value: payload.phone ?? "" },
    ],
    [{ label: "Message", value: payload.message }],
  );

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      replyTo: payload.email,
      subject: `Website enquiry — ${name}`,
      html,
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
