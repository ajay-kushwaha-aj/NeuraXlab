import React, { useState } from 'react';
import {
  Activity,
  Dna,
  Cpu,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  FileCheck2,
  Globe2,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FlaskConical,
  Award,
  ShieldCheck,
  Compass,
  FileText
} from 'lucide-react';
import {
  RESEARCH_HERO,
  RESEARCH_OVERVIEW,
  FEATURED_RESEARCH_DIRECTIONS,
  ONGOING_PROJECTS,
  RESEARCH_COLLABORATORS,
  PAST_GRANTS,
  LAB_INFO
} from '../data/labData';
import { useCMS } from '../cms/context/CMSContext';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ResearchPage({ setActiveTab }) {
  const { researchAreas: cmsAreas, projects: cmsProjects } = useCMS();
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    src: '',
    title: '',
    caption: ''
  });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 space-y-16 sm:space-y-20">
      {/* Lightbox Modal for Full Scientific Schematic Inspection */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* =========================================================================
          1. RESEARCH PAGE HERO
          ========================================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-5 pt-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider border border-[#8B1E24]/20">
          <FlaskConical className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>{RESEARCH_HERO.eyebrow}</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F2537] tracking-tight leading-[1.15]">
          {RESEARCH_HERO.heading}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
          {RESEARCH_HERO.paragraph}
        </p>

        {/* Supporting Research Themes */}
        <div className="pt-2">
          <p className="text-xs uppercase font-mono font-semibold text-slate-500 tracking-wider mb-3">
            Core Scientific Themes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {RESEARCH_HERO.themes.map((theme, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs sm:text-[13px] font-semibold text-[#0F2537] shadow-2xs hover:border-[#8B1E24]/60 hover:text-[#8B1E24] transition-colors"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Subtle Decorative Underline */}
        <div className="w-20 h-1 bg-[#8B1E24] rounded-full mx-auto mt-4" />
      </section>

      {/* =========================================================================
          IN-PAGE QUICK ANCHOR NAVIGATION BAR
          ========================================================================= */}
      <nav
        aria-label="Research Page Sections"
        className="sticky top-20 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-2 flex items-center justify-center flex-wrap gap-1 sm:gap-2"
      >
        <button
          onClick={() => scrollToSection('research-overview')}
          className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        >
          Research Overview
        </button>
        <button
          onClick={() => scrollToSection('research-directions')}
          className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        >
          Featured Directions
        </button>
        <button
          onClick={() => scrollToSection('ongoing-projects')}
          className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        >
          Ongoing Projects
        </button>
        <button
          onClick={() => scrollToSection('collaborators')}
          className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        >
          Collaborators
        </button>
        <button
          onClick={() => scrollToSection('funding-archive')}
          className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        >
          Past Awards
        </button>
      </nav>

      {/* =========================================================================
          2. RESEARCH OVERVIEW
          ========================================================================= */}
      <section
        id="research-overview"
        className="space-y-8 scroll-mt-32"
      >
        <div className="space-y-2 border-b-2 border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Theoretical &amp; Experimental Foundation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            {RESEARCH_OVERVIEW.title}
          </h2>
          <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
        </div>

        {/* 3 Structured Paragraphs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          {RESEARCH_OVERVIEW.paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* 3 Compact Research Pillars Below */}
        <div className="space-y-3">
          <p className="text-xs uppercase font-mono font-semibold text-slate-500 tracking-wider">
            Three Core Scientific Pillars
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1: Mechanisms */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-slate-200/90 hover:border-[#8B1E24]/60 transition-all shadow-2xs hover:shadow-sm space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                    {RESEARCH_OVERVIEW.pillars[0].subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0F2537] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[0].title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[0].description}
                </p>
              </div>
            </div>

            {/* Pillar 2: Systems Biology */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-slate-200/90 hover:border-[#8B1E24]/60 transition-all shadow-2xs hover:shadow-sm space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                  <Dna className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                    {RESEARCH_OVERVIEW.pillars[1].subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0F2537] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[1].title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[1].description}
                </p>
              </div>
            </div>

            {/* Pillar 3: Translation */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-slate-200/90 hover:border-[#8B1E24]/60 transition-all shadow-2xs hover:shadow-sm space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C59B27] block">
                    {RESEARCH_OVERVIEW.pillars[2].subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0F2537] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[2].title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED RESEARCH DIRECTIONS (3 PROMINENT STORIES WITH ALTERNATING LAYOUTS)
          ========================================================================= */}
      <section
        id="research-directions"
        className="space-y-10 scroll-mt-32"
      >
        {/* Alias anchor for Navbar compatibility */}
        <div id="research-pillars" className="scroll-mt-32" />

        <div className="space-y-2 border-b-2 border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Programmatic Research Thrusts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            Featured Research Directions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Detailed investigation tracks integrating experimental rodent stroke models, metagenomic sequencing, organellar proteostasis, and translational nanomedicine.
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
        </div>

        <div className="space-y-12">
          {/* DIRECTION 1: STROKE-INDUCED GUT DYSBIOSIS & RECOVERY */}
          {/* Desktop: Text Left, Visual Right */}
          <div
            id="direction-1"
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-32"
          >
            {/* Compatibility Anchor */}
            <div id="pillar-gut-brain" className="scroll-mt-32" />
            {/* Card Category Header */}
            <div className="bg-[#8B1E24] text-white px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C59B27]">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E0B84C]">
                Research Direction 01 • {FEATURED_RESEARCH_DIRECTIONS[0].category}
              </span>
              <span className="text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded border border-white/20 text-white">
                Experimental &amp; Metagenomics
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Text & Takeaway */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[0].fullTitle}
                  </h3>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[0].description}
                  </p>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#8B1E24] border-y border-r border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                      Scientific Takeaway
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F2537] leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[0].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Project */}
                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline cursor-pointer group"
                    >
                      <span>View Associated Extramural Award (ICMR 2026–2029)</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right: Scientific Visual */}
                <div className="lg:col-span-6 space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/70 bg-[#0F2537] shadow-md group">
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[0].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[0].imageAlt}
                      className="w-full h-auto max-h-[380px] object-cover"
                      onError={(e) => {
                        e.target.src = '/images/neurobiology_stroke_disease.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() =>
                          openLightbox(
                            FEATURED_RESEARCH_DIRECTIONS[0].image,
                            FEATURED_RESEARCH_DIRECTIONS[0].fullTitle,
                            FEATURED_RESEARCH_DIRECTIONS[0].imageCaption
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B1E24] hover:bg-[#A82931] text-white text-xs font-semibold shadow transition-all cursor-pointer"
                        title="Enlarge Scientific Schematic"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#E0B84C]" />
                        <span>Enlarge Diagram</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[0].imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DIRECTION 2: MICROGLIA-MACROPHAGE NEUROINFLAMMATION & NANOMATERIALS */}
          {/* Desktop: Visual Left, Text Right (Alternating) */}
          <div
            id="direction-2"
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-32"
          >
            {/* Compatibility Anchor */}
            <div id="pillar-nanomedicine" className="scroll-mt-32" />
            {/* Card Category Header */}
            <div className="bg-[#8B1E24] text-white px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C59B27]">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E0B84C]">
                Research Direction 02 • {FEATURED_RESEARCH_DIRECTIONS[1].category}
              </span>
              <span className="text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded border border-white/20 text-white">
                Translational Nanotherapeutics
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left on Desktop: Scientific Visual */}
                <div className="lg:col-span-6 order-2 lg:order-1 space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/70 bg-[#0F2537] shadow-md group">
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[1].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[1].imageAlt}
                      className="w-full h-auto max-h-[380px] object-cover"
                      onError={(e) => {
                        e.target.src = '/images/neurobiology_stroke_disease.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() =>
                          openLightbox(
                            FEATURED_RESEARCH_DIRECTIONS[1].image,
                            FEATURED_RESEARCH_DIRECTIONS[1].fullTitle,
                            FEATURED_RESEARCH_DIRECTIONS[1].imageCaption
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B1E24] hover:bg-[#A82931] text-white text-xs font-semibold shadow transition-all cursor-pointer"
                        title="Enlarge Scientific Illustration"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#E0B84C]" />
                        <span>Enlarge Diagram</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[1].imageCaption}
                  </p>
                </div>

                {/* Right on Desktop: Text, Scope & Takeaway */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[1].fullTitle}
                  </h3>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[1].description}
                  </p>

                  {/* Preclinical Scope Notice */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#8B1E24] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Preclinical Scope:</strong> {FEATURED_RESEARCH_DIRECTIONS[1].scopeNote}
                    </p>
                  </div>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#8B1E24] border-y border-r border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                      Scientific Takeaway
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F2537] leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[1].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Projects */}
                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline cursor-pointer group"
                    >
                      <span>View Associated Nanomaterial Project (ICMR Co-PI)</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DIRECTION 3: ER STRESS & DIABETES-ASSOCIATED STROKE */}
          {/* Desktop: Text Left, Visual Right */}
          <div
            id="direction-3"
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-32"
          >
            {/* Compatibility Anchor */}
            <div id="pillar-er-stress" className="scroll-mt-32" />
            {/* Card Category Header */}
            <div className="bg-[#8B1E24] text-white px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C59B27]">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E0B84C]">
                Research Direction 03 • {FEATURED_RESEARCH_DIRECTIONS[2].category}
              </span>
              <span className="text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded border border-white/20 text-white">
                Organellar Proteostasis
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Text & Takeaway */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[2].fullTitle}
                  </h3>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[2].description}
                  </p>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#8B1E24] border-y border-r border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                      Scientific Takeaway
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F2537] leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[2].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Projects */}
                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline cursor-pointer group"
                    >
                      <span>View Associated Extramural Award (ANRF-PAIR)</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right: Scientific Visual */}
                <div className="lg:col-span-6 space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/70 bg-[#0F2537] shadow-md group">
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[2].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[2].imageAlt}
                      className="w-full h-auto max-h-[380px] object-cover"
                      onError={(e) => {
                        e.target.src = '/images/er_stress_organelle.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() =>
                          openLightbox(
                            FEATURED_RESEARCH_DIRECTIONS[2].image,
                            FEATURED_RESEARCH_DIRECTIONS[2].fullTitle,
                            FEATURED_RESEARCH_DIRECTIONS[2].imageCaption
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B1E24] hover:bg-[#A82931] text-white text-xs font-semibold shadow transition-all cursor-pointer"
                        title="Enlarge Cellular Model"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#E0B84C]" />
                        <span>Enlarge Diagram</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[2].imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. ONGOING RESEARCH PROJECTS (4 VERIFIED EXTRAMURAL PROJECTS)
          ========================================================================= */}
      <section
        id="ongoing-projects"
        className="space-y-8 scroll-mt-32"
      >
        {/* Alias anchor for Navbar compatibility */}
        <div id="flagship-grant" className="scroll-mt-32" />

        <div className="space-y-2 border-b-2 border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            <FileCheck2 className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Extramural Grants &amp; Investigations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            Ongoing Research Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Funded extramural research projects active at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
        </div>

        {/* Important Data-Verification Advisory Card */}
        <div className="bg-[#FAF8F5] border-l-4 border-[#C59B27] rounded-2xl p-5 sm:p-6 border-y border-r border-slate-200/90 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E24]">
            <AlertCircle className="w-4 h-4 text-[#C59B27]" />
            <span>Data-Verification Advisory on Source Project Identifiers</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            Institutional source records record the same ICMR identifier (<strong className="font-mono text-[#0F2537]">IRPGS-2025-01-02193</strong>) for both the multi-year gut dysbiosis award (2026–2029; Principal Investigator) and the engineered nanomaterials project (2024–2027; Co-Principal Investigator). These entries represent distinct research durations, scopes, and investigator appointments, and are noted here for routine verification against apex sanction records without altering source data.
          </p>
        </div>

        {/* 4 Structured Project Cards in a 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {ONGOING_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-[#8B1E24]/60 transition-all flex flex-col justify-between space-y-5 group"
            >
              {/* Card Header: Funding Agency & Duration */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20 uppercase">
                      {project.fundingAgency}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-500">
                      Duration: {project.duration}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#C59B27]/15 text-[#8B1E24] border border-[#C59B27]/30">
                    {project.role}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537] leading-snug group-hover:text-[#8B1E24] transition-colors">
                  {project.title}
                </h3>

                {/* Metadata Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#FAF8F5] p-3 rounded-xl border border-slate-200/70">
                  <div>
                    <span className="text-slate-500 font-mono uppercase block font-semibold">Funding Agency</span>
                    <span className="font-semibold text-[#0F2537]">{project.fundingAgencyFull}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono uppercase block font-semibold">Investigator Role</span>
                    <span className="font-semibold text-[#8B1E24]">{project.role}</span>
                  </div>
                  {project.projectId && (
                    <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-mono uppercase font-semibold">Project ID:</span>
                      <span className="font-mono text-slate-700 font-bold">{project.projectId}</span>
                    </div>
                  )}
                </div>

                {/* Short Supported Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Link to Associated Research Direction */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Focus: {project.relatedDirectionTitle}
                </span>
                <button
                  onClick={() => scrollToSection(project.relatedDirectionId)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline cursor-pointer group/btn"
                >
                  <span>Explore Direction</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. RESEARCH COLLABORATORS (8 VERIFIED COLLABORATORS)
          ========================================================================= */}
      <section
        id="collaborators"
        className="space-y-8 scroll-mt-32"
      >
        <div className="space-y-2 border-b-2 border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            <Globe2 className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Academic Synergies &amp; Research Network</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            Research Collaborators
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Active and verified scientific partnerships with leading neuroscience institutes, national apex centres, and central central university investigators.
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
        </div>

        {/* 8 Collaborator Cards in a Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {RESEARCH_COLLABORATORS.map((collab) => (
            <div
              key={collab.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:border-[#8B1E24]/60 hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8B1E24]/10 text-[#8B1E24] uppercase border border-[#8B1E24]/20">
                    {collab.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    {collab.country}
                  </span>
                </div>

                {/* Collaborator Name & Title */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {collab.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8B1E24] mt-0.5">
                    {collab.title}
                  </p>
                </div>

                {/* Institutional Affiliation */}
                <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                  <p className="font-medium text-[#0F2537]">
                    {collab.department}
                  </p>
                  <p className="text-slate-500 font-normal">
                    {collab.institution}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {collab.location}
                  </p>
                </div>
              </div>

              {/* Collaborative Focus Scope */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Collaborative Area
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {collab.collaborativeFocus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. PAST EXTRAMURAL GRANTS & INSTITUTIONAL SCHEMES ARCHIVE
          ========================================================================= */}
      <section
        id="funding-archive"
        className="space-y-6 scroll-mt-32"
      >
        <div className="space-y-2 border-b-2 border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            <Award className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Funding Track Record</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
            Past Extramural Grants &amp; Institutional Awards
          </h2>
          <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAST_GRANTS.map((grant, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#8B1E24] font-bold uppercase block">
                  {grant.scheme}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] leading-snug">
                  {grant.title}
                </h3>
                <p className="text-xs text-slate-600">
                  <strong className="text-[#0F2537]">Agency:</strong> {grant.agency}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-200/70">
                  {grant.impact}
                </p>
              </div>
              <div className="text-xs text-emerald-800 font-bold font-mono pt-3 border-t border-slate-200/70">
                Status: {grant.period}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. TRANSLATIONAL INQUIRIES & CALL-TO-ACTION
          ========================================================================= */}
      <section className="bg-[#0F2537] text-white rounded-3xl p-8 sm:p-10 lg:p-12 border-2 border-[#C59B27]/60 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E0B84C]">
              Translational Collaboration &amp; Trainee Opportunities
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Interested in Collaborating or Joining NeuroXLab?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl font-normal">
              We welcome scientific inquiries from prospective doctoral scholars with national fellowships (CSIR/UGC JRF, DBT, ICMR), postdoctoral applicants, and academic or clinical collaborators. Direct inquiries can be addressed to Dr. Venkata Prasuja Nakka at{' '}
              <a href="mailto:nvprasuja@uohyd.ac.in" className="font-mono text-[#E0B84C] hover:underline font-semibold">
                nvprasuja@uohyd.ac.in
              </a>.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
            <button
              onClick={() => {
                if (setActiveTab) {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#C59B27]/40 min-h-[44px]"
            >
              <span>Explore Open Positions</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C]" />
            </button>
            <a
              href="mailto:nvprasuja@uohyd.ac.in"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20 min-h-[44px]"
            >
              <span>Email Laboratory PI</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
