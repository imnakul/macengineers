"use client";

import React from "react";
import Image from "next/image";
import {
  MAC_COMPANY,
  MAC_SERVICES,
  MAC_INDUSTRIES,
  MAC_METRICS,
} from "../data/variantsData";
import {
  TankIcon,
  MixerIcon,
  ShieldCheckIcon,
  GaugeIcon,
  CogIcon,
  HardHatIcon,
  WrenchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  FactoryIcon,
} from "../shared/VariantIcons";
import { VariantRfqModal } from "../shared/VariantRfqModal";
import { PlateCta } from "../shared/PlateCta";
import { PlateTag } from "../shared/PlateTag";
import { PlateSurface } from "../shared/PlateSurface";
import { Reveal } from "./Reveal";
import { EquipmentGallery } from "./EquipmentGallery";
import { AtlasSectionHeading } from "@/components/atlas/AtlasSectionHeading";

/* ---------------------------------------------------------------------------
 * KimiK3 — Corporate Atlas
 *
 * Professional, clean, architectural-corporate direction:
 *   porcelain paper ground · ink-navy structure · steel-blue accent ·
 *   hairline rule architecture · numbered sections · spring-soft motion.
 *
 * The page is organised around the company's two operating disciplines —
 * Equipment Manufacturing and Site Services — exactly as the master dossier
 * frames the business.
 * ------------------------------------------------------------------------- */

/** Steel blue — the single accent (CTAs, sweeps, active states, corner ticks). */
const ACCENT = "#1B5FC4";

type RfqProfile = "equipment" | "services" | "turnkey";

interface RfqPreset {
  profile: RfqProfile;
  product: string;
}

/** Four steel-blue corner ticks — the drafting-plate registration mark used on every framed plate. */
function CornerTicks({ tone = ACCENT }: { tone?: string }): React.JSX.Element {
  const base = "pointer-events-none absolute h-3.5 w-3.5";
  return (
    <span aria-hidden="true" className="absolute inset-0">
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} style={{ borderColor: tone }} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} style={{ borderColor: tone }} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: tone }} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: tone }} />
    </span>
  );
}

/* ------------------------------ Static copy ------------------------------ */

const PILLARS: readonly {
  numeral: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  title: string;
  kicker: string;
  description: string;
  features: readonly string[];
  stat: string;
  anchor: string;
  anchorLabel: string;
}[] = [
  {
    numeral: "01",
    icon: FactoryIcon,
    title: "Equipment Manufacturing",
    kicker: "Ankleshwar Works — Design · Fabricate · Test",
    description:
      "Custom-built process equipment engineered to your duty: storage tanks, liquid mixers, high-speed dispersers, IBC mixers, silos, conveyors and turnkey process plants — in SS304, SS316L, MS and alloys.",
    features: [
      "Storage & process vessels to ASME VIII / IS codes",
      "Agitators, HSD dispersers & IBC mixers",
      "Silos, screw feeders, belts & bucket elevators",
      "Integrated powder & liquid turnkey plants",
    ],
    stat: "500 L – 100,000 L+ build envelope",
    anchor: "#equipment",
    anchorLabel: "View equipment directory",
  },
  {
    numeral: "02",
    icon: WrenchIcon,
    title: "Site Execution & Services",
    kicker: "Pan-India Crews — Erect · Pipe · Maintain",
    description:
      "Certified field crews for process & utility piping, heavy fabrication, equipment erection, insulation, protective coatings and rapid shutdown turnarounds — executed under a zero-accident permit culture.",
    features: [
      "ASME B31.3 / IBR piping with TIG & orbital welding",
      "Rigging, erection & laser alignment of machinery",
      "Hot/cold insulation, blasting & SA 2.5 coatings",
      "24/7 maintenance & turnaround mobilization",
    ],
    stat: "Zero-accident PTW & JSA discipline",
    anchor: "#services",
    anchorLabel: "View services matrix",
  },
];

