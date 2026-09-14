"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechLabel } from "@/components/ui/TechLabel";
import {
  CONFIGURATOR,
  EQUIPMENT_OPTIONS,
  FEATURE_OPTIONS,
  MATERIAL_OPTIONS,
  type EquipmentKey,
  type EquipmentOption,
  type MaterialKey,
} from "@/data/configurator";
import { COMPANY, QUOTE_HREF } from "@/data/site";

/** Reads the default option set for one equipment family. */
function defaultFeatures(equipment: EquipmentKey): readonly string[] {
  return FEATURE_OPTIONS.filter(
    (option) => option.defaultOn && option.appliesTo.includes(equipment),
  ).map((option) => option.key);
}

/**
 * Shifts an indicative week band by the options selected.
 *
 * The bands in the data are written as "4-6". Parsing them here rather than storing four
 * separate numbers keeps the sales-facing string readable in the data file, which is
 * where someone who is not reading React will review it.
 */
function shiftBand(band: string, addedWeeks: number): string {
  const parts = band.split(/[–-]/).map((part) => Number.parseInt(part, 10));
  const [low, high] = parts;
  if (parts.length !== 2 || Number.isNaN(low) || Number.isNaN(high)) return band;
  return `${low + addedWeeks}–${high + addedWeeks} weeks`;
}

const numberFormat = new Intl.NumberFormat("en-IN");

interface SheetRowProps {
  label: string;
  value: string;
}

/** One labelled row on the output sheet. */
function SheetRow({ label, value }: SheetRowProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1.5 border-t border-canvas/10 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="font-mono text-[10px] leading-none tracking-tech uppercase text-canvas/45 sm:w-[120px] sm:shrink-0">
        {label}
      </dt>
      <dd className="text-[14px] leading-[21px] font-mid tracking-glide text-canvas">
        {value}
      </dd>
    </div>
  );
}

/**
 * The live sizing sheet: pick an equipment family, a material, a working capacity and the
 * engineering options, and the specification beside it rewrites itself as you go.
 *
 * Two decisions are worth stating. First, every figure it prints is an indicative band
 * that engineering confirms, and the disclaimer sits inside the sheet rather than under
 * it — a screenshot of this panel has to carry its own caveat. Second, capacity is
 * measured in the unit each family is actually specified in (litres, tonnes, tonnes per
 * hour) rather than litres for everything, which is the difference between a tool a plant
 * engineer trusts and a slider that merely looks like one.
 */
