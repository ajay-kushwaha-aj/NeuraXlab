import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Cpu, 
  Dna, 
  BookOpen, 
  Users, 
  Calendar, 
  Briefcase, 
  Award, 
  Flame, 
  CheckCircle2, 
  Quote, 
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { GutBrainSystemsCanvas, InteractiveGutBrainAtlas } from '../components/InteractiveVisuals';
import NeuraXlabLogo from '../components/NeuraXlabLogo';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO, FLAGSHIP_GRANT, RESEARCH_PILLARS, TEAM_MEMBERS } from '../data/labData';

export default function HomePage({ setActiveTab }) {
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

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section with Live <GutBrainSystemsCanvas /> - Full Viewport Screen */}
      <section 
        id="hero-section"
        style={{ minHeight: 'calc(100vh - var(--navbar-height, 104px))' }}
        className="relative min-h-[calc(100vh-104px)] min-h-[calc(100dvh-104px)] flex flex-col justify-between items-center overflow-hidden bg-gradient-to-b from-[#0F2537] via-[#142e44] to-[#0A1926] text-white px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27]"
      >
        {/* Subtle 60fps HTML5 Canvas Animation */}
        <GutBrainSystemsCanvas />

        {/* Ambient Dark Center Vignette to keep text zone ultra-clean & legible */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,37,55,0.85)_0%,_transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top spacer to balance vertical layout */}
        <div className="w-full h-1 sm:h-2 shrink-0" aria-hidden="true" />

        {/* Centered Main Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto py-4 sm:py-6 text-center space-y-5 sm:space-y-6 flex flex-col items-center justify-center my-auto">
          {/* Institutional Crest Shield with clean professional spacing */}
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

            {/* Vertical divider line in between the logos */}
            <div className="h-12 sm:h-14 w-px bg-white/30 mx-1 sm:mx-1.5" aria-hidden="true" />

            {/* Official NeuraXlab Emblem in matching square frame */}
            <NeuraXlabLogo className="h-20 w-20 sm:h-22 sm:w-22" withFrame={true} />
          </div>

          {/* Main Editorial Hero Headings */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <h1 className="brand-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none drop-shadow-xl">
              Neura<span className="text-[#E0B84C] drop-shadow-[0_0_25px_rgba(224,184,76,0.65)]">X</span>lab
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl mx-auto font-sans font-light leading-relaxed">
              Investigating the microbiota-gut-brain axis, organellar ER stress, post-stroke epigenetics, and nano-formulated therapeutics for ischemic cerebral recovery.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigateTo('research', 'flagship-grant')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 shadow-lg hover:shadow-xl transition-all active:scale-95 group"
            >
              <span>Explore 2026–2029 Grant</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <Users className="w-4 h-4 text-[#C59B27]" />
              <span>Meet the Team</span>
            </button>

            <button
              onClick={() => navigateTo('publications')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <BookOpen className="w-4 h-4 text-[#C59B27]" />
              <span>Publications &amp; BibTeX</span>
            </button>
          </div>
        </div>

        {/* Subtle Scroll Down Prompt anchored cleanly at bottom of viewport */}
        <div className="relative z-10 pb-4 sm:pb-6 pt-1 shrink-0">
          <button
            onClick={() => {
              const elem = document.getElementById('counters-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-white/60 hover:text-[#E0B84C] transition-colors focus:outline-none group cursor-pointer"
            aria-label="Scroll to research metrics"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#E0B84C]/90 mb-1 group-hover:text-[#E0B84C] font-semibold">
              Explore Lab Metrics
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#E0B84C]" />
          </button>
        </div>
      </section>

      {/* 2. Verified Bibliometric Counters */}
      <section id="counters-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1,573+ GS Citations */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#8B1E24] text-center transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#8B1E24] uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4 text-[#8B1E24]" />
              <span>Google Scholar</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24]">
              1,573+
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/75 uppercase tracking-wider mt-1">
              GS Citations
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-0.5 font-mono">
              h-index: 12 • i10-index: 15
            </div>
          </div>

          {/* 1,196+ Scopus Citations */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#C59B27] text-center transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C59B27] uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-[#C59B27]" />
              <span>Scopus Indexed</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              1,196+
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/75 uppercase tracking-wider mt-1">
              Scopus Citations
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-0.5 font-mono">
              High-impact peer-reviewed journals
            </div>
          </div>

          {/* Rs. 82.6L+ Past Grants + 2026–29 Grant */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#8B1E24] text-center transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#8B1E24] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-[#8B1E24]" />
              <span>Extramural Grants</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24]">
              Rs. 82.6L+
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/75 uppercase tracking-wider mt-1">
              Past Grants + 2026–29
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 font-mono">
              Active: 2026–2029 Flagship Grant
            </div>
          </div>

          {/* 28+ Mentored Trainees */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#C59B27] text-center transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C59B27] uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-[#C59B27]" />
              <span>Supervision &amp; Pedigree</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              28+
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/75 uppercase tracking-wider mt-1">
              Mentored Trainees
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-0.5 font-mono">
              PDFs, Ph.D. scholars &amp; Master's alumni
            </div>
          </div>
        </div>
      </section>

      {/* 3. Spotlight Banner for the 2026–2029 Flagship Project */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#C59B27]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E24]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Grant Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider shadow">
                <Flame className="w-3.5 h-3.5 text-[#E0B84C]" />
                <span>Flagship 3-Year Extramural Project (2026 – 2029)</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537] leading-tight">
                Therapeutic Potential of Nano-Formulated Short-Chain Fatty Acids and Edaravone in Stroke-Induced Gut Dysbiosis
              </h2>

              <p className="text-[#0F2537]/80 text-base sm:text-lg leading-relaxed">
                Acute ischemic stroke triggers a bidirectional inflammatory cascade: cerebral injury compromises the intestinal barrier, provoking gut dysbiosis that amplifies post-stroke brain damage. NeuraXlab is engineering targeted nanoparticle delivery systems to restore the gut-brain axis and accelerate neurovascular recovery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>Dual Encapsulation of SCFAs &amp; Edaravone</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>16S Metagenomic Microbiome Sequencing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>Blood-Brain Barrier (BBB) Preservation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>ER Stress &amp; UPR Signaling Mitigation</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('research', 'flagship-grant')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#641318] shadow transition-all group"
                >
                  <span>Read Full Grant Details &amp; Objectives</span>
                  <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs font-mono text-[#0F2537]/60">
                  Term: 27-Jan-2026 to 26-Jan-2029 • PI: Dr. Venkata Prasuja Nakka
                </span>
              </div>
            </div>

            {/* Right Column: Visual Diagram */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27] shadow-2xl group bg-[#0F2537]">
                <img
                  src="/images/nanotherapy_gut_brain.jpg"
                  alt="Microbiota-Gut-Brain Axis Nanotherapy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                  <p className="font-semibold text-[#E0B84C]">
                    Scientific Schematic: Gut-Brain Axis &amp; SCFA Nanomedicine
                  </p>
                  <p className="text-[11px] text-white/80">
                    Dual action on intestinal dysbiosis and cerebral ER stress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Anatomical Diagram: <InteractiveGutBrainAtlas /> */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Systems Biology Simulation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2537]">
            Interactive Microbiota–Gut–Brain Atlas
          </h2>
          <p className="text-sm text-[#0F2537]/75">
            Click on each anatomical node (Ischemic Brain, Vagus/Immune Highway, SCFA Nanocarrier, or Gut Microbiome Barrier) to view live molecular telemetry and biomarker readouts.
          </p>
        </div>

        {/* The Interactive Anatomical Atlas Component */}
        <InteractiveGutBrainAtlas />
      </section>

      {/* 5. 6-Card Multi-Page Portal Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Laboratory Directory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            Explore NeuraXlab Portals
          </h2>
          <p className="text-sm text-[#0F2537]/75">
            Navigate through our 6 dedicated sections covering research projects, team roster, publication archives, activities, and fellowship openings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Research (Projects, Collaborations) */}
          <div
            onClick={() => navigateTo('research')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Research &amp; Collaborations
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                Explore the active 2026–2029 Nanotherapy grant, 4 scientific pillars, and global partnerships with UW-Madison, NUS, and CSIR-CDRI.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>View Projects &amp; Pillars</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Meet the Team (Group Leader, Team Members) */}
          <div
            onClick={() => navigateTo('team')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Meet the Team
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                Group leader profile of Dr. Venkata Prasuja Nakka (JNU/CDRI Ph.D., UW-Madison &amp; NUS postdoc), postdoctoral fellows, and doctoral scholars.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>Meet PI &amp; Roster</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Research Articles */}
          <div
            onClick={() => navigateTo('articles')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Research Articles
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                Authoritative book chapters from Cambridge Scholars Publishing, Academic Press (Methods in Enzymology), and Springer Nature.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>Browse Book Chapters</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Publication */}
          <div
            onClick={() => navigateTo('publications')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Publications &amp; BibTeX
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                Peer-reviewed research in Stroke (AHA), Molecular Neurobiology, and JCBFM with a one-click BibTeX citation generator modal.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>Search Publications</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Activities (Events, Gallery) */}
          <div
            onClick={() => navigateTo('activities')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Activities &amp; Gallery
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                National bioscience skill development workshops, invited keynotes at SNCI and NEHU Shillong, and research facilities photo gallery.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>Explore Symposia</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Opportunities / Contact */}
          <div
            onClick={() => navigateTo('contact')}
            className="cursor-pointer bg-white rounded-3xl p-7 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
                Opportunities &amp; Contact
              </h3>
              <p className="text-xs text-[#0F2537]/70 leading-relaxed">
                Active JRF/SRF/Postdoc vacancies under the 2026–2029 Nanotherapy project, online application portal, and UoH lab coordinates.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E24]">
              <span>Apply for Openings</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
