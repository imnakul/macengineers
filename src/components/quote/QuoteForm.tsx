"use client";

import { useId, useState } from "react";
import {
  CHOICE_INPUT_CLASS,
  CHOICE_LABEL_CLASS,
  ERROR_CLASS,
  HINT_CLASS,
  INPUT_CLASS,
  LABEL_CLASS,
} from "@/components/ui/fieldStyles";
import { QUOTE_PAGE } from "@/data/quote";
import {
  ALLOWED_UPLOAD_EXTENSIONS,
  MAX_UPLOAD_BYTES,
  hasAllowedExtension,
  quoteSchema,
  type QuoteFieldName,
} from "@/lib/quote-schema";
import { PlateCta } from "@/variants/shared/PlateCta";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<QuoteFieldName | "drawing", string>>;

const GENERIC_ERROR = "Something went wrong. Please try again, or call us instead.";

const NETWORK_ERROR =
  "We could not reach the server. Please check your connection, or call us instead.";

const MAX_UPLOAD_MB = MAX_UPLOAD_BYTES / (1024 * 1024);

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

interface QuoteFormProps {
  /**
   * Seeds the requirement box. The landing page's sizing sheet hands its specification
   * over in the URL, so someone who has already built a spec does not retype it here.
   * Uncontrolled on purpose: this is a starting value the visitor is free to edit, not
   * state the form owns.
   */
  defaultDescription?: string;
}

/**
 * The quote request form.
 *
 * Submits as multipart so a drawing can ride along with the request. The file is checked
 * here for size and extension before it is sent — the same checks run again on the
 * server, where they are the actual control; doing it here just saves someone a slow
 * upload that was always going to be rejected.
 */
