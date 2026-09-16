export interface EquipmentItem {
  id: string;
  name: string;
  category: "vessels" | "mixing" | "handling" | "turnkey";
  shortDesc: string;
  fullDesc: string;
  moc: string[];
  capacityRange: string;
  typicalApplications: string[];
  features: string[];
  image: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: "site-work" | "piping-structures" | "surface-finishing" | "turnaround";
  shortDesc: string;
  fullDesc: string;
  keyDeliverables: string[];
  safetyStandard: string;
  typicalIndustries: string[];
  image: string;
  stat?: { label: string; value: string };
}

export interface CaseStudy {
  id: string;
  title: string;
  clientIndustry: string;
  scopeType: "Manufacturing" | "Services" | "Turnkey";
  challenge: string;
  macSolution: string;
  results: string[];
  deliveredEquipment: string[];
  turnaroundDays?: string;
  image: string;
}

export const MAC_COMPANY = {
  name: "MAC Engineers",
  tagline: "Mechanical Accurate Construction",
  subTagline: "Engineering Productivity for Process Industries",
  established: 2019,
  engineeringRoots: "15+ Years Founder Engineering Experience",
  headquarters: "Ankleshwar, Gujarat, India",
  worksAddress: "12/13/14, Green Ananta Industrial Park, Rajpipla Road, Ankleshwar, Gujarat 393001",
  email: "info@macengineers.in",
  phone: "+91 9409982541",
  phoneDisplay: "+91 94099 82541",
  whatsappHref: "https://wa.me/919409982541",
  isoCert: "ISO 9001:2015 Certified System",
  hsePolicy: "Zero-Accident HSE Culture",
  logo: "/mac/logo-trimmed.webp",
  reach: "Pan-India Project Execution & Delivery",
};

