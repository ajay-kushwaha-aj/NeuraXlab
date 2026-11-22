import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles,
  Building2,
  Dna,
  ShieldCheck,
  Calendar,
  MapPin,
  Award,
  Filter,
  Users,
  Microscope,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import ImageLightboxModal from '../components/ImageLightboxModal';

// Dedicated Laboratory Facilities & Infrastructure Suites
const galleryFacilities = [
  {
    id: 'fac-surgery',
    title: 'Preclinical Stroke & TBI Microsurgery Suite',
    room: 'Room F75C, School of Life Sciences',
    badge: 'In Vivo Surgical Core',
    specifications: [
      'Stereotaxic surgical frame with digital micro-manipulators for precision cerebral targeting',
      'Laser Doppler Flowmetry (moorVMS-LDF) for real-time cortical blood flow monitoring',
      'Temperature-regulated homeothermic rodent heating pads with continuous rectal telemetry feedback',
      'Intraluminal monofilament suture MCAO workstation equipped with binocular surgical microscope',
      'Standardized neurobehavioral testing batteries: Computerized Rotarod, mNSS, and elevated body swing test'
    ],
    image: '/images/preclinical_microsurgery_suite.jpg'
  },
  {
    id: 'fac-nano',
    title: 'Nano-Formulation & UPR/Proteostasis Core',
    room: 'Room F75C, School of Life Sciences',
    badge: 'Nanomedicine & Biochemistry',
    specifications: [
      'Malvern Zetasizer Nano ZS for Dynamic Light Scattering (DLS) & Zeta Potential profiling',
      'High-intensity ultrasonic probe sonicator for polymeric nanoparticle encapsulation & homogenization',
      'ChemiDoc MP Multi-channel Western Blot Imaging suite for UPR phospho-proteins and organelle markers',
      'Preparative ultracentrifuges for microsomal organelle fractionation and purity verification',
      'Real-time quantitative RT-qPCR thermal cyclers (CFX96) for lncRNA/piRNA expression profiling'
    ],
    image: '/images/nanotherapy_gut_brain.jpg'
  },
  {
    id: 'fac-computational',
    title: 'Computational Systems Biology Cluster',
    room: 'Dept. of Systems & Computational Biology, SLS',
    badge: 'Metagenomics & High-Performance Computing',
    specifications: [
      'High-memory multi-core compute nodes configured with Ubuntu Linux & Slurm workload manager',
      'QIIME2 / dada2 bioinformatics pipelines for longitudinal 16S rRNA microbiome taxonomy',
      'Transcriptome differential gene expression workflows (DESeq2, edgeR, Salmon)',
      'Molecular dynamics (GROMACS) & protein-ligand docking suites (AutoDock Vina)',
      'Systems network reconstruction tools (Cytoscape, STRING, Bioconductor packages)'
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-golgi',
    title: 'Neuronal Dendritic Architecture & Golgi-Cox Histology',
    room: 'Histopathology & Confocal Core, School of Life Sciences',
    badge: 'Neurohistology Archive',
    specifications: [
      'Authentic Golgi–Cox stained pyramidal neuron preparations demonstrating dendritic arborization',
      'Dendritic spine density quantification and penumbral synaptic plasticity evaluation',
      'Validation of neuronal cytoskeletal integrity post-transient middle cerebral artery occlusion (MCAO)',
      'Correlative histomorphometry following neuroprotective nanotherapy administration',
      'Fluorescence and brightfield high-resolution digital slide scanning'
    ],
    image: '/images/golgi_cox_neuron.png'
  },
  {
    id: 'fac-imaging',
    title: 'Advanced Confocal Laser Scanning & Live-Cell Imaging Suite',
    room: 'Central Instrumentation Core, School of Life Sciences',
    badge: 'Advanced Bio-Imaging',
    specifications: [
      'Multi-laser confocal scanning microscope configured for 4-channel spectral immunofluorescence',
      'Deep penumbral imaging of NeuN, GFAP, Iba1 microglia, and tight junction proteins (Claudin-5, ZO-1)',
      'In vitro oxygen-glucose deprivation (OGD/R) live-cell calcium flux and mitochondrial ROS probes',
      'Super-resolution 3D deconvolution for blood-brain barrier microvascular junction profiling',
      'Automated multi-tile montage imaging for entire hemispheric infarct volume assessment'
    ],
    image: '/images/confocal_microscopy_suite.jpg'
  },
  {
    id: 'fac-behavior',
    title: 'In Vivo Neurobehavioral & Preclinical Rehabilitation Core',
    room: 'Central Animal Facility & School of Life Sciences, UoH',
    badge: 'Behavioral & Functional Recovery',
    specifications: [
      'Automated accelerating Rotarod apparatus for sensorimotor coordination and endurance scoring',
      'Modified Neurological Deficit Score (mNSS) testing arena for focal neurological recovery',
      'Elevated body swing test (EBST) and cylinder test setups for asymmetric motor deficit evaluation',
      'Standardized SPF pathogen-free housing suites conforming to CPCSEA guidelines',
      'Longitudinal post-stroke cognitive assessment (Morris Water Maze, Novel Object Recognition)'
    ],
    image: '/images/neurobehavioral_testing_suite.jpg'
  }
];

// Scientific Events, Conferences, Symposia & Technical Workshops
const eventGalleryItems = [
  {
    id: 'event-jss-snci-2025',
    title: 'JSS-SNCI-CON 2025: International Conference on Sustainable Brain Health',
    subtitle: '39th Annual Meeting of the Society for Neurochemistry, India (SNCI)',
    filterCategory: 'Conferences & Symposia',
    badge: 'International Conference',
    badgeColor: 'bg-[#8B1E24] text-white',
    date: '17–19 November 2025',
    venue: 'JSS College of Pharmacy, JSSAHER, Mysuru, Karnataka',
    role: 'Invited Faculty & Scientific Delegate',
    summary: 'Delivered scientific insights on stroke neuroprotection, gut-brain axis interactions, and cellular stress signaling in association with IUPHAR.',
    highlight: 'Invited lecture on nano-formulated therapeutics in ischemic stroke models.',
    image: '/images/jss_snci_con_2025_clean.png',
    caption: 'JSS-SNCI-CON 2025 International Conference scientific session proceedings in Mysuru.'
  },
  {
    id: 'event-team-retreat-2025',
    title: 'NeuroXlab Research Cohort & Laboratory Annual Milestone',
    subtitle: 'School of Life Sciences, University of Hyderabad',
    filterCategory: 'Lab Life',
    badge: 'Lab Milestone',
    badgeColor: 'bg-emerald-700 text-white',
    date: 'Academic Session 2025–2026',
    venue: 'School of Life Sciences, UoH Campus, Hyderabad',
    role: 'Research Cohort & Fellows',
    summary: 'Annual research milestone session welcoming doctoral scholars, extramural project fellows, and postgraduate dissertation trainees.',
    highlight: 'Celebrating the 2026–2029 Nano-SCFA & Edaravone extramural grant activation.',
    image: '/images/group_photo.jpg',
    caption: 'NeuroXlab research group members at the School of Life Sciences, University of Hyderabad.'
  },
  {
    id: 'event-snci-kolkata-2024',
    title: 'Annual Conference of the Society for Neurochemistry, India (SNCI)',
    subtitle: 'National Neurochemistry Leadership Assembly',
    filterCategory: 'Conferences & Symposia',
    badge: 'Keynote Address',
    badgeColor: 'bg-[#0F2537] text-white',
    date: 'November 2024',
    venue: 'Science City Convention Auditorium, Kolkata, India',
    role: 'Invited Keynote Speaker',
    summary: 'Delivered an invited scientific lecture titled: "Organelle Stress Crosstalk and the Gut-Brain Inflammatory Axis in Acute Stroke Neuroprotection".',
    highlight: 'Chaired the thematic scientific session on Neurodegeneration and Organellar Stress.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    caption: 'Keynote address delivered at the Society for Neurochemistry Annual Meeting in Kolkata.'
  },
  {
    id: 'event-skill-dev-anu-2024',
    title: 'National Workshop on Skill Development & Start-up Ecosystem in Biosciences',
    subtitle: 'Hands-on Preclinical Assay Validation & Bio-Incubation',
    filterCategory: 'Workshops & Training',
    badge: 'National Workshop',
    badgeColor: 'bg-[#977313] text-white',
    date: '18–20 September 2024',
    venue: 'Acharya Nagarjuna University (ANU College of Sciences)',
    role: 'Convener & Lead Organizer',
    summary: 'Three-day national workshop bringing together 250+ researchers, bio-entrepreneurs, and trainees exploring preclinical translational models and IP.',
    highlight: 'Conducted live hands-on modules on small animal stroke stereotaxic microsurgery.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    caption: 'Skill development workshop participants and hands-on laboratory modules at ANU.'
  },
  {
    id: 'event-diabetes-symposium-2023',
    title: 'National Symposium on Metabolic Disorders, Diabetes & Neurological Complications',
    subtitle: 'Interdisciplinary Cerebrovascular Nexus',
    filterCategory: 'Conferences & Symposia',
    badge: 'Scientific Chair',
    badgeColor: 'bg-[#0F2537] text-white',
    date: '12–13 December 2023',
    venue: 'School of Life Sciences, University of Hyderabad',
    role: 'Co-Convener & Scientific Chair',
    summary: 'Explored the pathophysiological nexus between systemic metabolic syndromes, diabetes, insulin resistance, and accelerated cerebrovascular disorders.',
    highlight: 'Special track on gut microbiota shifts in diabetic stroke susceptibility.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    caption: 'Scientific symposium assembly at the School of Life Sciences, University of Hyderabad.'
  },
  {
    id: 'event-microsurgery-training-2025',
    title: 'Preclinical Stereotaxic Microsurgery & Doppler Flowmetry Training Core',
    subtitle: 'In Vivo Surgical Certification for Researchers',
    filterCategory: 'Workshops & Training',
    badge: 'Technical Workshop',
    badgeColor: 'bg-[#8B1E24] text-white',
    date: 'Spring Session 2025',
    venue: 'Room F75C Microsurgery Core, SLS, UoH',
    role: 'Lead Surgical Instructor',
    summary: 'Intensive hands-on technical training for doctoral scholars on stereotaxic cerebral targeting, cortical Laser Doppler monitoring, and MCAO intraluminal occlusion.',
    highlight: 'Certified 12 postgraduate trainees in standardized small animal aseptic microsurgery.',
    image: '/images/preclinical_microsurgery_suite.jpg',
    caption: 'Hands-on preclinical stereotaxy and laser Doppler flowmetry training workstation, Room F75C.'
  },
  {
    id: 'event-sfn-san-diego',
    title: 'Society for Neuroscience (SfN) Annual Global Meeting',
    subtitle: 'International Stroke Neurobiology Exposition',
    filterCategory: 'Conferences & Symposia',
    badge: 'Global Conference',
    badgeColor: 'bg-indigo-900 text-white',
    date: 'SfN Global Conference',
    venue: 'San Diego Convention Center, California, USA',
    role: 'International Presenter',
    summary: 'Presented collaborative research on post-stroke protein ISGylation, cellular stress response pathways, and non-coding RNA regulation.',
    highlight: 'Scientific exchange with stroke biologists from NIH, Max Planck, and Wisconsin-Madison.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
    caption: 'Scientific poster session and delegate interaction at the Society for Neuroscience Convention.'
  },
  {
    id: 'event-nehu-shillong-2023',
    title: 'Invited Lecture at North-Eastern Hill University (NEHU)',
    subtitle: 'Department of Biochemistry Academic Colloquium',
    filterCategory: 'Invited Talks',
    badge: 'Invited Lecture',
    badgeColor: 'bg-[#0F2537] text-white',
    date: 'May 2023',
    venue: 'Dept. of Biochemistry, NEHU, Shillong, Meghalaya',
    role: 'Invited Guest Speaker',
    summary: 'Academic lecture on "Non-coding RNAs: Master Epigenetic Orchestrators of Neuronal Survival and Brain Plasticity Following Ischemia".',
    highlight: 'Conducted specialized tutorial for postgraduate scholars on lncRNA bioinformatics.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    caption: 'Invited scientific colloquium on stroke epigenetics at NEHU, Shillong.'
  }
];

export default function ActivitiesPage() {
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const eventCategories = ['All', 'Conferences & Symposia', 'Workshops & Training', 'Invited Talks', 'Lab Life'];

  const filteredEvents = selectedCategory === 'All'
    ? eventGalleryItems
    : eventGalleryItems.filter(item => item.filterCategory === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 space-y-16">
      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <Camera className="w-3.5 h-3.5 text-slate-500" />
          <span>NeuroXlab activities &amp; gallery</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
          Facilities &amp; Event Gallery
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore the experimental suites, surgical workstations, scientific conferences, national workshops, and academic symposia powering research and academic engagement at the University of Hyderabad.
        </p>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F2537] hover:bg-[#8B1E24] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Microscope className="w-3.5 h-3.5 text-white" />
            <span>Laboratory facilities core</span>
          </a>
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Scientific events &amp; symposia</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: FACILITIES & INFRASTRUCTURE CORE
          ========================================================================= */}
      <section id="gallery" className="space-y-8 animate-in fade-in duration-300 scroll-mt-24">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-medium text-slate-600 block">
              Experimental infrastructure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Laboratory Facilities &amp; Technical Specifications
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Room F75C, School of Life Sciences, University of Hyderabad.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono self-start sm:self-auto border border-slate-200">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>School of Life Sciences</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {galleryFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-95"
                    onError={(e) => {
                      e.target.src = '/images/golgi_cox_neuron.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <span className="absolute top-3.5 left-3.5 text-[11px] font-mono font-medium bg-[#8B1E24] text-white px-2.5 py-0.5 rounded shadow-xs">
                    {fac.badge}
                  </span>
                  <button
                    onClick={() =>
                      openLightbox(
                        fac.image,
                        fac.title,
                        `${fac.room} • Technical Specifications Core Facility at NeuroXlab.`
                      )
                    }
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 text-white hover:bg-[#8B1E24] transition-colors cursor-pointer"
                    title="Enlarge facility photograph"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-xs font-mono text-slate-200 font-medium">{fac.room}</span>
                  </div>
                </div>

                {/* Specifications Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {fac.title}
                  </h3>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono font-medium text-slate-500 block">
                      Core instrument configurations &amp; capabilities:
                    </span>
                    <ul className="space-y-2">
                      {fac.specifications.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#8B1E24] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>NeuroXlab Core Instrumentation</span>
                <span className="text-[#8B1E24] font-medium">Room F75C · School of Life Sciences</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SCIENTIFIC EVENTS, CONFERENCES & SYMPOSIA GALLERY
          ========================================================================= */}
      <section id="events" className="space-y-8 pt-6 animate-in fade-in duration-300 scroll-mt-24">
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Academic outreach &amp; symposia
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-1">
                Scientific Events &amp; Conference Gallery
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                A visual showcase of national and international conferences, hands-on workshops, keynote lectures, and research milestones led by NeuroXlab investigators.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 tabular-nums">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} displayed
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Filter:
            </span>
            {eventCategories.map((cat) => {
              const count = cat === 'All' 
                ? eventGalleryItems.length 
                : eventGalleryItems.filter(e => e.filterCategory === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#8B1E24] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono tabular-nums ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Event Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-95"
                    onError={(e) => {
                      e.target.src = '/images/jss_snci_con_2025_clean.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded shadow-xs ${evt.badgeColor}`}>
                    {evt.badge}
                  </span>

                  {/* Lightbox Trigger Button */}
                  <button
                    onClick={() => openLightbox(evt.image, evt.title, `${evt.venue} (${evt.date}) • ${evt.summary}`)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-[#8B1E24] transition-colors cursor-pointer"
                    title="Enlarge event photograph"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Date Badge at Bottom Left */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white text-xs font-mono font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-300" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug group-hover:text-[#8B1E24] transition-colors line-clamp-2">
                      {evt.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#8B1E24] mt-1 line-clamp-1">
                      {evt.subtitle}
                    </p>
                  </div>

                  {/* Venue & Role Metadata */}
                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8B1E24] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-semibold text-slate-900">{evt.role}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                    {evt.summary}
                  </p>

                  {/* Key Highlight */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 line-clamp-2">{evt.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs font-mono flex items-center justify-between text-slate-500">
                <span className="text-[11px]">{evt.filterCategory}</span>
                <button
                  type="button"
                  onClick={() => openLightbox(evt.image, evt.title, `${evt.venue} (${evt.date}) • ${evt.summary}`)}
                  className="font-medium text-xs text-[#8B1E24] hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Enlarge photo</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
