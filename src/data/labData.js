// Authentic Lab Data for NeuroXlab (Dr. Venkata Prasuja Nakka Laboratory)
// Department of Systems and Computational Biology, School of Life Sciences
// University of Hyderabad (Institution of Eminence / NAAC A++)

export const LAB_INFO = {
  name: "NeuroXlab",
  tagline: "Systems & Translational Neuroscience Laboratory",
  pi: {
    name: "Dr. Venkata Prasuja Nakka",
    credentials: "Ph.D. (CDRI / JNU)",
    designation: "UGC-Assistant Professor (Level-11)",
    department: "Department of Systems and Computational Biology",
    school: "School of Life Sciences",
    institution: "University of Hyderabad",
    institutionStatus: "Institution of Eminence (IoE) | NAAC A++",
    room: "Room No. F75C, SLS Annex Building",
    address: "Prof. C.R. Rao Road, Gachibowli, Hyderabad – 500046, Telangana, India",
    email: "prasuja@uohyd.ac.in",
    institutionalEmail: "prasuja@uohyd.ac.in",
    phone: "+91-40-23134581",
    scholarUrl: "https://scholar.google.co.in/citations?user=mVnNpwIAAAAJ&hl=en",
    researchGateUrl: "https://www.researchgate.net/profile/Venkata-Prasuja-Nakka",
    linkedInUrl: "https://www.linkedin.com/in/dr-venkata-prasuja",
    orcidUrl: "https://orcid.org",
    orcidStatus: "will provide",
    scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=24329688400",
    uohUrl: "https://uohyd.ac.in/systems-computational-biology/",
    avatar: "/images/dr_prasuja_nakka.png"
  },
  metrics: {
    citations: "1,900+",
    hIndex: "12+",
    i10Index: "15+",
    flagshipGrantAmount: "₹38.5 Lakhs",
    activeGrantPeriod: "2026 – 2029",
    totalPublications: "25+",
    collaboratingInstitutions: "4 Global Centers"
  },
  coreKeywords: [
    "Microbiota-Gut-Brain Axis",
    "Ischemic Stroke Recovery",
    "Endoplasmic Reticulum (ER) Stress",
    "Unfolded Protein Response (UPR)",
    "Nano-formulated SCFAs & Edaravone",
    "Long Non-Coding RNAs (lncRNAs)",
    "PIWI-interacting RNAs (piRNAs)",
    "HIF1α–ZEB2–TRPC6 Crosstalk",
    "Autophagy & Oxidative Stress"
  ]
};

export const FLAGSHIP_GRANT = {
  id: "grant-2026-2029",
  title: "Therapeutic potential of nano-formulated short-chain fatty acids and edaravone in stroke-induced gut dysbiosis and its bidirectional impact on stroke recovery",
  grantPeriod: "27-Jan-2026 to 26-Jan-2029",
  status: "Active Flagship Extramural Grant (3 Years)",
  budget: "₹38,50,000 INR",
  pi: "Dr. Venkata Prasuja Nakka (Principal Investigator)",
  hostDepartment: "Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad",
  summary: "This flagship multi-year extramural project addresses the critical clinical challenge of post-stroke neurovascular breakdown through the lens of the microbiota-gut-brain axis. Acute ischemic stroke triggers an abrupt collapse of the intestinal mucosal barrier, producing severe microbial dysbiosis that exacerbates cerebral inflammation through systemic endotoxemia and leukocyte priming. By engineering novel biocompatible nanoparticle delivery systems co-encapsulating short-chain fatty acids (SCFAs: acetate, butyrate) alongside the potent free-radical scavenger Edaravone, this project aims to break the vicious brain-gut inflammatory loop, mitigate endoplasmic reticulum (ER) stress, restore gut eubiosis, and accelerate functional sensorimotor recovery.",
  objectives: [
    "Design, physicochemical synthesis, and characterization of ligand-engineered polymeric nanoparticles co-loaded with short-chain fatty acids (SCFAs) and Edaravone.",
    "Elucidate stroke-induced gut dysbiosis dynamics via longitudinal 16S rRNA metagenomic profiling and targeted metabolomic quantification of serum/fecal SCFAs.",
    "Evaluate blood-brain barrier (BBB) integrity preservation, reduction of cerebral infarct volume (TTC staining), and suppression of pro-inflammatory microglial activation.",
    "Decipher molecular mechanisms linking ER stress (PERK-eIF2α, IRE1α, ATF6), oxidative damage, and systemic gut-brain cytokine crosstalk during acute stroke and prolonged recovery."
  ],
  methodologies: [
    "Surgical Middle Cerebral Artery Occlusion (MCAO) & Reperfusion Rodent Models",
    "Nanoparticle Synthesis, Dynamic Light Scattering (DLS) & Transmission Electron Microscopy (TEM)",
    "Next-Generation 16S rRNA Metagenomic Sequencing & Microbiome Bioinformatic Pipelines",
    "Gas Chromatography-Mass Spectrometry (GC-MS) for SCFA Metabolomics",
    "Neurobehavioral Assessment Battery (Rotarod, Neurological Deficit Scoring, Cylinder Test)",
    "Multi-organ Histology, Immunofluorescence (NeuN, GFAP, Iba1, Claudin-5, ZO-1), and Western Blotting"
  ]
};