export const MAC_EQUIPMENT: EquipmentItem[] = [
  {
    id: "storage-tanks",
    name: "Industrial Storage & Process Tanks",
    category: "vessels",
    shortDesc: "Engineered storage, buffer, and process containment vessels with custom nozzle schedules, insulation, and jackets.",
    fullDesc: "Custom-fabricated atmospheric and pressure-rated vessels designed to ASME Section VIII / IS codes. Available in limpet coil, dimple jacket, or conventional jacket with high-density Rockwool insulation and stainless steel cladding.",
    moc: ["SS316L", "SS304", "Carbon Steel (MS)", "Custom Alloys"],
    capacityRange: "500 L to 100,000 L+",
    typicalApplications: ["Chemical storage", "Pharmaceutical solvent buffer", "Construction chemical holding", "Food grade liquid holding"],
    features: [
      "Limpet coil or dimple jacket for heating/cooling",
      "Full internal weld grinding & pickling passivation (Ra < 0.4 µm available)",
      "Hydrostatic pressure testing up to 10 bar",
      "Custom level radar, sight glasses & CIP spray balls",
    ],
    image: "/images/product/jacketed-reactor-vessel.png",
    badge: "Core Line",
  },
  {
    id: "liquid-mixers",
    name: "Industrial Liquid Mixers & Agitators",
    category: "mixing",
    shortDesc: "High-torque batch, inline, and conical mixing vessels engineered for uniform fluid dynamics and suspension.",
    fullDesc: "Engineered agitation systems matching specific fluid rheology, viscosity curves, and solids suspension requirements. Fitted with premium gear motors, dual mechanical seals, and variable frequency drives.",
    moc: ["SS316L", "SS304", "Duplex SS"],
    capacityRange: "200 L to 35,000 L",
    typicalApplications: ["Viscous emulsion blending", "Active slurry suspension", "Resin formulation", "Sanitary liquid processing"],
    features: [
      "Propeller, hydrofoil, pitched-blade turbine, or anchor impellers",
      "VFD speed modulation with flameproof motor options",
      "Single / double mechanical seals with thermosiphon cooling",
      "Internal anti-vortex baffles engineered for fluid turnover",
    ],
    image: "/images/product/agitated-mixing-vessel-cutaway.png",
    badge: "High Demand",
  },
  {
    id: "hsd-disperser",
    name: "High-Speed Dispersers (HSD)",
    category: "mixing",
    shortDesc: "High-shear dispersion units with hydraulic lift for rapid powder wetting, deagglomeration, and fine grind.",
    fullDesc: "Specially engineered for the paints, coatings, printing inks, and chemical sectors. Features a high-speed saw-tooth dispersion disc running up to 1,450 RPM to generate intense shear forces, with hydraulic hoist lifting for seamless vessel turnaround.",
    moc: ["SS316 wetted parts", "Heavy MS structural column"],
    capacityRange: "100 L to 5,000 L batch",
    typicalApplications: ["Paints & architectural coatings", "Printing inks & pigment pastes", "Adhesives & mastic slurries", "Polymer dispersions"],
    features: [
      "Precision-balanced saw-tooth cowles blades",
      "Smooth hydraulic lift with safety interlock limit switches",
      "Digital tachometer & VFD speed control console",
      "Heavy vibration-damped floor-mount base frame",
    ],
    image: "/images/product/hydraulic-lift-disperser.png",
    badge: "Specialty Line",
  },
  {
    id: "ibc-mixer",
    name: "Direct-in-Tote IBC Mixers",
    category: "mixing",
    shortDesc: "Forklift-compatible mobile mixers engineered for direct agitation inside standard 1,000 L IBC containers.",
    fullDesc: "Eliminates wasteful material transfers and cross-contamination risks. Designed with self-expanding collapsible impellers that pass cleanly through standard 150mm IBC cap openings and spread wide during rotation for high-flow bulk agitation.",
    moc: ["SS316 shaft & blades", "Epoxy-coated hoist frame"],
    capacityRange: "Standard 1,000 L intermediate bulk containers",
    typicalApplications: ["Admixture homogenization", "Chemical redispersal", "Post-transport sediment remixing", "Direct batch blending"],
    features: [
      "Collapsible centrifugal expanding impellers (150mm pass-through)",
      "Integrated forklift lifting pockets & clamp locks",
      "Plug-and-play IP55/flameproof push-button drive",
      "Zero cross-contamination between IBC production lots",
    ],
    // TODO: Replace with a dedicated IBC tote-mixer render; this borrows the liquid-mixer cutaway.
    image: "/images/product/agitated-mixing-vessel-cutaway.png",
    badge: "Cost Saver",
  },
  {
    id: "storage-silos",
    name: "Bulk Storage Silos & Discharge Hoppers",
    category: "handling",
    shortDesc: "Heavy-duty structural storage silos for dry powders, cement, fly ash, polymer resins, and granulates.",
    fullDesc: "Engineered to withstand seismic, wind, and material hydrostatic loads. Designed with optimized cone discharge angles, fluidization aeration pads, continuous ultrasonic level sensors, and pulse-jet dust filtration units.",
    moc: ["Carbon Steel (IS 2062)", "SS304 contact parts"],
    capacityRange: "10 Tons to 300 Tons",
    typicalApplications: ["Dry-mix mortar plants", "Plastics & masterbatch compounding", "Fly ash & cement terminals", "Agrochemical bulk storage"],
    features: [
      "Pneumatic fluidizing aeration cones for zero rat-holing",
      "Reverse pulse-jet venting filters with emission < 10 mg/Nm³",
      "Integrated load cell weigh modules for live inventory",
      "Cage ladders, perimeter safety handrails, and burst relief discs",
    ],
    image: "/images/product/conical-storage-silo.png",
  },
  {
    id: "conveyor-systems",
    name: "Conveyor Systems & Screw Feeders",
    category: "handling",
    shortDesc: "Dust-tight screw feeders, heavy troughed belt conveyors, and continuous bucket elevators for bulk transfer.",
    fullDesc: "Precision bulk handling systems designed for tough, abrasive, or hygroscopic materials. Ensures non-spill transport with dust extraction hoods, variable speed dosing, and wear-resistant liners.",
    moc: ["MS with wear liners", "SS304", "Hardox flighting"],
    capacityRange: "1 TPH to 100 TPH bulk throughput",
    typicalApplications: ["Powder charging to mixers", "Silo-to-weigh hopper transfer", "Granular resin loading", "Bulk bagged material elevation"],
    features: [
      "Variable-pitch screw flights for accurate loss-in-weight dosing",
      "Heavy-duty split bearing blocks with gland packing seals",
      "Zero-speed switches and emergency pull-cord safeties",
      "Totally enclosed dust-tight trough assemblies",
    ],
    image: "/images/product/screw-conveyor-hopper.png",
  },
  {
    id: "turnkey-process-plants",
    name: "Turnkey Powder & Liquid Process Plants",
    category: "turnkey",
    shortDesc: "Integrated process lines combining storage, automated dosing, mixing, transfer, and PLC/HMI batch controls.",
    fullDesc: "End-to-end process plants engineered from P&ID and 3D plant layout to commissioning. Delivered as fully coordinated skids with integrated process piping, batch recipe automation, weighing modules, and dispatch interfaces.",
    moc: ["Complete SS304/SS316/MS integrated trains"],
    capacityRange: "1 TPH to 30 TPH / 500 L to 20,000 L batches",
    typicalApplications: ["Dry-mix tile adhesive plants", "Polycarboxylate ether (PCE) admixture plants", "Specialty chemical synthesis skids", "Resin & emulsion processing"],
    features: [
      "Central PLC/HMI recipe batching system (up to 25 recipes)",
      "Automated multi-ingredient dosing & gain-in-weight scales",
      "Seamless mechanical, piping, and electrical integration",
      "Single accountable turnkey execution warranty",
    ],
    image: "/images/product/turnkey-process-system.png",
    badge: "Turnkey Flagship",
  },
];