export function RfqConfigurator(): React.JSX.Element {
  const fieldId = useId();
  const [equipment, setEquipment] = useState<EquipmentKey>(EQUIPMENT_OPTIONS[0].key);
  const [material, setMaterial] = useState<MaterialKey>(MATERIAL_OPTIONS[0].key);
  const [capacity, setCapacity] = useState<number>(EQUIPMENT_OPTIONS[0].capacity.initial);
  const [features, setFeatures] = useState<readonly string[]>(() =>
    defaultFeatures(EQUIPMENT_OPTIONS[0].key),
  );

  const equipmentOption: EquipmentOption =
    EQUIPMENT_OPTIONS.find((option) => option.key === equipment) ?? EQUIPMENT_OPTIONS[0];
  const materialOption =
    MATERIAL_OPTIONS.find((option) => option.key === material) ?? MATERIAL_OPTIONS[0];

  /** Options that mean something for the family currently selected. */
  const availableFeatures = useMemo(
    () => FEATURE_OPTIONS.filter((option) => option.appliesTo.includes(equipment)),
    [equipment],
  );

  const selectedFeatures = useMemo(
    () => availableFeatures.filter((option) => features.includes(option.key)),
    [availableFeatures, features],
  );

  /**
   * Changing the family resets capacity and options: a litre figure and a limpet coil
   * carried over onto a conveyor would be nonsense on the sheet.
   */
  const selectEquipment = useCallback((key: EquipmentKey): void => {
    const next = EQUIPMENT_OPTIONS.find((option) => option.key === key);
    if (!next) return;
    setEquipment(key);
    setCapacity(next.capacity.initial);
    setFeatures(defaultFeatures(key));
  }, []);

  const toggleFeature = useCallback((key: string): void => {
    setFeatures((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }, []);

  const addedWeeks = selectedFeatures.reduce(
    (total, option) => total + option.addedWeeks,
    0,
  );
  const baseBand =
    capacity > equipmentOption.capacity.largeAbove
      ? equipmentOption.leadWeeks[1]
      : equipmentOption.leadWeeks[0];
  const buildWindow = shiftBand(baseBand, addedWeeks);

  /** A finish option, when chosen, overrides the grade's default treatment. */
  const finish =
    selectedFeatures.find((option) => option.finish)?.finish ?? materialOption.finish;

  const capacityText = `${numberFormat.format(capacity)} ${equipmentOption.capacity.unit}`;
  const optionsText =
    selectedFeatures.length > 0
      ? selectedFeatures.map((option) => option.short).join(", ")
      : "Base configuration";

  /** The plain-text sheet, shared by the WhatsApp message and the quote prefill. */
  const specText = [
    `Equipment: ${equipmentOption.label}`,
    `Material: ${materialOption.label}`,
    `Working capacity: ${capacityText}`,
    `Finish: ${finish}`,
    `Reference standard: ${equipmentOption.referenceStandard}`,
    `Testing: ${equipmentOption.testRegime}`,
    `Options: ${optionsText}`,
    `Indicative build window: ${buildWindow}`,
  ].join("\n");

  const whatsappHref = `${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hello MAC Engineers, I built this specification on your website:\n\n${specText}\n\nPlease advise on feasibility and pricing.`,
  )}`;
  const quoteHref = `${QUOTE_HREF}?spec=${encodeURIComponent(specText)}`;

  const panelClass = "rounded-card bg-canvas p-6 shadow-ring md:p-7";
  const legendClass =
    "font-mono text-[10px] leading-none tracking-tech uppercase text-ink-muted";
  /**
   * The radio itself is visually hidden — the whole card is the target — so the card has
   * to carry the focus ring on its behalf. Without this, keyboard users arrowing through
   * the group would see nothing move.
   */
  const choiceClass =
    "flex cursor-pointer flex-col gap-1.5 rounded-block border p-4 transition-[border-color,background-color] duration-150 ease-ui has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";

  return (
    <section
      id="configurator"
      aria-labelledby="configurator-heading"
      className="scroll-mt-24 bg-surface px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="configurator-heading"
            eyebrow={CONFIGURATOR.eyebrow}
            title={CONFIGURATOR.headline}
            body={CONFIGURATOR.body}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.08} className="flex flex-col gap-6 lg:col-span-7">
            <fieldset className={panelClass}>
              <legend className={legendClass}>{CONFIGURATOR.steps.equipment}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {EQUIPMENT_OPTIONS.map((option) => {
                  const isActive = option.key === equipment;
                  return (
                    <label
                      key={option.key}
                      className={`${choiceClass} ${
                        isActive
                          ? "border-accent bg-accent-wash"
                          : "border-hairline-strong hover:border-ink-muted/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${fieldId}-equipment`}
                        value={option.key}
                        checked={isActive}
                        onChange={() => selectEquipment(option.key)}
                        className="sr-only"
                      />
                      <span className="text-[15px] leading-tight font-block tracking-glide text-ink-strong">
                        {option.label}
                      </span>
                      <span className="text-[13px] leading-[19px] font-regular tracking-glide text-ink-muted">
                        {option.summary}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className={panelClass}>
              <legend className={legendClass}>{CONFIGURATOR.steps.material}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {MATERIAL_OPTIONS.map((option) => {
                  const isActive = option.key === material;
                  return (
                    <label
                      key={option.key}
                      className={`${choiceClass} ${
                        isActive
                          ? "border-accent bg-accent-wash"
                          : "border-hairline-strong hover:border-ink-muted/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${fieldId}-material`}
                        value={option.key}
                        checked={isActive}
                        onChange={() => setMaterial(option.key)}
                        className="sr-only"
                      />
                      <span className="text-[15px] leading-tight font-block tracking-glide text-ink-strong">
                        {option.label}
                      </span>
                      <span className="text-[13px] leading-[19px] font-regular tracking-glide text-ink-muted">
                        {option.note}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={panelClass}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <label htmlFor={`${fieldId}-capacity`} className={legendClass}>
                  {CONFIGURATOR.steps.capacity}
                </label>
                <span className="font-mono text-[19px] leading-none tracking-tech text-ink-strong">
                  {capacityText}
                </span>
              </div>

              <input
                id={`${fieldId}-capacity`}
                type="range"
                min={equipmentOption.capacity.min}
                max={equipmentOption.capacity.max}
                step={equipmentOption.capacity.step}
                value={capacity}
                onChange={(event) => setCapacity(Number(event.target.value))}
                aria-label={`Working capacity in ${equipmentOption.capacity.unit}`}
                aria-valuetext={capacityText}
                className="mt-6 h-1 w-full cursor-pointer appearance-none rounded-full bg-hairline-strong accent-accent"
              />

              <div className="mt-4 flex justify-between font-mono text-[10px] leading-none tracking-tech text-ink-muted">
                {equipmentOption.capacity.ticks.map((tick) => (
                  <span key={tick}>{numberFormat.format(tick)}</span>
                ))}
              </div>
            </div>

            <fieldset className={panelClass}>
              <legend className={legendClass}>{CONFIGURATOR.steps.features}</legend>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {availableFeatures.map((option) => (
                  <label
                    key={option.key}
                    className="flex cursor-pointer items-start gap-3 rounded-block px-3 py-2.5 text-[14px] leading-[21px] font-regular tracking-glide text-ink transition-[background-color] duration-150 ease-ui hover:bg-surface"
                  >
                    <input
                      type="checkbox"
                      checked={features.includes(option.key)}
                      onChange={() => toggleFeature(option.key)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Reveal>

          {/*
            The sheet. Ring only, no lift: the page's one real drop shadow belongs to the
            closing band, and spending a second one here would flatten both.
          */}
          <Reveal delay={0.14} distance={24} className="lg:col-span-5">
            <div className="sticky top-24 overflow-hidden rounded-shell bg-inverse shadow-ring">
              <div
                aria-hidden="true"
                className="drafting-grid-inverse pointer-events-none absolute inset-0"
              />

              <div className="relative flex flex-col p-7 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <TechLabel tone="inverse">{CONFIGURATOR.panelTitle}</TechLabel>
                  <span className="font-mono text-[10px] leading-none tracking-tech uppercase text-accent-bright">
                    {CONFIGURATOR.panelStatus}
                  </span>
                </div>

                <dl aria-live="polite" className="mt-7 flex flex-col">
                  <SheetRow label="Equipment" value={equipmentOption.label} />
                  <SheetRow label="Material" value={materialOption.label} />
                  <SheetRow label="Capacity" value={capacityText} />
                  <SheetRow label="Finish" value={finish} />
                  <SheetRow label="Reference" value={equipmentOption.referenceStandard} />
                  <SheetRow label="Testing" value={equipmentOption.testRegime} />
                  <SheetRow label="Options" value={optionsText} />
                  <SheetRow label="Build window" value={buildWindow} />
                </dl>

                <p className="mt-6 border-t border-canvas/10 pt-5 text-[12px] leading-[19px] font-regular tracking-glide text-canvas/50">
                  {CONFIGURATOR.disclaimer}
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send this specification to MAC Engineers on WhatsApp"
                    className="inline-flex items-center justify-center gap-2 rounded-btn bg-canvas px-5 py-3 text-[14px] font-block tracking-glide text-ink-strong transition-[background-color] duration-150 ease-ui hover:bg-surface"
                  >
                    {CONFIGURATOR.whatsappCta}
                  </a>
                  <a
                    href={quoteHref}
                    className="inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-[14px] font-mid tracking-glide text-canvas ring-1 ring-canvas/25 transition-[background-color,box-shadow] duration-150 ease-ui hover:bg-canvas/10 hover:ring-canvas/40"
                  >
                    {CONFIGURATOR.quoteCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
