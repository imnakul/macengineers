"use client";

import React, { useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/site";
import {
  RFQ_INDUSTRIES,
  RFQ_PROFILES,
  rfqSchema,
  rfqSummary,
  type RfqIndustry,
  type RfqPayload,
  type RfqProfile,
} from "@/lib/rfq-schema";
import { CheckCircleIcon } from "./VariantIcons";
import { PlateCta } from "./PlateCta";

/** Scope category the enquiry is filed under. */
type ProjectProfile = RfqProfile;

/** Scope options rendered as the first step of the RFQ form. */
const PROJECT_PROFILES = (Object.keys(RFQ_PROFILES) as ProjectProfile[]).map((id) => ({ id, label: RFQ_PROFILES[id] }));
const INDUSTRY_OPTIONS = (Object.keys(RFQ_INDUSTRIES) as RfqIndustry[]).map((id) => ({ id, label: RFQ_INDUSTRIES[id] }));

/** Keeps the prefilled WhatsApp link well inside URL length limits. */
const WHATSAPP_NOTES_LIMIT = 900;

type SubmitStatus = "idle" | "sending" | "sent";

/** The request as a WhatsApp message, with labels bolded in WhatsApp's own markup. */
function buildWhatsAppHref(payload: RfqPayload): string {
  const lines = rfqSummary(payload).map((row) => `*${row.label}:* ${row.value}`);
  const notes =
    payload.notes && payload.notes.length > WHATSAPP_NOTES_LIMIT
      ? `${payload.notes.slice(0, WHATSAPP_NOTES_LIMIT)}…`
      : (payload.notes ?? "");
  const text = [
    "Hello MAC Engineers, I would like an engineering proposal.",
    "",
    ...lines,
    ...(notes ? ["", "*Technical specifications:*", notes] : []),
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProfile?: ProjectProfile;
  defaultProduct?: string;
  theme?: "dark" | "light" | "scada" | "editorial" | "brand";
}

export function VariantRfqModal({
  isOpen,
  onClose,
  defaultProfile = "equipment",
  defaultProduct = "",
  theme = "dark",
}: RfqModalProps) {
  const [profile, setProfile] = useState<ProjectProfile>(defaultProfile);
  const [industry, setIndustry] = useState<RfqIndustry>("chemical");
  const [productName, setProductName] = useState(defaultProduct);
  const [capacity, setCapacity] = useState("");
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  /** Set when WhatsApp opened but the email copy could not be sent. */
  const [emailError, setEmailError] = useState<string | null>(null);
  const [whatsAppHref, setWhatsAppHref] = useState("");

  if (!isOpen) return null;

  const submitted = status === "sent";

  /**
   * Opens WhatsApp with the request prefilled, then emails the same request. WhatsApp opens
   * first and synchronously, because browsers block windows opened after an `await`. The email
   * result only changes the confirmation copy: the WhatsApp message reaches the team either way.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = rfqSchema.safeParse({
      profile,
      industry,
      capacity: capacity || undefined,
      scope: productName || undefined,
      contactName,
      company,
      phone,
      email,
      notes: notes || undefined,
      website: honeypot || undefined,
    });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setFormError(null);
    setEmailError(null);
    const href = buildWhatsAppHref(parsed.data);
    setWhatsAppHref(href);
    window.open(href, "_blank", "noopener,noreferrer");

    setStatus("sending");
    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message =
          result && typeof result === "object" && "error" in result && typeof result.error === "string"
            ? result.error
            : "We could not email your request.";
        setEmailError(message);
      }
    } catch (cause) {
      console.error("[rfq] Could not reach /api/rfq", cause);
      setEmailError("We could not email your request.");
    }
    setStatus("sent");
  };

  const isDark = theme === "dark" || theme === "scada";
  /* "brand" = light shell with MAC logo-red accents (used by KimiK3 Corporate Atlas). */
  const isBrand = theme === "brand";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto ${
          isDark
            ? "bg-[#0c121e] border-slate-700/60 text-slate-100"
            : "bg-white border-stone-300 text-stone-900"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-stone-400 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Requirement Received</h3>
            <p className={`max-w-md mx-auto text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-stone-600"}`}>
              Thank you, <span className="font-semibold text-emerald-400">{contactName || "Engineer"}</span>.{" "}
              {emailError
                ? "Send the WhatsApp message we opened for you and our engineering team will take it from there."
                : "Our Ankleshwar engineering team has your request by email. Send the WhatsApp message we opened for you to reach us even faster."}{" "}
              A senior project engineer will connect within 4 business hours.
            </p>
            {emailError ? (
              <p role="status" className="mx-auto max-w-md text-xs text-amber-600">
                {emailError}
              </p>
            ) : null}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              {/* Fallback for when the browser blocked the WhatsApp window. */}
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp with your request prefilled"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-slate-950 font-semibold text-sm hover:bg-[#1FBE5B] transition-colors"
              >
                Open WhatsApp
              </a>
              <a
                href="tel:+919409982541"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-colors"
              >
                Direct Line: +91 94099 82541
              </a>
              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  isDark ? "border-slate-700 hover:bg-slate-800" : "border-stone-300 hover:bg-stone-100"
                }`}
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="space-y-6">
            {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="rfq-website">Website</label>
              <input
                id="rfq-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight pr-10">
                Request Engineering Proposal & Datasheet
              </h2>
              <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                Specify your process requirements, material grades, or plant turnaround timeline.
              </p>
            </div>

            {/* Profile Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
                1. Project Scope Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PROJECT_PROFILES.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={profile === item.id}
                    aria-label={`Select project scope: ${item.label}`}
                    onClick={() => setProfile(item.id)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      profile === item.id
                        ? isDark
                          ? "bg-amber-500 text-slate-950 border-amber-500 shadow"
                          : "bg-stone-900 text-white border-stone-900 shadow"
                        : isDark
                        ? "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                        : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Industry / Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => {
                    const next = INDUSTRY_OPTIONS.find((option) => option.id === e.target.value);
                    if (next) setIndustry(next.id);
                  }}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                >
                  {INDUSTRY_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Target Capacity / Size
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5,000 L, 20 TPH, 50mm Piping"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                />
              </div>
            </div>

            {/* Product or Service description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Target Equipment or Service Scope
              </label>
              <input
                type="text"
                placeholder="e.g. Limpet Storage Tank SS316L / Brownfield Piping Tie-In / IBC Mixer"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                  isDark
                    ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                    : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                }`}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Full Name / Designation *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rajesh Shah (VP Operations)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Company / Plant Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Chemicals Ltd."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Direct Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Official Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="engineering@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Technical Specifications & Operating Medium
              </label>
              <textarea
                rows={3}
                placeholder="Detail viscosity, operating temperature/pressure, fluid density, timeline, or site location..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                  isDark
                    ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                    : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                }`}
              />
            </div>

            {formError ? (
              <p role="alert" className="text-sm font-medium text-red-600">
                {formError}
              </p>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                ISO 9001:2015 Compliant • NDA Signed Upon Request
              </span>
              <PlateCta
                type="submit"
                tone={isBrand ? "signal" : "steel"}
                disabled={status === "sending"}
                className="w-full sm:w-auto sm:shrink-0 sm:whitespace-nowrap"
              >
                {status === "sending" ? "Sending…" : "Submit Technical Proposal Request"}
              </PlateCta>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