export const MAC_SERVICES: ServiceItem[] = [
  {
    id: "process-utility-piping",
    name: "Process & Utility Piping Networks",
    category: "piping-structures",
    shortDesc: "Turnkey routing, fabrication, orbital/TIG welding, testing, and commissioning of critical process and utility lines.",
    fullDesc: "Complete piping distribution networks for steam (IBR), chilled water, compressed air, nitrogen, raw solvent transfer, and product discharge lines. Fully compliant with ASME B31.3 standards with 100% radiographic or hydrotest QA.",
    keyDeliverables: [
      "P&ID line routing & isometric drawing generation",
      "ASME Section IX qualified welders (TIG/SMAW)",
      "High-pressure hydrostatic testing up to 1.5x design pressure",
      "Sanitary hygienic orbital welding for pharma/food applications",
    ],
    safetyStandard: "Permit-to-work (PTW) & Hot Work Safety Cleared",
    typicalIndustries: ["Chemical synthesis", "Pharma API", "Agrochem", "Industrial utilities"],
    image: "/mac/service-design-engineering.png",
    stat: { label: "Standard", value: "ASME B31.3 / IBR" },
  },
  {
    id: "mechanical-fabrication",
    name: "Heavy Mechanical & Structural Fabrication",
    category: "piping-structures",
    shortDesc: "Certified shop-floor and on-site fabrication of heavy industrial steel, equipment skids, and ducting systems.",
    fullDesc: "In-house plate cutting, CNC shearing, pyramid plate rolling, fit-up, and welding of mild steel, stainless steel, and specialty alloy assemblies. We fabricate process skids, reactor jackets, hopper cones, and custom heavy structural steel.",
    keyDeliverables: [
      "Multi-tier equipment access platforms & mezzanine floors",
      "Structural columns, pipe racks, and bridge gantries",
      "Custom skid bases with vibration damping isolators",
      "Comprehensive weld inspection, DPT (Dye Penetrant), and ultrasonic tests",
    ],
    safetyStandard: "AWS D1.1 / IS 800 Structural Compliance",
    typicalIndustries: ["Heavy manufacturing", "Continuous process plants", "Material handling"],
    image: "/mac/service-fabrication-supply.png",
    stat: { label: "Capacity", value: "Heavy MS/SS Skids" },
  },
  {
    id: "equipment-erection",
    name: "Plant Equipment Erection & Alignment",
    category: "site-work",
    shortDesc: "Precision rigging, positioning, leveling, and laser alignment of heavy rotary and static process machinery.",
    fullDesc: "Safe erection of reactors, storage tanks, tall distillation columns, centrifuge units, ball mills, heavy silos, and rotary equipment. Rigorously planned with certified cranes, custom lifting tackle, and zero-incident rigging plans.",
    keyDeliverables: [
      "Engineered lift plans & rigging safety risk assessments",
      "Anchor bolt grouting and vibration isolation mounting",
      "Dial indicator & precision optical/laser shaft alignment",
      "Torque-verified flange bolting & mechanical completion certificates",
    ],
    safetyStandard: "Strict Rigging Protocols & Certified Lifting Gears",
    typicalIndustries: ["Greenfield chemical complexes", "Cement terminals", "Pharma bulk plants"],
    image: "/mac/service-installation-commissioning.png",
    stat: { label: "Execution", value: "Certified Rigging Crews" },
  },
  {
    id: "industrial-insulation",
    name: "Hot, Cold & Acoustic Insulation",
    category: "surface-finishing",
    shortDesc: "Thermal efficiency insulation using Rockwool, resin-bonded glass wool, polyurethane foam, and protective cladding.",
    fullDesc: "Minimizes process thermal losses, protects operators from burn hazards, and prevents condensation on chilled lines. Finished with precision-formed aluminum or stainless steel sheet metal cladding with weather-sealed joints.",
    keyDeliverables: [
      "High-density Rockwool mattresses for high-temperature steam lines",
      "Preformed PUF / Nitrile foam insulation for chilled water and brine lines",
      "CNC-swaged aluminum & SS304 weather-tight cladding jackets",
      "Removable insulated thermal jackets for valves, flanges, and pump casings",
    ],
    safetyStandard: "Non-combustible ASTM C612 / BS 3958 Compliance",
    typicalIndustries: ["Steam distribution", "Cryogenic & chilling loops", "Storage tank batteries"],
    image: "/mac/about-plant-layout.png",
    stat: { label: "Thermal Retention", value: "Up to 90% Heat Saved" },
  },
  {
    id: "sandblasting-painting",
    name: "Sandblasting & Industrial Protective Coatings",
    category: "surface-finishing",
    shortDesc: "Surface prep to SA 2.5 profile followed by multi-coat epoxy, polyurethane, and chemical-resistant protective finishes.",
    fullDesc: "Guards heavy steel structures, storage tanks, and process vessels against corrosive industrial atmospheres, chemical fumes, and weather degradation. Executed using high-pressure abrasive blasting and airless spray systems.",
    keyDeliverables: [
      "Abrasive grit / copper slag blasting to Swedish Standard SA 2.5",
      "High-build epoxy zinc phosphate primers for corrosion resistance",
      "Aliphatic polyurethane topcoats for UV resistance and gloss retention",
      "Dry film thickness (DFT) gauge audits & holiday spark testing",
    ],
    safetyStandard: "SSPC / NACE Standard Surface Preparation",
    typicalIndustries: ["Coastal industrial zones", "Acid/solvent storage yards", "Plant pipe racks"],
    image: "/mac/hero-bulk-storage.png",
    stat: { label: "Profile", value: "SA 2.5 Surface Standard" },
  },
  {
    id: "shutdowns-maintenance",
    name: "Plant Maintenance, Turnarounds & Shutdowns",
    category: "turnaround",
    shortDesc: "Rapid-mobilization shutdown crews delivering vessel overhauls, piping tie-ins, and emergency repairs on tight windows.",
    fullDesc: "We specialize in high-pressure plant shutdowns where every hour of downtime counts. Our Ankleshwar-based rapid deployment teams mobilize certified welders, fitters, riggers, and safety supervisors to execute planned revamps safely.",
    keyDeliverables: [
      "24/7 dedicated round-the-clock shift execution",
      "Brownfield hot/cold tie-in spools and valve replacements",
      "Internal vessel cleaning, agitator seal replacements, and nozzle repairs",
      "Formal pre-startup safety review (PSSR) and leak testing handover",
    ],
    safetyStandard: "Zero Accident Record With JSA at Every Work Front",
    typicalIndustries: ["Continuous chemical refineries", "Agrochemical seasonal turnarounds", "Pharma batch blocks"],
    image: "/mac/service-after-sales-support.png",
    stat: { label: "Mobilization", value: "24/7 Fast Turnaround" },
  },
];