const PROCESS_STEPS: readonly { step: string; title: string; detail: string }[] = [
  { step: "01", title: "Requirement", detail: "Design-input register: material, capacity, utilities, codes" },
  { step: "02", title: "Engineering", detail: "2D/3D layouts, GA & fabrication drawings, BOM approvals" },
  { step: "03", title: "Procurement", detail: "Approved makes, incoming inspection, material certificates" },
  { step: "04", title: "Manufacturing", detail: "Cutting, rolling, fit-up, welding, dimensional QA" },
  { step: "05", title: "Site Execution", detail: "Rigging, erection, alignment, piping, pressure tests" },
  { step: "06", title: "Commissioning", detail: "FAT/SAT, dry run, product trial, operator training" },
  { step: "07", title: "Support", detail: "Handover dossier, AMC, spares, troubleshooting" },
];

const COMPLIANCE_ITEMS: readonly { label: string; value: string }[] = [
  { label: "Quality System", value: "ISO 9001:2015" },
  { label: "HSE Culture", value: "Zero Accident" },
  { label: "Piping Code", value: "ASME B31.3 / IBR" },
  { label: "Structural Code", value: "AWS D1.1 / IS 800" },
  { label: "Surface Standard", value: "SSPC / SA 2.5" },
  { label: "Site Discipline", value: "PTW + JSA" },
];

const INDUSTRY_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  chemical: GaugeIcon,
  pharma: ShieldCheckIcon,
  construction: HardHatIcon,
  coatings: MixerIcon,
  agro: CogIcon,
  food: TankIcon,
};

/* --------------------------------- Page ---------------------------------- */