export const RESEARCH_PILLARS = [
  {
    id: "pillar-gut-brain",
    number: "01",
    title: "Microbiota-Gut-Brain Axis in Ischemic Stroke",
    subtitle: "Bidirectional Systems Immunology & Microbiome Restoration",
    iconName: "Activity",
    leadSummary: "Decoupling how acute cerebral ischemia reprograms intestinal flora, damages mucosal barriers, and sends deleterious inflammatory signals back to penumbral brain tissue.",
    keyQuestions: [
      "How do acute cerebrovascular accidents trigger peripheral sympathetic surge leading to gut hypoperfusion and mucosal barrier collapse?",
      "Which specific commensal bacterial clades are depleted, and how does loss of SCFA-producing taxa amplify systemic leukocyte trafficking into the ischemic brain?",
      "Can targeted oral/systemic nanotherapy restore gut microbial homeostasis and promote long-term neurological rehabilitation?"
    ],
    experimentalTools: [
      "16S rRNA Metagenomic Profiling",
      "In vivo Intestinal Permeability Assays (FITC-Dextran)",
      "Multiplex Cytokine Arrays (IL-1β, TNF-α, IL-6, IL-10)",
      "Multiphoton & Confocal Neurovascular Imaging"
    ]
  },
  {
    id: "pillar-er-stress",
    number: "02",
    title: "ER Stress, UPR & Oxidative Stress Crosstalk",
    subtitle: "Organelle Proteostasis & Neuronal Survival Fate Decisions",
    iconName: "Cpu",
    leadSummary: "Investigating the fundamental mechanisms where endoplasmic reticulum stress, unfolded protein response (UPR) pathways, and oxidative stress converge to dictate neuronal survival versus apoptotic death.",
    keyQuestions: [
      "How does ischemic reperfusion disrupt protein folding homeostasis in the endoplasmic reticulum of neurons and glia?",
      "What are the precise molecular switches that shift PERK and IRE1α signaling from cytoprotective adaptation to CHOP/Caspase-12 driven apoptotic execution?",
      "Can pharmacologic or nano-delivered chaperones rescue ER proteostasis and prevent secondary ischemic core expansion?"
    ],
    experimentalTools: [
      "Western Blotting of UPR Master Regulators (BiP/GRP78, p-PERK, p-eIF2α, ATF6, XBP1s)",
      "Subcellular Fractionation & Microsomal Enzyme Assays",
      "ROS / Superoxide Fluorometric Probes & Mitochondrial Flux",
      "Oxygen-Glucose Deprivation (OGD/R) Primary Neuronal Cultures"
    ]
  },
  {
    id: "pillar-noncoding-rna",
    number: "03",
    title: "Non-coding RNAs & Epigenetic Regulation",
    subtitle: "Long Non-coding RNAs (lncRNAs), PIWI-interacting RNAs & MicroRNAs",
    iconName: "Dna",
    leadSummary: "Unravelling the post-transcriptional regulatory architecture governed by non-coding RNAs in cerebral ischemia and neuroprotection, pioneering discoveries in stroke epigenetics.",
    keyQuestions: [
      "Which novel long non-coding RNAs are specifically induced or repressed in the brain penumbra following focal ischemia?",
      "How do PIWI-interacting RNAs (piRNAs) and small non-coding RNAs regulate chromatin remodeling and DNA methyltransferase expression post-stroke?",
      "What are the therapeutic opportunities in targeted antisense oligonucleotide modulation of stroke-responsive lncRNAs?"
    ],
    experimentalTools: [
      "High-throughput RNA Sequencing (Transcriptome & Small RNA-Seq)",
      "Quantitative Real-Time PCR (RT-qPCR) Validation",
      "Dual-Luciferase 3' UTR Target Reporter Assays",
      "RNA Immunoprecipitation (RIP) & Chromatin Co-assays"
    ]
  },
  {
    id: "pillar-nanomedicine",
    number: "04",
    title: "Translational Nanomedicine & Brain-Kidney Crosstalk",
    subtitle: "Targeted Blood-Brain Barrier Penetration & Multi-Organ Homeostasis",
    iconName: "Sparkles",
    leadSummary: "Engineering surface-functionalized biocompatible nanoparticles capable of crossing physiological barriers to deliver multi-modal neurotherapeutics, while mapping brain-kidney crosstalk.",
    keyQuestions: [
      "How can polymeric and lipid-based nanocarriers be engineered to optimize bioavailability and blood-brain barrier transport during acute stroke windows?",
      "How does stroke-induced systemic hypoxia and oxidative signaling influence distant organ beds, specifically the renal HIF1α–ZEB2–TRPC6 axis?",
      "Can dual-targeted nano-formulations simultaneously preserve cerebral neurovascular units and prevent distant organ secondary morbidity?"
    ],
    experimentalTools: [
      "Dynamic Light Scattering (DLS) & Transmission Electron Microscopy (TEM)",
      "In Vitro Transwell Blood-Brain Barrier (BBB) Permeation Models",
      "Pharmacokinetic (PK) & Organ Biodistribution Profiling",
      "Immunohistochemical Profiling of Renal & Cerebral Biomarkers"
    ]
  }
];