export const MAC_RECIPE_SIMULATION = [
  {
    id: "admixture-pce",
    name: "Recipe #01: Polycarboxylate Superplasticizer (PCE)",
    category: "Construction Chemicals",
    batchSize: "1,500 L",
    mixTimeSeconds: 45,
    targetTemp: "32°C",
    agitatorSpeed: "650 RPM",
    shearMode: "Dual Propeller + Hydrofoil",
    ingredients: [
      { name: "Demineralized Water (Base)", setWeight: "750 kg", actualWeight: "750.2 kg", tolerance: "±0.1%" },
      { name: "PCE Base Polymer Macromonomer", setWeight: "480 kg", actualWeight: "479.8 kg", tolerance: "±0.15%" },
      { name: "Cross-linking Agent / Accelerator", setWeight: "120 kg", actualWeight: "120.1 kg", tolerance: "±0.2%" },
      { name: "Anti-Foam & Biocide Stabilizer", setWeight: "15 kg", actualWeight: "15.0 kg", tolerance: "±0.05%" },
      { name: "Viscosity Modifier Solution", setWeight: "135 kg", actualWeight: "134.9 kg", tolerance: "±0.2%" },
    ],
  },
  {
    id: "coating-hsd",
    name: "Recipe #02: High-Opacity Exterior Acrylic Emulsion",
    category: "Paints & Coatings",
    batchSize: "2,000 L",
    mixTimeSeconds: 60,
    targetTemp: "42°C",
    agitatorSpeed: "1,350 RPM",
    shearMode: "High-Speed Disperser (HSD) Sawtooth",
    ingredients: [
      { name: "Water & Defoamer Premix", setWeight: "620 kg", actualWeight: "620.0 kg", tolerance: "±0.1%" },
      { name: "Rutile Titanium Dioxide (TiO2)", setWeight: "450 kg", actualWeight: "450.4 kg", tolerance: "±0.2%" },
      { name: "Calcium Carbonate Extender (Mesh 800)", setWeight: "380 kg", actualWeight: "379.7 kg", tolerance: "±0.2%" },
      { name: "Pure Acrylic Polymer Binder Emulsion", setWeight: "510 kg", actualWeight: "510.1 kg", tolerance: "±0.15%" },
      { name: "PU Rheology Modifier & Biocide", setWeight: "40 kg", actualWeight: "39.9 kg", tolerance: "±0.05%" },
    ],
  },
  {
    id: "drymix-mortar",
    name: "Recipe #03: Polymer Modified Dry-Mix Tile Adhesive",
    category: "Dry-Mix & Powders",
    batchSize: "2,500 kg",
    mixTimeSeconds: 40,
    targetTemp: "Ambient",
    agitatorSpeed: "75 RPM",
    shearMode: "Heavy-Duty Ploughshare / Ribbon Blender",
    ingredients: [
      { name: "Graded Silica Sand (0.1 - 0.4mm)", setWeight: "1,450 kg", actualWeight: "1,450.5 kg", tolerance: "±0.2%" },
      { name: "Ordinary Portland Cement (OPC 53)", setWeight: "850 kg", actualWeight: "849.6 kg", tolerance: "±0.2%" },
      { name: "Redispersible Polymer Powder (RDP)", setWeight: "90 kg", actualWeight: "90.1 kg", tolerance: "±0.1%" },
      { name: "Cellulose Ether (HPMC) Thickener", setWeight: "25 kg", actualWeight: "25.0 kg", tolerance: "±0.05%" },
      { name: "Specialty Flow & Setting Additive", setWeight: "85 kg", actualWeight: "84.8 kg", tolerance: "±0.2%" },
    ],
  },
];