export function Variant5Page(): React.JSX.Element {
  const [expandedService, setExpandedService] = React.useState<string | null>(MAC_SERVICES[0]?.id ?? null);
  const [isRfqOpen, setIsRfqOpen] = React.useState<boolean>(false);
  const [rfqPreset, setRfqPreset] = React.useState<RfqPreset>({ profile: "turnkey", product: "" });

  const openRfq = (profile: RfqProfile, product = ""): void => {
    setRfqPreset({ profile, product });
    setIsRfqOpen(true);
  };

  return (
    <>
        {/* ------------------------------- Hero ------------------------------- */}
        <section className="relative overflow-hidden bg-white">
          <div className="drafting-grid drafting-fade pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:pb-20 md:pt-24 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Copy */}
              <div className="lg:col-span-7">
                <Reveal>
                  <PlateTag as="p" size="sm" skin="tint">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1B5FC4] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1B5FC4]" />
                    </span>
                    Est. {MAC_COMPANY.established} · ISO 9001:2015<span className="hidden sm:inline">{" "}Certified System</span>
                  </PlateTag>
                </Reveal>

                <Reveal delay={90}>
                  <h1 className="mt-6 font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.025em] text-[#0D1B2E] sm:mt-7 sm:text-5xl lg:text-[64px]">
                    Engineering Productivity for Process Industries
                  </h1>
                </Reveal>

                <Reveal delay={170}>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                    MAC Engineers combines industrial equipment manufacturing, mechanical project
                    execution, process systems and automation to move customers from process
                    requirement to reliable production.
                  </p>
                </Reveal>

                <Reveal delay={240}>
                  <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
                    <PlateCta onClick={() => openRfq("turnkey")} className="w-full sm:w-auto">
                      Request a Project Consultation
                    </PlateCta>
                    <PlateCta href="#pillars" variant="outline" icon="arrow-down" className="w-full sm:w-auto">
                      Explore Manufacturing &amp; Services
                    </PlateCta>
                  </div>
                </Reveal>

                <Reveal delay={310}>
                  <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#E3E7ED] pt-6 sm:mt-12 sm:grid-cols-4">
                    {[
                      { label: "Materials", value: "SS304 / SS316L / MS" },
                      { label: "Standards", value: "ASME · IBR · AWS" },
                      { label: "HSE Record", value: "Zero Accident" },
                      { label: "Reach", value: "Pan-India Delivery" },
                    ].map((spec) => (
                      <div key={spec.label}>
                        <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          {spec.label}
                        </dt>
                        <dd className="mt-1.5 text-[13px] font-semibold text-[#0D1B2E]">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              {/* Plate */}
              <div className="lg:col-span-5">
                <Reveal delay={200}>
                  <figure className="relative">
                    <div className="relative aspect-[4/3.4] overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-[#EEF1F4]">
                      <Image
                        src="/mac/hero-reactor-vessel.png"
                        alt="Stainless steel reactor vessel with manway and piping fabricated by MAC Engineers"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1B2E]/70 to-transparent"
                        aria-hidden="true"
                      />
                      <figcaption className="absolute bottom-16 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-12">
                        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/95">
                          PLATE A-01 — Reactor Vessel
                        </span>
                        <span className="font-mono text-[10px] text-white/70">GA · Rev C</span>
                      </figcaption>
                      <CornerTicks />
                    </div>
                    <div className="absolute -bottom-5 left-4 right-4 flex flex-col gap-1 rounded-[4px] border border-[#E3E7ED] bg-white px-4 py-3 shadow-[0_18px_45px_-24px_rgba(13,27,46,0.45)] sm:left-8 sm:right-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Works · {MAC_COMPANY.headquarters}
                      </span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1B5FC4]">
                        ISO 9001:2015
                      </span>
                    </div>
                  </figure>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------- Metrics band --------------------------- */}
        {/* White like the hero, so the background change lands exactly where section 01 begins. */}
        <section aria-label="Company metrics" className="border-b border-[#E3E7ED] bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 border-t border-[#E3E7ED] md:grid-cols-4 md:divide-x md:divide-[#E3E7ED]">
            {MAC_METRICS.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 70} className="flex border-[#E3E7ED] max-md:odd:border-r max-md:nth-[-n+2]:border-b">
                <div className="flex min-h-[7.5rem] w-full flex-col items-center justify-center px-3 py-6 text-center md:min-h-0 md:px-6 md:py-10">
                  <div className="text-balance font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#0D1B2E] sm:text-3xl md:text-[34px]">
                    {metric.value}
                  </div>
                  {/* Letter-spacing also trails the last glyph; matching left padding keeps the label optically centred. */}
                  <div className="mt-2 text-balance pl-[0.14em] font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#1B5FC4] md:pl-[0.18em] md:tracking-[0.18em]">
                    {metric.label}
                  </div>
                  <p className="mt-1.5 hidden text-xs leading-relaxed text-slate-500 md:block">{metric.context}</p>
                </div>
              </Reveal>
            ))}
            </div>
          </div>
        </section>

        {/* --------------------------- 01 · Two pillars --------------------------- */}
        <section id="pillars" className="scroll-mt-24 py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="01"
              eyebrow="What MAC Does"
              title="Two disciplines. One accountable partner."
              description="Every engagement runs on a pair of complementary capabilities: precision equipment built in our Ankleshwar works, and certified crews that execute and support it on your site."
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
              {PILLARS.map((pillar, pillarIndex) => {
                const PillarIcon = pillar.icon;
                return (
                  <Reveal key={pillar.numeral} delay={pillarIndex * 120}>
                    <article className="group relative flex h-full flex-col rounded-[6px] border border-[#E3E7ED] bg-white p-5 transition-all sm:p-7 duration-300 hover:-translate-y-1 hover:border-[#1B5FC4]/50 hover:shadow-[0_28px_60px_-30px_rgba(13,27,46,0.35)] md:p-9">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-[6px] bg-[#1B5FC4] transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[6px] border border-[#DCE4F0] bg-[#F2F6FC] text-[#1B5FC4] transition-colors duration-300 group-hover:bg-[#1B5FC4] group-hover:text-white">
                          <PillarIcon className="h-6 w-6" />
                        </span>
                        <span className="font-mono text-4xl font-semibold tracking-[-0.04em] text-[#EDF1F6] transition-colors duration-300 group-hover:text-[#1B5FC4]/25">
                          {pillar.numeral}
                        </span>
                      </div>

                      <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B5FC4]">
                        {pillar.kicker}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.015em] text-[#0D1B2E] md:text-[26px]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{pillar.description}</p>

                      <ul className="mb-7 mt-5 space-y-2.5">
                        {pillar.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700">
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1B5FC4]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col items-start gap-3 border-t border-[#EDF1F6] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                          {pillar.stat}
                        </span>
                        <a
                          href={pillar.anchor}
                          className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B5FC4] transition-colors hover:text-[#0F3D87]"
                        >
                          {pillar.anchorLabel}
                          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------------- 02 · Equipment --------------------------- */}
        <section id="equipment" className="scroll-mt-24 border-t border-[#E3E7ED] bg-white py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="02"
              eyebrow="Manufacturing Directory"
              title="Equipment built to your process duty"
              description="Seven product lines fabricated in-house and tested before dispatch — vessels, agitation, dispersion, bulk storage, conveying and complete turnkey trains."
            />

            <EquipmentGallery
              onRequestDatasheet={(equipmentName) => openRfq("equipment", equipmentName)}
              onRequestCustomBuild={() => openRfq("equipment")}
            />
          </div>
        </section>

        {/* --------------------------- 03 · Services --------------------------- */}
        <section id="services" className="scroll-mt-24 border-t border-[#E3E7ED] py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="03"
              eyebrow="Services Matrix"
              title="Certified crews for every site discipline"
              description="Six field-service lines mobilized from Ankleshwar to plants across India — each executed under permit-to-work discipline with documented QA at every work front."
            />

            <div className="overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white">
              {MAC_SERVICES.map((service, index) => {
                const expanded = expandedService === service.id;
                return (
                  <div
                    key={service.id}
                    className={`border-b border-[#E3E7ED] transition-colors duration-300 last:border-b-0 ${
                      expanded ? "bg-[#F7FAFE]" : "bg-white hover:bg-[#FAFBFD]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedService(expanded ? null : service.id)}
                      aria-expanded={expanded}
                      aria-controls={`service-panel-${service.id}`}
                      className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-6 sm:px-7 sm:py-5"
                    >
                      <span
                        className={`font-mono text-sm font-semibold transition-colors ${
                          expanded ? "text-[#1B5FC4]" : "text-slate-400"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base font-semibold leading-snug text-[#0D1B2E] sm:truncate sm:text-lg">
                          {service.name}
                        </span>
                        <span className="mt-0.5 hidden font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:block">
                          {service.safetyStandard}
                        </span>
                      </span>
                      {service.stat ? (
                        <span className="hidden md:block"><PlateTag>
                          {service.stat.value}
                        </PlateTag></span>
                      ) : null}
                      <svg
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          expanded ? "rotate-180 text-[#1B5FC4]" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <div
                      id={`service-panel-${service.id}`}
                      className={`grid transition-all duration-500 ease-out ${
                        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 gap-6 border-t border-[#E7EDF5] px-4 py-5 sm:px-7 sm:py-6 md:grid-cols-2 md:gap-10">
                          <div>
                            <p className="text-sm leading-relaxed text-slate-600">{service.fullDesc}</p>
                            <button
                              type="button"
                              onClick={() => openRfq("services", service.name)}
                              className="group/btn mt-5 inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-[13px] font-semibold text-[#1B5FC4] transition-colors hover:border-[#1B5FC4]"
                            >
                              Request Crew &amp; Method Statement
                              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </button>
                          </div>
                          <ul className="space-y-2.5">
                            {service.keyDeliverables.map((deliverable) => (
                              <li
                                key={deliverable}
                                className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700"
                              >
                                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1B5FC4]" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------------- 04 · Process --------------------------- */}
        <section id="process" className="scroll-mt-24 border-t border-[#E3E7ED] bg-white py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="04"
              eyebrow="Delivery Framework"
              title="From enquiry to lifecycle support"
              description="A single execution thread — the same team that designs your equipment fabricates it, erects it, automates it and stays accountable after commissioning."
            />

            <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-[22px] hidden h-px bg-[#E3E7ED] lg:block"
              />
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.step} className="relative lg:px-3 lg:first:pl-0 lg:last:pr-0">
                  <Reveal delay={index * 80}>
                    <div className="group flex items-start gap-4 lg:flex-col lg:gap-0">
                      <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center font-mono text-[11px] font-semibold text-[#1B5FC4] transition-colors duration-300 group-hover:text-white">
                        <PlateSurface
                          shape="octagon"
                          frameClassName="bg-[#DCE4F0] group-hover:bg-[#1B5FC4]"
                          faceClassName="bg-white"
                        >
                          <span className="absolute inset-0 origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-300 ease-[cubic-bezier(0.33,0,0,1)] group-hover:scale-x-100" />
                        </PlateSurface>
                        {step.step}
                      </span>
                      <div className="lg:mt-4">
                        <h3 className="font-display text-[15px] font-semibold text-[#0D1B2E]">{step.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 lg:pr-2">{step.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------- 05 · Industries --------------------------- */}
        <section id="industries" className="scroll-mt-24 border-t border-[#E3E7ED] py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="05"
              eyebrow="Application Segments"
              title="Industries we engineer for"
              description="Process understanding across six core sectors — from sanitary SS316L pharma duty to abrasive dry-mix powder handling."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MAC_INDUSTRIES.map((industry, index) => {
                const IndustryIcon = INDUSTRY_ICONS[industry.id] ?? CogIcon;
                return (
                  <Reveal key={industry.id} delay={(index % 3) * 90}>
                    <article className="group relative h-full overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white p-5 transition-all sm:p-6 duration-300 hover:-translate-y-1 hover:border-[#1B5FC4]/50 hover:shadow-[0_24px_50px_-28px_rgba(13,27,46,0.35)]">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#DCE4F0] bg-[#F2F6FC] text-[#1B5FC4] transition-colors duration-300 group-hover:bg-[#1B5FC4] group-hover:text-white">
                          <IndustryIcon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          SEG-{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-[17px] font-semibold text-[#0D1B2E]">{industry.name}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{industry.desc}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------- 06 · Quality & compliance --------------------- */}
        <section
          id="quality"
          aria-label="Quality, safety and compliance"
          className="relative scroll-mt-24 overflow-hidden border-t border-[#0D1B2E] bg-[#0A1424] py-14 text-white sm:py-20 md:py-24"
        >
          <div className="drafting-grid-inverse pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7FA8EC]">
                    06 · Quality, Safety &amp; Compliance
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                    Quality you can audit. Safety you can measure.
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
                    Material certificates, weld qualifications, dimensional checks, hydrotests and
                    a documented handover dossier — delivered as standard on every dispatch and
                    every site closure.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {COMPLIANCE_ITEMS.map((item, index) => (
                    <li key={item.label}>
                      <Reveal delay={index * 60}>
                        <div className="group rounded-[6px] border border-white/10 bg-white/[0.04] px-4 py-4 transition-all duration-300 hover:border-[#1B5FC4]/70 hover:bg-[#1B5FC4]/10">
                          <div className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
                            {item.label}
                          </div>
                          <div className="mt-1.5 font-display text-sm font-semibold text-white">
                            {item.value}
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ Final CTA ------------------------------ */}
        <section id="contact" className="scroll-mt-24 py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[8px] border border-[#E3E7ED] bg-white px-5 py-10 text-center sm:px-12 sm:py-14 md:py-20">
                <div className="drafting-grid drafting-fade pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B5FC4]">
                    Start a Conversation
                  </p>
                  <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] text-[#0D1B2E] sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
                    Let&apos;s scope your project.
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
                    Share your capacity, material and plant layout. A senior project engineer
                    reviews every enquiry and responds within one business day.
                  </p>
                  <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                    <PlateCta size="lg" onClick={() => openRfq("turnkey")} className="w-full sm:w-auto">
                      Request Engineering Proposal
                    </PlateCta>
                    <PlateCta
                      href={MAC_COMPANY.whatsappHref}
                      variant="outline"
                      size="lg"
                      icon="none"
                      leadingIcon={<PhoneIcon className="h-4 w-4 text-[#1B5FC4]" />}
                      aria-label={`Call or WhatsApp MAC Engineers on ${MAC_COMPANY.phoneDisplay}`}
                      className="w-full sm:w-auto"
                    >
                      {MAC_COMPANY.phoneDisplay}
                    </PlateCta>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Keyed on the preset: the modal reads its defaults only on mount, so a new line needs a fresh instance. */}
        <VariantRfqModal
          key={`${rfqPreset.profile}:${rfqPreset.product}`}
          isOpen={isRfqOpen}
          onClose={() => setIsRfqOpen(false)}
          defaultProfile={rfqPreset.profile}
          defaultProduct={rfqPreset.product}
          theme="brand"
        />
    </>
  );
}
