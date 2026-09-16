"use client";

import React from "react";
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
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "../shared/VariantIcons";
import { VariantRfqModal } from "../shared/VariantRfqModal";
import { PlateCta } from "../shared/PlateCta";
import { PlateTag } from "../shared/PlateTag";
import { PlateSurface } from "../shared/PlateSurface";
import { Reveal } from "./Reveal";
import { EquipmentGallery } from "./EquipmentGallery";
import { AtlasSectionHeading } from "@/components/atlas/AtlasSectionHeading";
import { RenderStage } from "@/components/ui/RenderStage";
import { HeroCurrent } from "./hero/HeroCurrent";
import { HeroFactory } from "./hero/HeroFactory";
import { HeroPlate } from "./hero/HeroPlate";
import { HeroScene } from "./hero/HeroScene";
import { HeroSwitcher, useHeroVariant, type HeroVariant } from "./hero/HeroSwitcher";

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

type RfqProfile = "equipment" | "services" | "turnkey";

interface RfqPreset {
  profile: RfqProfile;
  product: string;
}

/* ------------------------------ Static copy ------------------------------ */

const PILLARS: readonly {
  numeral: string;
  title: string;
  kicker: string;
  description: string;
  features: readonly string[];
  stat: string;
  anchor: string;
  anchorLabel: string;
  /** A people-and-equipment scene, shown on the studio stage (scene fit: runs to the bottom and sides). */
  image: { src: string; alt: string };
}[] = [
  {
    numeral: "01",
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
    image: {
      src: "/images/product/design-engineering-team.png",
      alt: "MAC Engineers design engineers reviewing a process vessel 3D model and fabrication drawings",
    },
  },
  {
    numeral: "02",
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
    image: {
      src: "/images/product/installation-crew.png",
      alt: "Site crew rigging and erecting a stainless steel process vessel with a crane",
    },
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

/** Renders the hero layout picked in the (temporary) comparison switcher. */
function HeroView({ variant, onConsult }: { variant: HeroVariant; onConsult: () => void }): React.JSX.Element {
  switch (variant) {
    case "plate":
      return <HeroPlate onConsult={onConsult} />;
    case "scene":
      return <HeroScene onConsult={onConsult} />;
    case "factory":
      return <HeroFactory onConsult={onConsult} />;
    case "factory-tall":
      return <HeroFactory onConsult={onConsult} photo="outpainted" decor="minimal" />;
    case "factory-final":
      return <HeroFactory onConsult={onConsult} photo="dof" decor="final" />;
    case "factory-logo":
      return <HeroFactory onConsult={onConsult} photo="tall-vessel-logo" />;
    default:
      return <HeroCurrent onConsult={onConsult} />;
  }
}

/* --------------------------------- Page ---------------------------------- */

export function Variant5Page(): React.JSX.Element {
  const [expandedService, setExpandedService] = React.useState<string | null>(MAC_SERVICES[0]?.id ?? null);
  const [isRfqOpen, setIsRfqOpen] = React.useState<boolean>(false);
  const [rfqPreset, setRfqPreset] = React.useState<RfqPreset>({ profile: "turnkey", product: "" });
  const [heroVariant] = useHeroVariant();
  const metricsInHero = heroVariant === "factory-final";

  const openRfq = (profile: RfqProfile, product = ""): void => {
    setRfqPreset({ profile, product });
    setIsRfqOpen(true);
  };

  return (
    <>
        {/* ------------------------------- Hero ------------------------------- */}
        {/* TODO: Temporary comparison — keep the chosen layout, then remove the switcher. */}
        <HeroView variant={heroVariant} onConsult={() => openRfq("turnkey")} />
        <HeroSwitcher />

        {/* --------------------------- Metrics band --------------------------- */}
        {/* White like the hero, so the background change lands exactly where section 01 begins.
            Factory 4 (xl+) carries these facts in its own proof row, so the band is dropped there. */}
        <section
          aria-label="Company metrics"
          className={`border-b border-[#E3E7ED] bg-white ${metricsInHero ? "xl:hidden" : ""}`}
        >
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
              {PILLARS.map((pillar, pillarIndex) => (
                <Reveal key={pillar.numeral} delay={pillarIndex * 120}>
                  {/* Laptop widths (lg–2xl) get a compact card; monitors (2xl+) keep the roomy one. */}
                  <article className="group relative flex h-full flex-col rounded-[6px] border border-[#D6DDE6] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B5FC4]/50 hover:shadow-[0_28px_60px_-30px_rgba(13,27,46,0.35)] sm:p-7 md:p-9 lg:p-6 2xl:p-9">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-[6px] bg-[#1B5FC4] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    {/* Render plate */}
                    <div className="relative -mx-1 aspect-[16/10] overflow-hidden rounded-[4px] border border-[#E7EDF5] sm:mx-0 lg:aspect-[2/1] 2xl:aspect-[16/10]">
                      <RenderStage
                        src={pillar.image.src}
                        alt={pillar.image.alt}
                        fit="scene"
                        sizes="(max-width: 768px) 90vw, 40vw"
                        imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.33,0,0,1)] group-hover:scale-[1.03]"
                      />
                    </div>

                    <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B5FC4] lg:mt-5 2xl:mt-6">
                      {pillar.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.015em] text-[#0D1B2E] md:text-[26px] lg:text-[22px] 2xl:text-[26px]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600 lg:text-[14px] 2xl:text-[15px]">{pillar.description}</p>

                    <ul className="mb-7 mt-5 space-y-2.5 lg:mb-5 lg:mt-4 lg:space-y-2 2xl:mb-7 2xl:mt-5 2xl:space-y-2.5">
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
              ))}
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

            <div className="overflow-hidden rounded-[6px] border border-[#D6DDE6] bg-white">
              {MAC_SERVICES.map((service, index) => {
                const expanded = expandedService === service.id;
                return (
                  <div
                    key={service.id}
                    className={`border-b border-[#E3E7ED] transition-colors duration-300 last:border-b-0 ${
                      expanded ? "bg-white shadow-[inset_3px_0_0_#1B5FC4]" : "bg-white hover:bg-[#FAFBFD]"
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
                className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-[22px] hidden h-px bg-[#E3E7ED] lg:block"
              />
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.step} className="relative lg:px-3">
                  {index < PROCESS_STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-6 left-[22px] top-[22px] w-px bg-[#E3E7ED] sm:hidden"
                    />
                  ) : null}
                  <Reveal delay={index * 80}>
                    <div className="group flex items-start gap-4 lg:flex-col lg:gap-0">
                      <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center bg-white font-mono text-[11px] font-semibold text-[#1B5FC4] transition-colors duration-300 group-hover:text-white lg:mx-auto">
                        <PlateSurface
                          shape="octagon"
                          frameClassName="bg-[#DCE4F0] group-hover:bg-[#1B5FC4]"
                          faceClassName="bg-white"
                        >
                          <span className="absolute inset-0 origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-300 ease-[cubic-bezier(0.33,0,0,1)] group-hover:scale-x-100" />
                        </PlateSurface>
                        {step.step}
                      </span>
                      <div className="min-w-0 flex-1 lg:mt-4 lg:w-full lg:text-center">
                        <h3 className="font-display text-[15px] font-semibold text-[#0D1B2E]">{step.title}</h3>
                        <p className="mt-1.5 min-h-10 text-xs leading-relaxed text-slate-500 sm:min-h-0 lg:min-h-[3.75rem]">
                          {step.detail}
                        </p>
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
                    <article className="group relative h-full overflow-hidden rounded-[6px] border border-[#D6DDE6] bg-white p-5 transition-all sm:p-6 duration-300 hover:-translate-y-1 hover:border-[#1B5FC4]/50 hover:shadow-[0_24px_50px_-28px_rgba(13,27,46,0.35)]">
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
          aria-labelledby="quality-heading"
          className="scroll-mt-24 border-t border-[#E3E7ED] bg-white py-14 sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading
              index="06"
              eyebrow="Quality, Safety & Compliance"
              title="Quality you can audit. Safety you can measure."
              description="Material certificates, weld qualifications, dimensional checks, hydrotests and a documented handover dossier — delivered as standard on every dispatch and every site closure."
              headingId="quality-heading"
            />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
              <Reveal className="lg:col-span-5">
                <div className="relative aspect-[4/3] h-full overflow-hidden rounded-[6px] border border-[#E3E7ED] lg:aspect-auto lg:min-h-[18rem]">
                  <RenderStage
                    src="/images/product/quality-inspection.png"
                    alt="MAC Engineers engineer inspecting fabricated components and test records beside a finished vessel"
                    fit="scene"
                    sizes="(max-width: 1024px) 92vw, 520px"
                  />
                </div>
              </Reveal>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 xl:grid-cols-3">
                {COMPLIANCE_ITEMS.map((item, index) => (
                  <li key={item.label}>
                    <Reveal delay={(index % 3) * 90} className="h-full">
                      <div className="group relative h-full overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B5FC4]/50 hover:shadow-[0_24px_50px_-28px_rgba(13,27,46,0.35)] sm:p-6">
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {item.label}
                        </span>
                        <p className="mt-3 font-display text-[17px] font-semibold text-[#0D1B2E]">{item.value}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------ Final CTA ------------------------------ */}
        <section id="contact" className="scroll-mt-24 py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              {/* Split card: the ask on the left, the drawing-desk scene it leads to on the right. */}
              <div className="grid overflow-hidden rounded-[8px] border border-[#D6DDE6] bg-white lg:grid-cols-12">
                <div className="relative px-5 py-10 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-16">
                  <div className="drafting-grid drafting-fade pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="relative">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B5FC4]">
                      Start a Conversation
                    </p>
                    <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-[-0.02em] text-[#0D1B2E] sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
                      Let&apos;s scope your project.
                    </h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-600">
                      Share your capacity, material and plant layout. A senior project engineer
                      reviews every enquiry and responds within one business day.
                    </p>
                    <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center">
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
                <div className="relative aspect-[16/10] border-t border-[#E3E7ED] lg:col-span-5 lg:aspect-auto lg:border-l lg:border-t-0">
                  <RenderStage
                    src="/images/product/engineering-workspace.png"
                    alt="Engineering workstation with process vessel models, plant layout drawings and design tools"
                    fit="scene"
                    sizes="(max-width: 1024px) 92vw, 500px"
                  />
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
