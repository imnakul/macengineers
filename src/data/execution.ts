/**
 * The turnkey delivery sequence, taken from the company dossier's project-delivery flow
 * (section 7.2) rather than invented as marketing steps.
 *
 * The reason each phase carries a `gate` is that this is what actually distinguishes a
 * engineering contractor from a fabricator: work does not advance because time passed,
 * it advances because a named approval was given. Publishing the gates is the single
 * most credible thing this section can say to a plant manager reading it.
 */

export interface ExecutionPhase {
  /** Two-digit sheet index, printed on the rail. */
  readonly index: string;
  readonly title: string;
  /** One line of plain English about what happens in this phase. */
  readonly summary: string;
  /** What the customer physically receives or signs off at the end of it. */
  readonly outputs: readonly string[];
  /** The approval that has to be given before the next phase starts. */
  readonly gate: string;
}

export const EXECUTION = {
  eyebrow: "How we work",
  headline: "Nine phases, each with an approval before the next begins",
  body: "A turnkey project moves through the same sequence every time, from kick-off to handover. Work advances on a signed approval, not on elapsed time — so every phase is printed here with the gate that closes it.",
  gateLabel: "Approval gate",
  outputsLabel: "Key outputs",
  phases: [
    {
      index: "01",
      title: "Kick-off",
      summary:
        "Scope, schedule and responsibilities are frozen before any drawing is started.",
      outputs: [
        "Scope matrix with exclusions stated in writing",
        "Project schedule and communication plan",
        "Design data register naming who supplies what",
      ],
      gate: "Project kick-off approval",
    },
    {
      index: "02",
      title: "Basic engineering",
      summary:
        "Process concept and plant layout are settled while changes are still cheap.",
      outputs: [
        "Process concept and equipment philosophy",
        "Plant layout against your available space and heights",
        "Utility requirement list — power, air, water, steam, nitrogen",
      ],
      gate: "Layout and process freeze",
    },
    {
      index: "03",
      title: "Detail engineering",
      summary: "Everything that will be built or bought is drawn and listed.",
      outputs: [
        "GA and fabrication drawings for approval",
        "Bills of material and piping layouts",
        "Load data for foundations and structures",
      ],
      gate: "Drawing approvals",
    },
    {
      index: "04",
      title: "Procurement",
      summary: "Approved makes are ordered and checked in against the specification.",
      outputs: [
        "Approved make list agreed with you",
        "Purchase orders released against the frozen BOM",
        "Incoming material inspection and test certificates",
      ],
      gate: "Critical procurement release",
    },
    {
      index: "05",
      title: "Fabrication",
      summary: "Cutting, rolling, fit-up, welding and finishing at the Ankleshwar works.",
      outputs: [
        "Welding to qualified procedures, with dimensional checks",
        "Surface treatment — pickling, passivation, polishing or coating",
        "Fabrication record pack for the handover dossier",
      ],
      gate: "Inspection or factory acceptance test",
    },
    {
      index: "06",
      title: "Site erection",
      summary: "Equipment lands, is positioned, aligned and made mechanically complete.",
      outputs: [
        "Foundations and interfaces verified before offloading",
        "Positioning, alignment, bolting and guarding",
        "Lifting plan, permits and JSA executed on site",
      ],
      gate: "Mechanical completion",
    },
    {
      index: "07",
      title: "Piping & utilities",
      summary: "Process and utility lines are routed, supported, valved and tested.",
      outputs: [
        "Process and utility line runs with supports",
        "Valve and instrument installation",
        "Pressure, leak and line testing records",
      ],
      gate: "Pressure, leak and line tests",
    },
    {
      index: "08",
      title: "Automation",
      summary:
        "Panels, instruments and drives are wired, then the sequence logic is proven.",
      outputs: [
        "PLC and HMI panels, instruments and VFDs installed",
        "Sequence logic, interlocks and alarm handling",
        "Recipe and batch screens configured where in scope",
      ],
      gate: "FAT / SAT acceptance",
    },
    {
      index: "09",
      title: "Commissioning & handover",
      summary: "Dry run, trial batch, operator training, then the documentation pack.",
      outputs: [
        "Dry run, water trial and product trial observations",
        "Operator training and as-built documentation",
        "Manuals, spares list, punch closure and sign-off",
      ],
      gate: "Commissioning certificate and final handover",
    },
  ] satisfies readonly ExecutionPhase[],
} as const;
