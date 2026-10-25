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
  Network,
  TrendingUp,
  PieChart,
  BarChart3,
  User,
  Monitor
} from 'lucide-react';
import NeuralCanvas from '../components/NeuralCanvas';
import NeuroXlabLogo from '../components/NeuroXlabLogo';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO, TEAM_MEMBERS } from '../data/labData';

export default function HomeView({ setActiveTab }) {
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];

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

  // 6 Core Research Thrusts of NeuroXlab
  const RESEARCH_AREAS = [
    {
      id: 'gut-brain-axis',
      icon: Activity,
      title: 'Microbiota–Gut–Brain Axis in Stroke',
      description: 'Investigating bidirectional neuroimmune crosstalk, stroke-induced gut dysbiosis, mucosal barrier breakdown, and systemic endotoxemia.',
      targetSection: 'pillar-gut-brain'
    },
    {
      id: 'er-stress-proteostasis',
      icon: Cpu,
      title: 'ER Stress & Organelle Proteostasis',
      description: 'Decoupling unfolded protein response (UPR) pathways (PERK, IRE1α, ATF6), chaperone biology, and apoptotic cell fate decisions.',
      targetSection: 'pillar-er-stress'
    },
    {
      id: 'translational-nanomedicine',
      icon: Sparkles,
      title: 'Translational Nanomedicine & Drug Delivery',
      description: 'Engineering polymeric nanoparticles co-encapsulating short-chain fatty acids (SCFAs) and Edaravone for targeted cerebral recovery.',
      targetSection: 'flagship-grant'
    },
    {
      id: 'noncoding-rnas',
      icon: Dna,
      title: 'Non-Coding RNAs & Epigenetic Networks',
      description: 'Discovering stroke-responsive long non-coding RNAs (lncRNAs), piRNAs, and microRNAs governing DNA methylation and penumbral survival.',
      targetSection: 'pillar-noncoding-rna'
    },
    {
      id: 'computational-systems-biology',
      icon: Network,
      title: 'Computational Systems & Multi-Omics',
      description: 'Integrating 16S metagenomics, GC-MS metabolomics, transcriptomics, and biological networks to identify novel therapeutic targets.',
      targetSection: 'pillars'
    },
    {
      id: 'neurovascular-organ-crosstalk',
      icon: ShieldCheck,
      title: 'Neurovascular Unit & Multi-Organ Crosstalk',
      description: 'Preserving blood-brain barrier (BBB) integrity, suppressing pro-inflammatory microglia, and mapping systemic brain-kidney axis crosstalk.',
      targetSection: 'pillar-nanomedicine'
    }
  ];

  // News & Announcements items
  const NEWS_ITEMS = [
    {
      id: 'news-grant',
      category: 'Extramural Grant',
      badgeColor: 'bg-[#8B1E24] text-white',
      date: 'January 2026',
      title: 'Therapeutic Potential of Nano-Formulated SCFAs and Edaravone in Stroke-Induced Gut Dysbiosis',
      summary: 'NeuroXlab awarded ₹38.5 Lakhs 3-year extramural project to engineer targeted nanoparticles and decipher gut-brain metabolic crosstalk during cerebral ischemia recovery.',
      linkText: 'Explore 2026–2029 Grant Details',
      action: () => navigateTo('research', 'flagship-grant')
    },
    {
      id: 'news-recruitment',
      category: 'Recruitment',
      badgeColor: 'bg-[#C59B27] text-[#0F2537]',
      date: 'Academic 2026',
      title: 'Call for Junior Research Fellow (JRF / SRF) Applications',
      summary: 'Applications invited for 1 JRF position under the newly sanctioned nanotherapy project. Candidates with CSIR/UGC-NET or GATE in Life Sciences / Systems Biology are eligible.',
      linkText: 'View Eligibility & Apply',
      action: () => navigateTo('contact')
    },
    {
      id: 'news-keynote',
      category: 'Invited Keynote',
      badgeColor: 'bg-[#0F2537] text-white',
      date: 'November 2024',
      title: 'Keynote Lecture at SNCI National Conference in Kolkata',
      summary: 'Dr. Venkata Prasuja Nakka presented an invited lecture titled "Organelle Stress Crosstalk and the Gut-Brain Inflammatory Axis in Acute Stroke Neuroprotection".',
      linkText: 'View Conference Gallery',
      action: () => navigateTo('activities')
    },
    {
      id: 'news-publication',
      category: 'Publication Alert',
      badgeColor: 'bg-emerald-700 text-white',
      date: '2025',
      title: 'High-Impact Review on Wnt/β-catenin Signaling in Stroke Published in Neuroscience',
      summary: 'Comprehensive paper detailing canonical and non-canonical Wnt signaling mechanisms during post-stroke neural recovery and blood-brain barrier maintenance.',
      linkText: 'Read Abstract & BibTeX',
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
      tagColor: 'bg-[#C59B27]/15 text-[#977313] border-[#C59B27]/30',
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
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
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
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
      tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
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
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
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
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
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
      tagColor: 'bg-slate-100 text-slate-800 border-slate-200',
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
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      text: 'Postdoctoral Fellowships (PDF) and M.Sc. Dissertation Trainee applications accepted on semester-wise rolling basis.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'contact',
      linkText: 'Open Positions'
    }
  ];

  const scrollingUpdates = [...LATEST_UPDATES, ...LATEST_UPDATES];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* 1. Hero Section with Live Neural Canvas */}
      <section
        id="hero-section"
        style={{ minHeight: 'calc(100vh - var(--navbar-height, 104px))' }}
        className="relative min-h-[calc(100vh-104px)] min-h-[calc(100dvh-104px)] flex flex-col justify-between items-center overflow-hidden bg-gradient-to-b from-[#0F2537] via-[#142e44] to-[#0A1926] text-white px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27]"
      >
        <NeuralCanvas />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,37,55,0.85)_0%,_transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/80 via-transparent to-black/30 pointer-events-none" />

        <div className="w-full h-1 sm:h-2 shrink-0" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-6xl mx-auto py-4 sm:py-6 text-center space-y-5 sm:space-y-6 flex flex-col items-center justify-center my-auto">
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
                alt="University of Hyderabad"
                className="h-full w-full object-contain"
              />
            </a>

            <div className="h-12 sm:h-14 w-px bg-white/30 mx-1 sm:mx-1.5" aria-hidden="true" />

            <NeuroXlabLogo className="h-20 w-20 sm:h-22 sm:w-22" withFrame={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/40 text-xs sm:text-sm text-white/95 shadow-md">
            <span className="font-semibold text-[#E0B84C]">Department of Systems and Computational Biology</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">School of Life Sciences, University of Hyderabad</span>
          </div>

          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <h1 className="brand-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none drop-shadow-xl">
              Neuro<span className="text-[#E0B84C] drop-shadow-[0_0_25px_rgba(224,184,76,0.65)]">X</span>lab
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
              Investigating the microbiota-gut-brain axis, organellar ER stress, post-stroke epigenetics, and nano-formulated therapeutics for ischemic cerebral recovery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigateTo('research', 'flagship-grant')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 shadow-lg hover:shadow-xl transition-all active:scale-95 group"
            >
              <span>Explore 2026–2029 Grant</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <Users className="w-4 h-4 text-[#C59B27]" />
              <span>Meet the Team</span>
            </button>

            <button
              onClick={() => navigateTo('publications')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <BookOpen className="w-4 h-4 text-[#C59B27]" />
              <span>Publications &amp; BibTeX</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 pb-4 sm:pb-6 pt-1 shrink-0">
          <button
            onClick={() => {
              const elem = document.getElementById('group-photo-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-white/60 hover:text-[#E0B84C] transition-colors focus:outline-none group cursor-pointer"
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
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
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

      {/* 3. Research Areas (Matching User Diagram) */}
      <section
        id="research-areas-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0F2537]">
            RESEARCH AREAS
          </h2>
          <div className="w-16 h-1 bg-[#8B1E24] mx-auto rounded-full" />
        </div>

        <div className="bg-[#FAF8F5] sm:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#C59B27]/30 sm:border-slate-200/90 shadow-sm max-w-5xl mx-auto">
          <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#0F2537]/90 leading-relaxed text-justify sm:text-center">
            At NeuroXlab (Dr. Venkata Prasuja Nakka Laboratory), our research is dedicated to deciphering the systems biology, neurovascular pathophysiology, and organellar stress mechanisms of ischemic cerebral injury, with an emphasis on the bidirectional microbiota–gut–brain axis and translational nanomedicine. Situated within the Department of Systems and Computational Biology at the University of Hyderabad, we bridge computational network biology, multi-omics data integration (16S rRNA metagenomics, transcriptomics, metabolomics), and advanced in vivo preclinical models. We investigate how acute stroke triggers gut dysbiosis, compromises mucosal barriers, and amplifies neuroinflammation; resolve endoplasmic reticulum (ER) stress and non-coding RNA epigenetic regulatory networks; and engineer ligand-targeted nanoparticle formulations (co-loaded with SCFAs and Edaravone) to accelerate neurovascular rehabilitation and multi-organ recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {RESEARCH_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                onClick={() => navigateTo('research', area.targetSection)}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#0F2537] leading-snug group-hover:text-[#8B1E24] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    {area.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#8B1E24] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Topic</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. News & Announcements */}
      <section
        id="news-announcements-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Dispatches &amp; Milestones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2537]">
            News &amp; Announcements
          </h2>
          <p className="text-sm sm:text-base text-[#0F2537]/85 leading-relaxed">
            Major extramural grant developments, peer-reviewed publications, open positions, and academic honors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={item.action}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8B1E24] group-hover:text-[#A82931] transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Latest Updates (Upward Scrolling Points with Pause-on-Hover & Links) */}
      <section
        id="latest-updates-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24] mb-1">
              <Bell className="w-3.5 h-3.5" />
              <span>Bulletin Board</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              Latest Updates
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTickerPaused(!isTickerPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#8B1E24] text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              title={isTickerPaused ? 'Resume live scrolling' : 'Pause scrolling'}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#8B1E24] fill-[#8B1E24]" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div
          className="relative bg-white rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-6 overflow-hidden ticker-wrapper"
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
        >
          <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

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
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
                      <span className="text-[11px] font-mono font-bold text-slate-500 whitespace-nowrap">
                        {item.date}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-[#0F2537] leading-snug group-hover/item:text-[#8B1E24] transition-colors">
                      {item.text}
                    </p>
                  </div>

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

          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