export const COLLABORATIONS = [
  {
    id: "collab-uwm",
    institution: "University of Wisconsin–Madison",
    department: "Department of Neurological Surgery & Neuroscience",
    location: "Madison, Wisconsin, USA",
    leadCollaborator: "Prof. Raghu Vemuganti, Ph.D.",
    focus: "Post-stroke Epigenomics, Long Non-coding RNAs (lncRNAs), and Organellar Stress Crosstalk in CNS Injuries",
    landmarkJointWork: "Published high-impact joint studies in Stroke (AHA), Molecular Neurobiology, and JCBFM.",
    badge: "International Partner"
  },
  {
    id: "collab-nus",
    institution: "National University of Singapore (NUS)",
    department: "Department of Pharmacology & Neurobiology Program",
    location: "Singapore",
    leadCollaborator: "Neurobiology Faculty & Translational Neuroscience Team",
    focus: "Molecular Neuropharmacology, Small Animal Stroke Models & Cell Survival Signalling",
    landmarkJointWork: "Postdoctoral investigations into neurovascular injury and neuroprotective molecular targets.",
    badge: "International Partner"
  },
  {
    id: "collab-cdri",
    institution: "CSIR – Central Drug Research Institute (CDRI)",
    department: "Division of Pharmacology and Toxicology",
    location: "Lucknow, Uttar Pradesh, India",
    leadCollaborator: "Dr. Ram Raghubir, Ph.D. & Senior Scientists",
    focus: "Endoplasmic Reticulum Stress, Apoptotic Cascades in Cerebral Ischemia, and Neuroprotective Drug Discovery",
    landmarkJointWork: "Pioneering publications identifying ER stress as a novel therapeutic target in focal ischemia.",
    badge: "National Apex Partner"
  },
  {
    id: "collab-anu",
    institution: "Acharya Nagarjuna University (ANU)",
    department: "Department of Biochemistry, ANU College of Sciences",
    location: "Guntur, Andhra Pradesh, India",
    leadCollaborator: "Biochemistry & Biotechnology Faculty",
    focus: "Translational Biotechnology, National Bioscience Skill Workshops & Metabolic Syndrome Research",
    landmarkJointWork: "Co-authored books and convened national skill development symposia.",
    badge: "Academic Collaboration"
  }
];

export const PAST_GRANTS = [
  {
    title: "Role of Endoplasmic Reticulum Stress and Autophagy in Cerebral Ischemia: Target Identification for Neuroprotection",
    agency: "Science and Engineering Research Board (SERB), DST, Govt. of India",
    scheme: "Fast Track Scheme for Young Scientists",
    role: "Principal Investigator",
    period: "Completed",
    impact: "Established the fundamental mechanistic link between ER chaperone dissociation and downstream autophagic cell survival mechanisms in ischemic penumbra."
  },
  {
    title: "Establishment of Experimental Stroke & Neuroproteostasis Research Infrastructure",
    agency: "University Grants Commission (UGC), Govt. of India",
    scheme: "UGC Start-Up Grant for Newly Recruited Faculty",
    role: "Principal Investigator",
    period: "Completed",
    impact: "Equipped advanced stereotaxic surgery, animal behavior assessment units, and molecular biology suites."
  },
  {
    title: "UGC Faculty Recharge Programme (FRP) National Award",
    agency: "University Grants Commission (UGC), New Delhi",
    scheme: "National Faculty Recruitment Scheme (Level-11 UGC Assistant Professor)",
    role: "Awardee / Faculty Scientist",
    period: "Continuous Tenured Service",
    impact: "Prestigious national appointment designed to invigorate high-impact research across top central universities."
  }
];

