"use client";

import React, { useState } from "react";
import { CheckCircleIcon } from "./VariantIcons";
import { PlateCta } from "./PlateCta";

/** Scope category the enquiry is filed under. */
type ProjectProfile = "equipment" | "services" | "turnkey";

/** Scope options rendered as the first step of the RFQ form. */
const PROJECT_PROFILES: ReadonlyArray<{ id: ProjectProfile; label: string }> = [
  { id: "equipment", label: "Equipment Mfg" },
  { id: "services", label: "Plant Services" },
  { id: "turnkey", label: "Turnkey Plant" },
];

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
  const [industry, setIndustry] = useState("chemical");
  const [productName, setProductName] = useState(defaultProduct);
  const [capacity, setCapacity] = useState("");
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              Thank you, <span className="font-semibold text-emerald-400">{contactName || "Engineer"}</span>. Our Ankleshwar engineering review team has been notified. A senior project engineer will connect within 4 business hours to evaluate your P&ID or equipment datasheet.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={(e) => setIndustry(e.target.value)}
                  className={`w-full text-sm rounded-lg px-3 py-2.5 border outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700 text-slate-200 focus:border-amber-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 focus:border-stone-900"
                  }`}
                >
                  <option value="chemical">Chemical & Petrochemical</option>
                  <option value="pharma">Pharmaceutical & API (Sanitary)</option>
                  <option value="construction">Construction Chemicals & Dry-Mix</option>
                  <option value="coatings">Paints, Coatings & Inks (HSD)</option>
                  <option value="agro">Agrochemicals & Fertilizers</option>
                  <option value="food">Food, Dairy & Beverage</option>
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                ISO 9001:2015 Compliant • NDA Signed Upon Request
              </span>
              <PlateCta
                type="submit"
                tone={isBrand ? "signal" : "steel"}
                className="w-full sm:w-auto sm:shrink-0 sm:whitespace-nowrap"
              >
                Submit Technical Proposal Request
              </PlateCta>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