export const MAC_METRICS = [
  { label: "Engineering Heritage", value: "15+ Yrs", context: "Founder heavy mechanical background" },
  { label: "Quality Standard", value: "ISO 9001", context: "2015 certified manufacturing" },
  { label: "Safety Benchmark", value: "Zero Accident", context: "Strict permit-to-work culture" },
  { label: "Execution Reach", value: "Pan-India", context: "Ankleshwar hub to all industrial corridors" },
];

export const MAC_INDUSTRIES = [
  { id: "chemical", name: "Chemical & Petrochemical", icon: "beaker", desc: "Corrosive liquid storage, reaction vessels, high-pressure piping & volatile handling." },
  { id: "pharma", name: "Pharmaceutical & API", icon: "shield", desc: "Electropolished SS316L tanks, hygienic cGMP mixing, and orbital welded clean utility loops." },
  { id: "construction", name: "Construction Chemicals & Mortars", icon: "building", desc: "Turnkey powder dry-mix mortar plants, liquid PCE admixture mixing skids & automated silo storage." },
  { id: "coatings", name: "Paints, Coatings & Inks", icon: "paint", desc: "High-Speed Dispersers (HSD), sand mill feeding systems, IBC mixers & pigment wetting." },
  { id: "agro", name: "Agrochemicals & Crop Science", icon: "sprout", desc: "Suspension concentrates (SC), herbicide blending skids, closed transfer piping & ventilation." },
  { id: "food", name: "Food, Beverage & FMCG", icon: "apple", desc: "Sanitary grade storage vessels, clean-in-place (CIP) spray rings, and food-grade agitation." },
];