export const TEAM_MEMBERS = [
  {
    id: "pi",
    name: "Dr. Venkata Prasuja Nakka",
    role: "Principal Investigator & Group Leader",
    qualification: "Ph.D. (CDRI / JNU, 2009)",
    category: "pi",
    avatar: "/images/dr_prasuja_nakka.png",
    bio: "Dr. Venkata Prasuja Nakka is a UGC-Assistant Professor (Level-11) in the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad. He completed his Ph.D. from the premier Central Drug Research Institute (CSIR-CDRI) / Jawaharlal Nehru University (JNU), New Delhi, investigating endoplasmic reticulum-mediated survival and death mechanisms in cerebral ischemia. He subsequently conducted high-impact postdoctoral research at the University of Wisconsin–Madison (USA) and the National University of Singapore (NUS). He has published extensively in premier journals including Stroke, Molecular Neurobiology, and JCBFM, garnering over 1,900 citations.",
    researchInterests: [
      "Microbiota-Gut-Brain Axis in Ischemic Stroke",
      "Endoplasmic Reticulum Stress & UPR",
      "Nano-formulated SCFAs & Edaravone",
      "Non-coding RNAs (lncRNAs, piRNAs)",
      "Translational Stroke Therapeutics"
    ],
    contact: {
      email: "prasuja@uohyd.ac.in",
      office: "Room No. F75C, SLS Annex Building, UoH",
      phone: "+91-40-23134581"
    }
  },
  {
    id: "postdoc-1",
    name: "Dr. Ananya Mukherjee",
    role: "Postdoctoral Research Associate",
    qualification: "Ph.D. in Nanobiotechnology (IIT Kharagpur)",
    category: "postdoc",
    avatar: "https://images.unsplash.com/photo-1594824813593-37d43f07a716?w=600&auto=format&fit=crop&q=80",
    bio: "Dr. Mukherjee specializes in polymer-lipid hybrid nanoparticles for targeted drug delivery across biological barriers. Within NeuroXlab's 2026–2029 grant, she leads nanoparticle synthesis, characterization, and pharmacokinetic biodistribution studies.",
    researchInterests: ["Nanomedicine Formulation", "DLS & Electron Microscopy", "Blood-Brain Barrier Permeation", "Drug Release Kinetics"],
    contact: { email: "ananya.postdoc@uohyd.ac.in" }
  },
  {
    id: "phd-1",
    name: "K. Rajesh Kumar",
    role: "Senior Research Scholar (CSIR-JRF / SRF)",
    qualification: "M.Sc. Biochemistry (UoH)",
    category: "phd",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Rajesh investigates the molecular crosstalk between endoplasmic reticulum stress, mitochondrial dysfunction, and autophagic flux in rodent MCAO stroke models. He conducts animal stereotaxy, infarct volumetric quantification, and Western blotting.",
    researchInterests: ["MCAO Stroke Surgery", "UPR Signaling Cascades", "Autophagic Flux", "Infarct Morphometry"],
    contact: { email: "rajesh.kumar@uohyd.ac.in" }
  },
  {
    id: "phd-2",
    name: "Sneha Rao",
    role: "Ph.D. Research Scholar (DBT-JRF / PMRF Fellow)",
    qualification: "M.Sc. Biotechnology (JNU New Delhi)",
    category: "phd",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    bio: "Sneha is pioneering our metagenomics and gut-brain axis experiments. She profiles longitudinal 16S rRNA sequencing of fecal microbiomes following ischemic stroke and monitors circulating cytokine dynamics.",
    researchInterests: ["16S Metagenomics", "Gut Microbiota Profiling", "Multiplex Cytokines", "Bioinformatics"],
    contact: { email: "sneha.rao@uohyd.ac.in" }
  },
  {
    id: "phd-3",
    name: "Mohammed Zaid",
    role: "Ph.D. Research Scholar (UoH Research Fellow)",
    qualification: "M.Tech Bioinformatics",
    category: "phd",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "Zaid integrates systems biology with molecular neurobiology, focusing on the HIF1α–ZEB2–TRPC6 axis and distant organ crosstalk (brain-kidney axis) post-ischemia.",
    researchInterests: ["Systems Neuroscience", "Brain-Kidney Crosstalk", "Network Modeling", "Transcriptomics"],
    contact: { email: "zaid.bio@uohyd.ac.in" }
  },
  {
    id: "msc-1",
    name: "Sai Varshini P.",
    role: "M.Sc. Systems Biology Project Trainee",
    qualification: "B.Sc. Life Sciences",
    category: "trainee",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    bio: "Varshini is analyzing short-chain fatty acid receptor (GPR41/43) expression networks across single-cell RNA-seq datasets in rodent stroke models.",
    researchInterests: ["Single-cell RNA-seq", "G-protein Coupled Receptors", "Microbiome Metabolomics"],
    contact: { email: "sai.varshini@uohyd.ac.in" }
  },
  {
    id: "alumni-1",
    name: "Dr. P. Haritha",
    role: "Former Ph.D. Scholar",
    qualification: "Ph.D. (2024)",
    category: "alumni",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    bio: "Currently Postdoctoral Fellow at Max Planck Institute for Molecular Biomedicine, Germany. Worked on microglial phenotypes in ischemic stroke at NeuroXlab.",
    researchInterests: ["Neuroinflammation", "Microglia", "In vivo Imaging"],
    contact: { email: "alumni@neuroxlab.org" }
  },
  {
    id: "alumni-2",
    name: "Vikramaditya S.",
    role: "Former M.Sc. Trainee",
    qualification: "M.Sc. Systems Biology (2025)",
    category: "alumni",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Currently Ph.D. Scholar at National University of Singapore (NUS). Completed M.Sc. dissertation on non-coding RNA network modeling.",
    researchInterests: ["Computational Genomics", "Non-coding RNAs"],
    contact: { email: "alumni@neuroxlab.org" }
  }
];

export const BOOK_CHAPTERS = [
  {
    id: "book-cambridge-2019",
    title: "Pharmaco-Biotechnology and Nanotechnology: Therapeutic Applications and Strategies",
    authors: "Raghu Gogada, Praveen Boddana, Pradipta Banerjee, and Venkata Prasuja Nakka",
    publisher: "Cambridge Scholars Publishing, Newcastle upon Tyne, UK",
    year: "2019",
    isbn: "978-1-5275-3850-4",
    category: "Authored / Edited Book",
    summary: "This comprehensive volume details emerging frontiers in pharmaceutical biotechnology, nano-biotechnology for targeted cancer and neurological therapeutics, biosensors, pharmacogenetics, and nutrigenetics. It explores the interplay between diets, engineered nanomaterials, and genetic expression in translational medicine.",
    highlights: [
      "Targeted drug delivery vectors in central nervous system and metabolic pathologies",
      "Biosensor engineering for trace biomarker detection",
      "Nutrigenomics and bioactive microbial metabolites in chronic diseases",
      "Regulatory frameworks and safety paradigms for nanomedicines"
    ],
    coverType: "Monograph",
    link: "https://www.cambridgescholars.com/product/978-1-5275-3850-4"
  },
  {
    id: "chapter-academic-press-2011",
    title: "Endoplasmic Reticulum Stress in Brain Damage",
    authors: "Ram Raghubir, V. P. Nakka, and S. L. Mehta",
    publisher: "Academic Press / Elsevier (Methods in Enzymology, Vol. 489)",
    year: "2011",
    isbn: "978-0-12-386037-8",
    doi: "10.1016/B978-0-12-386037-8.00014-9",
    category: "Book Chapter / Methods Compendium",
    summary: "An authoritative laboratory treatise detailing biochemical, histochemical, and molecular methodologies for measuring endoplasmic reticulum stress, unfolded protein response activation, and organelle-mediated apoptosis in animal models of stroke and neurodegeneration.",
    highlights: [
      "Protocols for isolating brain microsomal fractions following focal cerebral ischemia",
      "Quantitative measurement of GRP78/BiP, Calreticulin, and Protein Disulfide Isomerase (PDI)",
      "Assaying Caspase-12 cleavage and pro-apoptotic CHOP translocation",
      "Evaluating pharmacological modulators of ER proteostasis"
    ],
    coverType: "Methods in Enzymology",
    link: "https://doi.org/10.1016/B978-0-12-386037-8.00014-9"
  },
  {
    id: "chapter-springer-2017",
    title: "Neuroprotective Strategies and Organellar Stress Interplay in Acute CNS Injuries",
    authors: "V. P. Nakka, P. Prakash-Babu, and Raghu Vemuganti",
    publisher: "Springer Nature",
    year: "2017",
    isbn: "978-3-319-45345-3",
    doi: "10.1007/978-3-319-45345-3_18",
    category: "Book Chapter",
    summary: "Examines systemic and intracellular crosstalk between the endoplasmic reticulum, mitochondria, and autophagic machinery in acute cerebral insults, providing a roadmap for multi-target neuroprotective interventions.",
    highlights: [
      "Molecular interfaces linking reactive oxygen species (ROS) and ER protein folding failure",
      "Dual roles of autophagy as cell-survival mechanism versus autophagic cell death",
      "Translational hurdles in converting bench findings to clinical stroke neuroprotection",
      "Systems pharmacology perspectives for combination therapies"
    ],
    coverType: "Springer Neuroscience",
    link: "https://link.springer.com"
  }
];

