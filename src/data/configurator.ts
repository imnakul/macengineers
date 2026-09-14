/**
 * Content and engineering rules behind the equipment sizing sheet on the landing page.
 *
 * Two constraints shaped this file, both from the company dossier (section 8, "Website
 * safety / accuracy rule", and section 26, "Claims Registry"):
 *
 *   1. Nothing here may read as a committed number. Capacities, build windows and test
 *      regimes are stated as indicative bands that engineering confirms against real
 *      process data — never as a guarantee. `DISCLAIMER` is rendered inside the output
 *      panel itself, not buried in a footnote.
 *   2. Design standards are named as the *reference* MAC works to, which is a statement
 *      about method rather than about a specific vessel's certification.
 *
 * Keeping the rules as data rather than as branches inside the component means the
 * sales-facing claims can be reviewed in one place by someone who is not reading React.
 */

/** The four equipment families the sizing sheet covers. */
export type EquipmentKey = "tank" | "mixer" | "silo" | "conveyor";

/** Material of construction. Drives finish, and gates which options are offered. */
export type MaterialKey = "ss316l" | "ss304" | "ms";

/** How a capacity figure is measured — it is not litres for every equipment family. */
interface CapacityScale {
  /** Unit shown next to the number, e.g. "Litres", "Tonnes", "TPH". */
  readonly unit: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly initial: number;
  /** Marks printed under the slider track. Values must sit within min…max. */
  readonly ticks: readonly number[];
  /** Above this value the build window steps up to its longer band. */
  readonly largeAbove: number;
}

export interface EquipmentOption {
  readonly key: EquipmentKey;
  readonly label: string;
  /** One line of plain English about what the equipment is for. */
  readonly summary: string;
  /** The code or standard MAC engineers to for this family. */
  readonly referenceStandard: string;
  /** The acceptance test that applies to this family. */
  readonly testRegime: string;
  readonly capacity: CapacityScale;
  /** Indicative build window, short band and long band, in weeks. */
  readonly leadWeeks: readonly [short: string, long: string];
}

export interface MaterialOption {
  readonly key: MaterialKey;
  readonly label: string;
  /** Where this grade is normally specified. */
  readonly note: string;
  /** Default surface finish for the grade, before any finish option is added. */
  readonly finish: string;
}

export interface FeatureOption {
  readonly key: string;
  readonly label: string;
  /** Short form used inside the dispatched spec, where space is tight. */
  readonly short: string;
  /** Families this option is offered for. A jacket is meaningless on a conveyor. */
  readonly appliesTo: readonly EquipmentKey[];
  /** Selected on first paint. */
  readonly defaultOn: boolean;
  /** Adds this many weeks to the indicative build window. */
  readonly addedWeeks: number;
  /** Overrides the material's default surface finish when selected. */
  readonly finish?: string;
}

export const EQUIPMENT_OPTIONS: readonly EquipmentOption[] = [
  {
    key: "tank",
    label: "Storage tank",
    summary: "Bulk and process containment for liquids, solvents and chemicals.",
    referenceStandard: "ASME Sec VIII Div 1 / IS 803",
    testRegime: "Hydro test at 1.5× design pressure",
    capacity: {
      unit: "Litres",
      min: 500,
      max: 50000,
      step: 500,
      initial: 5000,
      ticks: [500, 10000, 25000, 50000],
      largeAbove: 20000,
    },
    leadWeeks: ["4–6", "7–9"],
  },
  {
    key: "mixer",
    label: "Mixing vessel",
    summary: "Batch, inline and high-shear agitation with VFD speed control.",
    referenceStandard: "ASME Sec VIII Div 1 + agitator design review",
    testRegime: "Hydro test, no-load run and vibration check",
    capacity: {
      unit: "Litres",
      min: 250,
      max: 25000,
      step: 250,
      initial: 3000,
      ticks: [250, 5000, 15000, 25000],
      largeAbove: 10000,
    },
    leadWeeks: ["5–7", "8–10"],
  },
  {
    key: "silo",
    label: "Storage silo",
    summary: "Powders, resins, granules and cement with controlled discharge.",
    referenceStandard: "IS 875 wind & seismic / DIN 1055 bulk loading",
    testRegime: "Structural load check, weld DPT and level-system proving",
    capacity: {
      unit: "Tonnes",
      min: 5,
      max: 250,
      step: 5,
      initial: 40,
      ticks: [5, 60, 150, 250],
      largeAbove: 100,
    },
    leadWeeks: ["6–8", "9–12"],
  },
  {
    key: "conveyor",
    label: "Conveyor system",
    summary: "Screw, belt and bucket transfer with dust-sealed handover points.",
    referenceStandard: "CEMA / IS 11592 belt & screw design",
    testRegime: "No-load run test, alignment and dust-seal check",
    capacity: {
      unit: "TPH",
      min: 1,
      max: 150,
      step: 1,
      initial: 20,
      ticks: [1, 40, 90, 150],
      largeAbove: 60,
    },
    leadWeeks: ["4–6", "7–9"],
  },
];