export function QuoteForm({ defaultDescription = "" }: QuoteFormProps): React.JSX.Element {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<readonly string[]>([]);
  const formId = useId();

  const { labels } = QUOTE_PAGE;
  const isSubmitting = status === "submitting";
  const showOther = selectedTypes.includes(QUOTE_PAGE.otherProjectTypeValue);

  const fieldId = (name: string): string => `${formId}-${name}`;
  const errorId = (name: string): string => `${formId}-${name}-error`;

  const toggleType = (value: string): void => {
    setSelectedTypes((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const candidate = {
      fullName: readField(data, "fullName"),
      companyName: readField(data, "companyName"),
      email: readField(data, "email"),
      phone: readField(data, "phone"),
      projectTypes: data
        .getAll("projectTypes")
        .filter((value): value is string => typeof value === "string"),
      otherProjectType: readField(data, "otherProjectType"),
      description: readField(data, "description"),
      siteLocation: readField(data, "siteLocation"),
      capacity: readField(data, "capacity"),
      timeline: readField(data, "timeline"),
      website: readField(data, "website"),
    };

    const next: FieldErrors = {};

    const parsed = quoteSchema.safeParse(candidate);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key !== "website" && !(key in next)) {
          next[key as QuoteFieldName] = issue.message;
        }
      }
    }

    const upload = data.get("drawing");
    const file = upload instanceof File && upload.size > 0 ? upload : null;
    if (file) {
      if (file.size > MAX_UPLOAD_BYTES) {
        next.drawing = `That file is over ${MAX_UPLOAD_MB} MB. Please email it instead.`;
      } else if (!hasAllowedExtension(file.name)) {
        next.drawing = `We accept ${ALLOWED_UPLOAD_EXTENSIONS.join(", ").toUpperCase()} files.`;
      }
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setFormError("");
      setStatus("idle");

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
      // Sent as the original FormData so the file streams as multipart rather than
      // being base64-inflated into a JSON string.
      const response = await fetch("/api/quote", { method: "POST", body: data });

      if (!response.ok) {
        const body: unknown = await response.json().catch((): null => null);
        setFormError(extractError(body));
        setStatus("error");
        return;
      }

      form.reset();
      setSelectedTypes([]);
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
          {QUOTE_PAGE.successHeading}
        </h3>
        <p className="text-[15px] leading-[24px] font-regular tracking-glide text-ink-muted">
          {QUOTE_PAGE.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-6">
      {/* Honeypot: off-screen and out of the tab order, so only automation fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("fullName")} className={LABEL_CLASS}>
            {labels.fullName}
          </label>
          <input
            id={fieldId("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
            className={INPUT_CLASS}
          />
          {errors.fullName ? (
            <p id={errorId("fullName")} className={ERROR_CLASS}>
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("companyName")} className={LABEL_CLASS}>
            {labels.companyName}
          </label>
          <input
            id={fieldId("companyName")}
            name="companyName"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            aria-invalid={errors.companyName ? true : undefined}
            aria-describedby={errors.companyName ? errorId("companyName") : undefined}
            className={INPUT_CLASS}
          />
          {errors.companyName ? (
            <p id={errorId("companyName")} className={ERROR_CLASS}>
              {errors.companyName}
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

      <fieldset className="flex flex-col gap-3">
        <legend className={`${LABEL_CLASS} mb-1`}>{labels.projectTypes}</legend>
        <div className="grid gap-1 sm:grid-cols-2">
          {QUOTE_PAGE.projectTypes.map((type) => (
            <label key={type} className={CHOICE_LABEL_CLASS}>
              <input
                type="checkbox"
                name="projectTypes"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={(): void => toggleType(type)}
                disabled={isSubmitting}
                className={CHOICE_INPUT_CLASS}
              />
              {type}
            </label>
          ))}
        </div>
        {errors.projectTypes ? (
          <p className={ERROR_CLASS}>{errors.projectTypes}</p>
        ) : null}
      </fieldset>

      {showOther ? (
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("otherProjectType")} className={LABEL_CLASS}>
            {labels.otherProjectType}
          </label>
          <input
            id={fieldId("otherProjectType")}
            name="otherProjectType"
            type="text"
            disabled={isSubmitting}
            aria-invalid={errors.otherProjectType ? true : undefined}
            aria-describedby={
              errors.otherProjectType ? errorId("otherProjectType") : undefined
            }
            className={INPUT_CLASS}
          />
          {errors.otherProjectType ? (
            <p id={errorId("otherProjectType")} className={ERROR_CLASS}>
              {errors.otherProjectType}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("description")} className={LABEL_CLASS}>
          {labels.description}
        </label>
        <textarea
          id={fieldId("description")}
          name="description"
          rows={6}
          required
          defaultValue={defaultDescription}
          disabled={isSubmitting}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? errorId("description") : undefined}
          className={`${INPUT_CLASS} resize-y`}
        />
        {errors.description ? (
          <p id={errorId("description")} className={ERROR_CLASS}>
            {errors.description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("siteLocation")} className={LABEL_CLASS}>
            {labels.siteLocation}
          </label>
          <input
            id={fieldId("siteLocation")}
            name="siteLocation"
            type="text"
            disabled={isSubmitting}
            aria-invalid={errors.siteLocation ? true : undefined}
            aria-describedby={errors.siteLocation ? errorId("siteLocation") : undefined}
            className={INPUT_CLASS}
          />
          {errors.siteLocation ? (
            <p id={errorId("siteLocation")} className={ERROR_CLASS}>
              {errors.siteLocation}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("capacity")} className={LABEL_CLASS}>
            {labels.capacity}
          </label>
          <input
            id={fieldId("capacity")}
            name="capacity"
            type="text"
            disabled={isSubmitting}
            aria-invalid={errors.capacity ? true : undefined}
            aria-describedby={errors.capacity ? errorId("capacity") : undefined}
            className={INPUT_CLASS}
          />
          {errors.capacity ? (
            <p id={errorId("capacity")} className={ERROR_CLASS}>
              {errors.capacity}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={`${LABEL_CLASS} mb-1`}>{labels.timeline}</legend>
        <div className="grid gap-1 sm:grid-cols-2">
          {QUOTE_PAGE.timelines.map((timeline) => (
            <label key={timeline} className={CHOICE_LABEL_CLASS}>
              <input
                type="radio"
                name="timeline"
                value={timeline}
                disabled={isSubmitting}
                className={CHOICE_INPUT_CLASS}
              />
              {timeline}
            </label>
          ))}
        </div>
        {errors.timeline ? <p className={ERROR_CLASS}>{errors.timeline}</p> : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("drawing")} className={LABEL_CLASS}>
          {labels.drawing}
        </label>
        <input
          id={fieldId("drawing")}
          name="drawing"
          type="file"
          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip"
          disabled={isSubmitting}
          aria-invalid={errors.drawing ? true : undefined}
          aria-describedby={errors.drawing ? errorId("drawing") : `${formId}-drawing-hint`}
          className="w-full rounded-btn border border-hairline-strong bg-canvas p-2 text-[14px] tracking-glide text-ink-muted file:mr-4 file:rounded-btn file:border-0 file:bg-surface-2 file:px-4 file:py-2 file:font-mono file:text-[10px] file:tracking-tech file:text-ink-strong file:uppercase hover:border-ink-muted/40 focus:border-accent focus:outline-none disabled:opacity-60"
        />
        {errors.drawing ? (
          <p id={errorId("drawing")} className={ERROR_CLASS}>
            {errors.drawing}
          </p>
        ) : (
          <p id={`${formId}-drawing-hint`} className={HINT_CLASS}>
            {QUOTE_PAGE.uploadHint}
          </p>
        )}
      </div>

      {formError ? (
        <p
          role="alert"
          className="rounded-btn border border-accent/30 bg-accent-wash px-4 py-3 text-[14px] leading-[21px] tracking-glide text-accent"
        >
          <span className="font-block">{QUOTE_PAGE.errorHeading}. </span>
          {formError}
        </p>
      ) : null}

      <PlateCta type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:self-start">
        {isSubmitting ? QUOTE_PAGE.submitting : labels.submit}
      </PlateCta>
    </form>
  );
}