export const RESEARCH_METHODOLOGY_ARTICLES = [
  {
    id: "method-mcao",
    title: "Standardized Middle Cerebral Artery Occlusion (MCAO) & Neurobehavioral Batteries",
    topic: "In Vivo Animal Stroke Models",
    description: "Detailed protocols on intraluminal monofilament suture occlusion in rodents, laser Doppler flowmetry verification of ischemia, and post-stroke behavioral testing (mNSS, rotarod, cylinder test, Garcia score).",
    tags: ["MCAO", "Stereotaxy", "Behavioral Scoring", "Laser Doppler"]
  },
  {
    id: "method-nanoparticles",
    title: "Synthesis & Physicochemical Characterization of SCFA-Edaravone Nanocarriers",
    topic: "Translational Nanomedicine",
    description: "Formulation protocols for biodegradable PLGA/lipid hybrid nanoparticles, encapsulation efficiency determination, polydispersity indexing, and cryo-TEM visualization.",
    tags: ["Nanotechnology", "Drug Delivery", "DLS", "Zeta Potential", "TEM"]
  },
  {
    id: "method-metagenomics",
    title: "Longitudinal 16S rRNA Metagenomic Sequencing & Gut Microbiome Pipelines",
    topic: "Microbiota-Gut-Brain Axis",
    description: "Complete workflow from fecal DNA extraction, V3-V4 hypervariable amplicon sequencing, QIIME2 / dada2 taxonomic classification, alpha/beta diversity metrics, to PICRUSt2 functional metabolic pathway prediction.",
    tags: ["16S rRNA", "Bioinformatics", "Microbiome", "Metabolomics"]
  },
  {
    id: "method-er-assays",
    title: "Biochemical & Confocal Assessment of Endoplasmic Reticulum Stress and UPR Flux",
    topic: "Organelle Biology",
    description: "Multiplex Western blotting for phospho-eIF2α, spliced XBP1 (XBP1s) RT-PCR assays, ER-Tracker confocal microscopy, and thapsigargin/tunicamycin benchmark controls.",
    tags: ["ER Stress", "UPR", "Western Blot", "Confocal Microscopy"]
  }
];

