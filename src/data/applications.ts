/**
 * Industries, expressed as the equipment train MAC would actually supply rather than as
 * a card with an adjective on it.
 *
 * The dossier's argument (section 32) is that the website has to connect equipment pages
 * to complete process solutions instead of treating every machine as an isolated
 * product. A sector name alone does not do that; the sequence of stages does, because a
 * plant manager reads their own line in it.
 *
 * The section closes on `dataNote` — what MAC needs back before engineering can begin.
 * It is printed once rather than per sector, because it is the same short list every
 * time and repeating it five times reads as filler.
 */

export interface ApplicationTrain {
  readonly key: string;
  readonly label: string;
  readonly summary: string;
  /** The process stages in order. Rendered as a flow, so order matters. */
  readonly stages: readonly string[];
  /** What MAC supplies or executes on a project of this kind. */
  readonly scope: readonly string[];
}

export const APPLICATIONS = {
  eyebrow: "Applications",
  headline: "The process trains we build, sector by sector",
  body: "Equipment selection follows the product, not the catalogue. Each sector below runs its own sequence of stages, and the scope we take on is shaped around it.",
  stagesLabel: "Process train",
  scopeLabel: "Typical MAC scope",
  /** Printed once at the foot of the section, in place of a per-sector input list. */
  dataNote:
    "Engineering starts from your process data — product and formulation class, working volumes, temperature and pressure, utilities, area classification and the space you have on site.",
  items: [
    {
      key: "chemical",
      label: "Chemical & petrochemical",
      summary:
        "Corrosive and solvent duty, where material grade and containment decide everything else.",
      stages: [
        "Raw material receipt",
        "Bulk storage",
        "Dosing",
        "Reaction / mixing",
        "Transfer & piping",
        "Holding",
        "Dispatch",
      ],
      scope: [
        "SS316L and SS304 storage and process tanks, jacketed or insulated",
        "Reaction and mixing vessels with agitator design review",
        "Process and utility piping, supports and structural steel",
        "Equipment erection, testing and commissioning",
      ],
    },
    {
      key: "pharma",
      label: "Pharmaceutical & API",
      summary:
        "Hygienic construction, where the finish and the drainability are the specification.",
      stages: [
        "Material dispensing",
        "Hygienic storage",
        "Batch mixing",
        "Holding",
        "Transfer",
        "Cleaning (CIP)",
        "Filling interface",
      ],
      scope: [
        "SS316L vessels with polished internal contact surfaces",
        "Batch mixers and holding tanks with CIP spray assemblies",
        "Zero-dead-leg piping layouts and sanitary fittings",
        "Documentation pack, testing and handover support",
      ],
    },
    {
      key: "construction",
      label: "Construction chemicals & dry-mix",
      summary:
        "Powder handling and batch accuracy, where dust control and recipe repeatability decide output.",
      stages: [
        "Bag / bulk unloading",
        "Silo storage",
        "Screening",
        "Weighing & dosing",
        "Conveying",
        "Powder mixing",
        "QC sampling",
        "Packing",
      ],
      scope: [
        "Storage silos with level measurement and discharge design",
        "Screw, belt and bucket conveying between stages",
        "Weight-controlled dosing and batch mixing",
        "PLC / HMI recipe management, batch records and alarms",
      ],
    },
    {
      key: "coatings",
      label: "Paints, coatings & adhesives",
      summary:
        "High-shear dispersion duty, where shear rate and batch turnaround set the plant.",
      stages: [
        "Solvent & resin storage",
        "Liquid / powder dosing",
        "High-speed dispersion",
        "Let-down mixing",
        "Holding",
        "Filtration & QC",
        "Filling",
      ],
      scope: [
        "High-speed dispersers with VFD control and lift arrangement",
        "Dispersion and let-down vessels sized to the batch",
        "Flameproof drives and solvent-duty construction",
        "Transfer piping, filtration interface and commissioning",
      ],
    },
    {
      key: "food",
      label: "Food, beverage & FMCG",
      summary:
        "Food-grade construction and sanitation, at throughputs that cannot stop for cleaning.",
      stages: [
        "Ingredient intake",
        "Food-grade storage",
        "Blending",
        "Holding",
        "Transfer",
        "CIP / sanitation",
        "Filling interface",
      ],
      scope: [
        "SS304 and SS316 food-grade tanks, silos and blending vessels",
        "Sanitary conveying and material handling",
        "CIP / SIP interfaces and drainable layouts",
        "Erection, trial runs and operator training",
      ],
    },
  ] satisfies readonly ApplicationTrain[],
} as const;
