"use client";

import { useId, useState } from "react";
import {
  ERROR_CLASS,
  INPUT_CLASS,
  LABEL_CLASS,
  SUBMIT_CLASS,
} from "@/components/ui/fieldStyles";
import { CONTACT_PAGE } from "@/data/contact";
import { contactSchema, type ContactFieldName } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<ContactFieldName, string>>;

const GENERIC_ERROR = "Something went wrong. Please try again, or call us instead.";

const NETWORK_ERROR =
  "We could not reach the server. Please check your connection, or call us instead.";

/** Reads one field as a trimmed string; FormData can also hand back files. */
function readField(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Pulls the server's error message out of an unknown JSON body, if there is one. */
function extractError(body: unknown): string {
  if (typeof body === "object" && body !== null && "error" in body) {
    const { error } = body as { error: unknown };
    if (typeof error === "string" && error.length > 0) return error;
  }
  return GENERIC_ERROR;
}

/**
 * The enquiry form.
 *
 * Validation runs against the same schema the route handler uses, so the message shown
 * under a field is the message the server would have produced. Submission is blocked
 * while in flight, every error is tied to its input for screen readers, focus moves to
 * the first field that failed, and the outcome is announced rather than only shown.
 */
export function ContactForm(): React.JSX.Element {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const formId = useId();

  const { labels } = CONTACT_PAGE.form;
  const isSubmitting = status === "submitting";

  const fieldId = (name: string): string => `${formId}-${name}`;
  const errorId = (name: string): string => `${formId}-${name}-error`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const candidate = {
      firstName: readField(data, "firstName"),
      lastName: readField(data, "lastName"),
      email: readField(data, "email"),
      phone: readField(data, "phone"),
      message: readField(data, "message"),
      company: readField(data, "company"),
    };

    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key !== "company" && !(key in next)) {
          next[key as ContactFieldName] = issue.message;
        }
      }
      setErrors(next);
      setFormError("");
      setStatus("idle");

      // Move focus to the first failing field so keyboard users are not left hunting
      // for the message that just appeared.
      const firstKey = Object.keys(next)[0];
      if (firstKey !== undefined) {
        document.getElementById(fieldId(firstKey))?.focus();
      }
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body: unknown = await response.json().catch((): null => null);
        setFormError(extractError(body));
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormError(NETWORK_ERROR);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-card bg-surface p-7 md:p-8">
        <span aria-hidden="true" className="h-[7px] w-[7px] bg-accent" />
        <h3 className="text-[22px] leading-tight font-strong tracking-glide text-ink-strong">
          {CONTACT_PAGE.form.successHeading}
        </h3>
        <p className="text-[15px] leading-[24px] font-regular tracking-glide text-ink-muted">
          {CONTACT_PAGE.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      {/* Honeypot: off-screen and out of the tab order, so only automation fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("firstName")} className={LABEL_CLASS}>
            {labels.firstName}
          </label>
          <input
            id={fieldId("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            disabled={isSubmitting}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? errorId("firstName") : undefined}
            className={INPUT_CLASS}
          />
          {errors.firstName ? (
            <p id={errorId("firstName")} className={ERROR_CLASS}>
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("lastName")} className={LABEL_CLASS}>
            {labels.lastName}
          </label>
          <input
            id={fieldId("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            disabled={isSubmitting}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? errorId("lastName") : undefined}
            className={INPUT_CLASS}
          />
          {errors.lastName ? (
            <p id={errorId("lastName")} className={ERROR_CLASS}>
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("email")} className={LABEL_CLASS}>
            {labels.email}
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={INPUT_CLASS}
          />
          {errors.email ? (
            <p id={errorId("email")} className={ERROR_CLASS}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("phone")} className={LABEL_CLASS}>
            {labels.phone}
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={INPUT_CLASS}
          />
          {errors.phone ? (
            <p id={errorId("phone")} className={ERROR_CLASS}>
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("message")} className={LABEL_CLASS}>
          {labels.message}
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          disabled={isSubmitting}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={`${INPUT_CLASS} resize-y`}
        />
        {errors.message ? (
          <p id={errorId("message")} className={ERROR_CLASS}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          role="alert"
          className="rounded-btn border border-accent/30 bg-accent-wash px-4 py-3 text-[14px] leading-[21px] tracking-glide text-accent"
        >
          <span className="font-block">{CONTACT_PAGE.form.errorHeading}. </span>
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={SUBMIT_CLASS}
      >
        {isSubmitting ? CONTACT_PAGE.form.submitting : labels.submit}
      </button>
    </form>
  );
}