export const MATERIAL_OPTIONS: readonly MaterialOption[] = [
  {
    key: "ss316l",
    label: "SS316L",
    note: "Acid, solvent, pharma and API duty",
    finish: "Pickled & passivated",
  },
  {
    key: "ss304",
    label: "SS304",
    note: "Food, beverage and general chemical duty",
    finish: "Pickled & passivated",
  },
  {
    key: "ms",
    label: "Carbon steel / MS",
    note: "Structural, bulk storage and utility duty",
    finish: "Blasted, epoxy coated",
  },
];

export const FEATURE_OPTIONS: readonly FeatureOption[] = [
  {
    key: "jacket",
    label: "Limpet coil or jacket",
    short: "Limpet / jacket",
    appliesTo: ["tank", "mixer"],
    defaultOn: true,
    addedWeeks: 1,
  },
  {
    key: "flp",
    label: "Flameproof drive (FLP)",
    short: "FLP drive",
    appliesTo: ["mixer", "conveyor", "silo"],
    defaultOn: true,
    addedWeeks: 1,
  },
  {
    key: "mirror",
    label: "Mirror-polished contact surfaces",
    short: "Mirror polish",
    appliesTo: ["tank", "mixer"],
    defaultOn: false,
    addedWeeks: 2,
    finish: "Mirror polished, internal",
  },
  {
    key: "loadcell",
    label: "Load cells & weighing",
    short: "Load cells",
    appliesTo: ["tank", "silo", "conveyor"],
    defaultOn: false,
    addedWeeks: 1,
  },
  {
    key: "cip",
    label: "CIP spray ball assembly",
    short: "CIP assembly",
    appliesTo: ["tank", "mixer"],
    defaultOn: false,
    addedWeeks: 1,
  },
  {
    key: "automation",
    label: "PLC / HMI with recipe control",
    short: "PLC / HMI recipe control",
    appliesTo: ["tank", "mixer", "silo", "conveyor"],
    defaultOn: false,
    addedWeeks: 2,
  },
  {
    key: "erection",
    label: "Site erection & commissioning",
    short: "Erection & commissioning",
    appliesTo: ["tank", "mixer", "silo", "conveyor"],
    defaultOn: true,
    addedWeeks: 0,
  },
];

export const CONFIGURATOR = {
  eyebrow: "Specify",
  headline: "Build the spec, then send it to our engineers",
  body: "Set the equipment, the material of construction, the working capacity and the options your plant needs. The sheet on the right rewrites itself as you go — send it straight to the Ankleshwar desk on WhatsApp, or carry it into a full quote request.",
  steps: {
    equipment: "Equipment",
    material: "Material of construction",
    capacity: "Working capacity",
    features: "Engineering options",
  },
  panelTitle: "Specification sheet",
  panelStatus: "Ready to send",
  /**
   * Rendered inside the output panel. The dossier is explicit that published figures
   * must not read as approved data, and a build window a customer screenshots is a
   * commitment whether or not it was meant as one.
   */
  disclaimer:
    "Indicative only. Final construction, wall thickness, drive rating and delivery are confirmed by our engineering team against your process data.",
  whatsappCta: "Send this spec on WhatsApp",
  quoteCta: "Turn it into a quote request",
} as const;
