import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY, ENQUIRY_INBOX } from "@/data/site";
import { readMailConfig, renderEmail } from "@/lib/email";
import { rfqSchema, rfqSummary } from "@/lib/rfq-schema";

/**
 * Engineering-proposal endpoint (the homepage "Request Engineering Proposal" modal).
 *
 * Revalidates with the schema the modal uses. Needs RESEND_API_KEY and CONTACT_FROM_EMAIL
 * (see .env.example); CONTACT_TO_EMAIL overrides the default inbox.
 *
 * TODO: add rate limiting before launch (shared store such as Upstash Redis), as on the
 * contact and quote routes.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const parsed = rfqSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot gets a success response, so a bot learns nothing about the trap.
    const trapped = parsed.error.issues.some((issue) => issue.path[0] === "website");
    if (trapped) return NextResponse.json({ ok: true }, { status: 200 });

    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const config = readMailConfig(ENQUIRY_INBOX);
  if (!config.ok) {
    console.error("[rfq] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — request was validated but not emailed.");
    return NextResponse.json(
      { error: `Email delivery is not connected yet. Please email ${COMPANY.email} or call ${COMPANY.phone}.` },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const html = renderEmail("New engineering proposal request", rfqSummary(data), [
    { label: "Technical specifications & operating medium", value: data.notes ?? "" },
  ]);

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      replyTo: data.email,
      subject: `Proposal request — ${data.contactName}, ${data.company}`,
      html,
    });

    if (error) {
      console.error("[rfq] Resend rejected the message:", error);
      return NextResponse.json({ error: "We could not email your request. Please try again shortly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (cause) {
    console.error("[rfq] Unexpected failure sending request:", cause);
    return NextResponse.json({ error: "We could not email your request. Please try again shortly." }, { status: 500 });
  }
}