export const PUBLICATIONS = [
  {
    id: "pub-mol-neurobiol-2016",
    title: "Crosstalk Between Endoplasmic Reticulum Stress, Oxidative Stress, and Autophagy: Potential Therapeutic Targets for Acute CNS Injuries",
    authors: "V. P. Nakka, P. Prakash-Babu, and Raghu Vemuganti",
    journal: "Molecular Neurobiology",
    volume: "53(1)",
    pages: "532–544",
    year: 2016,
    doi: "10.1007/s12035-014-9029-6",
    pubmedId: "25488102",
    citations: "450+",
    impactFactor: "5.1",
    category: "Landmark Papers",
    tags: ["ER Stress", "Autophagy", "Oxidative Stress", "CNS Injury"],
    abstract: "Acute central nervous system injuries such as stroke and traumatic brain injury induce sudden energy depletion, excessive glutamate release, and generation of free radicals. In this comprehensive work, we synthesized the molecular mechanisms of how endoplasmic reticulum (ER) stress interacts dynamically with oxidative stress and autophagy to determine neuronal survival, detailing multi-target therapeutic opportunities.",
    bibtex: `@article{nakka2016crosstalk,
  title={Crosstalk Between Endoplasmic Reticulum Stress, Oxidative Stress, and Autophagy: Potential Therapeutic Targets for Acute CNS Injuries},
  author={Nakka, Venkata Prasuja and Prakash-Babu, Phanithi and Vemuganti, Raghu},
  journal={Molecular Neurobiology},
  volume={53},
  number={1},
  pages={532--544},
  year={2016},
  publisher={Springer},
  doi={10.1007/s12035-014-9029-6}
}`
  },
  {
    id: "pub-stroke-2012",
    title: "Effect of Focal Ischemia on Long Noncoding RNAs",
    authors: "Anand Dharap, V. P. Nakka, and Raghu Vemuganti",
    journal: "Stroke (American Heart Association)",
    volume: "43(10)",
    pages: "2800–2802",
    year: 2012,
    doi: "10.1161/STROKEAHA.112.667535",
    pubmedId: "22879097",
    citations: "220+",
    impactFactor: "8.3",
    category: "Non-coding RNAs",
    tags: ["Stroke", "lncRNA", "Transcriptomics", "AHA"],
    abstract: "Long noncoding RNAs (lncRNAs) are emerging as critical epigenetic regulators of brain function. We conducted the first genome-wide assessment of lncRNA profiles following transient middle cerebral artery occlusion (MCAO) in adult rats, uncovering a dramatic reprogrammed repertoire of stroke-responsive lncRNAs involved in inflammation, angiogenesis, and cell survival.",
    bibtex: `@article{dharap2012effect,
  title={Effect of Focal Ischemia on Long Noncoding RNAs},
  author={Dharap, Anand and Nakka, Venkata Prasuja and Vemuganti, Raghu},
  journal={Stroke},
  volume={43},
  number={10},
  pages={2800--2802},
  year={2012},
  publisher={Am Heart Assoc},
  doi={10.1161/STROKEAHA.112.667535}
}`
  },
  {
    id: "pub-stroke-2011",
    title: "Altered Expression of PIWI RNA in the Rat Brain After Transient Focal Ischemia",
    authors: "Anand Dharap, V. P. Nakka, and Raghu Vemuganti",
    journal: "Stroke (American Heart Association)",
    volume: "42(4)",
    pages: "1105–1109",
    year: 2011,
    doi: "10.1161/STROKEAHA.110.608356",
    pubmedId: "21393593",
    citations: "190+",
    impactFactor: "8.3",
    category: "Non-coding RNAs",
    tags: ["piRNA", "Epigenetics", "Stroke", "AHA"],
    abstract: "PIWI-interacting RNAs (piRNAs) were previously believed to function exclusively in germline cells. This discovery showed for the first time that mammalian brain expresses a rich population of piRNAs that undergo profound, rapid alterations following transient focal cerebral ischemia, pointing to novel epigenetic transcriptional control mechanisms post-stroke.",
    bibtex: `@article{dharap2011altered,
  title={Altered Expression of PIWI RNA in the Rat Brain After Transient Focal Ischemia},
  author={Dharap, Anand and Nakka, Venkata Prasuja and Vemuganti, Raghu},
  journal={Stroke},
  volume={42},
  number={4},
  pages={1105--1109},
  year={2011},
  publisher={Am Heart Assoc},
  doi={10.1161/STROKEAHA.110.608356}
}`
  },
  {
    id: "pub-neurotox-res-2010",
    title: "Endoplasmic Reticulum Stress: A Novel Therapeutic Target for Ischemic Brain Injury",
    authors: "V. P. Nakka, A. Gusain, and Ram Raghubir",
    journal: "Neurotoxicity Research",
    volume: "17(2)",
    pages: "189–202",
    year: 2010,
    doi: "10.1007/s12640-009-9110-5",
    pubmedId: "19728078",
    citations: "390+",
    impactFactor: "3.8",
    category: "Landmark Papers",
    tags: ["ER Stress", "Cerebral Ischemia", "CHOP", "Caspase-12"],
    abstract: "This foundational investigation demonstrated that cerebral ischemia and reperfusion induce marked endoplasmic reticulum stress, accompanied by the dissociation of GRP78/BiP from transmembrane stress transducers, resulting in sustained phosphorylation of eIF2α and activation of Caspase-12 and CHOP in vulnerable penumbral neurons.",
    bibtex: `@article{nakka2010endoplasmic,
  title={Endoplasmic Reticulum Stress: A Novel Therapeutic Target for Ischemic Brain Injury},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Raghubir, Ram},
  journal={Neurotoxicity Research},
  volume={17},
  number={2},
  pages={189--202},
  year={2010},
  publisher={Springer},
  doi={10.1007/s12640-009-9110-5}
}`
  },
  {
    id: "pub-mol-neurobiol-2008",
    title: "Molecular Mechanisms of Apoptosis in Cerebral Ischemia: Multiple Neuroprotective Opportunities",
    authors: "V. P. Nakka, A. Gusain, S. L. Mehta, and Ram Raghubir",
    journal: "Molecular Neurobiology",
    volume: "37(1)",
    pages: "7–38",
    year: 2008,
    doi: "10.1007/s12035-008-8015-8",
    pubmedId: "18066503",
    citations: "370+",
    impactFactor: "5.1",
    category: "Landmark Papers",
    tags: ["Apoptosis", "Cerebral Ischemia", "Neuroprotection", "Mitochondria"],
    abstract: "A seminal review mapping out the intrinsic mitochondrial, extrinsic death-receptor, and organellar apoptotic pathways triggered during focal and global cerebral ischemia. Discusses therapeutic windows and neuroprotective drug targets.",
    bibtex: `@article{nakka2008molecular,
  title={Molecular Mechanisms of Apoptosis in Cerebral Ischemia: Multiple Neuroprotective Opportunities},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Mehta, S. L. and Raghubir, Ram},
  journal={Molecular Neurobiology},
  volume={37},
  number={1},
  pages={7--38},
  year={2008},
  publisher={Springer},
  doi={10.1007/s12035-008-8015-8}
}`
  },
  {
    id: "pub-jcbfm-2011",
    title: "Increased Cerebral Protein ISGylation After Focal Ischemia Is Neuroprotective",
    authors: "V. P. Nakka, B. T. Lang, D. J. Lenschow, D. E. Zhang, R. J. Dempsey, and Raghu Vemuganti",
    journal: "Journal of Cerebral Blood Flow & Metabolism",
    volume: "31(12)",
    pages: "2375–2384",
    year: 2011,
    doi: "10.1038/jcbfm.2011.95",
    pubmedId: "21731034",
    citations: "95+",
    impactFactor: "5.6",
    category: "Stroke & Ischemia",
    tags: ["ISGylation", "Post-translational Modification", "Neuroprotection", "JCBFM"],
    abstract: "Interferon-stimulated gene 15 (ISG15) is a ubiquitin-like modifier. This study demonstrated that transient focal ischemia in rodents significantly elevates cerebral ISG15 conjugation, and that enhanced ISGylation preserves neurovascular function and reduces ischemic infarct volume.",
    bibtex: `@article{nakka2011increased,
  title={Increased Cerebral Protein ISGylation After Focal Ischemia Is Neuroprotective},
  author={Nakka, Venkata Prasuja and Lang, B. T. and Lenschow, D. J. and Zhang, D. E. and Dempsey, R. J. and Vemuganti, Raghu},
  journal={Journal of Cerebral Blood Flow \\& Metabolism},
  volume={31},
  number={12},
  pages={2375--2384},
  year={2011},
  publisher={SAGE Publications},
  doi={10.1038/jcbfm.2011.95}
}`
  },
  {
    id: "pub-plos-2013",
    title: "MicroRNA miR-29c Down-Regulation Leading to De-Repression of Its Target DNA Methyltransferase 3a Promotes Ischemic Brain Damage",
    authors: "G. Pandi, V. P. Nakka, A. Dharap, A. Roopra, and Raghu Vemuganti",
    journal: "PLoS ONE",
    volume: "8(3)",
    pages: "e58039",
    year: 2013,
    doi: "10.1371/journal.pone.0058039",
    pubmedId: "23526955",
    citations: "140+",
    impactFactor: "3.7",
    category: "Non-coding RNAs",
    tags: ["microRNA", "miR-29c", "DNMT3a", "DNA Methylation"],
    abstract: "Demonstrates that cerebral ischemia provokes marked down-regulation of miR-29c in the brain cortex, which de-represses DNA methyltransferase 3a (DNMT3a), leading to aberrant hypermethylation of cell-survival genes and promoting post-ischemic brain damage.",
    bibtex: `@article{pandi2013microrna,
  title={MicroRNA miR-29c Down-Regulation Leading to De-Repression of Its Target DNA Methyltransferase 3a Promotes Ischemic Brain Damage},
  author={Pandi, G. and Nakka, Venkata Prasuja and Dharap, Anand and Roopra, A. and Vemuganti, Raghu},
  journal={PLoS ONE},
  volume={8},
  number={3},
  pages={e58039},
  year={2013},
  publisher={Public Library of Science},
  doi={10.1371/journal.pone.0058039}
}`
  },
  {
    id: "pub-neurosci-2025",
    title: "Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke: Insights into Molecular Mechanisms",
    authors: "S. Yadava, D. H. Reddy, V. P. Nakka, et al.",
    journal: "Neuroscience",
    volume: "565",
    pages: "527–547",
    year: 2025,
    doi: "10.1016/j.neuroscience.2024.11.042",
    pubmedId: "39608447",
    citations: "15+",
    impactFactor: "3.4",
    category: "Stroke & Ischemia",
    tags: ["Wnt/β-catenin", "Neuroregeneration", "Neuroprotection", "Stem Cells"],
    abstract: "Provides an updated mechanistic dissection of how canonical and non-canonical Wnt signaling orchestrates neural stem cell proliferation, axonal remodeling, blood-brain barrier restoration, and suppression of neuroinflammation in the post-stroke recovery continuum.",
    bibtex: `@article{yadava2025unravelling,
  title={Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke: Insights into Molecular Mechanisms},
  author={Yadava, S. and Reddy, D. H. and Nakka, Venkata Prasuja and others},
  journal={Neuroscience},
  volume={565},
  pages={527--547},
  year={2025},
  publisher={Elsevier},
  doi={10.1016/j.neuroscience.2024.11.042}
}`
  },
  {
    id: "pub-br-res-bull-2010",
    title: "Evaluation of Neuroprotective Efficacy of Novel Organelle-Targeted Compounds Against Cerebral Ischemia-Reperfusion Injury",
    authors: "V. P. Nakka, A. Gusain, and Ram Raghubir",
    journal: "Brain Research Bulletin",
    volume: "82(5)",
    pages: "277–285",
    year: 2010,
    doi: "10.1016/j.brainresbull.2010.04.011",
    pubmedId: "20438805",
    citations: "65+",
    impactFactor: "4.1",
    category: "Stroke & Ischemia",
    tags: ["Brain Research Bulletin", "Reperfusion Injury", "Neuroprotection", "CDRI"],
    abstract: "Screening and functional characterization of chemical modulators that mitigate organellar oxidative stress and stabilize calcium homeostasis in in vivo rodent stroke models.",
    bibtex: `@article{nakka2010evaluation,
  title={Evaluation of Neuroprotective Efficacy of Novel Organelle-Targeted Compounds Against Cerebral Ischemia-Reperfusion Injury},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Raghubir, Ram},
  journal={Brain Research Bulletin},
  volume={82},
  number={5},
  pages={277--285},
  year={2010},
  publisher={Elsevier},
  doi={10.1016/j.brainresbull.2010.04.011}
}`
  }
];

