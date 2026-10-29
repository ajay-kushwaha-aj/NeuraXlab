import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Calendar,
  Briefcase,
  Flame,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Pause,
  Play,
  Bell,
  Clock,
  Activity,
  Cpu,
  Dna,
  ShieldCheck,
  CheckCircle2,
  Network,
  TrendingUp,
  PieChart,
  BarChart3,
  User,
  ZoomIn,
  ArrowUpRight,
  Compass,
  Award,
  Building2
} from 'lucide-react';
import { GutBrainSystemsCanvas } from '../components/InteractiveVisuals';
import NeuroXlabLogo from '../components/NeuroXlabLogo';
import ImageLightboxModal from '../components/ImageLightboxModal';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO, TEAM_MEMBERS, FUNDING_AGENCIES } from '../data/labData';

export default function HomeView({ setActiveTab }) {
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });
  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];
  const activeAward = FUNDING_AGENCIES.find((a) => a.categoryType === 'active_award') || FUNDING_AGENCIES[0];
  const completedProject = FUNDING_AGENCIES.find((a) => a.categoryType === 'completed_project') || FUNDING_AGENCIES[1];
  const institutionalScheme = FUNDING_AGENCIES.find((a) => a.categoryType === 'institutional_scheme') || FUNDING_AGENCIES[2];

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const navigateTo = (tabId, sectionId = null) => {
    setActiveTab(tabId);
    if (sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 6 Clearly Differentiated Research Directions of NeuroXlab
  const RESEARCH_DIRECTIONS = [
    {
      id: 'gut-brain-axis',
      num: '01',
      icon: Activity,
      title: 'Microbiota–Gut–Brain Axis in Stroke',
      description: 'Investigating bidirectional neuroimmune crosstalk, stroke-induced gut dysbiosis, mucosal barrier breakdown, and systemic endotoxemia dictating penumbral damage.',
      targetSection: 'pillar-gut-brain',
      linkText: 'Explore Gut–Brain Axis'
    },
    {
      id: 'er-stress-proteostasis',
      num: '02',
      icon: Cpu,
      title: 'ER Stress & Organelle Proteostasis',
      description: 'Decoupling unfolded protein response (UPR) sensors (PERK, IRE1α, ATF6), chaperone biology, and apoptotic cell fate decisions during ischemic injury and reperfusion.',
      targetSection: 'pillar-er-stress',
      linkText: 'Explore ER Stress Mechanisms'
    },
    {
      id: 'translational-nanomedicine',
      num: '03',
      icon: Sparkles,
      title: 'Translational Nanomedicine & Drug Delivery',
      description: 'Engineering biocompatible polymeric nanoparticles co-encapsulating short-chain fatty acids (SCFAs) and Edaravone for targeted blood-brain barrier delivery and neuroprotection.',
      targetSection: 'flagship-grant',
      linkText: 'Explore Nanomedicine Program'
    },
    {
      id: 'noncoding-rnas',
      num: '04',
      icon: Dna,
      title: 'Non-Coding RNAs & Epigenetic Networks',
      description: 'Discovering stroke-responsive long non-coding RNAs (lncRNAs), piRNAs, and microRNAs orchestrating penumbral survival, chromatin remodeling, and post-transcriptional gene regulation.',
      targetSection: 'pillar-noncoding-rna',
      linkText: 'Explore Epigenetic Networks'
    },
    {
      id: 'computational-systems-biology',
      num: '05',
      icon: Network,
      title: 'Computational Biology & Multi-Omics',
      description: 'Integrating longitudinal 16S rRNA metagenomics, GC-MS metabolomics, transcriptomics, and biological network reconstruction pipelines to identify actionable therapeutic targets.',
      targetSection: 'methodologies',
      linkText: 'Explore Multi-Omics Pipelines'
    },
    {
      id: 'neurovascular-organ-crosstalk',
      num: '06',
      icon: ShieldCheck,
      title: 'Neurovascular Unit & Brain–Organ Crosstalk',
      description: 'Preserving blood-brain barrier (BBB) integrity, modulating microglia–macrophage phenotypic polarization, and mapping systemic brain–kidney axis injury dynamics post-ischemia.',
      targetSection: 'pillar-nanomedicine',
      linkText: 'Explore Organ Crosstalk'
    }
  ];

  // News & Announcements items
  const NEWS_ITEMS = [
    {
      id: 'news-grant',
      category: 'Extramural Grant',
      badgeColor: 'bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20',
      date: 'January 2026',
      title: 'Therapeutic Potential of Nano-Formulated SCFAs and Edaravone in Stroke-Induced Gut Dysbiosis',
      summary: 'NeuroXlab awarded ₹38.5 Lakhs 3-year extramural project to engineer targeted nanoparticles and decipher gut-brain metabolic crosstalk during cerebral ischemia recovery.',
      linkText: 'Explore Grant Details',
      action: () => navigateTo('research', 'flagship-grant')
    },
    {
      id: 'news-recruitment',
      category: 'Recruitment',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-300/80',
      date: 'Academic 2026',
      title: 'Call for Junior Research Fellow (JRF / SRF) Applications',
      summary: 'Applications invited for 1 JRF position under the newly sanctioned nanotherapy project. Candidates with CSIR/UGC-NET or GATE in Life Sciences / Systems Biology are eligible.',
      linkText: 'View & Apply',
      action: () => navigateTo('contact')
    },
    {
      id: 'news-keynote',
      category: 'Invited Keynote',
      badgeColor: 'bg-[#0F2537]/10 text-[#0F2537] border border-[#0F2537]/20',
      date: 'November 2024',
      title: 'Keynote Lecture at SNCI National Conference in Kolkata',
      summary: 'Dr. Venkata Prasuja Nakka presented an invited lecture titled "Organelle Stress Crosstalk and the Gut-Brain Inflammatory Axis in Acute Stroke Neuroprotection".',
      linkText: 'View Details',
      action: () => navigateTo('activities')
    },
    {
      id: 'news-publication',
      category: 'Publication Alert',
      badgeColor: 'bg-[#C59B27]/15 text-[#977313] border border-[#C59B27]/30',
      date: '2025',
      title: 'High-Impact Review on Wnt/β-catenin Signaling in Stroke Published in Neuroscience',
      summary: 'Comprehensive paper detailing canonical and non-canonical Wnt signaling mechanisms during post-stroke neural recovery and blood-brain barrier maintenance.',
      linkText: 'Read Abstract',
      action: () => navigateTo('publications')
    }
  ];

  // Chronological list of Latest Updates for the upward continuous scrolling ticker
  const LATEST_UPDATES = [
    {
      id: 'up-1',
      date: '27-Jan-2026',
      tag: 'Grant Award',
      tagColor: 'bg-[#8B1E24]/10 text-[#8B1E24] border-[#8B1E24]/20',
      text: 'Sanction of 3-Year Flagship Extramural Grant on Nano-Formulated SCFAs & Edaravone in Stroke-Induced Gut Dysbiosis.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'research',
      linkText: 'View Grant Overview'
    },
    {
      id: 'up-2',
      date: 'Rolling 2026',
      tag: 'JRF Vacancy',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'Applications invited for Junior Research Fellow (JRF / SRF) with CSIR/UGC-NET or GATE in Life Sciences / Systems Biology.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'contact',
      linkText: 'Apply for JRF Position'
    },
    {
      id: 'up-3',
      date: 'Jan 2026',
      tag: 'Google Scholar',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: "Dr. Venkata Prasuja Nakka's Google Scholar bibliometrics updated: 1,900+ citations, h-index 12, i10-index 15.",
      hasLink: true,
      linkType: 'external',
      url: 'https://scholar.google.co.in/citations?user=mVnNpwIAAAAJ&hl=en',
      linkText: 'Google Scholar Profile'
    },
    {
      id: 'up-4',
      date: '2025',
      tag: 'Neuroscience',
      tagColor: 'bg-[#C59B27]/15 text-[#977313] border-[#C59B27]/30',
      text: 'Paper on "Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke" published.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'publications',
      linkText: 'View Paper & BibTeX'
    },
    {
      id: 'up-5',
      date: 'Sep 2025',
      tag: 'ResearchGate',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'ResearchGate profile updated with recent preprints, book chapters from Cambridge Scholars & Springer Nature.',
      hasLink: true,
      linkType: 'external',
      url: 'https://www.researchgate.net/profile/Venkata-Prasuja-Nakka',
      linkText: 'ResearchGate Profile'
    },
    {
      id: 'up-6',
      date: 'Nov 2024',
      tag: 'Invited Keynote',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'Dr. Nakka delivered an invited lecture at the Annual Conference of the Society for Neurochemistry, India (SNCI) in Kolkata.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'activities',
      linkText: 'Conference Summary'
    },
    {
      id: 'up-7',
      date: 'Sep 2024',
      tag: 'Workshop',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'Dr. Nakka convened National Workshop on Skill Development & Start-up Ecosystem in Biosciences (250+ participants).',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'activities',
      linkText: 'Workshop Details'
    },
    {
      id: 'up-8',
      date: 'Academic 2024',
      tag: 'Department',
      tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
      text: 'Laboratory operational at Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.',
      hasLink: true,
      linkType: 'external',
      url: 'https://uohyd.ac.in/systems-computational-biology/',
      linkText: 'Department Website'
    },
    {
      id: 'up-9',
      date: 'Continuous',
      tag: 'Fellowships',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'Postdoctoral Fellowships (PDF) and M.Sc. Dissertation Trainee applications accepted on semester-wise rolling basis.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'contact',
      linkText: 'Open Positions'
    }
  ];

  // Duplicate items to ensure uninterrupted, seamless upward infinite scroll
  const scrollingUpdates = [...LATEST_UPDATES, ...LATEST_UPDATES];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Lightbox Modal for enlarged scientific images & slides */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* 1. Hero Section with Live <GutBrainSystemsCanvas /> */}
      <section
        id="hero-section"
        style={{ minHeight: 'calc(100vh - var(--navbar-height, 104px))' }}
        className="relative min-h-[calc(100vh-104px)] min-h-[calc(100dvh-104px)] flex flex-col justify-between items-center overflow-hidden bg-gradient-to-b from-[#0F2537] via-[#142e44] to-[#0A1926] text-white px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27]"
      >
        {/* HTML5 Canvas Animation */}
        <GutBrainSystemsCanvas />

        {/* Ambient Dark Center Vignette to keep text zone ultra-clean & legible */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,37,55,0.85)_0%,_transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top spacer to balance vertical layout */}
        <div className="w-full h-1 sm:h-2 shrink-0" aria-hidden="true" />

        {/* Centered Main Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto py-6 sm:py-8 text-center space-y-6 sm:space-y-7 flex flex-col items-center justify-center my-auto">
          {/* Institutional Crest Shield & NeuroXlab Emblem */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-1">
            <a
              href="https://uohyd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-20 w-20 sm:h-22 sm:w-22 rounded-xl overflow-hidden border-2 border-[#C59B27] bg-white shadow-xl hover:scale-105 transition-transform duration-300 shrink-0 p-2"
              title="University of Hyderabad (Institution of Eminence)"
            >
              <img
                src={uohSeal}
                alt="University of Hyderabad Official Crest Seal"
                className="h-full w-full object-contain"
              />
            </a>

            {/* Vertical divider line */}
            <div className="h-12 sm:h-14 w-px bg-white/30 mx-1 sm:mx-1.5" aria-hidden="true" />

            {/* Official NeuroXlab Emblem */}
            <NeuroXlabLogo className="h-20 w-20 sm:h-22 sm:w-22" withFrame={true} />
          </div>

          {/* Departmental & Institutional Identity Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/40 text-xs sm:text-sm text-white/95 shadow-md">
            <span className="font-semibold text-[#E0B84C]">Department of Systems and Computational Biology</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">School of Life Sciences, University of Hyderabad</span>
          </div>

          {/* Main Editorial Hero Headings */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <h1 className="brand-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none drop-shadow-xl">
              Neuro<span className="text-[#E0B84C] drop-shadow-[0_0_25px_rgba(224,184,76,0.65)]">X</span>lab
            </h1>

            {/* Authentic Motto from Old Website */}
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#E0B84C]/95 font-medium tracking-wide drop-shadow-sm">
              "{LAB_INFO.motto}"
            </p>

            <p className="text-sm sm:text-base lg:text-[17px] text-white/85 max-w-[780px] mx-auto font-sans font-normal leading-[1.6]">
              Investigating the microbiota-gut-brain axis, organellar ER stress, post-stroke epigenetics, and nano-formulated therapeutics for ischemic cerebral recovery.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigateTo('research')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 shadow-lg hover:shadow-xl transition-all active:scale-95 group cursor-pointer min-h-[44px]"
            >
              <span>Explore Our Research</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27] cursor-pointer min-h-[44px]"
            >
              <Users className="w-4 h-4 text-[#C59B27]" />
              <span>Meet the Team</span>
            </button>

            <button
              onClick={() => navigateTo('publications')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white/80 hover:text-[#E0B84C] transition-colors group cursor-pointer min-h-[44px]"
            >
              <span>Publications</span>
              <ArrowUpRight className="w-4 h-4 text-[#C59B27] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Down Prompt */}
        <div className="relative z-10 pb-4 sm:pb-6 pt-1 shrink-0">
          <button
            onClick={() => {
              const elem = document.getElementById('group-photo-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-white/60 hover:text-[#E0B84C] transition-colors focus:outline-none group cursor-pointer p-2 min-h-[44px]"
            aria-label="Scroll to group photo section"
          >
            <span className="text-xs uppercase font-mono tracking-widest text-[#E0B84C] mb-1 font-semibold">
              Explore Lab &amp; Research
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#E0B84C]" />
          </button>
        </div>
      </section>

      {/* 2. Large Image Section of Group Photo */}
      <section
        id="group-photo-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl group bg-[#0F2537]">
          {/* Main Large Group Photograph - 16:9 Ratio Preserved */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer">
            <img
              src="/images/group_photo.jpg"
              alt="NeuroXlab Research Group - Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad"
              className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay - disappears smoothly on hover to reveal full photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out" />

            {/* Top Institutional Badge Overlay - disappears on hover */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1E24]/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-[#C59B27]/50 shadow-lg">
                <Users className="w-3.5 h-3.5 text-[#E0B84C]" />
                NeuroXlab Research Team
              </span>
            </div>

            {/* Bottom Glassmorphic Caption Bar - disappears smoothly on hover to reveal full photo */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E0B84C]">
                  <span>EST. 2024</span>
                  <span>•</span>
                  <span>DR. VENKATA PRASUJA NAKKA LABORATORY</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Systems &amp; Translational Neuroscience Group
                </h3>
                <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed">
                  Principal investigator, postdoctoral scholars, doctoral fellows, and project dissertation trainees at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Research Area / About NeuroX Lab & Golgi-Cox Stained Neuron (Authentic Old Website Section) */}
      <section
        id="about-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Standardized Section Heading: Research Area */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Scientific Foundation</span>
            </div>
            <button
              onClick={() => navigateTo('research')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Research Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Research Area
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Deciphering ischemic neurovascular injury, organelle stress cascades, and gut–brain crosstalk to uncover therapeutic targets.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Scientific Architecture & Disease Visual Stage */}
            <div className="flex flex-col justify-between bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs h-full">
              {/* Top Sub-Header: aligns with right side header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24] uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Scientific Architecture</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                  High-Res Schematic
                </span>
              </div>

              {/* Main Image Stage */}
              <div className="my-4 flex-1 flex flex-col justify-center">
                <div
                  onClick={() =>
                    openLightbox(
                      '/images/neurobiology_stroke_disease.jpg',
                      'Neurovascular Dynamics & Cellular Stress in Stroke',
                      'High-resolution scientific visualization illustrating ischemic neurovascular crosstalk, neuronal stress signaling, synaptic architecture, and neuroinflammatory microglia-macrophage dynamics.'
                    )
                  }
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border-2 border-[#C59B27]/40 shadow-md bg-slate-900 group cursor-pointer"
                  title="Click to enlarge scientific visual"
                >
                  <img
                    src="/images/neurobiology_stroke_disease.jpg"
                    alt="Neurovascular crosstalk, cellular stress signaling, and microglia–macrophage dynamics in stroke neurobiology"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F2537]/90 text-white text-xs font-semibold backdrop-blur-md border border-[#C59B27]/40 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5 text-[#E0B84C]" />
                      Enlarge Visual
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Caption & Model Highlights */}
              <div className="space-y-3 pt-3 border-t border-slate-200/80">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
                  <strong className="text-[#0F2537] font-semibold">Figure: </strong>
                  Neurovascular crosstalk, cellular stress signaling cascades, and microglia–macrophage phenotypic dynamics in ischemic stroke neurobiology.
                </p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/70">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Model Systems</span>
                    <span className="text-xs font-bold text-[#0F2537]">Preclinical MCAO</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/70">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Core Focus</span>
                    <span className="text-xs font-bold text-[#8B1E24]">Neuroprotection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Text & Core Research Pillars */}
            <div className="flex flex-col justify-between space-y-6 text-[#0F2537] h-full">
              <div className="space-y-4">
                {/* Top Sub-Header: aligns with left side header */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Mission &amp; Overview</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                    Dr. Nakka Laboratory
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2537] leading-tight">
                  Understanding the Neurobiology of Disease &amp; Stroke
                </h3>

                <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#8B1E24] font-semibold">NeuroX Lab</strong> investigates the molecular and cellular mechanisms underlying stroke and related neurological disorders, with a focus on oxidative stress, neuroinflammation, cellular stress signaling, and microglia–macrophage dynamics.
                  </p>

                  <p>
                    Integrating experimental stroke models with computational biology, multi-omics, and metagenomic approaches, we explore gut–brain interactions and brain–organ crosstalk to uncover mechanisms of ischemic brain injury and identify new opportunities for therapeutic intervention.
                  </p>

                  <p>
                    Our research bridges molecular neuroscience and translational nanomedicine to advance targeted drug delivery, neuroprotection, and innovative therapeutic strategies for stroke.
                  </p>
                </div>
              </div>

              {/* Quick scientific focus pills in a structured 2x2 grid */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Thrust Areas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                    <span className="truncate">Stroke &amp; Neuroinflammation</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                    <span className="truncate">Gut–Brain Axis &amp; Multi-Omics</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                    <span className="truncate">Nanomedicine &amp; Drug Delivery</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                    <span className="truncate">Neuroprotection &amp; Translation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Research Directions - Consolidated 6 Core Scientific Themes */}
      <section
        id="research-directions-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Section Header with Category Pill & Lead Scientific Rationale */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Investigative Portfolio</span>
            </div>
            <button
              onClick={() => navigateTo('research')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Research Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Research Directions
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Our research integrates experimental neuroscience with complementary computational approaches and engineered nanoformulations to advance therapeutics for stroke and CNS disorders.
            </p>
          </div>
        </div>

        {/* 6 Clearly Differentiated Research Direction Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {RESEARCH_DIRECTIONS.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.id}
                onClick={() => navigateTo('research', theme.targetSection)}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 cursor-pointer min-h-[260px]"
              >
                {/* Top subtle hover accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8B1E24] via-[#C59B27] to-[#8B1E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  {/* Icon & Theme Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white group-hover:border-[#8B1E24] flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#C59B27] transition-colors tracking-widest">
                      {theme.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {theme.title}
                  </h3>

                  {/* Scientific Explanation - Un-clamped, comfortable readable font scale */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {theme.description}
                  </p>
                </div>

                {/* Link to Further Details */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] group-hover:text-[#A82931] transition-colors">
                    <span>{theme.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Dossier Pillar
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Research Funding & Support - Separated Active, Completed & Institutional Schemes */}
      <section
        id="research-funding-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Section Header */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Grants &amp; Institutional Support</span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
              Apex National Sponsoring Bodies
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="shrink-0">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F2537] tracking-tight whitespace-nowrap">
                Research Funding &amp; Support
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Competitive extramural research awards, completed scientific investigations, and national faculty infrastructure schemes backing NeuroXlab investigations.
            </p>
          </div>
        </div>

        {/* Category 1: Active Extramural Award (Featured Card) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Active Extramural Research Award (2026–2029)
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#C59B27] to-emerald-600" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Agency Logo Stage & Core Metadata */}
              <div className="lg:col-span-4 space-y-4">
                <a
                  href={activeAward.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-28 sm:h-32 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-4 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/70 hover:shadow-md transition-all duration-300 group/logo cursor-pointer block"
                  title={`Visit ${activeAward.fullName} Official Website`}
                >
                  <img
                    src={activeAward.logo}
                    alt={activeAward.fullName}
                    className="max-h-20 sm:max-h-24 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                  />
                </a>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#0F2537]">
                    {activeAward.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {activeAward.ministry}
                  </p>
                </div>

                {/* Key Metrics: Amount & Period */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold block">
                      Grant Outlay
                    </span>
                    <span className="text-sm font-bold text-emerald-950 font-sans">
                      ₹38.5 Lakhs
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                      Period
                    </span>
                    <span className="text-xs font-bold text-[#0F2537] font-mono">
                      2026 – 2029
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 pt-1 font-mono">
                  {activeAward.role}
                </div>
              </div>

              {/* Right Column: Project Title & Specific Objectives */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-0.5 rounded">
                    Extramural Project Title
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] mt-2 leading-snug">
                    "{activeAward.projectTitle}"
                  </h4>
                </div>

                {/* Specific Project Objectives Checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8B1E24]" />
                    <span>Project Specific Objectives &amp; Work Packages:</span>
                  </span>
                  <ul className="space-y-2">
                    {activeAward.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('research', activeAward.dossierTarget)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow transition-colors cursor-pointer"
                  >
                    <span>{activeAward.dossierLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={activeAward.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#8B1E24] transition-colors"
                  >
                    <span>Visit ICMR Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 2 & 3: Completed Projects and Institutional Schemes in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {/* Card 1: Completed Extramural Project (ANRF / SERB) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-slate-400 via-[#C59B27] to-slate-400" />

            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Completed Extramural Project
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {completedProject.scheme}
                </span>
              </div>

              {/* Logo Stage */}
              <a
                href={completedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-24 sm:h-28 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-3.5 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/60 hover:shadow-sm transition-all duration-300 group/logo cursor-pointer block"
                title={`Visit ${completedProject.fullName} Official Website`}
              >
                <img
                  src={completedProject.logo}
                  alt={completedProject.fullName}
                  className="max-h-16 sm:max-h-20 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                />
              </a>

              {/* Agency & Ministry */}
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  {completedProject.fullName}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {completedProject.ministry}
                </p>
              </div>

              {/* Project Title */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Project Title
                </span>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#0F2537] leading-snug">
                  "{completedProject.projectTitle}"
                </h5>
              </div>

              {/* Specific Outcomes & Objectives */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Scientific Outcomes &amp; Scope:
                </span>
                <ul className="space-y-2">
                  {completedProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigateTo('research', completedProject.dossierTarget)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] transition-colors cursor-pointer"
              >
                <span>{completedProject.dossierLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={completedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#8B1E24] transition-colors"
              >
                <span>ANRF Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Institutional Support & National Faculty Schemes (UGC) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-[#C59B27] to-amber-600" />

            <div className="space-y-4">
              {/* Header Badge with Explicit Clarification */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  Institutional Support &amp; Faculty Schemes
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  Tenured Appointment
                </span>
              </div>

              {/* Logo Stage */}
              <a
                href={institutionalScheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-24 sm:h-28 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-3.5 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/60 hover:shadow-sm transition-all duration-300 group/logo cursor-pointer block"
                title={`Visit ${institutionalScheme.fullName} Official Website`}
              >
                <img
                  src={institutionalScheme.logo}
                  alt={institutionalScheme.fullName}
                  className="max-h-16 sm:max-h-20 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                />
              </a>

              {/* Agency & Ministry */}
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  {institutionalScheme.fullName}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {institutionalScheme.ministry}
                </p>
              </div>

              {/* Explicit Verification Callout Note */}
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed font-sans">
                <strong className="font-bold block text-amber-950 mb-0.5">Institutional Scheme Scope:</strong>
                {institutionalScheme.clarificationNotice}
              </div>

              {/* 2 Supported Schemes Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sanctioned Institutional Schemes:
                </span>
                <div className="space-y-2">
                  {institutionalScheme.schemesList.map((sch, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
                      <h6 className="text-xs font-bold text-[#0F2537]">
                        {sch.name}
                      </h6>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sch.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigateTo('activities')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] transition-colors cursor-pointer"
              >
                <span>{institutionalScheme.dossierLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={institutionalScheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#8B1E24] transition-colors"
              >
                <span>UGC Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. News & Announcements - Subtle & Refined Editorial Dispatch Strip */}
      <section
        id="news-announcements-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Dispatches &amp; Milestones</span>
            </div>
            <button
              onClick={() => navigateTo('activities')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Activities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                News &amp; Announcements
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Key extramural grant developments, recent publications, and academic positions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C59B27]" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug line-clamp-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={item.action}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1E24] group-hover:text-[#A82931] transition-colors cursor-pointer py-1"
                >
                  <span>{item.linkText}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Updates (Upward Scrolling Points with Pause-on-Hover & Links) */}
      <section
        id="latest-updates-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Bulletin Board</span>
            </div>

            {/* Interactive pause/resume button */}
            <button
              onClick={() => setIsTickerPaused(!isTickerPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#8B1E24] text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer min-h-[38px]"
              title={isTickerPaused ? 'Resume live scrolling' : 'Pause scrolling'}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Resume Live Feed</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#8B1E24] fill-[#8B1E24]" />
                  <span>Pause Feed</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Latest Updates
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Chronological feed of grant approvals, research publications, invited talks, and fellowship notifications.
            </p>
          </div>
        </div>

        {/* Upward Scrolling Points Ticker Container */}
        <div
          className="relative bg-white rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-6 overflow-hidden ticker-wrapper"
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
        >
          {/* Top Fading Mask Overlay */}
          <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Fixed-height scrollable window */}
          <div className="h-[440px] overflow-hidden relative">
            <div
              className="animate-scroll-up space-y-4"
              style={{
                animationPlayState: isTickerPaused ? 'paused' : 'running'
              }}
            >
              {scrollingUpdates.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-[#C59B27] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Date and Category Tag Badge */}
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
                      <span className="text-[11px] font-mono font-bold text-slate-500 whitespace-nowrap">
                        {item.date}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Point description */}
                    <p className="text-sm font-medium text-[#0F2537] leading-snug group-hover/item:text-[#8B1E24] transition-colors">
                      {item.text}
                    </p>
                  </div>

                  {/* Optional Interactive Link */}
                  {item.hasLink && (
                    <div className="shrink-0 self-end sm:self-center pl-2">
                      {item.linkType === 'external' ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] hover:text-white bg-[#8B1E24]/10 hover:bg-[#8B1E24] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{item.linkText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <button
                          onClick={() => navigateTo(item.linkTarget)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] hover:text-white bg-[#8B1E24]/10 hover:bg-[#8B1E24] transition-colors cursor-pointer"
                        >
                          <span>{item.linkText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Fading Mask Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}

