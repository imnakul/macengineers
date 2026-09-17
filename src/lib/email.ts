/** Escapes text that is interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A labelled line in the summary table at the top of a notification email. */
export interface EmailRow {
  readonly label: string;
  readonly value: string;
}

/**
 * Renders the labelled rows. Every value is escaped — these emails carry text typed by
 * strangers into a public form, so nothing reaches the markup unescaped.
 */
export function renderRows(rows: readonly EmailRow[]): string {
  return rows
    .filter((row) => row.value.length > 0)
    .map(
      (row) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5e5e5c;font-size:13px;vertical-align:top;">${escapeHtml(
          row.label,
        )}</td><td style="padding:4px 0;color:#2e2e2b;font-size:14px;">${escapeHtml(
          row.value,
        )}</td></tr>`,
    )
    .join("");
}

/** Wraps a notification email in a plain, readable shell — not a marketing template. */
export function renderEmail(
  title: string,
  rows: readonly EmailRow[],
  blocks: readonly EmailRow[],
): string {
  const blocksHtml = blocks
    .filter((block) => block.value.length > 0)
    .map(
      (block) =>
        `<div style="padding-top:16px;margin-top:16px;border-top:1px solid rgba(0,0,0,0.12);">` +
        `<p style="margin:0 0 8px;color:#5e5e5c;font-size:13px;">${escapeHtml(block.label)}</p>` +
        `<p style="margin:0;white-space:pre-wrap;color:#2e2e2b;font-size:14px;">${escapeHtml(
          block.value,
        )}</p></div>`,
    )
    .join("");

  return [
    `<div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5;">`,
    `<h2 style="margin:0 0 16px;font-size:18px;color:#000;">${escapeHtml(title)}</h2>`,
    `<table style="border-collapse:collapse;">${renderRows(rows)}</table>`,
    blocksHtml,
    `</div>`,
  ].join("");
}

/** Resolved mail configuration, or the reason it is unusable. */
export type MailConfig =
  | { readonly ok: true; readonly apiKey: string; readonly from: string; readonly to: string }
  | { readonly ok: false };

/**
 * Reads delivery configuration from the environment. Returns a failure rather than
 * throwing, so each route can answer with its own message instead of a 500.
 */
export function readMailConfig(fallbackTo: string): MailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) return { ok: false };

  return {
    ok: true,
    apiKey,
    from,
    // `||`, not `??`: an empty CONTACT_TO_EMAIL= line in .env should still fall back.
    to: process.env.CONTACT_TO_EMAIL || fallbackTo,
  };
}