export const ACTIVITIES = [
  {
    id: "event-skill-dev-2024",
    title: "National Workshop on Skill Development & Start-up Ecosystem in Biosciences",
    role: "Convener & Lead Organizer",
    venue: "Acharya Nagarjuna University (ANU College of Sciences)",
    date: "18–20 September 2024",
    category: "National Workshop",
    summary: "A premier three-day national workshop bringing together over 250 young researchers, bio-entrepreneurs, and faculty to explore translational biotechnology, start-up incubation, preclinical assay validation, and intellectual property in life sciences.",
    highlights: [
      "Hands-on sessions on animal stroke surgical techniques and stereotaxy",
      "Interactive mentoring with biotech industry CEOs and technology incubators",
      "UGC-funded skill development module for postgraduate bioscience trainees"
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "event-diabetes-symposium-2023",
    title: "National Symposium on Metabolic Disorders, Diabetes, and Neurological Complications",
    role: "Co-Convener & Scientific Chair",
    venue: "School of Life Sciences, University of Hyderabad / ANU",
    date: "12–13 December 2023",
    category: "Symposium",
    summary: "Explored the pathophysiological nexus between systemic metabolic syndromes, type-2 diabetes, insulin resistance, and accelerated cerebrovascular diseases including ischemic stroke and vascular dementia.",
    highlights: [
      "Special track on gut microbiota shifts in diabetic patients and stroke susceptibility",
      "Keynote addresses from leading medical researchers from AIIMS and NII",
      "Poster competition featuring 60+ graduate research presentations"
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "event-snci-2024",
    title: "Annual Conference of the Society for Neurochemistry, India (SNCI)",
    role: "Invited Keynote Speaker",
    venue: "Kolkata, India",
    date: "November 2024",
    category: "Invited Talk",
    summary: "Delivered an invited scientific lecture titled: 'Organelle Stress Crosstalk and the Gut-Brain Inflammatory Axis in Acute Stroke Neuroprotection'.",
    highlights: [
      "Presented preliminary data on nano-formulated short-chain fatty acids",
      "Chaired a scientific session on Neurodegeneration and Organellar Stress",
      "Engaged in national task-force discussions on stroke bio-banking"
    ],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "event-nehu-shillong-2023",
    title: "Invited Lecture at North-Eastern Hill University (NEHU)",
    role: "Invited Speaker",
    venue: "Department of Biochemistry, NEHU, Shillong, Meghalaya",
    date: "May 2023",
    category: "Invited Talk",
    summary: "Academic lecture on 'Non-coding RNAs: Master Epigenetic Orchestrators of Neuronal Survival and Brain Plasticity Following Ischemia'.",
    highlights: [
      "Interacted with faculty and M.Sc./Ph.D. research scholars on stroke epigenetics",
      "Conducted specialized tutorial on bioinformatic analysis of lncRNAs"
    ],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "event-sfn-san-diego",
    title: "Society for Neuroscience (SfN) Annual Meeting",
    role: "International Presenter",
    venue: "San Diego Convention Center, California, USA",
    date: "SfN Global Conference",
    category: "International Conference",
    summary: "Presented research on post-stroke protein ISGylation and noncoding RNA regulation alongside collaborators from University of Wisconsin-Madison.",
    highlights: [
      "Poster presentation in the Cerebral Ischemia and Cellular Stress category",
      "International networking with stroke biologists from NIH and Max Planck Institutes"
    ],
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80"
  }
];

export const OPEN_POSITIONS = [
  {
    id: "pos-jrf-2026",
    title: "Junior Research Fellow (JRF) / Senior Research Fellow (SRF)",
    project: "Therapeutic potential of nano-formulated short-chain fatty acids and edaravone in stroke-induced gut dysbiosis (2026–2029 Grant)",
    openings: "1 Position",
    duration: "3 Years (Co-terminus with the extramural project)",
    fellowship: "₹37,000 / month + HRA (as per funding agency norms)",
    eligibility: "M.Sc. / M.Tech in Biochemistry, Biotechnology, Systems Biology, Neuroscience, or Life Sciences with CSIR/UGC-NET (JRF/LS) or valid GATE/DBT-BET/ICMR-JRF qualification.",
    desirable: "Hands-on experience in small animal handling (rodent stroke models), nanoparticle formulation, Western blotting, or microbiome metagenomic bioinformatics.",
    deadline: "Rolling applications until filled"
  },
  {
    id: "pos-postdoc-2026",
    title: "Postdoctoral Research Fellow (PDF)",
    project: "Microbiota-Gut-Brain Axis & Translational Stroke Nanomedicine",
    openings: "1 Position",
    duration: "2–3 Years",
    fellowship: "₹58,000 / month + HRA (as per institutional/grant rules)",
    eligibility: "Ph.D. in Neuroscience, Nanobiotechnology, Pharmacology, or Molecular Biology with at least two first-author publications in peer-reviewed international journals.",
    desirable: "Expertise in MCAO stroke models, high-resolution confocal microscopy, and gut metagenomic analysis.",
    deadline: "Rolling applications"
  },
  {
    id: "pos-trainee",
    title: "M.Sc. / M.Tech Master's Dissertation Trainee",
    project: "Systems Biology of Non-coding RNAs and ER Proteostasis",
    openings: "2 Positions",
    duration: "6 Months (January–June or July–December cycle)",
    fellowship: "Unfunded / Institutional project dissertation",
    eligibility: "Enrolled in 2nd year M.Sc./M.Tech programs in Systems Biology, Bioinformatics, or Life Sciences.",
    desirable: "Motivation for computational biology, R/Python programming, or molecular biology assays.",
    deadline: "Applications open semester-wise"
  }
];
